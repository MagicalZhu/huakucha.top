---
  author: 'athu'
  title: DockerFile 最佳实践
  tags:
    - 云原生
  date: 2023-03-03 01:39:12
  categories: Docker
  forward: false
  lock: false
  fav: false
---

[[TOC]]

Docker 通过读取 Dockerfile 中的指令来自动构建镜像,Dockerfile 是一个文本文件,包含了构建一个特定镜像所需的所有命令。Dockerfile遵循特定的格式和指令集,可以在 [Dockerfile 参考](https://docs.docker.com/engine/reference/builder/) 中找到。

一个Docker镜像由只读层组成,每个层代表一个Dockerfile指令。这些层是堆叠在一起的,下面是Dockerfile 的示例

```docker
# syntax=docker/dockerfile:1
FROM ubuntu:18.04
COPY . /app
RUN make /app
CMD python /app/app.py
```

**每一条指令创建一个层**:

1. `FROM` : 从 `ubuntu:18.04` 的Docker镜像中创建一个层
2. `COPY` : 从你的Docker客户端的当前目录中添加文件
3. `RUN` : 用`make`构建你的应用程序
4. `CMD` : 指定在容器中运行什么命令

**当运行一个镜像并生成一个容器时,会在底层之上添加一个新的可写层,也叫容器层。对运行中的容器所做的所有改变,如写入新文件、修改现有文件和删除文件,都被写入这个可写的容器层。**

# 一般性的指南和建议

## 创建短暂的容器

- Dockerfile定义的镜像应该尽可能地生成短暂的容器
- 短暂的意思是,容器可以被停止和销毁,然后以绝对最小的设置和配置进行重建和替换。

## 理解构建上下文

构建上下文[参考这里](https://docs.docker.com/build/building/context/)

## 使用 .dockerignore

- 一般最好的方法是将 Dockerfile 放置在一个单独地空目录下。然后将构建镜像所需要的文件添加到目录下,为了提高构建的效率,也可以在目录下创建一个 `.dockerignore` 文件来指定要忽略的文件和目录
- .dockerignore 文件的排除模式语法和 Git 的 .gitignore 文件类似

## 使用多阶段构建

[多阶段构建](https://docs.docker.com/build/building/multi-stage/)可以大幅度减小最终镜像的大小,而不需要麻烦的减少中间层和文件的数量。因为镜像是在构建过程的最后阶段构建的,可以通过利用[构建缓存](dockerfile-best-practices#利用构建缓存)来尽量减少镜像层。

比如说, 如果构建的时候包含几个层,并且想要确保构建缓存是可重复使用的,那么可以**把它们从更新频率较低的地方排到到更新频率较高的地方**。下面的列表是一个指令顺序的例子。

1. 安装构建应用程序所需的工具

2. 安装或更新库的依赖性

3. 生成应用程序

一个Go应用程序的Docker文件可以是这样的:

```docker
# syntax=docker/dockerfile:1
FROM golang:1.16-alpine AS build

# 安装构建应用程序所需的工具
# 运行 "docker build --no-cache . " 来更新依赖
RUN apk add --no-cache git
RUN go get github.com/golang/dep/cmd/dep

# 用Gopkg.toml和Gopkg.lock列出项目的依赖,这些层只有在Gopkg文件更新时才会被重新构建。
COPY Gopkg.lock Gopkg.toml /go/src/project/
WORKDIR /go/src/project/
# 安装库的依赖
RUN dep ensure -vendor-only

# 复制整个项目并构建它
# 当项目目录中的文件发生变化时,该层将被重建。
COPY . /go/src/project/
RUN go build -o /bin/project

# 得到了一个单层镜像
FROM scratch
COPY --from=build /bin/project /bin/project
ENTRYPOINT ["/bin/project"]
CMD ["--help"]

```

## 不安装不必要的包

为了降低复杂性、减少依赖、减小文件大小、节约构建时间,应该避免安装任何不必要的包,不要仅仅为了“锦上添花”而安装某个包。例如,不要在数据库镜像中包含一个文本编辑器

## 应用解耦

- **每个容器应该只有一个关注点。将应用程序解耦到多个容器中,可以更容易地进行横向扩展和重复使用容器**。例如,一个网络应用程序栈可能由三个独立的容器组成,每个容器都有自己独特的镜像,以解耦的方式管理网络应用程序、数据库和内存缓存。

- **将每个容器限制为一个进程是一个很好的经验法则**,但这并不是一个硬性规定。例如,不仅容器可以[通过init进程生成](https://docs.docker.com/engine/reference/run/#specify-an-init-process),一些程序也可能自行生成额外的进程。例如,Celery可以产生多个工作进程,Apache可以为每个请求创建一个进程。

- 总之,**尽可能地保持容器的清洁和模块化。如果容器之间相互依赖,你可以使用 [Docker容器网络](https://docs.docker.com/network/) 来确保这些容器能够通信**

## 最大限度减少层数

在旧版本的Docker中,我们需要尽量减少镜像中的层数,以确保镜像是高性能的。为了减少这种限制,Docker 增加了以下功能:

1. **只有RUN、COPY、ADD等指令可以创建层。其他指令会创建临时的中间镜像,并且不会增加构建的大小**。

2. 在可能的情况下,使用[多阶段构建](dockerfile-best-practices#使用多阶段构建),并且只复制需要的工件到最终的镜像中。这可以在中间构建阶段包含工具和调试信息,而不增加最终镜像的大小

## 多行参数排序

- 将多行参数按字母顺序排序（比如要安装多个包时）。这可以帮助你避免重复包含同一个包,更新包列表时也更容易。也便于阅读和省察
- 建议在**反斜杠符号\\** 之前添加一个**空格**,以增加可读性

比如 buildpack-deps 图像的例子:

```docker
RUN apt-get update && apt-get install -y \
  bzr \
  cvs \
  git \
  mercurial \
  subversion \
  && rm -rf /var/lib/apt/lists/*
```

## 利用构建缓存

在构建镜像的过程中,Docker通过Docker文件中的指令,按照指定的顺序执行每个指令。**在检查每条指令时,Docker 会在其缓存中寻找一个可以重复使用的现有镜像,而不是创建一个新的、重复的镜像**。

如果根本不想使用缓存,你可以在 docker build 命令中使用 `--no-cache=true` 选项。然而,如果你让Docker使用它的缓存,重要的是要了解它什么时候可以,什么时候不能,找到一个匹配的镜像。Docker遵循的基本规则概述如下。

1. 从已经在缓存中的父镜像开始,将下一条指令与从该基础镜像衍生出来的所有子镜像进行比较,看其中是否有一个是用完全相同的指令构建的。如果不是,缓存就会被废止。

2. 在大多数情况下,只需将Dockerfile中的指令与其中的一个子镜像进行比较就足够了。**然而某些指令需要更多的检查和解释**。

3. 对于 `ADD` 和 `COPY` 指令,**镜像中每个文件的内容都会被检查,并为每个文件计算校验和**。在这些校验和中不考虑每个文件的最后修改和最后访问的时间。在缓存查找过程中,检查和与现有图像中的检查和进行比较。如果任何文件有任何变化,比如内容和元数据,那么缓存就会被废止。

4. 除了 `ADD` 和 `COPY` 命令之外,缓存检查并不查看容器中的文件来确定缓存的匹配
    - 例如,在处理RUN apt-get -y update命令时,不会检查容器中更新的文件以确定是否存在缓存命中。在这种情况下,只有命令字符串本身被用来寻找匹配。

:::warning 注意
**一旦缓存失效,所有后续的Dockerfile命令都会生成新的镜像,而缓存不会被使用。**
:::

# Docker 指令

## FROM

- 只要有可能,就使用当前的官方镜像作为你的镜像的基础
- Docker推荐使用 [Alpine 镜像](https://hub.docker.com/_/alpine/),因为它被严格控制,体积小(目前小于6MB),同时仍然是一个完整的Linux发行版

## LABEL

可以给镜像添加标签来帮助组织镜像、记录许可信息、辅助自动化构建,或者其他的原因。**每个标签一行,由 LABEL 开头然后加上一个或多个键值对**

下面是注意点以及示例:

1. **如果字符串中包含空格,将字符串放入引号中或者对空格使用转义。如果字符串内容本身就包含引号,必须对引号"使用转义**

    ```docker
    # 设置一个或多个单独的标签
    LABEL com.example.version="0.0.1-beta"
    # 字符串包含空格,将字符串放入引号这哦那个
    LABEL vendor1="ACME Incorporated"
    # 字符串包含空格,使用 \ 进行转义
    LABEL vendor2=ZENITH\ Incorporated
    LABEL com.example.release-date="2015-02-12"
    LABEL com.example.version.is-production=""
    ```

2. 一个镜像可以有多个标签,在Docker 1.10之前,建议将所有标签合并到一个LABEL指令中,以防止创建额外的层。**这已经没有必要了**,但仍然支持合并标签

    ```docker
    # 在一行上设置多个 LABEL 标签
    LABEL com.example.version="0.0.1-beta" com.example.release-date="2015-02-12"

    # 当然也支持换行符\ 分割多个标签, 所以也可以写成下面的格式:
    LABEL vendor=ACME\ Incorporated \
      com.example.is-beta= \
      com.example.is-production="" \
      com.example.version="0.0.1-beta" \
      com.example.release-date="2015-02-12"
    ```

## RUN

将长的或复杂的RUN语句分成多行,用反斜线 "\" 隔开,使 Dockerfile 更容易阅读、理解和维护

### apt-get

RUN 最常见的使用情况可能是使用 apt-get。因为 RUN apt-get 命令会安装包,所以有几个问题需要注意:

1. 始终将`RUN apt-get update`与`apt-get install`结合在同一个RUN语句中

    ```docker
    RUN apt-get update && apt-get install -y \
        package-bar \
        package-baz \
        package-foo  \
        && rm -rf /var/lib/apt/lists/*
    ```

2. **在 RUN 语句中单独使用 apt-get update会导致缓存问题,后续的apt-get安装指令会失败**。例如,该问题会发生在以下 Dockerfile 中:

    ```docker
    # syntax=docker/dockerfile:1
    FROM ubuntu:18.04
    RUN apt-get update
    RUN apt-get install -y curl
    ```

    构建镜像后,所有层都在Docker缓存中。假设后来修改了apt-get安装,增加了一个额外的软件包,如下面的Dockerfile

    ```docker
    # syntax=docker/dockerfile:1
    FROM ubuntu:18.04
    RUN apt-get update
    RUN apt-get install -y curl nginx
    ```

    **Docker 认为初始指令和修改后的指令是相同的,并重用了之前步骤的缓存**。因此apt-get更新没有被执行,因为构建时使用的是缓存的版本。因为没有运行apt-get更新,你的构建可能会得到过时的 *curl* 和 *nginx* 的版本

3. 使用 `RUN apt-get update && apt-get install -y` 可以确保 Dockerfile 安装最新的软件包版本,而无需进一步编码或手动干预。这种技术被称为 **"缓存破坏"**
    - **也可以通过指定一个软件包的版本来实现高速缓存的破坏**,这就是所谓的**版本锁定**

    ```docker
    RUN apt-get update && apt-get install -y \
        package-bar \
        package-baz \
        package-foo=1.3.*
    ```

下面是一个格式良好的RUN指令,演示了所有 apt-get 建议

```docker
# s3cmd参数指定的是1.1.*版本
# 如果镜像之前使用的是旧版本,指定新版本会导致 apt-get update 的缓存中断,确保安装新版本

# 此外,最后通过删除/var/lib/apt/lists来清理apt缓存,会减少镜像的大小, 因为apt缓存并没有存储在一个层中。
# 由于 RUN 语句以apt-get update开始,软件包缓存总是在 apt-get install 之前被刷新。
RUN apt-get update && apt-get install -y \
    aufs-tools \
    automake \
    build-essential \
    curl \
    dpkg-sig \
    libcap-dev \
    libsqlite3-dev \
    mercurial \
    reprepro \
    ruby1.9.1 \
    ruby1.9.1-dev \
    s3cmd=1.1.* \
 && rm -rf /var/lib/apt/lists/*
```

:::tip 提示
官方的 Debian 和Ubuntu镜像会自动运行 `apt-get clean` ,所以不需要明确调用。
:::

## CMD

- `CMD 指令` 应该被用来**运行镜像中包含的软件,以及任何参数**。
- CMD几乎总是以`CMD ["executable", "param1", "param2"...]` 的形式使用。
  - 因此,如果镜像是用于一个服务,如Apache和Rails,你将运行类似 **CMD ["apache2","-DFOREGROUND"]** 的命令
  - **事实上,这种形式的指令被推荐用于任何基于服务的镜像**
- 多数情况下,CMD都需要一个交互式的 shell(bash,python,perl,etc)。例如:**CMD ["perl","-de0"],CMD ["php","-a"]**。使用这种形式意味着,当你执行类似docker run -it python时,你会进入一个准备好的 shell 中

## EXPOSE

- `EXPOSE 指令`用于**指定容器将要监听连接的端口**,因此应该为应用程序使用常见熟知的端口
  - 提供 Apache web 服务的镜像将使用EXPOSE 80
  - 提供 MongoDB 服务的镜像使用EXPOSE 27017
  - ...

- 对于外部访问,镜像用户可以在执行 `docker run` 时使用参数(-p 、-P)来指示**如何将指定的端口映射到所选择的端口**

## ENV

- 为了便于程序运行,你可以使用ENV来为容器中安装的程序更新PATH环境变量。例如,`ENV PATH /usr/local/nginx/bin:$PATH`将确保CMD ["nginx"]能正确运行。

# 参考资料 <Badge type="tip" text="Tip"/>

1. <app-link to="https://docs.docker.com/develop/develop-images/dockerfile_best-practices/" class="sourceLink">Dockerfile最佳实践[官方文档]</app-link>
