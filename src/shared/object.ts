export function deepMerge(target: any, source: any) {
  for (const key of Object.keys(source)) {
    const currenttarget = target[key];
    const currentsource = source[key];

    if (currenttarget) {
      const objectsource = typeof currentsource === "object";
      const objecttarget = typeof currenttarget === "object";

      if (objectsource && objecttarget) {
        void (Array.isArray(currenttarget) && Array.isArray(currentsource)
          ? void (target[key] = currenttarget.concat(currentsource))
          : void deepMerge(currenttarget, currentsource));

        continue;
      }
    }
    target[key] = currentsource;
  }
  return target;
}

export function isObject<T>(item: T) {
  return item && typeof item === "object" && !Array.isArray(item);
}
