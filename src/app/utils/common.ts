export const oilBinarySearch: any = (
  arr: any,
  val: any,
  start = 0,
  end = arr.length - 1
) => {
  const mid = Math.floor((start + end) / 2);

  if (val === arr[mid].id) {
    return mid;
  }

  if (start >= end) {
    return -1;
  }

  return val < arr[mid].id
    ? oilBinarySearch(arr, val, start, mid - 1)
    : oilBinarySearch(arr, val, mid + 1, end);
};
