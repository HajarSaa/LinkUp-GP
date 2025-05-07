export const getWorkBackground = (name) => {
  const words = name.split(/[^a-zA-Z0-9]+/);

  return words
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
};
