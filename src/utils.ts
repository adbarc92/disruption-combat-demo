export const normalize = (
  x: number,
  a: number,
  b: number,
  c: number,
  d: number,
) => {
  return c + ((x - a) * (d - c)) / (b - a);
};

export const handleLoopedArrayIndexing = (
  currentPosition: number,
  increment: number,
  limit: number,
): number => {
  const result = currentPosition + increment;
  if (result < 0) {
    return limit - 1;
  } else if (result >= limit) {
    return 0;
  } else {
    return result % limit;
  }
};
