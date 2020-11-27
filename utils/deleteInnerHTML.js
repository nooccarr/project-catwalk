const deleteInnerHTML = (id) => {
  let span = document.getElementById(id);
  if (span) {
    span.innerHTML = '';
  }
}

export default deleteInnerHTML;