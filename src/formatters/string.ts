export function normalize(
  text: string,
  options = {
    toLowerCase: true,
    replaceSpaceWithHyphen: true,
  }
) {
  if (!text) {
    return "";
  }

  if (options.toLowerCase !== false) {
    text = text.toLowerCase();
  }

  text = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  if (options.replaceSpaceWithHyphen !== false) {
    text = text.replaceAll(" ", "-");
  }

  return text;
}
