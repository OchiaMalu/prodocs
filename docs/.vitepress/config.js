export default {
    base: "/",
    title: "ProDocs",
    description: "一站式编程学习网站",
    lastUpdated: true,
    cleanUrls: true,
    appearance: 'dark',
    head: [
        [
            'link', {rel: 'icon', href: '/favicon.ico'}
        ]
    ],
    themeConfig: {
        logo: {light: '/favicon.ico', dark: '/favicon_dark.ico'},
        outline: 'deep',
        returnToTopLabel: '回到顶部',
        nav: [
            {text: '首页', link: '/'},
            {text: '开始阅读', link: '/components/index.md'},
        ],
        sidebar: [
            {
                '/components': [
                    {
                        text: '开始阅读',
                        link: '/'
                    },
                    {
                        text: '学习动态',
                        items: [
                            {
                                text: '2023',
                                collapsed: true,
                                items: [
                                    {text: '1', link: '/'}
                                ]
                            }
                        ]
                    }
                ]
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
