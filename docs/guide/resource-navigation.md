<script setup>
import Grid from '../.vitepress/components/Grid.vue';
const usefulTools=[
    {
        text:'草料二维码生成器',
        link:'https://cli.im/',
        desc:'草料二维码生成器是一种在线工具，用于生成二维码。您可以使用草料二维码生成器将文本、网址、联系方式等信息转换为二维码图像。这些二维码可以被扫描，以便快速访问相关信息。'
    },
    {
        text:'软件资讯',
        link:'https://en.softonic.com/',
        desc: ' a popular software download platform. Softonic offers a wide range of software applications for various operating systems, including Windows, Mac, Android, and iOS.'
    },
    {
        text:'在线变量取名',
        link:'https://unbug.github.io/codelf/',
        desc: 'A search tool helps dev to solve the naming things problem.该网站现中文搜索失效。'
    },
    {
        text:'免费图床',
        link:'https://sm.ms/',
        desc: 'sm.ms 是一个免费的图像托管服务网站。它允许用户上传图片并生成相应的链接，以便在需要时与他人分享。通过该链接，其他人可以访问和查看您上传的图片。sm.ms 还提供了一些简单的编辑和管理功能，例如删除和更改图片。'
    },
    {
        text:'OneDrive永久外链生成',
        link:'https://onedrive.gimhoy.com/'
    },
    {
        text:'DeepL翻译',
        link:'https://www.deepl.com/translator',
        desc: 'DeepL是一种机器翻译工具，它使用深度学习技术来提供高质量的翻译结果。DeepL的翻译引擎基于神经网络模型，通过大量的训练数据进行训练，以便更准确地理解和翻译文本。'
    },
    {
        text:'数据库设计大全',
        link:'https://open.yesapi.cn/list3.html'
    },
    {
        text:'文件类型转换',
        link:'https://convertio.co/zh/'
    },
    {
        text:'图片压缩',
        link:'https://docsmall.com/'
    },
    {
        text:'文件转换器',
        link:'https://cn.office-converter.com/'
    },
    {
        text:'全部Smallpdf工具',
        link:'https://smallpdf.com/cn/pdf-tools',
        desc: '利用PDF工具集来处理数字文档，并无缝地简化工作流程。'
    },
    {
        text:'ICO转换',
        link:'https://www.fly63.com/php/ico/'
    },
    {
        text:'视频转GIF',
        link:'https://www.fly63.com/tool/giftxt/'
    }
];
const developing=[
    {
        text:'在线ASCII码表',
        link:'https://www.fly63.com/tool/ascii/'
    },
    {
        text:'在线corn表达式生成',
        link:'https://cron.qqe2.com/'
    },
    {
        text:'正则表达式调试工具',
        link:'https://regexr.com/'
    },
    {
        text:'可视化正则表达式',
        link:'https://jex.im/regulex/'
    },
    {
        text:'在线Nginx配置',
        link:'https://www.digitalocean.com/community/tools/nginx'
    },
    {
        text:'base64加解密',
        link:'https://base64.supfree.net/'
    },
    {
        text:'md5编码工具',
        link:'https://www.zxgj.cn/g/md5'
    },
    {
        text:'AES/DES加解密工具',
        link:'https://www.fly63.com/tool/cipher/'
    },
    {
        text:'JWT解码工具',
        link:'http://jwt.calebb.net/'
    },
    {
        text:'在线ASCII编码解码',
        link:'https://www.matools.com/code-convert-ascii'
    },
    {
        text:'unicode编码转换',
        link:'https://www.zxgj.cn/g/unicode'
    },
    {
        text:'UTF-8编码转换',
        link:'https://www.zxgj.cn/g/utf8'
    },
    {
        text:'字符串编码解码',
        link:'https://www.zxgj.cn/g/enstring'
    },
    {
        text:'进制转换',
        link:'https://www.zxgj.cn/g/jinzhi'
    },
    {
        text:'Unix时间戳转换',
        link:'https://www.zxgj.cn/g/unix'
    },
    {
        text:'RGB颜色转换',
        link:'https://www.zxgj.cn/g/yansezhi'
    },
    {
        text:'JSON解析',
        link:'http://www.json.cn/'
    },
    {
        text:'CSS可视化',
        link:'https://enjoycss.com/'
    },
    {
        text:'XML压缩/格式化',
        link:'https://www.zxgj.cn/g/xmlformat'
    },
    {
        text:'SQL压缩/格式化',
        link:'https://www.zxgj.cn/g/sqlformat'
    },
    {
        text:'JSON和XML在线转换',
        link:'https://www.zxgj.cn/g/jsonxml'
    },
    {
        text:'JSON/YAML在线转换',
        link:'https://www.fly63.com/tool/jsonyaml/'
    },
    {
        text:'IP查询',
        link:'https://www.ipip.net/ip.html'
    },
    {
        text:'HTTP在线接口测试',
        link:'https://www.fly63.com/php/http/'
    },
    {
        text:'UUID在线生成器',
        link:'https://www.zxgj.cn/g/uuid'
    },
    {
        text:'随机数生成器',
        link:'https://www.zxgj.cn/g/suijishu'
    },
    {
        text:'在线编译工具',
        link:'https://c.runoob.com/'
    },
    {
        text:'在线文本比对',
        link:'https://www.fly63.com/tool/textdiff/'
    },
    {
        text:'在线文本替换',
        link:'https://www.fly63.com/tool/textreplace/'
    },
    {
        text:'字数统计',
        link:'https://www.eteste.com/'
    },
    {
        text: 'CSV转JSON',
        link: 'https://www.convertcsv.com/csv-to-json.htm'
    }
];
const design=[
    {
        text:'在线流程图设计',
        link:'https://app.diagrams.net/'
    },
    {
        text:'在线思维导图',
        link:'https://www.processon.com/'
    },
    {
        text:'在线PS',
        link:'https://www.uupoop.com/#/'
    },    
    {
        text:'logo设计',
        link:'https://www.uugai.com/'
    },
    {
        text:'头像生成',
        link:'https://pfpmaker.com/'
    },
    {
        text:'海报设计',
        link:'https://www.designcap.com/'
    },
    {
        text:'表情包',
        link:'https://fabiaoqing.com/'
    },
    {
        text:'AI图片放大',
        link:'https://bigjpg.com/'
    },   
    {
        text:'在线抠图',
        link:'https://www.remove.bg/zh'
    },
    {
        text:'pixabay图片素材',
        link:'https://pixabay.com/zh/'
    },
    {
        text:'unsplash图片素材',
        link:'https://unsplash.com/'
    },
    {
        text:'pexels图片素材',
        link:'ttps://www.pexels.com/zh-cn/'
    }
];
const algorithm=[
    {
        text:'visualgo',
        link:'https://visualgo.net/zh'
    },
    {
        text:'algorithm-visualizer',
        link:'https://algorithm-visualizer.org/'
    }
];
const note=[
    {
        text:'印象笔记',
        link:'https://www.yinxiang.com/'
    },
    {
        text:'有道云笔记',
        link:'https://note.youdao.com/'
    },
    {
        text:'OneNote',
        link:'https://www.onenote.com/'
    },
    {
        text:'幕布',
        link:'https://mubu.com/home'
    },
    {
        text:'石墨文档',
        link:'https://shimo.im/'
    },
    {
        text:'为知笔记',
        link:'https://www.wiz.cn/zh-cn'
    },
    {
        text:'语雀',
        link:'https://www.yuque.com/'
    }
];
const interview=[
    {
        text:'牛客网',
        link:'https://www.nowcoder.com/'
    }
];
const icon=[
    {
        text:'阿里巴巴矢量图标库',
        link:'https://www.iconfont.cn/'
    },
    {
        text: 'Iconify',
        link: 'http://icon-sets.iconify.design/devicon/'
    },
    {
        text: 'feathericons',
        link: 'https://feathericons.com/'
    },
];
const answer=[
    {
        "text": "GitHub",
        "link": "https://github.com/",
        "desc": "代码托管平台"
    },
    {
        "text": "掘金",
        "link": "https://juejin.cn/",
        "desc": "技术开发社区"
    },
    {
        "text": "博客园",
        "link": "https://www.cnblogs.com/",
        "desc": "技术交流社区"
    },
    {
        "text": "Stack Overflow",
        "link": "https://stackoverflow.com/",
        "desc": "技术问答社区"
    },
    {
        "text": "SegmentFault",
        "link": "https://segmentfault.com/",
        "desc": "技术问答、专栏、课程、资讯交流平台"
    },
    {
        "text": "DEV",
        "link": "https://dev.to/",
        "desc": "技术开发社区"
    }
];
const book=[
    {
        text:'IT码农',
        link:'https://tanqingbo.cn/CSBook001/'
    }
];
const other=[
    {
        text:'HelloGithub',
        link:'https://hellogithub.com/',
        desc:'HelloGitHub 是一个中文开源项目的社区网站，旨在分享和推广优秀的开源项目。它提供了各种开源项目的介绍、教程、案例分析和技术文章等内容，涵盖了多个领域和编程语言。HelloGitHub 的目标是帮助开发者们发现有价值的开源项目，并提供学习和交流的平台。'
    }
];
const online_tools=[
    {
        "text": "奶牛快传",
        "link": "https://datayi.cn/w/noqyNx4o",
        "desc": "临时云盘，免费秒传大文件"
    },
    {
        "text": "Convertio",
        "link": "https://convertio.co/zh/",
        "desc": "在线转换格器：音频，视频，图像，文档，字体，电子书等"
    },
    {
        "text": "Magic Eraser",
        "link": "https://www.magiceraser.io/",
        "desc": "魔术橡皮擦：去除杂物"
    },
    {
        "text": "佐糖",
        "link": "https://picwish.cn/",
        "desc": "抠图，去水印，压缩裁剪， 修复无损放大等"
    },
    {
        "text": "Cleanup.pictures",
        "link": "https://cleanup.pictures/",
        "desc": "在线笔刷移除图片上的杂物"
    },
    {
        "text": "DeepL 翻译",
        "link": "https://www.deepl.com/zh/translator",
        "desc": "多语种在线翻译，支持文本，文档，客户端"
    },
    {
        "text": "改图鸭",
        "link": "https://www.gaituya.com/",
        "desc": "图片修改，压缩，转换，加水印，拼图等"
    },
    {
        "text": "bigjpg",
        "link": "https://bigjpg.com/",
        "desc": "图片无损放大"
    },
    {
        "text": "WantWords 反向词典",
        "link": "https://wantwords.net/",
        "desc": "查询相关词汇，支持中文和英文，写作神器！"
    },
    {
        "text": "SOOGIF",
        "link": "https://www.soogif.com/",
        "desc": "GIF搜索，编辑，趣图，录屏，视频转GIF"
    },
    {
        "text": "RecordCast",
        "link": "https://www.recordcast.com/apps/screen-recorder/",
        "desc": "一键在线录制屏幕，剪辑"
    },
    {
        "text": "Smallpdf",
        "link": "https://smallpdf.com/cn",
        "desc": "PDF工具：编辑，转换，压缩"
    },
    {
        "text": "Parsevideo",
        "link": "https://www.parsevideo.com/",
        "desc": "免费在线视频解析下载网站"
    },
    {
        "text": "唧唧",
        "link": "http://www.jijidown.com/",
        "desc": "下载B视频，MP3和弹幕文件"
    },
    {
        "text": "TinyPNG",
        "link": "https://tinify.cn/",
        "desc": "图片压缩：WebP， JPEG， PNG"
    },
    {
        "text": "Photopea",
        "link": "https://www.photopea.com/",
        "desc": "在线PS，图片编辑"
    },
    {
        "text": "PhotoKit",
        "link": "https://photokit.com/?lang=zh",
        "desc": "在线图片编辑: 抠图、改图、修图、美图"
    },
    {
        "text": "BrowserFrame",
        "link": "https://browserframe.com/",
        "desc": "一键截图，网站外观模型"
    },
    {
        "text": "PearOCR文字识别",
        "link": "https://pearocr.com/",
        "desc": "图片转文字， 识别"
    },
    {
        "text": "缩链短网址",
        "link": "http://suolink.cn/",
        "desc": "网址缩短在线生成工具"
    },
    {
        "text": "蜜蜂剪辑",
        "link": "https://beecut.cn/online-video-editor",
        "desc": "视频制作、剪辑、剪切、转gif 等功能"
    },
    {
        "text": "即时工具",
        "link": "https://www.67tool.com/",
        "desc": "免费，好用，综合在线工具"
    },
    {
        "text": "有啦拼字幕",
        "link": "https://www.yoo.la/body",
        "desc": "电影字幕拼接，长图拼接工具"
    }
];
const software=[
    {
        "text": "盒子部落",
        "link": "https://www.hezibuluo.com/",
        "desc": "推荐优秀软件，APP应用和互联网资源"
    },
    {
        "text": "大眼仔旭",
        "link": "http://www.dayanzai.me/",
        "desc": "分享日常工作生活办公软件"
    },
    {
        "text": "异次元软件世界",
        "link": "https://www.iplaysoft.com/",
        "desc": "推荐优秀软件、APP应用和互联网资源"
    },
    {
        "text": "LX Music",
        "link": "https://lxmusic.toside.cn/",
        "desc": "免费&开源的音乐查找工具"
    },
    {
        "text": "懒得勤快的博客",
        "link": "https://masuit.com/",
        "desc": "软件，资源分享"
    },
    {
        "text": "MacWk",
        "link": "https://macwk.com/",
        "desc": "精品mac软件下载"
    },
    {
        "text": "Tampermonkey",
        "link": "https://www.tampermonkey.net/",
        "desc": "油猴脚本扩展，浏览器插件"
    },
    {
        "text": "Edge 插件",
        "link": "https://microsoftedge.microsoft.com/addons/Microsoft-Edge-Extensions-Home?hl=zh-CN",
        "desc": "Edge / Chrome 浏览器插件"
    },
    {
        "text": "windows 软件精选",
        "link": "https://ailongmiao.com/tag/windows-software-selection/",
        "desc": "推荐一些实用好用的软件"
    },
    {
        "text": "果核剥壳",
        "link": "https://www.ghxi.com/",
        "desc": "分享绿色，破解，安卓软件"
    },
    {
        "text": "亿破姐",
        "link": "https://www.ypojie.com/",
        "desc": "绿色软件下载博客"
    },
    {
        "text": "Ditto",
        "link": "https://ditto-cp.sourceforge.io/",
        "desc": "开源免费 Windows 剪贴板软件"
    },
    {
        "text": "阿虚同学的储物间",
        "link": "https://axutongxue.com/",
        "desc": "分享软件，网页等资源"
    },
    {
        "text": "th_sjy 专注软件汉化",
        "link": "http://www.th-sjy.com/",
        "desc": "修改，汉化，绿色软件分享下载"
    },
    {
        "text": "Awesome Mac",
        "link": "https://wangchujiang.com/awesome-mac/index.zh.html",
        "desc": "优秀好用的Mac应用"
    }
];
const app=[
    {
        "text": "OurPlay",
        "link": "https://www.ourplay.net/",
        "desc": "国内外安卓游戏APP"
    },
    {
        "text": "轻启动-[404]",
        "link": "https://wpengapp.com/lightstart",
        "desc": "跳过APP开屏广告"
    },
    {
        "text": "Tachiyomi",
        "link": "https://tachiyomi.org/",
        "desc": "开源免费漫画阅读安卓APP"
    },
    {
        "text": "音乐标签",
        "link": "https://www.cnblogs.com/vinlxc/p/11932130.html",
        "desc": "安卓修改音乐标题，专辑，歌词，封面等"
    },
    {
        "text": "椒盐音乐",
        "link": "https://moriafly.xyz/HiMoriafly/docs/salt-player/",
        "desc": "安卓本地音乐播放器"
    },
    {
        "text": "当贝市场",
        "link": "http://www.dangbei.com/",
        "desc": "电视和投影APP：应用商店"
    },
    {
        "text": "X浏览器",
        "link": "https://www.xbext.com/",
        "desc": "极简，支持脚本插件"
    },
    {
        "text": "豌豆荚",
        "link": "https://www.wandoujia.com/category/app",
        "desc": "综合APP市场软件：应用、游戏 "
    },
    {
        "text": "沙发管家",
        "link": "http://app.shafa.com/",
        "desc": "电视应用APP市场"
    }
];
const resource_search=[
    {
        "text": "阿里小站",
        "link": "https://pan666.net/",
        "desc": "阿里云盘资源共享站"
    },
    {
        "text": "梗图生成器",
        "link": "https://x.magiconch.com/",
        "desc": "在线生成自定义的梗图表情图"
    },
    {
        "text": "EmojiXD",
        "link": "https://emojixd.com/",
        "desc": "🤣 Emoji表情大全"
    },
    {
        "text": "telegram 中文搜索",
        "link": "http://www.sssoou.com/",
        "desc": "支持网盘、教程等资源"
    },
    {
        "text": "owllook",
        "link": "https://owlook.com.cn/",
        "desc": "小说搜索引擎"
    },
    {
        "text": "Jiumo Search 鸠摩搜索",
        "link": "https://www.jiumodiary.com/",
        "desc": "文档，电子书搜索引擎"
    },
    {
        "text": "大力盘",
        "link": "https://www.dalipan.com/",
        "desc": "网盘资源搜索引擎"
    },
    {
        "text": "百度图片",
        "link": "https://image.baidu.com/",
        "desc": "百度：图片搜索，识图"
    },
    {
        "text": "谷歌图片搜索",
        "link": "https://www.google.com/imghp",
        "desc": "谷歌：图片搜索，以图搜图，识图"
    },
    {
        "text": "阿里盘搜",
        "link": "https://upyunso3.com/",
        "desc": "云盘资源搜索平台"
    }
];
const system=[
    {
        "text": "HelloWindows",
        "link": "https://hellowindows.cn/",
        "desc": "精校 完整 极致 Windows系统下载仓储站"
    },
    {
        "text": "DirectX修复工具",
        "link": "https://blog.csdn.net/vbcom/article/details/6962388/",
        "desc": "免费绿色软件"
    },
    {
        "text": "专注于Win10",
        "link": "https://iwin10.net/",
        "desc": "Windows10，纯净优化"
    },
    {
        "text": "Dism++",
        "link": "https://github.com/Chuyu-Team/Dism-Multi-language",
        "desc": "WIN系统清理，优化，更新"
    },
    {
        "text": "图吧工具箱",
        "link": "http://www.tbtool.cn/",
        "desc": "纯净的硬件工具箱"
    },
    {
        "text": "电手IT",
        "link": "https://www.dianshouit.com/",
        "desc": "系统，硬件，软件，科技新闻"
    },
    {
        "text": "云萌激活工具",
        "link": "https://cmwtat.cloudmoe.com/cn.html",
        "desc": "win10激活工具"
    },
    {
        "text": "TechBench by WZT",
        "link": "https://tb.rg-adguard.net/public.php",
        "desc": "Windows 和 Office 等产品全版本镜像下载"
    },
    {
        "text": "MSDN",
        "link": " 我告诉你",
        "desc": "https://msdn.itellyou.cn/，操作系统镜像文件下载网站"
    },
    {
        "text": "傲梅分区助手",
        "link": "https://www.disktool.cn/",
        "desc": "磁盘分区，备份"
    },
    {
        "text": "致美化",
        "link": "https://zhutix.com/",
        "desc": "漫锋网：桌面美化交流平台"
    },
    {
        "text": "微PE工具箱",
        "link": "http://www.wepe.com.cn/download.html",
        "desc": "PE工具箱 和 win ISO镜像"
    },
    {
        "text": "Rufus",
        "link": "http://rufus.ie/zh/",
        "desc": "免费开源 U盘安装系统工具"
    },
    {
        "text": "专注于Win7",
        "link": "https://www.newxitong.com/",
        "desc": "win7系统，优化美化"
    },
    {
        "text": "微软官方系统",
        "link": "https://www.microsoft.com/zh-cn/software-download",
        "desc": "windows 11，10，8.1，7 下载"
    }
];
const manual=[
    {
        "text": "HTML Reference",
        "link": "https://htmlreference.io/",
        "desc": "HTML元素和属性免费指南"
    },
    {
        "text": "符号库",
        "link": "https://www.fuhaoku.net/",
        "desc": "特殊符号大全"
    },
    {
        "text": "HEAD",
        "link": "https://htmlhead.dev/",
        "desc": "HTML head 元素的指南"
    },
    {
        "text": "Code Guide-AlloyTeam",
        "link": "https://alloyteam.github.io/CodeGuide/",
        "desc": "@AlloyTeam: 编码规范 "
    },
    {
        "text": "Chrome DevTools",
        "link": "https://developer.chrome.com/docs/devtools/",
        "desc": "Chrome 开发者工具 官方文档"
    },
    {
        "text": "OverAPI",
        "link": "https://overapi.com/",
        "desc": "最全的开发人员在线速查手册 "
    },
    {
        "text": "jQuery API 中文文档",
        "link": "https://www.jquery123.com/",
        "desc": "jQuery 中文网"
    }
];
const frontend_tools=[
    {
        "text": "Table Convert Online",
        "link": "https://tableconvert.com/",
        "desc": "在线表格转换工具，支持多种格式相互转化"
    },
    {
        "text": "GTmetrix",
        "link": "https://gtmetrix.com/",
        "desc": "网站性能测试分析、优化建议"
    },
    {
        "text": "Carbon",
        "link": "https://carbon.now.sh/",
        "desc": "源码转图片，美化代码"
    },
    {
        "text": "CSS Gradient",
        "link": "https://cssgradient.io/",
        "desc": "CSS渐变代码在线生成"
    },
    {
        "text": "regex101",
        "link": "https://regex101.com/",
        "desc": "支持多种语言，在线测试，解释，参考"
    },
    {
        "text": "Autoprefixer CSS online",
        "link": "https://autoprefixer.github.io/",
        "desc": "自动补全css兼容性代码"
    },
    {
        "text": "CSS Flexbox Generator",
        "link": "https://www.cssportal.com/css-flexbox-generator/",
        "desc": "CSS Flexbox 代码生成器等其他工具"
    },
    {
        "text": "WAIT! Animate",
        "link": "https://waitanimate.wstone.io/",
        "desc": "动画绝对值计算器"
    },
    {
        "text": "CSSmatic",
        "link": "https://www.cssmatic.com/",
        "desc": "渐变，圆角边框，阴影，噪点背景代码生成器"
    },
    {
        "text": "Font2Web",
        "link": "http://www.font2web.com/",
        "desc": "在线字体转换器，"
    },
    {
        "text": "Sprite Cow",
        "link": "http://www.spritecow.com/",
        "desc": "雪碧图在线生成CSS"
    },
    {
        "text": "有字库",
        "link": "https://www.webfont.com/",
        "desc": "中文web font（在线字体）服务平台"
    },
    {
        "text": "Can I use",
        "link": "https://caniuse.com/",
        "desc": "查询浏览器特性和兼容性"
    },
    {
        "text": "CodePen",
        "link": "https://codepen.io/",
        "desc": "在线测试和调试代码，寻找炫酷样式灵感的网站"
    },
    {
        "text": "CSS Generator Tool",
        "link": "https://cssgenerator.org/",
        "desc": "CSS 在线代码生成工具"
    },
    {
        "text": "SO JSON在线工具",
        "link": "https://www.sojson.com/",
        "desc": "在线综合工具"
    },
    {
        "text": "JSFiddle",
        "link": "https://jsfiddle.net/",
        "desc": "编辑和测试 HTML， CSS， JavaScript代码"
    },
    {
        "text": "CODELF",
        "link": "https://unbug.github.io/codelf/",
        "desc": "变量命名工具"
    }
];
const technical_tutorial=[
    {
        "text": "CSS 教程",
        "link": "https://ailongmiao.com/lm-learn-css/",
        "desc": "CSS 精进专题"
    },
    {
        "text": "JavaScript 教程",
        "link": "https://ailongmiao.com/lm-learn-javascript/",
        "desc": "JavaScript 精进专题"
    },
    {
        "text": "正则教程教程",
        "link": "https://ailongmiao.com/lm-learn-regex/",
        "desc": "Github: 正则教程学习专题"
    },
    {
        "text": "Frontend Focus",
        "link": "https://frontendfoc.us/",
        "desc": "订阅周刊：前端文章，教程"
    },
    {
        "text": "wweb.dev",
        "link": "https://wweb.dev/weekly/",
        "desc": "web开发与设计周刊"
    },
    {
        "text": "W3cplus",
        "link": "https://www.w3cplus.com/",
        "desc": "前端技术博客"
    },
    {
        "text": "GRID GARDEN",
        "link": "https://cssgridgarden.com/#zh-cn",
        "desc": "通过游戏掌握CSS GRID网格布局"
    },
    {
        "text": "FLEXBOX FROGGY",
        "link": "https://flexboxfroggy.com/#zh-cn",
        "desc": "学习CSS flexbox"
    },
    {
        "text": "CSS Weekly",
        "link": "https://css-weekly.com/",
        "desc": "订阅每周CSS文章，教程，工具"
    },
    {
        "text": "JavaScript Weekly",
        "link": "https://javascriptweekly.com/",
        "desc": "订阅：JS 文章、新闻和酷项目的时事通讯"
    }
];
const plugin_library=[
    {
        "text": "jQuery插件库",
        "link": "https://www.jq22.com/",
        "desc": "JQ，JS效果插件，UI，模板"
    },
    {
        "text": "BootCDN",
        "link": "https://www.bootcdn.cn/",
        "desc": "前端开源项目 CDN 加速"
    }
];
const design_tutorial=[
    {
        "text": "ZCOOL 站酷",
        "link": "https://www.zcool.com.cn/top/index.do",
        "desc": "设计师互动学习平台"
    },
    {
        "text": "The Bézier Game",
        "link": "https://bezier.method.ac/",
        "desc": "在线PS钢笔工具练习"
    },
    {
        "text": "优优教程",
        "link": "https://uiiiuiii.com/all",
        "desc": "免费自学教程平台"
    },
    {
        "text": "Photoshop Lady",
        "link": "https://www.photoshoplady.com/",
        "desc": "PS设计教程"
    },
    {
        "text": "PhotoshopVIP",
        "link": "https://photoshopvip.net/",
        "desc": "日本：免费素材，photoshop教程，设计资讯"
    },
    {
        "text": "学UI网",
        "link": "https://www.xueui.cn/",
        "desc": "UI设计师学习教程平台"
    },
    {
        "text": "ps教程自学网",
        "link": "https://www.16xx8.com/",
        "desc": "国内photoshop教程网站"
    },
    {
        "text": "PSD Vault",
        "link": "https://www.psdvault.com/",
        "desc": "高质量PS教程博客网站"
    },
    {
        "text": "优设网",
        "link": "https://www.uisdc.com/zt?order=hot",
        "desc": "优质设计文章，教程；设计师学习平台"
    },
    {
        "text": "设计达人",
        "link": "https://www.shejidaren.com/",
        "desc": "分享技术教程和创意灵感"
    }
];
const interface_inspiration=[
    {
        "text": "UpLabs",
        "link": "https://www.uplabs.com/",
        "desc": "UI 套件、图标、模板、主题"
    },
    {
        "text": "Dribbble",
        "link": "https://dribbble.com/",
        "desc": "设计交流网站，设计灵感"
    },
    {
        "text": "Landingfolio",
        "link": "https://www.landingfolio.com/",
        "desc": "着陆页面设计灵感、模板、资源，教程"
    },
    {
        "text": "CSS Winner",
        "link": "https://www.csswinner.com/",
        "desc": "网页设计奖，网站设计灵感"
    },
    {
        "text": "Logopond",
        "link": "https://logopond.com/",
        "desc": "logo 设计作品欣赏"
    },
    {
        "text": "TOPYS",
        "link": "https://www.topys.cn/",
        "desc": "创意内容学习平台"
    },
    {
        "text": "CSS Awards",
        "link": "https://www.cssdesignawards.com/",
        "desc": "优秀CSS网页设计奖，网页设计灵感"
    },
    {
        "text": "One Page Love",
        "link": "https://onepagelove.com/",
        "desc": "网站单页模版设计灵感"
    },
    {
        "text": "Behance",
        "link": "https://www.behance.net/",
        "desc": "Adobe旗下: 设计作品展示，直播视频"
    },
    {
        "text": "LOGO神器",
        "link": "https://www.logosc.cn/",
        "desc": "Logo在线生成工具， 素材， 模板"
    },
];
const font=[
    {
        "text": "100font",
        "link": "https://www.100font.com/",
        "desc": "免费可商用字体"
    },
    {
        "text": "自由字体",
        "link": "https://ziyouziti.com/",
        "desc": "免费商用，付费字体，商用检测"
    },
    {
        "text": "字体下载 | UiiiUiii",
        "link": "https://uiiiuiii.com/tool/typeface",
        "desc": "免费商用字体下载"
    },
    {
        "text": "Wordmark",
        "link": "https://wordmark.it/",
        "desc": "字体在线工具：预览本地电脑里的字体"
    },
    {
        "text": "WhatTheFont",
        "link": "https://www.myfonts.com/WhatTheFont/",
        "desc": "字体在线工具：识别英文字体"
    },
    {
        "text": "字体案例&设计|站酷",
        "link": "https://www.zcool.com.cn/search/content?&word=%E5%AD%97%E4%BD%93%E8%AE%BE%E8%AE%A1",
        "desc": "站酷搜索：字体案例、设计教程"
    },
    {
        "text": "字体松鼠",
        "link": "https://www.fontsquirrel.com/",
        "desc": "英文字体，免费字体可用于商业"
    },
    {
        "text": "字体天下",
        "link": "https://www.fonts.net.cn/",
        "desc": "中，英文字体下载，字体教程"
    },
];
const color_scheme=[
    {
        "text": "Adobe 配色器",
        "link": "https://color.adobe.com/zh/create/color-wheel/",
        "desc": "在线色轮调色，主题色拾取，渐变色工具等"
    },
    {
        "text": "Coolors",
        "link": "https://coolors.co/",
        "desc": "配色方案生成器"
    },
    {
        "text": "Color Hunt",
        "link": "https://www.colorhunt.co/",
        "desc": "数以千计的色卡灵感"
    },
    {
        "text": "Gradientify",
        "link": "https://gradientify.com/",
        "desc": "渐变配色参考"
    },
    {
        "text": "pppalette",
        "link": "https://fffuel.co/pppalette/",
        "desc": "配色工具，SVG生成器、工具及设计资源"
    },
    {
        "text": "Happy Hues",
        "link": "https://www.happyhues.co/",
        "desc": "调色灵感，颜色术语/ 色彩心理学"
    },
    {
        "text": "ColorMix Generator",
        "link": "http://colormix.mdbgo.io/",
        "desc": "在线配色神器"
    },
    {
        "text": "ColorSpace",
        "link": "https://mycolor.space/",
        "desc": "渐变配色生成器，自动CSS代码"
    },
    {
        "text": "Dopely Colors",
        "link": "https://colors.dopely.top/",
        "desc": "在线调色，颜色转换器，拾色"
    },
    {
        "text": "Material UI",
        "link": "https://materialui.co/",
        "desc": "配色参考，emoji表情，图标，特殊符号"
    },
    {
        "text": "uiGradients",
        "link": "https://uigradients.com/",
        "desc": "上百种渐变配色方案参考"
    },
    {
        "text": "优设配色导航",
        "link": "https://color.uisdc.com/",
        "desc": "中国，日本传统色，渐变色等配色参考"
    },
];
const design_tools=[
    {
        "text": "Billfish素材管理工具",
        "link": "http://www.billfish.cn/#lm",
        "desc": "素材管理工具软件"
    },
    {
        "text": "ps拉框助手",
        "link": "https://pslkzs.com/",
        "desc": "PS 插件，网页类工具，设计相关教学，资源"
    },
    {
        "text": "Photopea",
        "link": "https://www.photopea.com/",
        "desc": "在线PS，图片编辑"
    },
    {
        "text": "BrowserFrame",
        "link": "https://browserframe.com/",
        "desc": "一键截图，网站外观模型"
    },
    {
        "text": "蓝湖",
        "link": "https://lanhuapp.com/",
        "desc": "产品文档和设计协作"
    },
    {
        "text": "Polarr",
        "link": "https://photoeditor.polarr.com/",
        "desc": "专业在线照片编辑后期，泼辣修图网页版"
    },
    {
        "text": "Fotor懒设计",
        "link": "https://www.fotor.com.cn/",
        "desc": "在线图片编辑和海报，banner等设计工具，模板"
    },
    {
        "text": "FancyNode",
        "link": "https://fancynode.com.cn/",
        "desc": "切图标注，文理合并分割"
    },
    {
        "text": "摹客",
        "link": "https://www.mockplus.cn/",
        "desc": "集设计协作平台、原型设计和设计规范"
    },
    {
        "text": "稿定设计",
        "link": "https://www.gaoding.com/utms/8eae507e9a86f56be84d84a89cb5066a",
        "desc": "在线作图: PS， 图片编辑，拼图，抠图，H5等"
    },
];
const specifications=[
    {
        "text": "Apple 设计规范指南",
        "link": "https://developer.apple.com/design/",
        "desc": "苹果官方设计规范指南"
    },
    {
        "text": "平面设计尺寸大全",
        "link": "https://www.shejidaren.com/examples/tools/chichun/flat-design-spec.html",
        "desc": "设计师实用设计尺寸手册"
    },
    {
        "text": "屏幕尺寸大全",
        "link": "https://uiiiuiii.com/screen/",
        "desc": "屏幕尺寸大全，设计尺寸规范"
    },
];
const design_material=[
    {
        "text": "阿里图标",
        "link": "https://www.iconfont.cn/",
        "desc": "图标，插画，在线项目管理"
    },
    {
        "text": "包图网",
        "link": "https://ibaotu.com/tupian/pptmoban/6-0-0-0-0-2-c0-1.html?format_type=0&mrltype=0&spm=lmdh",
        "desc": "正版付费，各种设计素材"
    },
    {
        "text": "淘声网",
        "link": "https://www.tosound.com/",
        "desc": "音效素材资源，免费个人/商业使用许可授权"
    },
    {
        "text": "Pixabay",
        "link": "https://pixabay.com/",
        "desc": "免费高清图片素材库"
    },
    {
        "text": "千图网",
        "link": "https://www.58pic.com/",
        "desc": "正版付费，每天免费下载一次"
    },
    {
        "text": "365PSD",
        "link": "https://cn.365psd.com/",
        "desc": "免费的 PSD、图形和矢量文件"
    },
    {
        "text": "Video.LibreStock",
        "link": "https://video.librestock.com/",
        "desc": "免费高清视频素材， 视频搜索引擎"
    },
    {
        "text": "Pexels",
        "link": "https://www.pexels.com/zh-cn/",
        "desc": "免费，无版权图片，视频素材"
    },
    {
        "text": "humaaans",
        "link": "https://www.humaaans.com/",
        "desc": "人物与场景自主切换的插图设计库"
    },
    {
        "text": "Unsplash",
        "link": "https://unsplash.com/",
        "desc": "免费免版权图片素材"
    },
    {
        "text": "Artstation",
        "link": "https://www.artstation.com/",
        "desc": "A站，国外优质插画作品网站"
    },
    {
        "text": "插画交流网站[pixiv]",
        "link": "https://www.pixiv.net/",
        "desc": "插画交流网站"
    }
];
const picture=[
    {
        "text": "WallHaven",
        "link": "https://wallhaven.cc/",
        "desc": "高清壁纸搜索引擎"
    },
    {
        "text": "豆瓣摄影大赛",
        "link": "https://www.douban.com/people/95805238/photos",
        "desc": "摄影大赛话题合集"
    },
    {
        "text": "视觉500px摄影社区",
        "link": "https://500px.com.cn/community/discover?t=rating",
        "desc": "摄影师作品分享交流平台"
    },
    {
        "text": "泼辣百科",
        "link": "https://www.polaxiong.com/wiki",
        "desc": "摄影后期：教程，视频，术语，滤镜"
    },
    {
        "text": "色影无忌",
        "link": "https://ww.xitek.com/",
        "desc": "摄影作品，技巧，论坛，器材，交易"
    },
    {
        "text": "菲林中文",
        "link": "https://www.coofilm.com/",
        "desc": "胶片摄影作品分享和胶片摄影器材"
    },
    {
        "text": "喵呜不停",
        "link": "https://www.douban.com/people/staymiao/statuses",
        "desc": "豆瓣广播：街猫写真摄影"
    },
    {
        "text": "胶片的味道",
        "link": "http://letsfilm.org/",
        "desc": "胶片摄影作品分享"
    },
    {
        "text": "蜂鸟网",
        "link": "http://www.fengniao.com/",
        "desc": "摄影门户，技巧，分享作品"
    },
    {
        "text": "天空之城",
        "link": "https://www.skypixel.com/",
        "desc": "航拍爱好者摄影社区"
    },
    {
        "text": "中国国家地理网",
        "link": "http://www.dili360.com/",
        "desc": "景观图片社区"
    }
];
const ppt =[
        {
            "text": "PPT超级市场",
            "link": "https://pptsupermarket.com/",
            "desc": "免费下载， 定制PPT模板"
        },
        {
            "text": "PA口袋动画官网",
            "link": "http://www.papocket.com/",
            "desc": "PPT动画编辑工具，一键美化"
        },
        {
            "text": "OneKeyTools",
            "link": "http://oktools.xyz/",
            "desc": "PPT插件免费下载、教程、交流"
        },
        {
            "text": "PPT宝藏",
            "link": "http://www.pptbz.com/",
            "desc": "免费：PPT模板素材下载"
        },
        {
            "text": "Microsoft Office 模板",
            "link": "https://templates.office.com/",
            "desc": "微软官方 Office 免费模板"
        },
        {
            "text": "变色龙PPT",
            "link": "https://www.ppt20.com/",
            "desc": "付费: PPT模板交易平台"
        },
        {
            "text": "51PPT模板网",
            "link": "http://www.51pptmoban.com/",
            "desc": "免费: PPT模板素材下载"
        },
        {
            "text": "优品PPT",
            "link": "https://www.ypppt.com/",
            "desc": "PPT模板下载网站"
        },
        {
            "text": "比格ppt",
            "link": "http://www.tretars.com/",
            "desc": "免费: PPT模板素材下载"
        }
];
const optimize=[
    {
        "text": "爱站网",
        "link": "https://www.aizhan.com/",
        "desc": "网站权重，关键词等查询"
    },
    {
        "text": "百度搜索资源平台",
        "link": "https://ziyuan.baidu.com/",
        "desc": "优化工具、数据、课程、Q&A等服务"
    },
    {
        "text": "SEO每天一贴",
        "link": "https://www.seozac.com/",
        "desc": "分享网站优化排名技术、搜索引擎算法原理"
    },
    {
        "text": "搜外问答",
        "link": "https://ask.seowhy.com/",
        "desc": "SEO、SEM、小程序、搜索悬赏问答社区"
    },
    {
        "text": "Google Analytics（分析）",
        "link": "https://marketingplatform.google.com/intl/zh-CN_cn/about/analytics/",
        "desc": "中英网站流量统计分析"
    },
];
const hot_data=[
    {
        "text": "巨量算数",
        "link": "https://trendinsight.oceanengine.com/arithmetic-index",
        "desc": "抖音，头条关键词，事件指数分析"
    },
    {
        "text": "快科技天梯榜",
        "link": "https://rank.kkj.cn/",
        "desc": "科技产品性能榜单数据"
    },
    {
        "text": "Google 趋势",
        "link": "https://trends.google.com/trends/",
        "desc": "谷歌近期热搜字词，年度热搜榜"
    },
    {
        "text": "飞瓜数据",
        "link": "https://www.feigua.cn/",
        "desc": "抖音，快手，B站排行榜，短视频，电商直播数据分析"
    },
    {
        "text": "次幂数据",
        "link": "https://www.cimidata.com/rank",
        "desc": "微信公众号数据分析平台"
    },
    {
        "text": "今日热榜",
        "link": "https://tophub.today/",
        "desc": "今日热榜，聚合榜单资讯"
    },
    {
        "text": "ZOL数码产品风云榜",
        "link": "https://top.zol.com.cn/",
        "desc": "ZOL热门IT产品排行榜"
    },
    {
        "text": "百度统计流量研究院",
        "link": "https://tongji.baidu.com/research/site",
        "desc": "百度数据洞察，网站，APP流量分析"
    },
    {
        "text": "七麦数据",
        "link": "https://www.qimai.cn/",
        "desc": "iOS&Android移动应用数据分析平台"
    },
    {
        "text": "微博热搜榜",
        "link": "https://s.weibo.com/top/summary?cate=realtimehot",
        "desc": "微博：热搜，要闻，好友搜索榜"
    },
    {
        "text": "百度指数",
        "link": "https://index.baidu.com/v2/index.html#/",
        "desc": "搜索趋势分析，需要登录"
    },
    {
        "text": "微热点",
        "link": "https://www.wrd.cn/login.shtml",
        "desc": "全网热点事件监控"
    }
];
const domain=[
    {
        "text": "阿里云",
        "link": "https://www.aliyun.com/activity/daily/bestoffer?userCode=v4ollzej",
        "desc": "云服务器，数据库，域名注册备案"
    },
    {
        "text": "又拍云",
        "link": "https://console.upyun.com/register/?invite=r1t18Sgz4",
        "desc": "国内CDN，云储存，短视频，直播开发加速"
    },
    {
        "text": "Cloudflare",
        "link": "https://www.cloudflare.com/zh-cn/",
        "desc": "全球免费CDN加速，DDoS 保护"
    },
    {
        "text": "七牛云",
        "link": "https://portal.qiniu.com/signup?code=3lnzd47r3ngia",
        "desc": "CDN，云存储，主机服务器，数据库"
    },
    {
        "text": "腾讯云",
        "link": "https://curl.qcloud.com/R0jNw9QD",
        "desc": "云服务器，主机，数据库，存储、视频与CDN，域名注册等"
    },
    {
        "text": "易名",
        "link": "https://www.ename.com/",
        "desc": "域名交易，拍卖，抢注"
    },
    {
        "text": "Bluehost中文站",
        "link": "https://cn.bluehost.com/?a_aid=5e56814343c57",
        "desc": "国外：云主机，服务器，wordpress推荐"
    },
    {
        "text": "DigitalOcean",
        "link": "https://www.digitalocean.com/?refcode=2d44e6a2eb51&utm_campaign=Referral_Invite&utm_medium=Referral_Program&utm_source=CopyPaste",
        "desc": "国外：云主机服务器"
    },
    {
        "text": "Gandi",
        "link": "https://www.gandi.net/zh-Hans",
        "desc": "国外：多语种域名注册，云主机"
    },
    {
        "text": "VULTR",
        "link": "https://www.vultr.com/",
        "desc": "国外：SSD VPS服务器，云服务器"
    }
];
const security=[
    {
        "text": "VirSCAN",
        "link": "https://www.virscan.org/language/zh-cn/",
        "desc": "多引擎在线病毒扫描网"
    },
    {
        "text": "宝塔",
        "link": "https://www.bt.cn/?invite_code=MV9vc3BzbWg=",
        "desc": "Linux/Windows服务器运维管理面板"
    },
    {
        "text": "安全狗",
        "link": "https://www.safedog.cn/",
        "desc": "云安全产品、服务和解决方案"
    },
    {
        "text": "小皮面板(phpstudy)",
        "link": "https://www.xp.cn/",
        "desc": "Windows与Linux系统操作面板"
    }
];
const ai=[
    {
        text:'forefront',
        desc:'有四种AI模型可使用，GPT3.5和Claude免费使用。',
        link:'https://www.forefront.ai/'
    },
    {
        text: 'Character AI',
        desc: '跟经过AI训练的模型对话。',
        link: 'https://beta.character.ai/'
    },
    {
        text: 'Flow GPT',
        desc: 'GPT提示词分享网站,内置3种模型，GPT3.5免费使用。',
        link: 'https://flowgpt.com/'
    },
    {
        text: 'Claude',
        desc: '可上传文档分析，支持100k上下文，免费',
        link: 'https://claude.ai/'
    },
    {
        text: '灵犀百通',
        desc: '国内团队开发的GPT镜像网站,GPT3.5免费使用，GPT4限制使用，集成AI绘图',
        link: 'https://www.1888ai.com/'
    },
    {
        text: '新必应',
        desc: '内置GPT4，联网',
        link: 'https://www.bing.com/new'
    }
]


