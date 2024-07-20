export const normalize = (
  x: number,
  a: number,
  b: number,
  c: number,
  d: number,
) => {
  return c + ((x - a) * (d - c)) / (b - a);
};
