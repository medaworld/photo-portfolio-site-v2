export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function extractFileNameWithoutExt(filename) {
  const dotIndex = filename.lastIndexOf('.');
  return dotIndex === -1 ? filename : filename.substring(0, dotIndex);
}

export function titleToPath(title: string) {
  return title.toLowerCase().split(' ').join('_');
}
