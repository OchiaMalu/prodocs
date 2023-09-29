export default {
    base: "/",
    title: "ProDocs",
    description: "一站式编程学习网站",
    lastUpdated: true,
    cleanUrls: true,
    outDir: '../dist',
    head: [
        [
            'link', {rel: 'icon', href: '/favicon.ico'}
        ]
    ],
    themeConfig: {
        logo: {light: '/favicon.ico', dark: '/favicon_dark.ico'},
        outline: 'deep',
        outlineTitle: '导航栏',
        returnToTopLabel: '回到顶部',
        nav: [
            {text: '首页', link: '/'},
            {text: '开始阅读', link: '/guide'},
            {
                text: '🧱开发必备',
                items: [
                    {
                        text: '在线ASCII码表',
                        link: 'https://www.fly63.com/tool/ascii/'
                    },
                    {
                        text: '在线corn表达式生成',
                        link: 'https://cron.qqe2.com/'
                    },
                    {
                        text: '正则表达式调试工具',
                        link: 'https://regexr.com/'
                    },
                    {
                        text: '可视化正则表达式',
                        link: 'https://jex.im/regulex/'
                    },
                    {
                        text: '在线Nginx配置',
                        link: 'https://www.digitalocean.com/community/tools/nginx'
                    },
                    {
                        text: 'base64加解密',
                        link: 'https://base64.supfree.net/'
                    },
                    {
                        text: 'md5编码工具',
                        link: 'https://www.zxgj.cn/g/md5'
                    },
                    {
                        text: 'AES/DES加解密工具',
                        link: 'https://www.fly63.com/tool/cipher/'
                    },
                    {
                        text: 'JWT解码工具',
                        link: 'http://jwt.calebb.net/'
                    },
                    {
                        text: '在线ASCII编码解码',
                        link: 'https://www.matools.com/code-convert-ascii'
                    },
                    {
                        text: 'unicode编码转换',
                        link: 'https://www.zxgj.cn/g/unicode'
                    },
                    {
                        text: 'UTF-8编码转换',
                        link: 'https://www.zxgj.cn/g/utf8'
                    },
                    {
                        text: '字符串编码解码',
                        link: 'https://www.zxgj.cn/g/enstring'
                    },
                    {
                        text: '进制转换',
                        link: 'https://www.zxgj.cn/g/jinzhi'
                    },
                    {
                        text: 'Unix时间戳转换',
                        link: 'https://www.zxgj.cn/g/unix'
                    },
                    {
                        text: 'RGB颜色转换',
                        link: 'https://www.zxgj.cn/g/yansezhi'
                    },
                    {
                        text: 'JSON解析',
                        link: 'http://www.json.cn/'
                    },
                    {
                        text: 'CSS可视化',
                        link: 'https://enjoycss.com/'
                    },
                    {
                        text: 'XML压缩/格式化',
                        link: 'https://www.zxgj.cn/g/xmlformat'
                    },
                    {
                        text: 'SQL压缩/格式化',
                        link: 'https://www.zxgj.cn/g/sqlformat'
                    },
                    {
                        text: 'JSON和XML在线转换',
                        link: 'https://www.zxgj.cn/g/jsonxml'
                    },
                    {
                        text: 'JSON/YAML在线转换',
                        link: 'https://www.fly63.com/tool/jsonyaml/'
                    },
                    {
                        text: 'IP查询',
                        link: 'https://www.ipip.net/ip.html'
                    },
                    {
                        text: 'HTTP在线接口测试',
                        link: 'https://www.fly63.com/php/http/'
                    },
                    {
                        text: 'UUID在线生成器',
                        link: 'https://www.zxgj.cn/g/uuid'
                    },
                    {
                        text: '随机数生成器',
                        link: 'https://www.zxgj.cn/g/suijishu'
                    },
                    {
                        text: '在线编译工具',
                        link: 'https://c.runoob.com/'
                    },
                    {
                        text: '在线文本比对',
                        link: 'https://www.fly63.com/tool/textdiff/'
                    },
                    {
                        text: '在线文本替换',
                        link: 'https://www.fly63.com/tool/textreplace/'
                    },
                    {
                        text: '字数统计',
                        link: 'https://www.eteste.com/'
                    },
                    {
                        text: 'CSV转JSON',
                        link: 'https://www.convertcsv.com/csv-to-json.htm'
                    }
                ]
            },
            {
                text: '🏤创作必备',
                items: [
                    {
                        text: '在线流程图设计',
                        link: 'https://app.diagrams.net/'
                    },
                    {
                        text: '在线思维导图',
                        link: 'https://www.processon.com/'
                    },
                    {
                        text: '在线PS',
                        link: 'https://www.uupoop.com/#/'
                    },
                    {
                        text: 'logo设计',
                        link: 'https://www.uugai.com/'
                    },
                    {
                        text: '头像生成',
                        link: 'https://pfpmaker.com/'
                    },
                    {
                        text: '海报设计',
                        link: 'https://www.designcap.com/'
                    },
                    {
                        text: '表情包',
                        link: 'https://fabiaoqing.com/'
                    },
                    {
                        text: 'AI图片放大',
                        link: 'https://bigjpg.com/'
                    },
                    {
                        text: '在线抠图',
                        link: 'https://www.remove.bg/zh'
                    },
                    {
                        text: 'pixabay图片素材',
                        link: 'https://pixabay.com/zh/'
                    },
                    {
                        text: 'unsplash图片素材',
                        link: 'https://unsplash.com/'
                    },
                    {
                        text: 'pexels图片素材',
                        link: 'ttps://www.pexels.com/zh-cn/'
                    }
                ]
            }
        ],
        sidebar: [
            {
                text: '🌰阅读须知',
                link: '/guide'
            },
            {
                text: '🛤️资源导航',
                link: '/guide/resource-navigation'
            },
            {
                text: '开始阅读',
                collapsed: true,
                items: []
            },
            {
                text: '😄Emoji',
                link: '/memo/emoji'
            }
        ],
        footer: {
            message: '用心去做高质量的编程学习内容网站，欢迎<a target="_blank" style="color: red" href="https://gitee.com/ochiamaluo/prodocs">star ⭐</a>让更多人发现！',
            copyright: 'MIT Licensed | Copyright © 2023-present OchiaMalu'
        },
        socialLinks: [
            {
                icon: {
                    svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#c81d23" d="M11.984 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12a12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.016 0zm6.09 5.333c.328 0 .593.266.592.593v1.482a.594.594 0 0 1-.593.592H9.777c-.982 0-1.778.796-1.778 1.778v5.63c0 .327.266.592.593.592h5.63c.982 0 1.778-.796 1.778-1.778v-.296a.593.593 0 0 0-.592-.593h-4.15a.592.592 0 0 1-.592-.592v-1.482a.593.593 0 0 1 .593-.592h6.815c.327 0 .593.265.593.592v3.408a4 4 0 0 1-4 4H5.926a.593.593 0 0 1-.593-.593V9.778a4.444 4.444 0 0 1 4.445-4.444h8.296Z"/></svg>'
                },
                link: 'https://gitee.com/ochiamaluo/prodocs',
            },
            {
                icon: 'github',
                link: 'https://github.com/OchiaMalu/prodocs'
            }
        ],
        docFooter: {
            prev: '上一篇文章',
            next: '下一篇文章'
        }
    }
}
