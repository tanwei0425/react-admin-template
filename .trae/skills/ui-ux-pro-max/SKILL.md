---
name: "ui-ux-pro-max"
description: "Professional UI/UX design guidance with deep expertise in visual hierarchy, interaction patterns, accessibility, and design systems. Invoke when user needs layout optimization, component styling, UX improvements, or design system decisions."
---

# UI/UX Pro Max Skill

Professional UI/UX design guidance for React applications with Ant Design.

## When to Invoke

Invoke this skill when:
- User asks for layout optimization or visual improvements
- User needs help with component styling or spacing
- User wants UX improvements (interaction patterns, feedback, flows)
- User asks about accessibility or responsive design
- User needs design system decisions (colors, typography, spacing)
- User mentions "好看点"、"优化样式"、"改进布局"、"提升体验"

## Core Design Principles

### 1. Visual Hierarchy 📐

**Purpose**: Guide user attention through intentional design.

```
Hierarchy Levels:
├── Level 1 (Primary): Main action, key data, page title
│   └── Size: Largest | Color: Primary/Contrast | Position: Top/Center
├── Level 2 (Secondary): Supporting info, secondary actions
│   └── Size: Medium | Color: Default | Position: Near primary
├── Level 3 (Tertiary): Helper text, meta info, disabled states
│   └── Size: Small | Color: Secondary | Position: Peripheral
```

