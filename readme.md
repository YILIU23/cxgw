# 程星官网 · 终端主题

程星社群的纯静态官网。在 Glow Team 1.2 原有目录和数据配置结构上重构，保留首页、作品详情页及 `works.html?id=0` 等入口。无需构建、后端或数据库。

## 预览和部署

将本目录作为静态网站根目录部署，入口为 `index.html`。本地预览可在此目录执行 `python -m http.server 8080`，再访问 `http://localhost:8080`。通过 HTTP 预览可完整加载 ES module 动效；双击 HTML 时浏览器可能限制模块脚本。

部署文件：`index.html`、`works.html`、`env.js`、`site.js`、`index.js`、`works.js`、`terminal.css`、`favicon.svg`、`share.jpg` 和整个 `assets/`。`shots/`、`.taste-skill/`、`checks/` 为开发验收材料，无需上传。

旧 OneUI 文件、themes 和 HTML_Protect 目录保留，终端主题不再加载这些资源，不依赖缺失的字体或第三方 UI CDN。没有新增框架、包管理或构建流程。

## 内容配置

继续编辑 `env.js`：

- `teamname`、`headtitle`、`dctitle`、`descrp`、`keywords`：名称和页面元信息。
- `ico`：网站图标，默认本地像素星标。
- `teamday`：建群年份，仅首页显示一次。作品和社群说明不显示日期。
- `modules`：保留 `feature`、`hito`、`work`、`zone`、`member`、`contact`、`flinks` 开关。
- `headbuts`：顶部导航，仍是 `[模块ID, 图标名, 名称]`。禁用或为空的模块会移除对应导航。
- `aboutmod`、`contacts`、`memb`、`flinks`：仍采用原有数组结构。
- `zone`：仍采用 `[图片, 时间, 信息]`，改为无日期社群说明；时间字段可留空。
- `cont`：作品配置结构不变，时间字段可留空；详情支持原有 `$s$` 等正文标记。完全相同的体验与下载链接合并成一个入口。
- `jrsc`：固定一言；填 `api` 才请求一言接口，超时使用本地文案。

界面图标来源保存在 `assets/icons/ui.svg`，两个 HTML 已内嵌同一套 symbol 以兼容直接打开文件，内含 `terminal`、`folder`、`message`、`mail`、`users`、`code`、`link`、`shield` 等符号，不使用图标字体。新增图标时请同步源文件和两个页面内的 symbol。成员头像与友链标志已从原配置地址保存到 `assets/people/`；图片加载失败有本地回退。

`themecss`、`oneuiapp`、`blk1bg`、`aler` 为旧模板兼容字段，终端主题不使用。原模板的重复风景图不再作为作品截图；为作品配置真实且不重复的图片时，会显示画廊和原生图片预览。

## ICP 和公安备案

首页与作品详情页通过 `site.js` 共用备案渲染逻辑：

```js
beiancode = "鲁ICP备2026070809号-1";
beianurl = "https://beian.miit.gov.cn/";
gongancode = "";
gonganurl = "";
```

公安备案取得后，填入完整号码与平台提供的完整查询详情链接。只有号码、有效链接都存在时才显示；空配置不显示占位号。外部链接在新窗口打开，并设置 `noopener noreferrer`。

## 交互与兼容

支持深浅色切换并保存偏好、手机全屏导航、Escape 关闭、键盘焦点、系统减少动态效果设置。无效、缺少、负数或非数字作品 ID 显示“作品未找到”，不会错误跳转或继续访问无效数组。文本配置按文本转义，链接仅接受 HTTP、HTTPS 和邮件协议。

网站未确定独立正式域名，因此没有编造 canonical 地址。部署到正式域名后，可在两个 HTML 的 head 中补充 canonical 和绝对地址的 og:image。

## 来源

基于 Glow Team（原模板作者 Jerry，原始说明署名 2026）进行站点定制。成员、网站、头像及友链来自现有项目配置；没有使用图库替身或虚构成员。微交互及联系区过渡使用 design-taste-frontend skill 的原始 motion / moments 文件。
