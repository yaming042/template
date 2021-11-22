'use strict';

/*
    参考资料：
    https://juejin.cn/post/6844903606815064077#heading-5
    http://www.liuocean.com/index.php/2019/11/15/zhuan-cz-gong-ju-ji-shi-yong-jie-shao-gui-fangit/
    https://juejin.cn/post/6844903831893966856

    1. 安装
    npm install commitizen cz-conventional-changelog cz-customizable --save-dev

    2. 修改package.json
    ...
    "scripts": {
        ...
        "commit": "git-cz"
        ...
    },
    "config": {
        "commitizen": {
            "path": "node_modules/cz-customizable"
        },
        "cz-customizable": {                // 这个可以没有，但需要手动创建 .cz-config.js 文件
            "config": "config/path/to/my/config.js"
        }
    }
    ...

    3. 配置 .cz-config.js
    文档地址：https://github.com/leoforfree/cz-customizable
*/

module.exports = {
    "types": [
        {
            "value": "fix",
            "name": "fix - 问题修改"
        },
        {
            "value": "feat",
            "name": "feat - 新增特性"
        },
        {
            "value": "style",
            "name": "style - 样式修改"
        },
        {
            "value": "profile",
            "name": "profile - 配置修改"
        },
        {
            "value": "temporary",
            "name": "temporary - 临时存储"
        },
        {
            "value": "perf",
            "name": "perf - 改善性能"
        },
        {
            "value": "revert",
            "name": "revert - 代码回退"
        },
        {
            "value": "chore",
            "name": "chore - 其他修改, 比如构建流程, 依赖管理"
        },
        {
            "value": "docs",
            "name": "docs - 文档变更"
        },
        {
            "value": "refactor",
            "name": "refactor - 代码重构"
        },
        {
            "value": "test",
            "name": "test - 测试用例"
        },
    ],
    messages: {
        type: "选择此次提交的类型:",
        scope: "选择此更改的模块(可选):",
        customScope: "输入此更改的模块",
        subject: "添加变更短说明:\n",
        body: "添加变更长说明(可选),使用\"|\"开始新行:\n",
        breaking: "添加备注(可选):\n",
        footer: "添加此更改相关的Jira(可选),例如: #31，#34:\n",
        confirmCommit: "是否确实要继续执行上述提交?"
    },
    "scopes": [                                 // 指定特定项目的范围，{字符串数组}
        "action",                               // 交互
        "logic",                                // 逻辑
        "style",                                // 样式
        "api",                                  // 接口
        "other"                                 // 其他
    ],
    "allowCustomScopes": true,                  // 将“自定义”选项添加到范围选择中，以便在需要时仍然可以键入范围，配合 scopes 使用
    "allowBreakingChanges": [                   // 允许破坏性的类型
        "feat",
        "fix"
    ],
    "skipQuestions": [],
    "ticketNumberPrefix": "ISSUES CLOSED:",     // 为页脚标准设置自定义前缀，{string，默认 ISSUES CLOSED:}
    "breakingPrefix": "备注:",                   // 为提交消息中的中断更改块设置自定义前缀，{string，默认 BREAKING CHANGE:}
    "footerPrefix": "JIRA ID:",                 // 在提交消息中为页脚块设置自定义前缀，设置为空字符串以删除前缀，{string，默认 ISSUES CLOSED:}
    "breaklineChar": "|",                       // 它将被替换为\n以在提交消息中创建特征线。目前，body和footer字段都支持这一点，{string，默认 | }
    "upperCaseSubject": false,                  // 将第一个主题字母大写，{boolean，默认 false}
}