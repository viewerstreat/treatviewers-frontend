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

export const formatTimeTaken = (dur: number): string => {
  const hrs = Math.floor(dur / 3600);
  const mins = Math.floor((dur % 3600) / 60);
  const secs = (dur % 3600) % 60;
  let s = '';
  if (hrs > 0) {
    s = `${hrs}h`;
  }
  s = `${s} ${mins}m ${secs}s`;
  return s.trim();
};

export const getTimeRemaining = (time: number): string => {
  const currTime = new Date().getTime();
  const duration = time - currTime;
  const secs = Math.floor(duration / 1000);
  const hours = Math.floor(secs / 3600);
  const days = Math.floor(hours / 24);
  return `${days}d ${hours % 24}hrs`;
};

export const sleep = (duration: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, duration));

export const isValidEmail = (email: string): boolean => {
  const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return reg.test(email);
};

export const getRandom = (min = 0, max = 100): number => {
  return Math.floor(Math.random() * max) + min;
};
