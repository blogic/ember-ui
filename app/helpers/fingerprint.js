export default function fingerprint(name, value) {
  switch (name?.toLowerCase()) {
    case 'tv':
    case 'printer':
    case 'laptop':
    case 'speaker':
    case 'apple':
    case 'microsoft':
    case 'phone':
      return name.toLowerCase();
    case 'apple, inc':
      return 'apple';
    case 'sony interactive entertainment inc.':
      return 'playstation';
    case 'nintendo':
    case 'nintendo co.,ltd':
      return 'nintendo-switch';
    case 'gaming':
    case 'game-console':
      return 'controller';
    case 'google':
      return 'android';
    case 'uconfig':
      return 'router';
  }
  return value;
}
