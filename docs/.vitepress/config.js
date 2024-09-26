import mathjax3 from 'markdown-it-mathjax3';

const customElements = [
    'math',
    'maction',
    'maligngroup',
    'malignmark',
    'menclose',
    'merror',
    'mfenced',
    'mfrac',
    'mi',
    'mlongdiv',
    'mmultiscripts',
    'mn',
    'mo',
    'mover',
    'mpadded',
    'mphantom',
    'mroot',
    'mrow',
    'ms',
    'mscarries',
    'mscarry',
    'mscarries',
    'msgroup',
    'mstack',
    'mlongdiv',
    'msline',
    'mstack',
    'mspace',
    'msqrt',
    'msrow',
    'mstack',
    'mstack',
    'mstyle',
    'msub',
    'msup',
    'msubsup',
    'mtable',
    'mtd',
    'mtext',
    'mtr',
    'munder',
    'munderover',
    'semantics',
    'math',
    'mi',
    'mn',
    'mo',
    'ms',
    'mspace',
    'mtext',
    'menclose',
    'merror',
    'mfenced',
    'mfrac',
    'mpadded',
    'mphantom',
    'mroot',
    'mrow',
    'msqrt',
    'mstyle',
    'mmultiscripts',
    'mover',
    'mprescripts',
    'msub',
    'msubsup',
    'msup',
    'munder',
    'munderover',
    'none',
    'maligngroup',
    'malignmark',
    'mtable',
    'mtd',
    'mtr',
    'mlongdiv',
    'mscarries',
    'mscarry',
    'msgroup',
    'msline',
    'msrow',
    'mstack',
    'maction',
    'semantics',
    'annotation',
    'annotation-xml',
    'mjx-container',
    'mjx-assistive-mml',
];

