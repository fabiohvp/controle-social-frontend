export function normalize(
  text: string,
  toLowerCase: boolean,
  replaceSpaceWithHyphen: boolean
) {
  if (!text) {
    return "";
  }

  if (toLowerCase !== false) {
    text = text.toLowerCase();
  }

  text = text.normalize().replace(/[\u0300-\u036f]/g, "");

  if (replaceSpaceWithHyphen !== false) {
    text = text.replaceAll(" ", "-");
  }

  return text;
}
