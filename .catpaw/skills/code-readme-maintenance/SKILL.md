---
name: code-readme-maintenance
description: Maintains README.md alongside component, class, and function changes. Use when creating or modifying Vue components, adding class files, or adding public functions; document component props, emits, slots, exposes, function parameters/returns/throws, and class responsibilities/methods.
---

# Code README Maintenance

## When to apply

Apply this workflow whenever a Vue component is created or changed, or when a class file or externally usable function is added or changed.

## Workflow

1. Locate the closest applicable `README.md` for the changed module.
2. Create it in the module directory when none exists; otherwise update the existing file.
3. Keep documentation synchronized with the final code in the same change.
4. Do not document private implementation details unless they affect callers.

## Vue components

For every component, document:

- Purpose and basic usage.
- **Props**: name, TypeScript type, required/optional status, default value, and behavior.
- **Emits**: event name, payload type, and trigger timing.
- **Slots**: slot name, scope parameters, and fallback behavior.
- **Exposes**: APIs available through `defineExpose`, including parameter, return value, and invocation notes.

Explicitly state `None` for Props, Emits, Slots, or Exposes that are unavailable, so consumers do not need to infer it from source code.

## Functions

For each public or externally usable function, document:

- Purpose.
- Parameters: name, TypeScript type, required/optional status, and meaning.
- Return value: TypeScript type and meaning.
- Exceptions: error type and condition that causes it to be thrown; state `None` if it does not throw intentionally.

Keep the function's JSDoc synchronized with this documentation.

## Classes

For every class file, document:

- The class responsibility, lifecycle, and intended usage.
- Constructor parameters and initialization behavior.
- Each public method: purpose, parameters, return value, and thrown errors.
- Public properties and observable state when relevant.

Keep API names, types, defaults, and examples consistent with the implementation.

## README structure

Use only the sections applicable to the module:

```markdown
# <Module Name>

## Purpose

## Usage

## Props

## Emits

## Slots

## Exposes

## API

### `<functionOrMethodName>`

- Parameters:
- Returns:
- Throws:
```

Use tables for multiple props, events, slots, methods, or functions. Use concise Chinese descriptions unless the surrounding documentation uses another language.

## Completion check

Before finishing, verify that every changed public component API, class API, and function signature is accurately represented in the nearest README, and that unavailable component API categories are marked `None`.
