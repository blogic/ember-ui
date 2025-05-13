export default function radioicon(band) {
  switch (band) {
    case '2g':
      return '2-square';
    case '5g':
      return '5-square';
    case '6g':
      return '6-square';
  }
  return 'broadcast-pin';
}
