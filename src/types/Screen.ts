export type ScreenSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
const SIZES: ScreenSize[] = ["xs", "sm", "md", "lg", "xl", "2xl"];

export function isScreenBiggerThan(currentSize: ScreenSize, value: ScreenSize) {
  return (
    SIZES.findIndex((o) => o === currentSize)! >
    SIZES.findIndex((o) => o === value)!
  );
}
