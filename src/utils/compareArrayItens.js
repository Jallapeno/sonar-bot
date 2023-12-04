// Filters items from arr1 that are not present in arr2
export const compareAndViewIfNotExistItems = (arr1, arr2) => {
  const mapArr2 = new Map(arr2.map(item => [item.title, true]));
  return arr1.filter(item1 => !mapArr2.has(item1.title));
};