export default function uptime(uptime) {
  if (!uptime) return null;
  uptime /= 60;
  if (uptime < 60) return Math.floor(uptime) + ' Minutes';
  uptime /= 60;
  if (uptime < 60) return Math.floor(uptime) + ' Hours';
  uptime /= 24;
  return Math.floor(uptime) + ' Days';
}
