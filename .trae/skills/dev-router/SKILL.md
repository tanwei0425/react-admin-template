---
name: "dev-router"
description: "Intelligent orchestrator that analyzes user intent and routes to the right skill(s). Invoke FIRST when user request involves code creation, UI/UX work, code review, or ambiguous multi-intent tasks. Prevents skill conflicts by establishing clear ownership."
---

# Dev Router Skill (智能路由决策层)

This skill is the **orchestrator** that decides which specialized skill(s) should handle a user request. It runs FIRST to prevent control conflicts between skills.

## When to Invoke

**Invoke this skill FIRST when:**
- User request is ambiguous or could match multiple skills
- User asks for code creation, UI work, or review
- User mentions multiple intents in one request
- Any request that might trigger other skills

**Do NOT invoke for:**
- Simple questions about the codebase
- Reading/exploring files
- Bug fixes in existing code (no skill needed)
- Git operations

## Available Skills

| Skill | When to Use | When NOT to Use |
|-------|-------------|-----------------|
| `crud-module-generator` | Create NEW module from scratch | Modify existing module |
| `ui-ux-pro-max` | Improve visuals/UX of EXISTING components | Generate new code structure |
| `git-commit-guide` | Git commit message 规范指导 | 执行 git 命令、PR 审查 |
| `pre-review-checklist` | Before commit/PR, after changes done | During active development |

## Routing Decision Tree

```
User Request
     │
     ▼
┌─────────────────────────────────┐
│ 1. Is this a NEW module/page?   │
│    (创建/新增/scaffold/从零)     │
└─────────────────────────────────┘
     │ Yes
     ▼
┌─────────────────────────────────┐
│ Does user mention "好看/美观"?  │
└─────────────────────────────────┘
     │ Yes                │ No
     ▼                    ▼
crud-module-generator   crud-module-generator
+ ui-ux-pro-max         (alone)
(for styling guidance)
     │
     │ No (not new module)
     ▼
┌─────────────────────────────────┐
│ 2. Is this improving EXISTING   │
│    UI/UX? (优化/美化/改进样式)   │
└─────────────────────────────────┘
     │ Yes → ui-ux-pro-max (alone)
     │
     ▼
┌─────────────────────────────────┐
│ 3. Is this a COMMIT request?    │
│    (提交/commit/写commit)        │
└─────────────────────────────────┘
     │ Yes → git-commit-guide (alone)
     │
     ▼
┌─────────────────────────────────┐
│ 4. Is this a REVIEW request?    │
│    (审查/review/检查/PR)         │
└─────────────────────────────────┘
     │ Yes
     ▼
┌─────────────────────────────────┐
│ Is it about UI design quality?  │
└─────────────────────────────────┘
     │ Yes                │ No
     ▼                    ▼
ui-ux-pro-max          pre-review-checklist
(design review)        (code/PR review)
     │
     │ No (not review)
     ▼
┌─────────────────────────────────┐
│ 5. Default: No skill needed,    │
│    handle directly              │
└─────────────────────────────────┘
```

## Conflict Resolution Rules

### Rule 1: New Module + UI Requirements
**Scenario**: "创建一个好看的产品管理页面"
**Resolution**: 
- Primary: `crud-module-generator` (generates structure)
- Secondary: `ui-ux-pro-max` (provides styling standards)
- **Order**: Generate first → Apply UI standards during generation
- **NOT**: Two skills fighting over the same code

### Rule 2: Existing Code + UI + Review
**Scenario**: "审查并优化这个表单"
**Resolution**:
- Step 1: `pre-review-checklist` (find issues)
- Step 2: `ui-ux-pro-max` (apply improvements)
- **Sequential, not parallel**

### Rule 3: Ambiguous Intent
**Scenario**: "帮我看看这个页面"
**Resolution**: 
- Ask user to clarify: "你是想审查代码质量，还是改进 UI 设计？"
- Don't guess and trigger wrong skill

### Rule 4: Multiple Skills Needed
**Scenario**: "创建产品模块，做好看一点，然后帮我审查"
**Resolution**:
- Execute in order: crud-module-generator → ui-ux-pro-max → pre-review-checklist
- Each skill completes before next starts
- Router coordinates the flow

## Output Format

When routing, respond briefly:

```markdown
## 🎯 路由决策

**意图分析**: [简要描述用户意图]

**路由到**: [Skill 名称]
**原因**: [为什么选这个]

**执行顺序** (if multiple):
1. [Skill 1] - [目的]
2. [Skill 2] - [目的]
```

## Examples

### Example 1
**User**: "帮我创建一个订单管理页面"
**Router Output**:
```
## 🎯 路由决策
意图分析: 创建新模块，无 UI 强调
路由到: crud-module-generator
原因: 明确的"创建管理页面"意图
```

### Example 2
**User**: "帮我创建一个漂亮的订单管理页面"
**Router Output**:
```
## 🎯 路由决策
意图分析: 创建新模块 + UI 强调
路由到: crud-module-generator (主) + ui-ux-pro-max (辅)
原因: 需要先按规范生成，再应用 UI 标准美化
执行顺序:
1. crud-module-generator - 生成模块结构
2. ui-ux-pro-max - 应用视觉规范
```

### Example 3
**User**: "审查我的 PR"
**Router Output**:
```
## 🎯 路由决策
意图分析: 代码审查请求
路由到: pre-review-checklist
原因: 明确的 PR 审查意图
```

### Example 4
**User**: "这个表单太难看了"
**Router Output**:
```
## 🎯 路由决策
意图分析: 现有 UI 改进
路由到: ui-ux-pro-max
原因: 针对现有组件的视觉优化，非新建
```

### Example 5
**User**: "帮我看看这个页面"
**Router Output**:
```
## 🎯 路由决策
意图分析: 意图不明确
需要澄清: 你是想
  A) 审查代码质量（pre-review-checklist）
  B) 改进 UI 设计（ui-ux-pro-max）
  C) 重新生成模块（crud-module-generator）
请选择或描述具体需求
```

## Skill Boundary Definitions

To prevent overlap, here are strict boundaries:

### crud-module-generator
**Owns**:
- File creation: `index.jsx`, `Form.jsx`, `Detail.jsx`, `api.js`
- Module structure decisions
- API hook patterns
- State management patterns

**Does NOT own**:
- Fine-grained styling (padding, colors, typography)
- UX interaction patterns
- Accessibility checks

### ui-ux-pro-max
**Owns**:
- Visual hierarchy decisions
- Spacing/sizing recommendations
- Color and typography choices
- Interaction feedback patterns
- Accessibility (WCAG) guidance

**Does NOT own**:
- File structure
- Code patterns/conventions
- API design

### pre-review-checklist
**Owns**:
- Code quality checks
- PR compliance verification
- Pattern adherence
- Scope validation

**Does NOT own**:
- Generating new code
- UI design decisions
- Visual quality (unless explicitly asked)

## Fallback Strategy

If routing is unclear after analysis:
1. **Default to no skill** - handle directly with general knowledge
2. **Ask for clarification** - use AskUserQuestion if truly ambiguous
3. **Conservative approach** - better to not trigger a skill than trigger the wrong one

## Integration Notes

- This skill should be invoked BEFORE any other skill
- After routing decision, the chosen skill takes over fully
- Router does NOT execute the work, only decides who does
- Router can recommend sequencing when multiple skills are needed
