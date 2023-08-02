export const preventTouchMove = (event: any) => event.preventDefault();

export const isMobileDevice = () => /Mobi|Android/i.test(navigator.userAgent);
