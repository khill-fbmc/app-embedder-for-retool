export function generateColor(key1: string, key2: string): string {
  const combinedHash = stringToHash(`${key1}=${key2}`);
  return hashToColor(combinedHash);
}

function stringToHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32-bit integer
  }
  return hash;
}

function hashToColor(hash: number): string {
  // Generate a color based on the hash value
  const r = (hash & 0xff0000) >> 16;
  const g = (hash & 0x00ff00) >> 8;
  const b = hash & 0x0000ff;
  return `rgb(${r}, ${g}, ${b})`;
}
