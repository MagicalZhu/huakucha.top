---
  author: 'athu'
  title: DockerFile 最佳实践
  tags:
    - Docker
    - 云原生
  date: 2023-03-03 01:39:12
  categories: 云原生
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

为了保持 Dockerfile 文件的可读性,可理解性,以及可维护性,建议将长的或复杂的 RUN 指令用反斜杠 "\\" 分割成多行

### apt-get

RUN 最常见的使用情况可能是使用 `apt-get`。因为 RUN apt-get 命令会安装包,所以有几个问题需要注意:

1. 不要使用 `RUN apt-get upgrade` 或 `dist-upgrade`,因为许多基础镜像中的「必须」包不会在一个非特权容器中升级
    - 如果基础镜像中的某个包过时了,应该联系镜像的维护者
    - 如果确定某个特定的包升级,请使用 `apt-get install -y 包名`。比如 foo 需要升级,使用 apt-get install -y foo 就行,该指令会自动升级 foo 包

2. 永远将`RUN apt-get update`与`apt-get install`结合在同一个RUN语句中

    ```docker
    RUN apt-get update && apt-get install -y \
        package-bar \
        package-baz \
        package-foo  \
        && rm -rf /var/lib/apt/lists/*
    ```

3. **在 RUN 语句中单独使用 apt-get update 会导致缓存问题,后续的 apt-get install 指令会失败**。例如,该问题会发生在以下 Dockerfile 中:

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

    **Docker 发现修改后的 *RUN apt-get update* 指令和之前的完全一样。所以,*apt-get update* 不会执行,而是使用之前的缓存镜像**。因为 apt-get update 没有运行,后面的 apt-get install 可能安装的是*过时的 curl 和 nginx 版本*

4. 使用 `RUN apt-get update && apt-get install -y` 可以确保 Dockerfile 每次安装的都是**包的最新的版本**,而且这个过程不需要进一步的编码或额外干预。这项技术叫作 `cache busting (破坏缓存)`。
    - 也可以**显示指定一个包的版本号来达到 cache-busting**, 也可以称之为**固定版本**
    - **固定版本会迫使构建过程检索特定的版本,而不管缓存中有什么。这项技术也可以减少因所需包中未预料到的变化而导致的失败**

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

1. 为了便于新的程序运行,可以使用`ENV 指令` 来为容器中安装的程序更新PATH环境变量。例如, `ENV PATH /usr/local/nginx/bin:$PATH` 将确保 **CMD ["nginx"]** 能正确运行。
2. `ENV 指令` 也可用于为**想要容器化的服务提供必要的环境变量**,比如 Postgres 需要的`PGDATA`
3. `ENV 指令` 也能用于设置常见的版本号,以便维护 version bumps,参考下面的示例:

    ```docker
    ENV PG_MAJOR=9.3
    ENV PG_VERSION=9.3.4
    RUN curl -SL https://example.com/postgres-$PG_VERSION.tar.xz | tar -xJC /usr/src/postgres && …
    ENV PATH=/usr/local/postgres-$PG_MAJOR/bin:$PATH
    ```

    这个类似于在代码中拥有常量变量,而不是硬编码值,通过这种方法**可以通过改变一个ENV指令来自动提升你容器中的软件版本**

和 `RUN` 命令类似的,**每一个 ENV 指令都会创建一个中间层,这意味着,即使在后面的一个层中取消了环境变量,它仍然在这个层中持续存在,其值可以被转储**

通过下面的示例可以得到验证:

```docker
# 首先定义 Dockerfile
# syntax=docker/dockerfile:1
FROM alpine
ENV ADMIN_USER="mark"
RUN echo $ADMIN_USER > ./mark
RUN unset ADMIN_USER

# 构建完镜像之后,创建一个容器。可以看到虽然取消了 ADMIN_USER,但是值依然存在
➜ docker run --rm 3583e70fcd75 sh -c 'echo $ADMIN_USER'
= athu
```

为了真正取消环境变量,**使用RUN命令和shell命令,将变量的设置、使用和取消都放在一层,可以用";"或"&&"来分隔命令**

- 还可以使用"\"作为Linux Dockerfiles 的换行符可以提高可读性
- 也可以把所有的命令放到一个shell脚本中,让RUN命令直接运行这个shell脚本。

  ```docker
  # syntax=docker/dockerfile:1
  FROM alpine
  RUN export ADMIN_USER="mark" \
      && echo $ADMIN_USER > ./mark \
      && unset ADMIN_USER
  CMD sh
  ```

## ADD or COPY

尽管 `ADD指令` 和 `COPY 指令` 在功能上相似。**但一般来说,COPY是首选**,因为它比 ADD 指令更透明。

