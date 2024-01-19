import { atom } from 'recoil';
import { IsEditingPostProps, PostInputType } from '../types/PostType';
import { POST } from './keys';
import { Category } from '../components/viewAll/ViewAllBody';

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

const categoryListState = atom<Category>({
  key: POST.CATEGORY_LIST,
  default: 'total'
});

export { isEditingPostState, postInputState, categoryListState };
