export enum Color {
  Primary = "#161d2f",
  Background = "#10141f",
  White = "#FFFFFF",
  Focused = "#596990",
  Black = "#000000",
}

export function getColors(): Record<string, string> {
  return Color;
}
