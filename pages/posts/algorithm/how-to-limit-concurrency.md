---
  author: 'ant'
  title: 如何限流
  tags:
    - 算法
    - Java
    - 分布式
    - 面试
  date: 2023-01-20 00:43:40
  categories: 算法
---

[[TOC]]

# 限流
> 限流可以认为`服务降级`的一种,**限流就是限制系统的输入和输出流量已达到保护系统的目的**。
> 一般来说系统的吞吐量是可以被测算的,为了保证系统的稳定运行,一旦达到的需要限制的阈值,就需要限制流量并采取一些措施以完成限制流量的目的。
> 比如：**延迟处理,拒绝处理,或者部分拒绝处理等等**

# 限流的方法

- 一般来说,有下面的几种限流的方式:
  - `计数器(固定窗口)`
  - `滑动窗口`
  - `漏桶(Leaky Bucket)`
  - `令牌桶(Token Bucket)`

## 计数器(固定窗口)

> 实现方式: 控制单位时间内的请求数量

```java
import java.util.concurrent.atomic.AtomicInteger;

public class Counter {
  /**
    * 最大访问数量
    */
  private final int limit = 10;
  /**
    * 访问时间差(时间单位:ms)
    */
  private final long timeout = 1000;
  /**
    * 请求时间
    */
  private long time;
  /**
    * 当前计数器
    */
  private AtomicInteger requestCount = new AtomicInteger(0);

  public boolean limit() {
    long now = System.currentTimeMillis();
    if (now < time + timeout) {
      // 单位时间内
      requestCount.addAndGet(1);
      return requestCount.get() <= limit;
    } else {
      // 超出单位时间,更新单位时间,并且重置计数器状态
      time = now;
      requestCount = new AtomicInteger(0);
      return true;
    }
  }
}
```

### 缺点

**在单位时间边界上会更新计数器的状态,期间所有过来的请求都会被处理**,我们假设在 00:00:001 时发生一个请求,在 00:00:001~00:00:998 之间不再发送请求,在 00:00:999 时发送剩下的所有请求 n-1 (n 为限流请求数量),此时 00:00:001~00:00:999 内处理了 n 个请求。然后在下秒的 00:01:001 发送 n 个请求,这样在 00:00:999~00:01:999 时间范围内请求达到了 2n - 1 个,远大于 所规定的 n 个请求

简单来说,由于时间窗口粒度太大,会由于某个时间点的请求激增而导致实际 QPS 远大于目标 QPS

## 滑动窗口

滑动窗口是对固定窗口的改进: **增加一个时间粒度的度量单位,把一分钟分成若干等分(6 份,每份 10 秒),在每一份上设置独立计数器,在 00:00-00:09 之间发生请求计数器累加 1**。当等分数量越大限流统计就越详细。

```java
import java.util.Iterator;
import java.util.Random;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.stream.IntStream;

public class TimeWindow {
  private ConcurrentLinkedQueue<Long> queue = new ConcurrentLinkedQueue<Long>();

  /**
    * 间隔秒数
    */
  private int seconds;

  /**
    * 最大限流
    */
  private int max;

  public TimeWindow(int max, int seconds) {
    this.seconds = seconds;
    this.max = max;

    /**
      * 永续线程执行清理queue 任务
      */
    new Thread(() -> {
      while (true) {
        try {
          // 等待 间隔秒数-1 执行清理操作
          Thread.sleep((seconds - 1) * 1000L);
        } catch (InterruptedException e) {
          e.printStackTrace();
        }
        clean();
      }
    }).start();
  }

  public static void main(String[] args) throws Exception {

    final TimeWindow timeWindow = new TimeWindow(10, 1);
    // 测试3个线程
    IntStream.range(0, 3).forEach((i) -> {
      new Thread(() -> {
        while (true) {
          try {
            Thread.sleep(new Random().nextInt(20) * 100);
          } catch (InterruptedException e) {
            e.printStackTrace();
          }
          timeWindow.take();
        }
      }).start();

    });
  }

  /**
    * 获取令牌,并且添加时间
    */
  public void take() {
    long start = System.currentTimeMillis();
    try {
      int size = sizeOfValid();
      if (size > max) {
        System.err.println("超限");
      }
      synchronized (queue) {
        if (sizeOfValid() > max) {
            System.err.println("超限");
            System.err.println("queue中有 " + queue.size() + " 最大数量 " + max);
        }
        this.queue.offer(System.currentTimeMillis());
      }
      System.out.println("queue中有 " + queue.size() + " 最大数量 " + max);
    }
  }

  public int sizeOfValid() {
    Iterator<Long> it = queue.iterator();
    Long ms = System.currentTimeMillis() - seconds * 1000;
    int count = 0;
    while (it.hasNext()) {
        long t = it.next();
        if (t > ms) {
            // 在当前的统计时间范围内
            count++;
        }
    }

    return count;
  }

  /**
    * 清理过期的时间
    */
  public void clean() {
    Long c = System.currentTimeMillis() - seconds * 1000;

    Long tl = null;
    while ((tl = queue.peek()) != null && tl < c) {
      System.out.println("清理数据");
      queue.poll();
    }
  }
}
```

