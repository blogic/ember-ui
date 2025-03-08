export default function bandwidth(signal) {
  if (signal < 60) return 'wifi';
  if (signal < 75) return 'wifi-2';
  return 'wifi-1';
}
