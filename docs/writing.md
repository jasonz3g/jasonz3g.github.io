# 博客写作指南

这个项目使用 Astro Content Collections 管理文章。以后新增博客时，只需要在 `src/content/blog/` 下创建 Markdown 文件。

## 新建文章

文章文件放在：

```text
src/content/blog/
```

推荐文件名格式：

```text
YYYY-MM-DD-post-slug.md
```

例如：

```text
src/content/blog/2026-06-28-my-new-post.md
```

文件名只影响源码管理，不决定最终访问地址。最终 URL 由 frontmatter 里的 `permalink` 决定。

## 文章模板

复制下面模板创建新文章：

````md
---
title: "文章标题"
date: 2026-06-28
category: "随笔"
permalink: "2026/06/28/post-slug"
description: "用于 RSS 和摘要的一句话描述。"
---

这里写开头段落。开头最好直接说明这篇文章想讨论什么问题，或者给出一个清晰的背景。

## 第一个小标题

这里写正文。

如果需要列表：

- 第一项
- 第二项
- 第三项

如果需要引用：

> 这里是一段引用。

如果需要代码块：

```js
console.log("hello");
```

如果需要图片，先把图片放到 `public/img/`，然后这样引用：

![图片说明](/img/example.png)

## 总结

这里总结文章的主要观点，或者写下一步可以继续思考的问题。
````

## Frontmatter 字段说明

必填字段：

- `title`：文章标题，会显示在文章页和首页列表里
- `date`：发布日期，格式为 `YYYY-MM-DD`
- `permalink`：最终访问路径，不要以 `/` 开头或结尾

可选字段：

- `category`：文章分类；填写后会自动生成分类页
- `description`：RSS 摘要和文章简短描述

推荐的 `permalink` 格式：

```text
YYYY/MM/DD/post-slug
```

例如：

```text
2026/06/28/my-new-post
```

最终访问地址会是：

```text
https://jasonz3g.github.io/2026/06/28/my-new-post/
```

## Markdown 常用写法

标题：

```md
## 小标题
```

链接：

```md
[链接文字](https://example.com)
```

图片：

```md
![图片说明](/img/example.png)
```

代码块：

````md
```js
console.log("hello");
```
````

列表：

```md
- 第一项
- 第二项
- 第三项
```

引用：

```md
> 这里是一段引用。
```

## 图片管理

图片放在：

```text
public/img/
```

文章中用绝对路径引用：

```md
![图片说明](/img/file-name.png)
```

## 本地预览

启动 Astro 开发服务器：

```bash
npm run dev
```

然后打开：

```text
http://127.0.0.1:4321/
```

## 发布前检查

发布前先运行：

```bash
npm run build
```

如果构建通过，说明文章 frontmatter、路由和页面生成没有问题。

## 发布文章

提交并推送：

```bash
git add src/content/blog public/img docs/writing.md
git commit -m "Add new blog post"
git push
```

推送后，GitHub Actions 会自动构建 Astro 站点并发布到 GitHub Pages。

部署状态在这里查看：

```text
GitHub 仓库 -> Actions -> Deploy to GitHub Pages
```

发布后的站点地址：

```text
https://jasonz3g.github.io/
```

## 使用 Front Matter CMS

如果想要更好的写作界面，可以在 VS Code 或 Cursor App 里安装扩展：

```text
Front Matter CMS
```

使用流程：

1. 运行 `npm run dev`
2. 在编辑器命令面板中打开 Front Matter CMS Dashboard
3. 在 `Blog` 内容目录中新建文章
4. 填写 `title`、`date`、`category`、`permalink`、`description`
5. 用 Markdown 写正文
6. 运行 `npm run build` 检查
7. 提交并推送
