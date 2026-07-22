/**
 * Joins truthy class names with a space, dropping falsy ones.
 *
 * @param {...(string|false|null|undefined)} classes
 * @returns {string}
 */
export function cx(...classes) {
  return classes.filter(Boolean).join(' ')
}
