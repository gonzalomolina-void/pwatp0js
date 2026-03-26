# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a vanilla JavaScript study guide repository for a "Programación Web Avanzada" university course at Uncoma. It contains theoretical notes, practice exercises, and solution files — no frameworks, no build system, no dependencies.

## Running Code

All `.js` files are designed to run directly in a browser's DevTools console:
1. Open Chrome DevTools (`F12`)
2. Go to the **Console** tab
3. Paste the code and press `Enter`

There is no `package.json`, no test runner, and no local server required. Files that use `prompt()` must be run in the browser (not Node.js) since `prompt` is a browser API.

To run a file in Node.js (for scripts without `prompt()`):
```bash
node modulo1.js
```

## Repository Structure

| File | Purpose |
|------|---------|
| `README.md` | Theoretical Q&A guide for modules 1–7 |
| `Practica.md` | Practical exercises for each module |
| `modulo1.js` | Solutions: Variables & Types |
| `modulo2.js` | Solutions: Operators, Coercion, Control Flow |
| `modulo3.js` | Solutions: Functions & Scope |

Modules covered (see `README.md` for theory, `Practica.md` for exercises):
- **Módulo 1** – Variables, scope, hoisting, types
- **Módulo 2** – Operators, type coercion, control flow
- **Módulo 3** – Functions, scope, closures
- **Módulo 4** – Arrays, objects, destructuring, spread/rest
- **Módulo 5** – Functional programming with arrays (`.map`, `.filter`, `.reduce`)
- **Módulo 6** – Higher-order functions, `this`, currying
- **Módulo 7** – Async/await, Promises, `fetch`, SWAPI

## Conventions

- Use `const` by default; `let` when reassignment is needed; avoid `var`.
- Prefer template literals (backticks) over string concatenation.
- Use `===` (strict equality) instead of `==`.
- Arrow functions for callbacks; named `function` declarations for reusable functions.
- `prompt()` / `console.log()` are the primary I/O mechanisms — no DOM manipulation.
