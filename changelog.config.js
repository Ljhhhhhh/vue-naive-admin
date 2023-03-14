const fs = require('fs');
const path = require('path');

const scopes = fs
  .readdirSync(path.resolve(__dirname, 'src'), { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name.replace(/s$/, ''));

module.exports = {
  extends: ['@commitlint/config-conventional'],
  disableEmoji: false,
  format: '{type}{scope}: {emoji}{subject}',
  list: ['feat', 'fix', 'chore', 'perf', 'docs', 'refactor', 'style', 'test', 'wip', 'mod'],
  maxMessageLength: 64,
  minMessageLength: 3,
  questions: ['type', 'scope', 'subject', 'body', 'breaking', 'issues', 'lerna'],
  scopes: [...scopes, 'custom'],
  types: {
    feat: {
      description: '新增功能',
      emoji: '🚀',
      value: 'feat',
    },
    fix: {
      description: '修复 BUG',
      emoji: '🐛',
      value: 'fix',
    },
    chore: {
      description: '对构建过程或辅助工具和库的更改（不影响源文件、测试用例）',
      emoji: '🤖',
      value: 'chore',
    },
    perf: {
      description: '性能优化',
      emoji: '⚡️',
      value: 'perf',
    },
    docs: {
      description: '文档变更',
      emoji: '✍️',
      value: 'docs',
    },
    refactor: {
      description: '代码格式（不影响功能，例如空格、分号等格式修正）',
      emoji: '💡',
      value: 'refactor',
    },
    style: {
      description: '样式调整',
      emoji: '💄',
      value: 'style',
    },
    test: {
      description: '测试',
      emoji: '🛠️',
      value: 'test',
    },
    wip: {
      description: '开发中',
      emoji: '⌨️',
      value: 'wip',
    },
    mod: {
      description: '不确定分类的修改',
      emoji: '🧐',
      value: 'mod',
    },
    messages: {
      type: '选择本次提交的类型:\n',
      scope: '选择一个 scope（可选）：',
      customScope: '请输入自定义的 scope:',
      subject: '填写简短精炼的变更描述：:\n',
      body: '填写更加详细的变更描述（可选）。使用 "|" 换行：\n ',
      breaking: '列举非兼容性重大的变更（可选）：:\n',
      footer: '列举出所有变更的 Issues Closed（可选）。 例如: #31, #34：',
      confirmCommit: '确认提交？\n',
    },
  },
};
