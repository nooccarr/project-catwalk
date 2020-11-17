const counter = (body) => {
  const bodyLength = body.length;
  const charactersLeft = 50 - body.length;
  if (bodyLength < 50) {
    return `Minimum required characters left: ${charactersLeft}`;
  }
  return 'Minimum reached.';
}

export default counter;