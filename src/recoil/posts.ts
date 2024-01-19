import { atom } from 'recoil';
import { EditPostStateType, IsEditingPostProps } from '../types/PostType';
import { POST } from './keys';

const editPostState = atom<EditPostStateType>({
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

// const foundPostState = atom<PostTypeDummy | null>({
//   key: POST.FOUND_POST,
//   default: null
// });

export { editPostState, isEditingPostState };