## Leaky Bucket 漏桶

实现方式: **规定固定容量的桶,有水进入,有水流出。对于流进的水我们无法估计进来的数量、速度, 对于流出的水我们可以控制速度**

```java
public class TokenBucket {
    /**
     * 时间
     */
    private long time;
    /**
     * 总量
     */
    private Double total;
    /**
     * token 放入速度
     */
    private Double rate;
    /**
     * 当前总量
     */
    private Double nowSize;

    public boolean limit() {
        long now = System.currentTimeMillis();
        nowSize = Math.min(total， nowSize + (now - time) * rate);
        time = now;
        if (nowSize < 1) {
            // 桶里没有token
            return false;
        } else {
            // 存在token
            nowSize -= 1;
            return true;
        }
    }

}
```

# 工作使用

## Spring Cloud Gateway

Spring Cloud Gateway 默认使用 Redis 进行限流

首先引入 GAV :

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-gateway</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis-reactive</artifactId>
</dependency>
```

然后配置 Gateway 的配置文件:

```yaml
spring:
    cloud:
        gateway:
            routes:
                - id: requestratelimiter_route

                  uri: lb://pigx-upms
                  order: 10000
                  predicates:
                      - Path=/admin/**

                  filters:
                      - name: RequestRateLimiter

                        args:
                            redis-rate-limiter.replenishRate: 1 # 令牌桶的容积
                            redis-rate-limiter.burstCapacity: 3 # 流速 每秒
                            key-resolver: '#{@remoteAddrKeyResolver}' #SPEL表达式去的对应的bean

                      - StripPrefix=1
```

最后向 IOC 容器注册 Bean:

```java
@Bean
KeyResolver remoteAddrKeyResolver() {
    return exchange -> Mono.just(exchange.getRequest().getRemoteAddress().getHostName());
}
```

## Sentinel

通过配置来控制每个 url 的流量

首先引入 GAV :

```xml
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
</dependency>
```

然后配置 Sentinel 的配置文件:

```yaml
spring:
    cloud:
        nacos:
            discovery:
                server-addr: localhost:8848
        sentinel:
            transport:
                dashboard: localhost:8080
                port: 8720
            datasource:
                ds:
                    nacos:
                        server-addr: localhost:8848
                        dataId: spring-cloud-sentinel-nacos
                        groupId: DEFAULT_GROUP
                        rule-type: flow
                        namespace: xxxxxxxx
```

然后在 nacos 上进行配置:

- resource：资源名，即限流规则的作用对象。
- limitApp：流控针对的调用来源，若为 default 则不区分调用来源。
- grade：限流阈值类型，QPS 或线程数模式，0 代表根据并发数量来限流，1 代表根据 QPS 来进行流量控制。
- count：限流阈值
- strategy：判断的根据是资源自身，还是根据其它关联资源 (refResource)，还是根据链路入口
- controlBehavior：流控效果（直接拒绝 / 排队等待 / 慢启动模式）
- clusterMode：是否为集群模式

```json
[
    {
        "resource": "/hello",
        "limitApp": "default",
        "grade": 1,
        "count": 1,
        "strategy": 0,
        "controlBehavior": 0,
        "clusterMode": false
    }
]
```

# 参考

1. <app-link to="https://github.com/doocs/advanced-java/blob/main/docs/high-concurrency/how-to-limit-current.md" class="sourceLink">如何限流？在工作中是怎么做的？说一下具体的实现？</app-link>