</script>

# :railway_track: 资源导航

## :frowning_man: AI助手

<grid :nav-data="ai"/>

## :stadium: 实用工具

<grid :nav-data="usefulTools"/>

## :bricks: 开发必备

<grid :nav-data="developing"/>

## :european_post_office: 创作必备

<grid :nav-data="design"/>

## :train: 算法可视化

<grid :nav-data="algorithm"/>

## :tractor: 在线笔记

<grid :nav-data="note"/>

## :dumpling: 面试

<grid :nav-data="interview"/>

## :takeout_box: 图标

<grid :nav-data="icon"/>

## :icecream: 问答

<grid :nav-data="answer"/>

## :doughnut: 电子书

<grid :nav-data="book"/>

## :trophy: 软件资源

### 在线工具

<grid :nav-data="online_tools"/>

### 发现软件

<grid :nav-data="software"/>

### 发现APP

<grid :nav-data="app"/>

### 资源搜索

<grid :nav-data="resource_search"/>

### 系统相关

<grid :nav-data="system"/>

## :books: 前端开发

### 前端手册

<grid :nav-data="manual"/>

### 前端工具

<grid :nav-data="frontend_tools"/>

### 技术教程

<grid :nav-data="technical_tutorial"/>

### 公共插件库

<grid :nav-data="plugin_library"/>

## :fountain_pen: 设计导航

### 设计教程

<grid :nav-data="design_tutorial"/>

### 界面灵感

<grid :nav-data="interface_inspiration"/>

### 字体相关

<grid :nav-data="font"/>

### 配色方案

<grid :nav-data="color_scheme"/>

### 设计神器

<grid :nav-data="design_tools"/>

### 尺寸规范

<grid :nav-data="specifications"/>

### 设计素材

<grid :nav-data="design_material"/>

### 摄影美图

<grid :nav-data="picture"/>

### PPT相关

<grid :nav-data="ppt"/>

## :spiral_calendar: SEO网站运营

### SEO优化

<grid :nav-data="optimize"/>

### 热点数据

<grid :nav-data="hot_data"/>

### 域名主机

<grid :nav-data="domain"/>

### 网络安全

<grid :nav-data="security"/>

## :cookie: 其他

<grid :nav-data="other"/>
