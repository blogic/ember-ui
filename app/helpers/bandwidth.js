export default function bandwidth(rate) {
  if (rate > 1024 * 1024 * 1024)
    return Math.floor(rate / (1024 * 1024 * 1024)) + 'Gb';
  if (rate > 1024 * 1024) return Math.floor(rate / (1024 * 1024)) + 'Mb';
  if (rate > 1024) return Math.floor(rate / 1024) + 'Kb';
  return rate;
}
