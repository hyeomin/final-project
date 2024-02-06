export const extractFirst50Words = (htmlString: string) => {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlString;
  const text = tempDiv.textContent || tempDiv.innerText || '';
  const words = text.split(/\s+/).slice(0, 50);
  return words.join(' ') + (words.length >= 10 ? '...' : '');
};

export const stripHtml = (htmlString: string, checkForImages: boolean = false) => {
  if (checkForImages) {
    const containsImage = /<img .+?>/i.test(htmlString);
    if (containsImage) {
      return 'Image found';
    }
  }

  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlString;
  return tempDiv.textContent || tempDiv.innerText || '';
};