- **COPY只支持将本地文件复制到容器中的基本功能**, 而ADD 有一些不是很明显的功能(比如只在本地提取tar和支持远程URL)
- `ADD 指令`的最佳用途是**将本地tar文件自动提取到镜像中**,如 `ADD rootfs.tar.xz /`

**如果 Dockerfile 有多个步骤需要使用上下文中不同的文件,请单独 COPY 每个文件,而不是一次性 COPY 完**。 这将保证每个步骤的构建缓存只在特定的文件变化时失效

  ```docker
  COPY requirements.txt /tmp/
  RUN pip install --requirement /tmp/requirements.txt
  # 如果将 COPY . /tmp/ 放置在RUN指令之前
  # 只要.目录中任何一个文件变化,都会导致后续指令的缓存失效。
  COPY . /tmp/
  ```

由于镜像的大小很重要,所以**强烈不建议使用ADD从远程URL获取包**, 而是应该使用 `curl` 或 `wget` 来代替。这样就可以在解压后删除不再需要的文件,而且也不必在的镜像中中再增加一层。

比如应该避免做这样的事情:

```docker
# 应该避免用 ADD 获取远程资源
ADD https://example.com/big.tar.xz /usr/src/things/
RUN tar -xJf /usr/src/things/big.tar.xz -C /usr/src/things
RUN make -C /usr/src/things all

# 作为替代,应该使用 curl / wget 获取资源
# 这里使用的是管道操作,所以没有中间文件需要删除
RUN mkdir -p /usr/src/things \
    && curl -SL https://example.com/big.tar.xz \
    | tar -xJC /usr/src/things \
    && make -C /usr/src/things all
```

:::tip 提示

对于其他的,比如**文件和目录**, 不需要 ADD 指令的 tar 自动提取功能,**应该总是使用COPY**

:::

## ENTRYPOINT

ENTRYPOINT 指令的**最佳用途是设置镜像的主命令,允许该镜像可以像该命令一样被运行,然后使用CMD作为默认标志**

例如,下面的示例镜像提供了命令行工具 `s3cmd`:

```docker
# Dockerfile
ENTRYPOINT ["s3cmd"]
CMD ["--help"]

# 如果该镜像直接这么运行,则会显示命令帮助
docker run s3cmd

# 或者也可以使用正确的参数去执行一个命令
docker run s3cmd ls s3://mybucket
```

**ENTRYPOINT 指令也可以和SHELL脚本结合使用**,允许它以类似于上述命令的方式发挥作用,即使启动工具可能需要多于一个步骤。

比如Postgres的官方镜像的 ENTRYPOINT 指令就是这么写的

```docker
# 将 sh 脚本拷贝到 bin 目录下面,设置为主命令
COPY docker-entrypoint.sh /usr/local/bin/
ENTRYPOINT ["docker-entrypoint.sh"]
```

## VOLUME

- `VOLUME 指令`应该被用来**暴露任何数据库存储区域、配置存储、或由 Docker 容器创建的文件和文件夹**。
- 强烈建议你VOLUME用于镜像的任何可变或用户可服务的部分的组合

## WORKDIR

- 为了清晰和可靠,**应该始终使用绝对路径来表示你的WORKDIR**。
- 应该使用 WORKDIR,而不是像 `RUN cd ... && do-something` 这样的指令,这样的指令很难被阅读、排除故障和维护

## ONBUILD

1. **ONBUILD 指令在当前 Dockerfile 构建完成后执行,它可以在任何从当前镜像衍生出来的子镜像中执行**。可以把 ONBUILD 指令看作是父Dockerfile给子Dockerfile的一个指令
    - Docker构建时会在子 Dockerfile 的任何命令之前执行 ONBUILD 命令

2. ONBUILD 对于要从一个给定的镜像中构建的镜像很有用
    - 例如,你会对一个语言栈镜像使用 ONBUILD,在 Dockerfile 中构建用该语言编写的任意用户软件

3. 用 ONBUILD 构建的镜像应该得到一个单独的标签
    - 例如,ruby:1.9-onbuild 或 ruby:2.0-onbuild。
4. 在 ONBUILD 中使用 ADD 或 COPY 时要格外小心。如果新的构建上下文中缺少对应的资源, "onbuild" 镜像会灾难性地失败,**建议添加一个单独的标签**

# 参考资料 <Badge type="tip" text="Tip"/>

1. <app-link to="https://docs.docker.com/develop/develop-images/dockerfile_best-practices/" class="sourceLink">Dockerfile最佳实践[官方文档]</app-link>
