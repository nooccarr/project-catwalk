const truncateText = (text = "") => {
  let textLength = text.length;
  return text.slice(0, text.length - 3) + '...';
};

export default truncateText;