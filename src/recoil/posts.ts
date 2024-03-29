import { atom } from 'recoil';
import { Category } from 'types/PostListType';
import { IsEditingPostProps, PostInputType } from 'types/PostType';
import { POST } from './keys';

export const initialPostInputState = {
  title: '',
  content: '',
  category: 'noCategory',
  hashtags: [],
  coverImages: []
};

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

const imageUploadingStatusState = atom<'Loading...' | 'Finished'>({
  key: POST.UPLOADING_STATUS,
  default: 'Loading...'
});

export { categoryListState, imageUploadingStatusState, isEditingPostState, pathHistoryState, postInputState };
