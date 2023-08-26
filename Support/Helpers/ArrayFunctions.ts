export const sortObjectsByTimeDescending = (array: any, numRecords: number) => {
  const sortedArray = array.sort((a: any, b: any) => b.time - a.time);

  return sortedArray.slice(0, numRecords);
};
