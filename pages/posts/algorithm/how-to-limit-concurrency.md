---
  author: 'athu'
  title: 如何限流
  tags:
    - Java
    - 算法
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
  - `计数器`
  - `滑动窗口`
  - `漏桶(Leaky Bucket)`
  - `令牌桶(Token Bucket)`

## 计数器

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

**在边界上会更新计数器的状态,所有过来的请求都会被处理**,我们假设在 00:01 时发生一个请求,在 00:01-00:58 之间不在发送请求,在 00:59 时发送剩下的所有请求 n-1 (n 为限流请求数量),在下一分钟的 00:01 发送 n 个请求,这样在 2 秒钟内请求到达了 2n - 1 个。

设每分钟请求数量为 60 个,每秒可以处理 1 个请求,用户在 00:59 发送 60 个请求,在 01:00 发送 60 个请求 此时 2 秒钟有 120 个请求(每秒 60 个请求),远远大于了每秒钟处理数量的阈值

## 滑动窗口

> 滑动窗口是对计数器方式的改进: **增加一个时间粒度的度量单位，把一分钟分成若干等分(6 份，每份 10 秒)，在每一份上设置独立计数器，在 00:00-00:09 之间发生请求计数器累加 1**。当等分数量越大限流统计就越详细。

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

  public TimeWindow(int max， int seconds) {
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

    final TimeWindow timeWindow = new TimeWindow(10， 1);
    // 测试3个线程
    IntStream.range(0， 3).forEach((i) -> {
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
    * 获取令牌，并且添加时间
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


# 参考

1. <app-link to="https://github.com/doocs/advanced-java/blob/main/docs/high-concurrency/how-to-limit-current.md" class="sourceLink">如何限流？在工作中是怎么做的？说一下具体的实现？</app-link>