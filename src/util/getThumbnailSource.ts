import mangoDefaultCover from 'assets/mangoDefaultCover.png';
import { DownloadedImageType } from 'types/PostType';

export const getThumbnailSource = (coverImages: DownloadedImageType[]) => {
  if (coverImages && coverImages.length > 0 && coverImages[0].thumbnailUrl) {
    return coverImages[0].thumbnailUrl ?? coverImages[0].url;
  } else return mangoDefaultCover;
};
