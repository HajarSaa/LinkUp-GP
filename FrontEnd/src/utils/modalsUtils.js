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
// ================================

// utils/modalsUtils.js

export function getEmojiPickerPosition(triggerRect, pickerWidth = 320, pickerHeight = 400, offsetX = 0, offsetY = 8) {
  const { top, left, height } = triggerRect;
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;

  // الاتجاه الأساسي: شمال الزر وتحته
  let x = left - pickerWidth + offsetX;
  let y = top + height + offsetY;

  // لو هيتجاوز الشاشة من تحت، جرب تطلعه فوق
  if (y + pickerHeight > windowHeight) {
    const newY = top - pickerHeight - offsetY;
    // لو كده كمان هيخرج من فوق؟ خليه يظهر على قد الشاشة
    y = newY < 0 ? windowHeight - pickerHeight - offsetY : newY;
  }

  //  لو هيخرج من فوق (حتى في الحالة العادية)
  if (y < 0) {
    y = offsetY;
  }

  //  لو هيخرج من الشمال؟
  if (x < 0) {
    x = left; // افتح على يمينه
  }

  //  لو هيخرج من اليمين؟
  if (x + pickerWidth > windowWidth) {
    x = windowWidth - pickerWidth - offsetX;
  }

  return { top: y, left: x };
}

