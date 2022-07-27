export function getNumberById(id: string): number {
  return Number(document.getElementById(id)?.innerText as string);
}
