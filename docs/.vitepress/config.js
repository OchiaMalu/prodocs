export default {
    base: "/",
    lang: "zh-CN",
    title: "程序员",
    description: "",
    lastUpdated: true,
    cleanUrls: true,
    appearance: 'dark',
    head: [
        [
            'link', {rel: 'icon', href: ''}
        ]
    ],
    themeConfig: {
        logo: "",
        outline: 'deep',
        returnToTopLabel: '回到顶部',
        nav: [
            {text: '首页', link: '/'},
            {text: '开始阅读', link: '/components/index.md'}
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
            message: '用心去做高质量的编程学习内容网站，欢迎<a target="_blank" style="color: var(--vp-c-brand)" href="https://github.com/QSXLtangsan">star ⭐</a>让更多人发现！',
            copyright: 'MIT Licensed | Copyright © 2023-present OchiaMalu'
        },
        socialLinks: [{
            icon: 'github',
            link: ''
        }],
        docFooter: {
            prev: '上一篇文章',
            next: '下一篇文章'
        }
    }
}
