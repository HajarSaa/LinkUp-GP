export function calculateSafePosition(e, modalWidth, modalHeight, padding = 0) {
  let x = e.clientX;
  let y = e.clientY;

  if (modalWidth && x + modalWidth > window.innerWidth) {
    x = x - modalWidth - padding;
  }

  if (modalHeight && y + modalHeight > window.innerHeight) {
    y = y - modalHeight - padding;
  }

  return { x, y };
}
