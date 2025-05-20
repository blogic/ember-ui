export default function wifiicon(signal) {
  if (signal > -55) return 'wifi';
  if (signal < -75) return 'wifi-1';
  return 'wifi-2';
}
