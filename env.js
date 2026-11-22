/**
 * 设置变量
 * 所有网站内容都在这里设置，无后台，请保证这个文件放在合适的直链储存
 * 内容、联系方式与备案信息统一在此配置。
 */


/**
 * 兼容旧模板的设置（终端主题不加载 OneUI 主题或插件）
 */

//主题CDN加速链接目录，可以填入自己CDN的链接
//$t$代表主题名称，如amethyst
themecss = "./themes/$t$.min-5.12.css";

//主题自带插件CDN加速链接
//同上，如果没有条件的站长可以解压 CDN资源.7z 到当前目录下然后填./oneui.app.min-5.8.js
oneuiapp = ["./oneui.app.min-5.11.js"];



/**
 * 网站基础信息设置
 */

//网站标题
dctitle = "上官程星";

//网站关键字，用空格分隔
keywords = "上官程星 QQ交流群 团队官网";

//网站介绍
descrp = "上官程星交流群的线上据点，整理社群作品、成员与联系方式。";

//网站图标
ico = "./favicon.svg";

//ICP备案号及链接；留空时不显示
beiancode = "鲁ICP备2026070809号-1";
beianurl = "https://beian.miit.gov.cn/";

//公安备案号和官方查询详情链接：取得备案后填写，不要填写示例号码
//例如：gonganurl 填写公安备案平台提供的完整详情链接
//两个字段都填写后，首页和作品详情页会自动显示
gongancode = "";
gonganurl = "";

//添加板块：特点feature，一言hito，作品work，动态zone，成员member，联系contact，把不要的删除
modules = ["feature", "hito", "work", "zone", "member", "contact", "flinks"];

//防止扒站
//终端主题不启用网页限制脚本。

//IE浏览器提示
//true开启，false关闭
banie = true;



/**
 * 网站内容设置
 */

//团队名称
teamname = "上官程星";

//建群年份（首页只显示一次）
teamday = "2024";

//网站左上角处名称
headtitle = "上官程星官网";

//网站顶端跳转按钮，每个数组内第一个元素为板块，第二个为图标，第三个为名字
//第一个topd为首页，不可删除
headbuts = [
  ["topd", "terminal", "首页"],
  ["work", "folder", "作品"],
  ["member", "users", "成员"],
  ["contact", "message", "联系"]
];

//网站第一板块背景图URL
blk1bg = "https://npm.elemecdn.com/zxmacc-staticr@v1.0.5/images/background/day02.png";

//一言：填写固定句子；填 api 时才从一言服务请求，失败显示本地文案。
jrsc = "江天一色无纤尘，皎皎空中孤月轮。";

//网站第一板块子标题
blk1stitle = "聊日常，分享学习，也放一些我们做的东西。";

//弹窗内容
//标题，文字(\n换行)
aler = ["欢迎~", "你好鸭\n欢迎访问上官程星交流群官网"];

//About模块内容
//首页图下面4个图标对应的文字
//按顺序依次填写图标、标题、内容
aboutmod = [
  ["message", "日常交流", "在 QQ 群里聊日常，也交流学习中的问题。"],
  ["code", "作品分享", "做过的网站与项目，都整理在这里。"],
  ["terminal", "技术支持", "网站由柠汐网络科技提供技术支持。"],
  ["link", "保持联系", "找到成员、交流群和相关网站。"]
];

//联系方式设置
//目前只支持2个，可自己修改代码增加
//按顺序依次填写图标、标题、链接
//邮箱请务必加前缀 mailto:
contacts = [
  ["message", "QQ群", "https://qun.qq.com/universal-share/share?ac=1&authKey=Ed54vJPL%2BugHXuYsE%2FoUEWRJidSxDQnPG3eHo3Gf4M4i7jJta6Y0qmuvxoVX25pp&busi_data=eyJncm91cENvZGUiOiI4MTAyODgxMjkiLCJ0b2tlbiI6InlMNXBoYXRPWXJMdnRaNW10bnpRWG0vOURYRkF5ZmZmbjk5Z2xtblFoaDlrMSt1UzZ4aTBoL3ZWY0thUjVuUG0iLCJ1aW4iOiIzMzQ1NjUwNDEifQ%3D%3D&data=ESbpYeTT5YMgyfNWGL4Tl_5ivlLWt061MOVS2Zdw5wSbPBGL99OSQ98UqSUzRpdjPTQrXD4Lme84RFvOS9c0ww&svctype=4&tempid=h5_group_info"],
  ["mail", "邮箱", "mailto:postmaster@cxdx.edu.kg"]
];



/**
 * 内容撰写
 */

