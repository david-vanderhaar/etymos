export function random(array) {
  if (array.length === 0) return null; // Handle empty array case
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
