export const recordToArray = <T extends object>(
  obj: Record<string, T>,
): (T & { id: string })[] => {
  return Object.entries(obj).map(([id, value]) => ({ ...value, id }));
};
