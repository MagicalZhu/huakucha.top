> 基于 Vitesse 构建的博客网站

# 食用指南(备忘)
1. pages目录是基于文件系统的,下面的每个文件都会映射一个文件路由
2. components 下面的组件会自动注册到 vue 的全局组件中(可以在任意的地方使用组件,包括 markdown 文件中)
3. 通过下面的方式可以指定画面的布局(简单的说数据流向是 layouts -> pages -> components)
   ```html
    <route lang="yaml">
    meta:
      layout: 指定布局
    </route>
   ``
4. 画面的布局存放在 src/layouts 目录下面


