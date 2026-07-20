# Navigation

## Comment style

Applies to all Support Tools code (new apps and edits to existing ones).

### Use JSDoc for block / doc comments

Document functions, React components, hooks, and modules with a **JSDoc block** (`/** … */`):
aligned asterisks, a blank star-prefixed line between paragraphs, Markdown allowed in
descriptions, and `@param` / `@returns` tags where they add clarity.

**Canonical format (follow this exactly):**

```js
/**
 * This is a standard multiline JSDoc comment block.
 * Each line starts with a beautifully aligned asterisk.
 *
 * Separate paragraphs using an empty line prefixed with a star.
 * Descriptions support **Markdown** formatting for deep detail.
 *
 * @param {string} username - The user's account name.
 * @param {number} retryCount - Number of connection attempts
 *   allowed before throwing a terminal timeout exception.
 * @returns {Promise<boolean>} Resolves true on connection.
 */
async function connectUser(username, retryCount) {
  // Implementation goes here
}
```

### Single-line `//` for quick notes

Inline, one-off notes inside a function use `//`. No need for a JSDoc block on trivial code.

### Keep comments concise and summarized

- **Summarize the intent — explain the *why*, not the *what*.** The code already shows what
  it does; a good comment says why it exists or flags a non-obvious gotcha.
- Keep every comment **simple, concise, and clear**. Prefer one sharp sentence over three
  vague ones.
- Don't narrate obvious lines (`// set count to 0`) — that's noise. Fewer, higher-value
  comments beat many restating ones.

**Do**
```js
// Revalidate on every load so a stale cache can't hide a new app. (why)
```
**Don't**
```js
// increment i by one   — restates the code, adds nothing
i++
```
