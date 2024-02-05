export const extractFirst50Words = (htmlString: string) => {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlString;
  const text = tempDiv.textContent || tempDiv.innerText || '';
  const words = text.split(/\s+/).slice(0, 50);
  return words.join(' ') + (words.length >= 10 ? '...' : '');
};

export const stripHtml = (htmlString: string, checkForImages: boolean = false) => {
  // 텍스트에 이미지 있는지 확인
  if (checkForImages) {
    const containsImage = /<img .+?>/i.test(htmlString);
    if (containsImage) {
      return 'Image found';
    }
  }

  // 이미지 없으면 텍스트 있는지 확인
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlString;
  return tempDiv.textContent || tempDiv.innerText || '';
};
