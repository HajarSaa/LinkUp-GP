export const getRandomColor = () => {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")}`;
};

export const getRandomColorFromPalette = (colorPalette = null) => {
  const defaultPalette = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FF33A6",
    "#FF9633",
    "#33FFF6",
    "#8D33FF",
    "#FFDB33",
  ];

  const palette = colorPalette || defaultPalette;
  return palette[Math.floor(Math.random() * palette.length)];
};
