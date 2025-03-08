export default function fingerprint(name, value) {
  switch (name?.toLowerCase()) {
    case 'tv':
    case 'printer':
    case 'laptop':
    case 'speaker':
    case 'apple':
    case 'microsoft':
      return name.toLowerCase();
    case 'gaming':
      return 'controller';
    case 'google':
      return 'android';
  }
  return value;
}
