export const formatCurrency = (num: number): string => {
  let n = num;
  let s = '';
  if (n === 0) {
    return '0';
  }
  if (num < 1) {
    n = n * -1;
  }
  {
    const r = n % 1000;
    s = `${r}`;
    n = Math.floor(n / 1000);
  }
  while (n > 0) {
    const r = n % 100;
    s = `${r},${s}`;
    n = Math.floor(n / 100);
  }
  if (num < 0) {
    return '-' + s;
  }
  return s;
};
