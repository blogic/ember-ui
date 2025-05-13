export default function radioicon(band) {
  switch (band) {
    case 'HT':
      return 'WiFi 4';
    case 'VHT':
      return 'WiFi 5';
    case 'HE':
      return 'WiFi 6';
    case 'EHT':
      return 'WiFi 7';
  }
}
