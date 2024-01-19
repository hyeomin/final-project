import { atom } from 'recoil';
import { IsEditingPostProps, PostInputType } from '../types/PostType';
import { POST } from './keys';

const postInputState = atom<PostInputType>({
  key: POST.EDIT_INPUT,
  default: {
    title: '',
    content: '',
    category: 'noCategory',
    hashtags: [],
    coverImages: []
  }
});

const isEditingPostState = atom<IsEditingPostProps>({
  key: POST.IS_EDITING,
  default: {
    foundPost: null,
    isEditing: false
  }
});

export { isEditingPostState, postInputState };
