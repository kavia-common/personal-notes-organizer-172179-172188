function randomHex(n) {
  let s = '';
  for (let i = 0; i < n; i++) {
    s += Math.floor(Math.random() * 16).toString(16);
  }
  return s;
}

/** PUBLIC_INTERFACE
 * v4 returns a pseudo-random UUID v4 string (not cryptographically secure).
 */
export function v4() {
  // xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
  const parts = [
    randomHex(8),
    randomHex(4),
    '4' + randomHex(3),
    ((8 + Math.floor(Math.random() * 4)).toString(16)) + randomHex(3),
    randomHex(12),
  ];
  return parts.join('-');
}

export { v4 as uuid };
