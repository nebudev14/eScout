export function loadCanvasImage(x: number, y: number, canvas: HTMLCanvasElement ,url: string) {
  const image = new Image();
  image.src = url;

  const context = canvas.getContext("2d");
  image.onload = () => {
    context!.drawImage(image, x, y, 12, 12);
  }
}