> 旨在用于记录一些边角料、零碎的知识以及一些瞎扯的胡言乱语:D


# 食用指南(备忘)
1. pages目录是基于文件系统的,下面的每个文件都会映射一个文件路由
2. components 下面的组件会自动注册到 vue 的全局组件中(可以在任意的地方使用组件,包括 markdown 文件中)
3. 通过下面的方式可以指定画面的布局
   ```html
    <route lang="yaml">
    meta:
      layout: 指定布局
    </route>
   ```
4. 画面的布局存放在 src/layouts 目录下面

# Thanks

- 感谢[@antfu](https://github.com/antfu) 提供的模板
- <a href="https://www.jetbrains.com/?from=huakucha.top"><img src="/public/img/jetbrains.jpg" width="100px" alt="jetbrains">**感谢 JetBrains 提供的免费开源 License**</a>

# Active
![Alt](https://repobeats.axiom.co/api/embed/5c6b08adb7589d4509b1f017c48c86c034c43222.svg "Repobeats analytics image")

