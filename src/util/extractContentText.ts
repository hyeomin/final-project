// textUtils.js

export const extractFirst50Words = (htmlString: string) => {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlString;
  const text = tempDiv.textContent || tempDiv.innerText || '';
  const words = text.split(/\s+/).slice(0, 50);
  return words.join(' ') + (words.length >= 10 ? '...' : '');
};

export const stripHtml = (htmlString: string) => {
  // 새로운 div 요소를 만들고 HTML 내용을 넣습니다.
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlString;

  // 텍스트만 추출합니다.
  return tempDiv.textContent || tempDiv.innerText || '';
};