**Techniques**:
- **Size contrast**: 1.5x-2x difference between hierarchy levels
- **Color contrast**: Primary (blue) vs Secondary (#8c8c8c)
- **Spacing contrast**: More padding = more importance
- **Position**: Top-left for Western reading patterns

### 2. Spacing System 📏

**8pt Grid System** (Recommended for Ant Design):

```javascript
// Spacing scale (based on 8pt)
const spacing = {
  xs: 4,    // Tight spacing (icons, inline)
  sm: 8,    // Default spacing
  md: 16,   // Section spacing
  lg: 24,   // Component spacing
  xl: 32,   // Layout spacing
  xxl: 48,  // Page sections
};

// Ant Design compatible
const antdSpacing = {
  compact: 8,   // Small components, tight layouts
  default: 16,  // Standard padding, card body
  comfortable: 24, // Spacious layouts, dialog padding
  generous: 32,    // Page margins, hero sections
};
```

**Rules**:
- Related items: Use smaller spacing (8-16px)
- Unrelated items: Use larger spacing (24-48px)
- Consistent rhythm: All spacing from the scale
- White space: Don't fear empty space, it improves focus

### 3. Typography 📝

**Scale** (Ant Design defaults + recommended):

```javascript
const typography = {
  // Headings
  h1: { fontSize: 38, lineHeight: 1.2, fontWeight: 600 },
  h2: { fontSize: 30, lineHeight: 1.3, fontWeight: 600 },
  h3: { fontSize: 24, lineHeight: 1.4, fontWeight: 600 },
  h4: { fontSize: 20, lineHeight: 1.5, fontWeight: 600 },
  
  // Body
  bodyLarge: { fontSize: 16, lineHeight: 1.5, fontWeight: 400 },
  body: { fontSize: 14, lineHeight: 1.5, fontWeight: 400 },
  bodySmall: { fontSize: 12, lineHeight: 1.5, fontWeight: 400 },
  
  // Special
  caption: { fontSize: 12, lineHeight: 1.4, color: '#8c8c8c' },
  label: { fontSize: 14, lineHeight: 1.5, fontWeight: 500 },
  code: { fontSize: 13, fontFamily: 'monospace' },
};
```

**Rules**:
- Max 3 font sizes per view (headline, body, caption)
- Line length: 50-75 characters for readability
- Contrast: 4.5:1 minimum for text (WCAG AA)

### 4. Color System 🎨

**Primary Palette** (Ant Design based):

```javascript
const colors = {
  // Primary (Blue)
  primary: '#1890ff',
  primaryHover: '#40a9ff',
  primaryActive: '#096dd9',
  primaryBg: '#e6f7ff',
  
  // Semantic
  success: '#52c41a',
  warning: '#faad14',
  error: '#f5222d',
  info: '#1890ff',
  
  // Neutral
  textPrimary: '#262626',
  textSecondary: '#8c8c8c',
  textDisabled: '#bfbfbf',
  border: '#d9d9d9',
  borderLight: '#f0f0f0',
  background: '#f5f5f5',
  backgroundWhite: '#ffffff',
  
  // Functional
  link: '#1890ff',
  linkHover: '#40a9ff',
};
```

**Usage Rules**:
- Primary color: Only for main actions (1-2 per view)
- Semantic colors: Status indication only (not decoration)
- Neutral colors: 90% of UI should be neutral
- Background hierarchy: White → Light gray → Dark gray

### 5. Interaction Patterns 🖱️

**Feedback Timing**:
```javascript
const feedback = {
  // Immediate (0-100ms)
  hover: 0,        // Visual feedback on hover
  click: 50,       // Button press animation
  
  // Quick (100-500ms)
  toggle: 150,     // Switch, checkbox animation
  expand: 300,     // Dropdown, accordion
  toast: 500,      // Message notification
  
  // Moderate (500-2000ms)
  loading: 1000,   // Spinner for async operations
  transition: 800, // Page transitions
  
  // Avoid
  noFeedback: '❌ Never leave user wondering if action registered',
  tooSlow: '❌ >3s needs progress indicator',
};
```

**State Indication**:
```javascript
const states = {
  default: 'Normal appearance',
  hover: 'Slight highlight (background change)',
  focus: 'Clear outline (accessibility requirement)',
  active: 'Pressed state (deeper color)',
  disabled: 'Reduced opacity (0.4-0.6), no interaction',
  loading: 'Spinner or progress bar',
  error: 'Red indication with clear message',
};
```

### 6. Accessibility ♿

**WCAG 2.1 AA Requirements**:

```javascript
const accessibility = {
  // Color Contrast
  textNormal: '4.5:1 minimum',
  textLarge: '3:1 minimum (18px+ bold or 24px+)',
  interactive: '3:1 minimum (buttons, inputs)',
  
  // Focus Management
  focusIndicator: 'Visible focus ring (never remove outline)',
  focusOrder: 'Logical tab order (DOM order)',
  focusTrap: 'Modal traps focus until closed',
  
  // Interactive Elements
  touchTarget: '44x44px minimum',
  clickArea: 'Extend beyond visible area if small',
  
  // Forms
  labels: 'All inputs have visible labels',
  errors: 'Clear error messages associated with fields',
  required: 'Indicate required fields clearly',
  
  // Motion
  noMotion: 'Provide option to disable animations',
  pauseMotion: 'Allow pausing moving content',
};
```

### 7. Responsive Design 📱

**Breakpoints** (Ant Design Grid):

```javascript
const breakpoints = {
  xs: '< 576px',   // Mobile phones
  sm: '≥ 576px',   // Small tablets
  md: '≥ 768px',   // Tablets
  lg: '≥ 992px',   // Small laptops
  xl: '≥ 1200px',  // Desktops
  xxl: '≥ 1600px', // Large screens
};

// Layout adjustments
const responsive = {
  xs: {
    columns: 1,
    padding: '8-12px',
    fontSize: '12-14px',
    hideSecondary: true,
  },
  sm: {
    columns: 2,
    padding: '12-16px',
    fontSize: '14px',
  },
  md: {
    columns: 2-3,
    padding: '16-24px',
    fontSize: '14px',
  },
  lg: {
    columns: 3-4,
    padding: '24px',
    fontSize: '14-16px',
  },
  xl: {
    columns: 4,
    padding: '24-32px',
    fontSize: '14-16px',
  },
};
```

## Component Design Patterns

### Cards

```javascript
// Standard card structure
<Card
  styles={{
    body: {
      padding: '16px',           // Comfortable padding
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',               // Consistent spacing
    },
  }}
>
  {/* Header area */}
  <div style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  }}>
    <Typography.Title level={4} style={{ margin: 0 }}>
      Card Title
    </Typography.Title>
    <Button type="link" size="small">Action</Button>
  </div>
  
  {/* Content area */}
  <div style={{ flex: 1 }}>
    Content here
  </div>
  
  {/* Footer area (optional) */}
  <div style={{
    borderTop: '1px solid #f0f0f0',
    paddingTop: '12px',
    marginTop: '12px',
  }}>
    Footer content
  </div>
</Card>
```

### Forms

```javascript
// Form layout principles
const formDesign = {
  // Label alignment
  labelAlign: 'left',           // Better for short forms
  labelCol: { span: 6 },        // Standard width
  wrapperCol: { span: 18 },     // Balance
  
  // Spacing
  itemSpacing: '24px',          // Between form items
  
  // Grouping
  groupSpacing: '32px',         // Between form sections
  groupDivider: true,           // Visual separation
  
  // Validation
  errorPosition: 'below',       // Below input field
  errorColor: '#f5222d',        // Clear error indication
  
  // Required indication
  requiredMark: 'asterisk',     // Or 'optional' for inverse
};
```

### Tables

```javascript
// Table design principles
const tableDesign = {
  // Density
  size: 'small',                // Compact for data-heavy tables
  cellPadding: '8px 16px',      // Horizontal emphasis
  
  // Alignment
  textLeft: 'text',             // Text content
  textCenter: 'status, actions', // Short values
  textRight: 'numbers',         // Numeric values
  
  // Columns
  minWidth: '80px',             // Minimum column width
  maxWidth: '300px',            // Maximum before truncation
  actionWidth: '120-200px',     // Action column fixed
  
  // Visual
  headerBg: '#fafafa',          // Distinct header
  stripeRows: false,            // Usually not needed
  hoverHighlight: true,         // Row interaction feedback
  fixedHeader: true,            // For long tables
};
```

### Buttons

```javascript
// Button hierarchy
const buttonHierarchy = {
  // Primary (main action)
  primary: {
    type: 'primary',
    style: { fontWeight: 500 },
    usage: 'One per view, main action',
  },
  
  // Secondary
  secondary: {
    type: 'default',
    usage: 'Supporting actions, multiple allowed',
  },
  
  // Tertiary
  tertiary: {
    type: 'link',
    usage: 'Navigation, low-emphasis actions',
  },
  
  // Danger
  danger: {
    type: 'primary',
    danger: true,
    usage: 'Destructive actions only',
    requireConfirm: true,       // Always confirm destructive actions
  },
};

// Button sizing
const buttonSize = {
  large: { height: 40, padding: '16px', fontSize: 16 },
  middle: { height: 32, padding: '12px', fontSize: 14 },
  small: { height: 24, padding: '8px', fontSize: 12 },
};
```

## Layout Patterns

### Page Layout

```javascript
// Standard page structure
<div style={{
  padding: '24px',
  backgroundColor: '#f5f5f5',
  minHeight: '100vh',
}}>
  {/* Search/Filter section */}
  <Card style={{ marginBottom: '16px' }}>
    <SearchForm />
  </Card>
  
  {/* Main content */}
  <Card>
    {/* Header */}
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '16px',
    }}>
      <Title>Page Title</Title>
      <Space>
        <Button type="primary">Add</Button>
      </Space>
    </div>
    
    {/* Content */}
    <CustomTable />
  </Card>
</div>
```

### Modal/Drawer Layout

```javascript
// Modal design
<Modal
  width={600}                   // Standard modal width
  styles={{
    body: { padding: '24px' },  // Comfortable padding
  }}
>
  {/* Form or content */}
  <Form layout="vertical">      // Vertical for modals
    ...
  </Form>
</Modal>

// Drawer design
<Drawer
  width={680}                   // Wider for detail views
  styles={{
    body: { padding: '24px' },
  }}
>
  <Descriptions column={2} />   // Standard detail layout
</Drawer>
```

## Common Improvements

### Fix: Cramped Layout

```javascript
// Before: Cramped
<div style={{ padding: 8 }}>
  <Input style={{ marginBottom: 8 }} />
  <Button>Submit</Button>
</div>

// After: Comfortable
<div style={{ padding: 24 }}>
  <Space direction="vertical" size={16} style={{ width: '100%' }}>
    <Input />
    <Button type="primary" block>Submit</Button>
  </Space>
</div>
```

### Fix: Missing Visual Hierarchy

```javascript
// Before: Flat
<Card>
  <div>Total: 126,560</div>
  <div>Daily: 1,234</div>
</Card>

// After: Hierarchical
<Card>
  <Statistic 
    title="总销售额"
    value={126560}
    valueStyle={{ fontSize: 28, fontWeight: 600 }}
  />
  <div style={{ fontSize: 12, color: '#8c8c8c', marginTop: 8 }}>
    日销售额 ¥1,234
  </div>
</Card>
```

### Fix: Poor Button Placement

```javascript
// Before: Scattered
<Input />
<Button type="primary">Save</Button>
<Button>Cancel</Button>
<Button danger>Delete</Button>

// After: Logical grouping
<Input />
<Space style={{ marginTop: 24 }}>
  <Button type="primary">Save</Button>
  <Button>Cancel</Button>
</Space>
<Button danger style={{ marginTop: 16 }}>Delete</Button>
```

## Design Checklist

When reviewing or creating UI:

1. **Visual Hierarchy**: Can user identify primary action in 3 seconds?
2. **Spacing**: Is spacing consistent (8pt grid)?
3. **Typography**: Max 3 font sizes? Adequate contrast?
4. **Color**: Primary color used sparingly? Semantic colors correct?
5. **Interaction**: All interactive elements have hover/focus states?
6. **Feedback**: Loading states for async? Success/error messages?
7. **Accessibility**: Focus visible? Contrast ratio met? Touch targets 44px?
8. **Responsive**: Works at 375px (mobile) and 1440px (desktop)?
9. **Alignment**: Related items grouped? Unrelated items separated?
10. **Consistency**: Same patterns used for similar components?

## Quick Fixes

| Problem | Fix |
|---------|-----|
| Too cramped | Increase padding to 24px, use Space component |
| Hard to scan | Add visual hierarchy (size, color, spacing contrast) |
| Unclear actions | Make primary button distinct, group related actions |
| Inconsistent spacing | Use Space component with defined size (8, 16, 24) |
| Missing feedback | Add loading spinner, success/error message |
| Poor mobile experience | Use responsive grid, hide secondary on xs |
| Accessibility issues | Add focus states, ensure contrast, use semantic HTML |
| Cluttered | Remove unnecessary elements, use white space |

## Example Prompt Response

User: "这个表单看起来太拥挤了"

Analysis:
1. Current padding likely < 16px
2. Form items may lack vertical spacing
3. No visual grouping for related fields

Recommendation:
- Increase card padding to 24px
- Use `Form layout="vertical"` for better spacing
- Add `gap: 16px` between form sections
- Group related fields visually