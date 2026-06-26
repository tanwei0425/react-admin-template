---
name: "git-commit-guide"
description: "Git commit message 规范指南，基于 Conventional Commits 标准。Invoke when user asks to commit code, create commit message, or needs commit convention guidance."
---

# Git Commit Guide Skill

本 Skill 规范化 git commit message，基于 [Conventional Commits](https://www.conventionalcommits.org/) 标准，适配项目现有风格。

## Skill Boundary

**This skill owns**: Git commit message 格式、类型定义、示例模板。

**Does NOT own**: 执行 git 命令、代码审查（由 `pre-review-checklist` 负责）、代码生成（由 `crud-module-generator` 负责）。

**Integration with dev-router**: 当用户说"提交代码"、"帮我写个 commit"时，dev-router 应路由到此 Skill。

## When to Invoke

Invoke this skill when:
- 用户说"提交代码"、"commit"、"帮我写个 commit message"
- 用户说"这个 commit 合不合格"、"commit 规范是什么"
- 用户在 git add 后准备 commit

**Do NOT invoke for**:
- 单纯的 git 操作（push/pull/status）—— 直接执行即可
- PR 审查 —— 路由到 `pre-review-checklist`
- 代码生成 —— 路由到 `crud-module-generator`

## Commit Message 格式

### 标准格式

```
<type>(<scope>): <subject>

<body>

<footer>
```

### 项目简化格式（推荐）

```
<type>: <subject>
```

或带 scope：

```
<type>(<scope>): <subject>
```

### 各部分说明

| 部分 | 必须 | 说明 |
|------|------|------|
| `<type>` | ✅ | commit 类型，见下表 |
| `<scope>` | ❌ | 影响范围（可选），如 `home`、`user`、`router` |
| `<subject>` | ✅ | 简短描述，≤50字符，不以句号结尾 |
| `<body>` | ❌ | 详细描述（可选），每行≤72字符 |
| `<footer>` | ❌ | 关联 issue/PR（可选），如 `Closes #123` |

## Commit Types

### 主类型（必须使用）

| Type | 说明 | 示例 |
|------|------|------|
| `feat` | 新功能 | `feat: 新增用户管理模块` |
| `fix` | 修复 bug | `fix: 修复登录页面验证码不显示` |
| `refactor` | 重构（既非新功能也非 bug 修复） | `refactor: 优化路由配置结构` |
| `perf` | 性能优化 | `perf: 优化表格渲染性能` |
| `style` | 代码风格（不影响逻辑） | `style: 统一代码缩进格式` |
| `docs` | 文档变更 | `docs: 更新 README 安装说明` |
| `test` | 测试相关 | `test: 添加用户模块单元测试` |
| `chore` | 构建/工具/依赖变更 | `chore: 升级 Vite 到 8.x` |
| `revert` | 回滚 commit | `revert: 回滚用户模块改动` |

### 类型选择原则

```
是新功能？ → feat
是修 bug？ → fix
改代码结构但不改行为？ → refactor
提升性能？ → perf
只改格式/注释？ → style
改文档？ → docs
改测试？ → test
改构建/配置/依赖？ → chore
回滚？ → revert
```

## Scope（可选）

### 推荐的 scope 值

| Scope | 适用场景 |
|-------|---------|
| `home` | 首页/仪表盘相关 |
| `user` | 用户管理模块 |
| `role` | 角色管理模块 |
| `menu` | 菜单管理模块 |
| `dict` | 字典管理模块 |
| `dept` | 部门管理模块 |
| `org` | 组织机构模块 |
| `router` | 路由相关 |
| `api` | API 层 |
| `hooks` | Hooks |
| `components` | 公共组件 |
| `utils` | 工具函数 |
| `styles` | 样式相关 |
| `mock` | Mock 数据 |
| `skills` | Skills 相关 |

### scope 使用规则

- 一个 commit 改动多个 scope → 选择最主要的，或省略 scope
- scope 应简洁，≤10 字符
- 新模块用模块名作为 scope（如 `org`）

## Subject 规则

### ✅ 正确写法

```
feat: 新增用户登录功能
fix: 修复表格分页不生效问题
refactor: 简化路由配置逻辑
perf: 优化首页加载速度
chore: 升级 React 到 19.x
```

### ❌ 错误写法

```
新增用户登录功能                  // 缺少 type
feat 新增用户登录功能              // 冒号格式错误
feat: 新增用户登录功能。           // 不应以句号结尾
feat: Add user login feature      // 项目用中文，应保持一致
feat: 新增了用户登录功能并且优化了登录页面的样式和交互  // 太长，应拆分
```

### 规则总结

1. ✅ 以 `<type>: ` 开头
2. ✅ 使用中文（与项目历史一致）
3. ✅ 简洁描述，≤50 字符
4. ✅ 不以句号结尾
5. ✅ 使用祈使语气（"新增"而非"新增了"）
6. ❌ 不使用过去式

## Body（可选）

### 何时使用

- 改动较复杂，需要补充说明
- 有多个子改动
- 需要说明改动原因

### 格式

```
feat: 新增用户管理模块

- 新增用户列表页面，支持搜索和分页
- 新增用户表单，包含基本信息录入
- 新增用户详情抽屉
- API 层封装 useUserListApi 等 hooks
```

### 规则

- 用列表形式列出主要改动
- 每行以 `- ` 开头
- 每行≤72 字符

## Footer（可选）

### 关联 Issue

```
Closes #123
Fixes #456
Refs #789
```

### Breaking Change

```
BREAKING CHANGE: 用户 API 返回格式变更，需更新调用方
```

## 完整示例

### 示例 1：简单新功能

```
feat: 新增用户头像上传功能
```

### 示例 2：带 scope 的 bug 修复

```
fix(user): 修复用户列表搜索不生效问题
```

### 示例 3：带 body 的重构

```
refactor(router): 重构路由配置结构

- 移除 AuthRouter 冗余包装
- 使用 import.meta.glob 替代手动 import
- 添加路由切换进度条（NProgress）
```

### 示例 4：带 body 和 footer 的功能

```
feat(org): 新增组织机构管理模块

- API层: useOrgListApi/CreateApi/UpdateApi/DeleteApi
- 列表页: 支持编码/名称/类型/负责人/状态多字段搜索
- 表单: 机构编码/名称/类型/负责人/联系电话/状态/备注
- Mock: 38条测试数据 + 4个CRUD接口

接入步骤：
1. 字典管理添加 org_type/org_status 字典
2. 菜单管理添加组织机构菜单（路由 /system/org）
```

### 示例 5：Breaking Change

```
feat(api): 统一 API 返回格式

BREAKING CHANGE: 所有 API 返回从 { data } 改为 { code, data, message }
调用方需适配新的返回格式
```

## Commit 检查清单

在提交前，检查以下项：

### 必须项 ✅

1. ✅ 有 `<type>: ` 前缀
2. ✅ type 是合法类型
3. ✅ subject ≤50 字符
4. ✅ subject 不以句号结尾
5. ✅ 使用中文描述

### 推荐项 ⭐

6. ⭐ 一个 commit 只做一件事（必要时拆分）
7. ⭐ 有 scope 标识改动范围
8. ⭐ body 列出主要改动点

### 禁止项 ❌

9. ❌ 不使用 `git commit -m "随便写"`
10. ❌ 不混用中英文
11. ❌ 不写无意义的 commit（如 "update"、"fix bug"）
12. ❌ 不在 subject 写详细改动（应在 body）

## 多次 Commit 策略

### 何时拆分

```
改动包含以下内容 → 应拆分为多个 commit：
├── 新功能 + bug修复 → feat + fix
├── 新功能 + 重构 → feat + refactor
├── 新功能 + 样式调整 → feat + style
├── 新功能 + 依赖升级 → feat + chore
├── 多个独立模块改动 → 每个模块一个 commit
```

### 拆分示例

**改动内容**：新增用户模块 + 修复登录 bug + 升级依赖

**拆分为 3 个 commit**：
```
1. feat(user): 新增用户管理模块
2. fix(login): 修复登录验证码不显示
3. chore: 升级 React 到 19.x
```

### 拆分方法

```bash
# 方法 1：多次 git add + commit
git add src/pages/user
git commit -m "feat(user): 新增用户管理模块"

git add src/pages/login
git commit -m "fix(login): 修复登录验证码不显示"

git add package.json
git commit -m "chore: 升级 React 到 19.x"

# 方法 2：一次性 add，交互式 commit
git add .
git commit --patch  # 选择每个文件的改动
```

## 与现有 Skills 的关系

### 通过 dev-router 调度

```
用户说"提交代码"
    ↓
dev-router 分析意图
    ↓
路由到 git-commit-guide
    ↓
git-commit-guide 生成规范 commit message
    ↓
执行 git commit
```

### 与 pre-review-checklist 的区别

| Skill | 触发时机 | 职责 |
|-------|---------|------|
| `git-commit-guide` | commit 前 | 规范 commit message 格式 |
| `pre-review-checklist` | PR 提交后 | 审查代码合规性、scope 合规性 |

### 协作流程

```
开发完成 → git-commit-guide 规范 commit → 多次 commit 后 → pre-review-checklist 审查 PR
```

## 项目 Commit 历史参考

项目已有的 commit 示例（保持一致风格）：

```
a1b6711 fix: 修复所有详情页 Descriptions 组件的 span 警告
381c3ec feat: route调整
113084f perf: 优化路由切换延迟
ab8c8c9 chore: 升级其他低风险依赖
5bbab12 chore: 升级 Vite 6.x → 8.x 及 @vitejs/plugin-react
```

**风格特点**：
- ✅ 使用 Conventional Commits
- ✅ 中文描述
- ✅ 简洁 subject
- ✅ 有时有 body（复杂改动）

## 输出格式

当用户请求 commit message 时，按以下格式输出：

```markdown
## 📝 Commit Message 建议

### 方案 1（推荐）
```
<type>: <subject>
```

### 方案 2（带 scope）
```
<type>(<scope>): <subject>
```

### 详细版（带 body）
```
<type>(<scope>): <subject>

<body>
```

**选择理由**：<为什么推荐这个格式>
```

## Quick Reference

```
feat:     新功能
fix:      修 bug
refactor: 重构
perf:     性能优化
style:    代码风格
docs:     文档
test:     测试
chore:    构建/工具/依赖
revert:   回滚

格式：<type>: <subject>
规则：中文、≤50字符、无句号、祈使语气
```