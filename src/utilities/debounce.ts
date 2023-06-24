let timer: number = -1;

export const debounce = (func: () => void, time: number) => {
  clearTimeout(timer);

  timer = setTimeout(func, time);
}