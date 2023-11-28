---
  author: 'ant'
  title: 长毛象 Mastodon 食用指南
  tags:
    - 杂谈
  date: 2023-01-30 01:23:06
  categories: App
  forward: true
  lock: false
  fav: true
---
[[TOC]]

# 什么是Mastodon

> Mastodon 的中文意思是长毛象，就是下图的生物。同时，也是一个16年十月出现的去中心化社交平台。

Mastodon类似Twitter/微博，不同的是Mastodon分成local和federation两个时间轴。Mastodon内部有无数个实例（instance），每一个实例都独立又关联，你可以在你注册的实例的本地时间轴上看到本实例所有用户发的嘟嘟（toot），也可以跨实例关注其他实例上的用户，并在跨站时间轴上看到他们的动态。

# 名词解释
Mastodon里有很多专用的名词，刚开始用的话可能会非常懵逼。比如：

1. **实例（instance）**：每一个Mastodon站点就是一个实例，推荐几个比较有意思的实例
  - [长毛象中文站/草莓县](https://cmx.im/) 草莓县是Mastodon里人数最多的纯中文实例，里面的小伙伴们都非常有爱，活跃度也不错。
  - [o3o](https://o3o.ca/)
  - [搜索喜欢的实例](https://instances.social/) 列出了Mastodon里所有的实例，可以用语言和兴趣筛选。
2. **嘟嘟（toot）**：类似tweet，你发的内容在Mastodon世界里被称为嘟嘟。
3. **本站时间轴（local timeline）**：显示本实例所有用户发的公共嘟嘟。
4. **跨站公共时间轴（federated timeline）**：显示本实例用户关注的用户发的公共嘟嘟，可以看到很多外站嘟嘟。
5. **主页**：自己的主页，可以看到自己发的不公开嘟嘟，所有回复和转发。
6. **嘟文可见范围**
  - `公开`：会出现在所有时间轴上，所有人都能看到这条嘟嘟。
  - `不公开`：不会出现在本站和跨站时间轴，但会出现在你的主页上，所有人都能看到。
  - `仅关注者`：不会出现在本站和跨站时间轴，但会出现在你的主页上，只有关注了你的人才能看到。
  - `私信`：只有你@了的用户才能看到，任何时间轴上都没有。
  - `收藏（favorite）`：收藏之后的嘟嘟可以在收藏的内容中看到。这个功能每个人有不同的理解，可以理解为“朕已阅”或者点赞。
7. **转嘟（Boost）**：Mastodon里的转嘟和转发不太一样，转嘟后是不能自己编辑的，也不会出现在本地时间轴里。转嘟后的嘟文只能在个人主页里看到，可以理解为“哇这条嘟嘟好顶赞，我想让更多人看到！”。
8. **回复（Reply）**：回复了之后会自动@这条嘟嘟里@过的所有人，并且出现在个人主页里，但不会出现在本地时间轴里，如果不想让回复出现在主页里可以设置嘟文可见范围。不过好像回复自己发的内容会上本地时间轴，具体的规则不是很清楚...

> 另外如果想回复时间轴上其他人发的嘟嘟，并且显示在时间轴上，可以直接发一条新嘟嘟，前面加上TL或者>TL，意思就是回复TimeLine。


# 怎么发嘟嘟
1. 首先，你需要在你想发言的实例注册一个账号，账号在不同实例中是不通用的，所以如果你想去另一个实例发言需要重新注册（很傻）
2. 其次，你需要设置是否折叠。输入框底下的CW（content warning）就是折叠选项
  - **折叠部分的警告信息**是折叠完后始终显示的一部分，可以写比如“XX预警”，“XX警告”等等。底下的大框框里就是被折叠的内容。如果想发表长篇大论的时候折叠功能也可以避免刷屏
  - 正文折叠和标记敏感内容这两个功能非常实用，由于Mastodon是一个自由的网络，所有用户发的嘟嘟都需要用户自行判断是否折叠，所以在发有碍观瞻的内容之前请务必自觉选上这两个选项

3. 如果想发图，可以直接复制粘贴到输入框里。发图有个标记敏感内容（NSFW）（not safe for work）功能

# 屏蔽/举报

请务必点击那条嘟嘟底下的举报按钮或者屏蔽按钮。屏蔽某用户之后无论在本站时间轴还是跨站时间轴都不会显示该用户发的嘟嘟。屏蔽后不会影响其他用户看到的内容。

:::warning 注意
由于Mastodon是个自由的社交平台，每个人有发言的自由，也有举报的自由，举报后管理员会在后台看到举报详情，如果举报人数众多管理员会酌情全实例范围屏蔽或者封禁。
:::

# 认证用户

Mastodon不存在认证用户，所有用户名后面的符号都是自己加上去的。你可以加一个emoji，也可以加站内的表情，**加表情的方法是在用户名后面输入表情对应的短代码(比如 :vip1:)，注意冒号前面要加空格。**

# 更美味地食用Mastodon

可以去跨站时间轴看看其他实例上有趣的小伙伴们并加个关注，多关注一些其他实例的小伙伴，本实例上的跨站时间轴也会更加丰富。

<hr>

> 参考资料

- 本文大部分转载于<app-link to="https://jings.blog/misc/how-to-use-mastodon.html" class="sourceLink">长毛象 Mastodon 食用指南</app-link>
- 相关文档博文
  - <app-link to="https://mastodoncn.netlify.app/" class="sourceLink">Mastodon Doc</app-link>
  - <app-link to="https://linshuirong.cn/blog/2019/02/17/Mastodon：属于未来的社交网络/" class="sourceLink">安利Mastodon：属于未来的社交网络</app-link>
  - <app-link to="https://yukieyun.net/nonsense/mastodon-benefits-and-how-to/" class="sourceLink">Mastodon 怎么玩</app-link>
  - <app-link to="https://soulteary.com/2022/01/24/building-a-personal-information-platform-with-mastodon-part-1.html" class="sourceLink">Mastodon 搭建个人信息平台</app-link>
  - <app-link to="https://candinya.com/posts/mastodon-first-meet/" class="sourceLink">Mastodon搭建小记</app-link>
- 相关开源
  - <app-link to="https://github.com/mastodon/mastodon" class="sourceLink">Mastodon</app-link>
  - <app-link to="https://github.com/elk-zone/elk" class="sourceLink">A nimble Mastodon web client</app-link>
  - <app-link to="https://github.com/shuiRong/Gakki" class="sourceLink">A React Native App for Mastodon</app-link>
