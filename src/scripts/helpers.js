export { textSize };
// !cut text after given size
const textSize = (text, size) => {
  const cutText = text.slice(0, size);
  return text.length > size ? cutText + "..." : cutText;
};