export default {
    markdown: {
        config: (md) => {
            md.use(mathjax3)
        }
    },
    vue: {
        template: {
            compilerOptions: {
                isCustomElement: (tag) => customElements.includes(tag)
            }
        }
    },
    base: "/",
    title: "ProDocs",
    description: "一站式编程学习网站",
    lastUpdated: true,
    outDir: '../dist',
    head: [
        [
            'link', {rel: 'icon', href: '/favicon.ico'}
        ]
    ],
    themeConfig: {
        search: {
            provider: 'algolia',
            options: {
                "appId": "OTYX2F0T7M",
                "apiKey": "ff5ce4ae1288f2701b75c8ef53a27a0d", // 需要替换
                "indexName": "pro",
                "placeholder": "请输入关键词",
                "buttonText": "搜索"
            }
        },
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
                text: '🖋️设计导航',
                items: [
                    {
                        text: '设计教程',
                        link: '/guide/resource-navigation#设计教程',
                    },
                    {
                        text: '界面灵感',
                        link: '/guide/resource-navigation#界面灵感',
                    },
                    {
                        text: '字体相关',
                        link: '/guide/resource-navigation#字体相关',
                    },
                    {
                        text: '配色方案',
                        link: '/guide/resource-navigation#配色方案',
                    },
                    {
                        text: '设计神器',
                        link: '/guide/resource-navigation#设计神器',
                    },
                    {
                        text: '尺寸规范',
                        link: '/guide/resource-navigation#尺寸规范',
                    },
                    {
                        text: '设计素材',
                        link: '/guide/resource-navigation#设计素材',
                    },
                    {
                        text: '摄影美图',
                        link: '/guide/resource-navigation#摄影美图',
                    },
                    {
                        text: 'PPT相关',
                        link: '/guide/resource-navigation#ppt相关',
                    }
                ]
            },
            {
                text: '🏢官网导航',
                items: [
                    {
                        text: '前端',
                        items: [
                            {
                                text: 'Node.js',
                                link: 'https://nodejs.org/zh-cn'
                            },
                            {
                                text: 'Vue.js',
                                link: 'https://cn.vuejs.org/'
                            },
                            {
                                text: 'Vite3',
                                link: 'https://cn.vitejs.dev/'
                            },
                            {
                                text: 'VitePress',
                                link: 'https://vitepress.dev/'
                            },
                            {
                                text: 'Element',
                                link: 'https://element.eleme.cn/#/zh-CN'
                            },
                            {
                                text: 'Ant Design',
                                link: 'https://ant-design.antgroup.com/index-cn'
                            },
                            {
                                text: 'Vant4',
                                link: 'https://vant-ui.github.io/vant/#/zh-CN'
                            }
                        ]
                    },
                    {
                        text: '后端',
                        items: [
                            {
                                text: 'Maven 仓库',
                                link: 'https://mvnrepository.com/'
                            },
                            {
                                text: 'Mybatis',
                                link: 'https://mybatis.net.cn/index.html'
                            },
                            {
                                text: 'Knife4j',
                                link: 'https://doc.xiaominfo.com/'
                            }
                        ]
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
                items: [
                    {
                        text: '写在前面',
                        link: '/guide/start'
                    },
                    {
                        text: '经典问题Q&A',
                        link: '/guide/q_a'
                    },
                    {
                        text: '推荐视频',
                        link: '/guide/recommend_video'
                    }
                ]
            },
            {
                text: '计算机科学入门',
                collapsed: true,
                items: [
                    {
                        text: '写在前面',
                        link: '/computer_science/start'
                    },
                    {
                        text: '计算机的早期历史',
                        link: '/computer_science/history'
                    },
                    {
                        text: '电子计算机',
                        link: '/computer_science/electronic_computing'
                    },
                    {
                        text: '二进制与编码',
                        link: '/computer_science/binary'
                    },
                    {
                        text: '布尔代数与逻辑门',
                        link: '/computer_science/logic_gates'
                    },
                    {
                        text: '算术逻辑单元',
                        link: '/computer_science/alu'
                    },
                    {
                        text: '随机存取存储器',
                        link: '/computer_science/ram'
                    },
                    {
                        text: '中央处理器（CPU）',
                        link: '/computer_science/processor'
                    },
                    {
                        text: '指令和程序',
                        link: '/computer_science/instructions'
                    },
                    {
                        text: '高级 CPU 设计',
                        link: '/computer_science/advanced_cpu'
                    },
                    {
                        text: '早期的编程方式',
                        link: '/computer_science/early_programming'
                    },
                    {
                        text: '编程语言发展史',
                        link: '/computer_science/programming_languages'
                    },
                    {
                        text: '语句和函数',
                        link: '/computer_science/statements_functions'
                    },
                    {
                        text: '算法入门',
                        link: '/computer_science/algorithms'
                    },
                    {
                        text: '数据结构入门',
                        link: '/computer_science/data_structures'
                    },
                    {
                        text: '艾伦·图灵',
                        link: '/computer_science/alan_turing'
                    },
                    {
                        text: '软件工程',
                        link: '/computer_science/software'
                    },
                    {
                        text: '集成电路&摩尔定律',
                        link: '/computer_science/integrated_circuits'
                    },
                    {
                        text: '操作系统',
                        link: '/computer_science/operating_system'
                    },
                    {
                        text: '内存&储存介质',
                        link: '/computer_science/memory'
                    },
                    {
                        text: '文件系统',
                        link: '/computer_science/file_system'
                    },
                    {
                        text: '压缩',
                        link: '/computer_science/compression'
                    },
                    {
                        text: '命令行界面',
                        link: '/computer_science/command_line_interface'
                    },
                    {
                        text: '屏幕&2D图形显示',
                        link: '/computer_science/2d_graphics'
                    },
                    {
                        text: '冷战和消费主义',
                        link: '/computer_science/cold_war'
                    },
                    {
                        text: '个人计算机革命',
                        link: '/computer_science/personal_computer'
                    },
                    {
                        text: '图形用户界面',
                        link: '/computer_science/graphical_interface'
                    },
                    {
                        text: '3D 图形',
                        link: '/computer_science/3d_graphics'
                    },
                    {
                        text: '计算机网络',
                        link: '/computer_science/computer_networks'
                    },
                    {
                        text: '互联网',
                        link: '/computer_science/internet'
                    },
                    {
                        text: '万维网',
                        link: '/computer_science/world_wide_web'
                    },
                    {
                        text: '计算机安全',
                        link: '/computer_science/cybersecurity'
                    },
                    {
                        text: '黑客&攻击',
                        link: '/computer_science/hackers'
                    },
                    {
                        text: '加密',
                        link: '/computer_science/cryptography'
                    },
                    {
                        text: '机器学习&人工智能',
                        link: '/computer_science/machine_learning'
                    },
                    {
                        text: '计算机视觉',
                        link: '/computer_science/computer_vision'
                    },
                    {
                        text: '自然语言处理',
                        link: '/computer_science/natural_language_processing'
                    },
                    {
                        text: '机器人',
                        link: '/computer_science/robots'
                    }
                ]
            },
            {
                text: 'C 语言',
                collapsed: true,
                items: [
                    {
                        text: '写在前面',
                        link: '/combined_language/start'
                    },
                    {
                        text: '概述',
                        link: '/combined_language/overview'
                    },
                    {
                        text: '环境安装',
                        link: '/combined_language/environment'
                    }
                ]
            },
            {
                text: 'Java',
                collapsed: true,
                items: [
                    {
                        text: '写在前面',
                        link: '/java/start'
                    },
                    {
                        text: '概述',
                        link: '/java/overview'
                    },
                    {
                        text: '环境安装',
                        link: '/java/environment'
                    },
                    {
                        text: '第一个 Java 程序',
                        link: '/java/first_program'
                    },
                    {
                        text: '数据类型',
                        link: '/java/data_type'
                    },
                    {
                        text: '运算符',
                        link: '/java/operator'
                    },
                    {
                        text: '程序逻辑控制',
                        link: '/java/logic_control'
                    },
                    {
                        text: '方法的定义及使用',
                        link: '/java/function'
                    },
                    {
                        text: '面向对象简介',
                        link: '/java/object_oriented_introduction'
                    },
                    {
                        text: '类与对象',
                        link: '/java/class_object'
                    },
                    {
                        text: '封装性初步分析',
                        link: '/java/encapsulation'
                    },
                    {
                        text: '构造方法',
                        link: '/java/constructor'
                    },
                    {
                        text: '匿名对象',
                        link: '/java/anonymous_object'
                    },
                    {
                        text: '简单 Java 类',
                        link: '/java/simple_class'
                    },
                    {
                        text: '数组',
                        link: 'java/array'
                    },
                    {
                        text: 'String 类的基本概念',
                        link: '/java/string'
                    },
                    {
                        text: 'String 类的常用方法',
                        link: '/java/string_method'
                    },
                    {
                        text: 'this 关键字',
                        link: '/java/this'
                    },
                    {
                        text: '引用传递',
                        link: '/java/reference_passing'
                    },
                    {
                        text: '对象比较',
                        link: '/java/object_compare'
                    },
                    {
                        text: 'static 关键字',
                        link: '/java/static'
                    },
                    {
                        text: '代码块',
                        link: '/java/block'
                    },
                    {
                        text: '内部类',
                        link: '/java/inner'
                    },
                    {
                        text: '链表',
                        link: '/java/list'
                    },
                    {
                        text: '继承性',
                        link: '/java/extends'
                    },
                    {
                        text: '覆写',
                        link: '/java/override'
                    },
                    {
                        text: 'final 关键字',
                        link: '/java/final'
                    },
                    {
                        text: '多态性',
                        link: 'java/polymorphism'
                    },
                    {
                        text: '抽象类',
                        link: '/java/abstract'
                    },
                    {
                        text: '接口',
                        link: '/java/interface'
                    },
                    {
                        text: 'Object 类',
                        link: '/java/object'
                    },
                    {
                        text: '匿名内部类',
                        link: '/java/anonymous_classes'
                    },
                    {
                        text: '基本数据类型的包装类',
                        link: '/java/packaging_category'
                    },
                    {
                        text: '包的定义',
                        link: '/java/package'
                    },
                    {
                        text: '包的导入',
                        link: '/java/package_import'
                    },
                    {
                        text: '系统常见包',
                        link: '/java/system_package'
                    },
                    {
                        text: 'jar 命令',
                        link: '/java/jar'
                    },
                    {
                        text: '访问控制权限',
                        link: '/java/access_permissions'
                    },
                    {
                        text: '命名规范',
                        link: '/java/naming_convention'
                    },
                    {
                        text: '单例设计模式',
                        link: '/java/singleton'
                    },
                    {
                        text: '多例设计模式',
                        link: '/java/multition'
                    },
                    {
                        text: '认识异常',
                        link: '/java/exception_overview'
                    },
                    {
                        text: '处理异常',
                        link: '/java/exception_handling'
                    },
                    {
                        text: '异常的处理流程',
                        link: '/java/exception_handling_process'
                    },
                    {
                        text: 'throws 关键字',
                        link: '/java/throws'
                    },
                    {
                        text: 'throw 关键字',
                        link: '/java/throw'
                    }
                ]
            },
            {
                text: '高等数学',
                collapsed: true,
                items: [
                    {
                        text: '极限',
                        link: '/higher_mathematics/limit'
                    },
                    {
                        text: '连续',
                        link: '/higher_mathematics/continuous'
                    },
                    {
                        text: '导数与微分',
                        link: '/higher_mathematics/derivative'
                    },
                    {
                        text: '中值定理及导数的应用',
                        link: '/higher_mathematics/theorem'
                    },
                    {
                        text: '不定积分',
                        link: '/higher_mathematics/indefinite_integral'
                    },
                    {
                        text: '定积分',
                        link: '/higher_mathematics/definite_integral'
                    },
                    {
                        text: '常数项级数',
                        link: '/higher_mathematics/constant_series'
                    },
                    {
                        text: '幂级数',
                        link: '/higher_mathematics/power_series'
                    },
                    {
                        text: '一阶微分方程',
                        link: '/higher_mathematics/first_order_differential_equation'
                    },
                    {
                        text: '二阶线性常系数微分方程',
                        link: '/higher_mathematics/linear_differential_equation'
                    }
                ]
            },
            {
                text: '💾面试专栏',
                items: [
                    {
                        text: '简历指南',
                        link: '/interview/resume_guide'
                    },
                    {
                        text: '2024年秋招岗位',
                        link: '/interview/jobs'
                    }
                ]
            },
            {
                text: '😄Emoji',
                link: '/memo/emoji'
            },
            {
                text: '🏢联系我们',
                link: '/contact_us'
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
