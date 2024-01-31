import { atom } from 'recoil';
import { Category } from '../components/viewAll/ViewAllBody';
import { DownloadedImageType, IsEditingPostProps, PostInputType } from '../types/PostType';
import { POST } from './keys';

export const initialPostInputState = {
  title: '',
  content: '',
  category: 'noCategory',
  hashtags: [],
  coverImages: []
};

const titleState = atom<string>({
  key: 'title',
  default: ''
});

const contentState = atom<string>({
  key: 'content',
  default: ''
});

const categoryState = atom<string>({
  key: 'category',
  default: 'noCategory'
});

const hashtagState = atom<string[]>({
  key: 'hastags',
  default: []
});

const coverImageState = atom<DownloadedImageType[]>({
  key: 'coverImages',
  default: []
});

const postInputState = atom<PostInputType>({
  key: POST.EDIT_INPUT,
  default: initialPostInputState
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

const pathHistoryState = atom<string[]>({
  key: 'pathHistory',
  default: []
});

export {
  categoryListState,
  categoryState,
  contentState,
  coverImageState,
  hashtagState,
  isEditingPostState,
  pathHistoryState,
  postInputState,
  titleState
};
