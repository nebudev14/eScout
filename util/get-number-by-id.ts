export function getNumberById(id: string): Number {
  return Number(document.getElementById(id)?.innerText);
}
