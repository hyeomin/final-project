export function getTransformedImage(htmlContent: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, 'text/html');
  doc.querySelectorAll('img').forEach((img) => {
    const src = img.getAttribute('src');

    // Check if the image is from Cloudinary
    if (src && src.includes('cloudinary.com')) {
      const dimensions = `w_${img.width},h_${Math.round(img.height)},c_fill`;
      const parts = src.split('/upload/');
      const transformedURL = `${parts[0]}/upload/${dimensions}/${parts[1]}`;
      img.setAttribute('src', transformedURL);
    }
  });
  return doc.body.innerHTML;
}