//友链
//每个项依次写：图片URL，名称，简介，链接
flinks = [
  ["./assets/people/ningxi-logo.png", "柠汐网络科技", "柠汐网络科技，本站技术支持", "https://www.cxedu.top"],
  ["./assets/people/university-logo.webp", "程星大学", "上官程星旗下程星模拟大学网站", "https://www.cxdx.edu.kg"]
];

//成员
//每个项依次写：背景图片URL，头像，名称，简介，联系方式[QQ号，网站，邮箱]
//无就留空
memb = [
  [
    "https://npm.elemecdn.com/zxmacc-staticr@v1.0.5/images/background/day02.png",
    "./assets/people/chengxing-avatar.png",
    "程星",
    "上官程星群主",
    ["2082176868", "https://www.cxdx.edu.kg", "wanghaotian@cxdx.edu.kg"]
  ],
  [
    "https://npm.elemecdn.com/zxmacc-staticr@v1.0.5/images/background/day02.png",
    "./assets/people/iris-avatar.png",
    "流鸢iris",
    "流鸢，本站技术支持以及柠汐网络科技负责人",
    ["334565041", "https://www.cxedu.top", "entaichen@cxdx.edu.kg"]
  ]
];

//动态
//每个项依次写：图片URL，时间（可留空），信息
zone = [
  ["", "", "日常交流与学习分享，在 QQ 群里继续。"],
  ["", "", "相关作品、成员与联系方式，集中在本站。"]
];

//作品
//最核心部分！！！
//每个项依次写：图片URL，时间（可留空），标题，简介，网址，[类型，价格，版本，状态(正常true异常false)，下载直链]，[内容背景，作品详细介绍，[图片3张]]
//作品详细介绍用\n换行，$s$xxx1$s$表示xxx1加粗，$i$xxx2$i$表示xxx2斜体，$m$xxx3$m$表示xxx3高亮，$d$xxx4$d$表示xxx4加删除线，
//$r$xxx5$r$表示xxx5红色，$b$xxx6$b$表示xxx6蓝色。
cont = [
  [
    "https://npm.elemecdn.com/zxmacc-staticr@v1.0.5/images/background/day02.png",
    "",
    "上官程星官网",
    "交流群官网，纯前端实现。",
    "https://q.cxedu.top",
    ["网站", "0", "1.0", true, "https://q.cxedu.top"],
    [
      "https://npm.elemecdn.com/zxmacc-staticr@v1.0.5/images/background/day02.png",
      "$s$上官程星官网$s$是交流群的展示页面。\n采用$m$纯前端$m$方案，无后台、无数据库。\n群里的作品、成员和联系方式，可以在这里找到。",
      "https://npm.elemecdn.com/zxmacc-staticr@v1.0.5/images/background/day02.png",
      "https://npm.elemecdn.com/zxmacc-staticr@v1.0.5/images/background/day02.png",
      "https://npm.elemecdn.com/zxmacc-staticr@v1.0.5/images/background/day02.png"
    ]
  ],
  [
    "https://npm.elemecdn.com/zxmacc-staticr@v1.0.5/images/background/day02.png",
    "",
    "程星大学",
    "上官程星旗下的模拟大学网站。",
    "https://www.cxdx.edu.kg",
    ["网站", "0", "1.0", true, "https://www.cxdx.edu.kg"],
    [
      "https://npm.elemecdn.com/zxmacc-staticr@v1.0.5/images/background/day02.png",
      "$s$程星大学$s$是上官程星旗下的模拟大学网站。\n用于展示校园信息与交流内容。\n欢迎访问了解。",
      "https://npm.elemecdn.com/zxmacc-staticr@v1.0.5/images/background/day02.png",
      "https://npm.elemecdn.com/zxmacc-staticr@v1.0.5/images/background/day02.png",
      "https://npm.elemecdn.com/zxmacc-staticr@v1.0.5/images/background/day02.png"
    ]
  ],
  [
    "https://npm.elemecdn.com/zxmacc-staticr@v1.0.5/images/background/day02.png",
    "",
    "交流群日常",
    "QQ群日常交流与学习分享。",
    contacts[0][2],
    ["社群", "0", "1.0", true, contacts[0][2]],
    [
      "https://npm.elemecdn.com/zxmacc-staticr@v1.0.5/images/background/day02.png",
      "$s$上官程星交流群$s$是我们的日常交流空间。\n群内进行日常交流、学习分享。\n欢迎志同道合的朋友加入。",
      "https://npm.elemecdn.com/zxmacc-staticr@v1.0.5/images/background/day02.png",
      "https://npm.elemecdn.com/zxmacc-staticr@v1.0.5/images/background/day02.png",
      "https://npm.elemecdn.com/zxmacc-staticr@v1.0.5/images/background/day02.png"
    ]
  ]
];