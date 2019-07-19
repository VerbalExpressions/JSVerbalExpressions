export default function anyOf(input: string) {
  return new RegExp(`[${input}]`);
}
