import { useMutation, useQueryClient } from '@tanstack/react-query';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useContext, useRef, useState } from 'react';
import { GoPencil } from 'react-icons/go';
import { useSetRecoilState } from 'recoil';
import {
  updateProfileImage,
  updateProfileImageProps,
  updateProfileInfo,
  updateProfileInfoProps
} from '../../../../api/authApi';
import defaultImg from '../../../../assets/defaultImg.jpg';
import { AuthContext } from '../../../../context/AuthContext';
import { useModal } from '../../../../hooks/useModal';
import { QUERY_KEYS } from '../../../../query/keys';
import { modalState } from '../../../../recoil/modals';
import { auth, db } from '../../../../shared/firebase';
import { resizeProfileImageFile } from '../../../../util/imageResize';
import St from './style';
import ProfileSkeleton from './myPageSkeleton/ProfileSkeleton';
// import { modalState } from '../../../recoil/modals';

function EditProfile() {
  const modal = useModal();
  const [isValid, setIsValid] = useState(true);
  const fileRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isFormValid, setIsFormValid] = useState(true);
  const nicknameRegex = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,8}$/i;

  const authContext = useContext(AuthContext);
  const authCurrentUser = authContext?.currentUser;
  const [isPhotoURLChanged, setIsPhotoURLChanged] = useState(false);
  const [isDisplayNameChanged, setIsDisplayNameChanged] = useState(false);
  const [displayName, setDisplayName] = useState(auth.currentUser?.displayName || '');
  const [profileImage, setProfileImage] = useState(authCurrentUser?.photoURL || defaultImg);
  const setIsModalOpen = useSetRecoilState(modalState);

  // 닉네임 변경 유효성 검사
  const onChangeDisplayName = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    setIsDisplayNameChanged(false);

    if (value !== '' && nicknameRegex.test(value)) {
      setIsValid(true);
      setDisplayName(value);
    } else {
      setIsValid(false);
      // 에러 메시지 표시
      setErrorMsg('올바른 형식으로 입력하세요. \n (2자 이상 8자 이하, 영어 또는 숫자 또는 한글)');
    }
  };
  //div를 클릭해도 input이 클릭되도록 하기
  const onClickUpload = () => {
    fileRef.current?.click();
  };

  const queryClient = useQueryClient();

  // 프로필 수정 업데이트

  const userProfileUpdateMutation = useMutation({
    mutationFn: ({ authCurrentUser, displayName, profileImage }: updateProfileInfoProps) =>
      updateProfileInfo({ authCurrentUser, displayName, profileImage }),
    onSuccess: (updatedUser) => {
      queryClient.invalidateQueries({ queryKey: [`${QUERY_KEYS.USERS}`] });
      if (updatedUser) {
        authContext?.updateCurrentUserInContext(updatedUser);
      }
      setIsEditing(false);
    },
    onError: (error) => {
      console.error('프로필 업데이트에 문제가 발생했습니다.', error);
      setIsEditing(false);

      const onClickSave = async () => {
        if (!authCurrentUser) {
          console.error('현재 사용자 정보가 없습니다.');
          return;
        }

        await userProfileUpdateMutation.mutate({ authCurrentUser, displayName, profileImage });
        setIsModalOpen((prev) => ({ ...prev, isModalOpen01: false }));
        modal.close();
      };

      const openModalParams: Parameters<typeof modal.open>[0] = {
        title: '프로필 업데이트에 문제가 발생했습니다.',
        message: '',
        leftButtonLabel: '',
        onClickLeftButton: undefined,
        rightButtonLabel: '확인',
        onClickRightButton: onClickSave
      };
      modal.open(openModalParams);
      setIsModalOpen((prev) => ({ ...prev, isModalOpen01: true }));
    }
  });

  const onSubmitModifyProfile = (e: React.FormEvent) => {
    e.preventDefault();

    const onClickSave = () => {
      setIsModalOpen((prev) => ({ ...prev, isModalOpen02: false }));
      setIsModalOpen((prev) => ({ ...prev, isModalOpen03: false }));
      modal.close();
    };

    const openModalParams: Parameters<typeof modal.open>[0] = {
      title: '프로필이 수정되었습니다.',
      message: '',
      leftButtonLabel: '',
      onClickLeftButton: undefined,
      rightButtonLabel: '확인',
      onClickRightButton: onClickSave
    };
    modal.open(openModalParams);
    setIsModalOpen((prev) => ({ ...prev, isModalOpen02: true }));

    if (authCurrentUser!.displayName !== displayName) {
      if (!isDisplayNameChanged) {
        const openModalParams: Parameters<typeof modal.open>[0] = {
          title: '중복확인 버튼을 눌러주세요',
          message: '',
          leftButtonLabel: '',
          onClickLeftButton: undefined,
          rightButtonLabel: '확인',
          onClickRightButton: onClickSave
        };
        modal.open(openModalParams);
        setIsModalOpen((prev) => ({ ...prev, isModalOpen03: true }));
      } else {
        if (authCurrentUser) {
          userProfileUpdateMutation.mutate({ authCurrentUser, displayName, profileImage });
          setIsEditing(false);
          setIsDisplayNameChanged(false);
          setIsPhotoURLChanged(false);
        }
      }
    } else if (authCurrentUser) {
      userProfileUpdateMutation.mutate({ authCurrentUser, displayName, profileImage });
      setIsEditing(false);
      setIsDisplayNameChanged(false);
      setIsPhotoURLChanged(false);
    }
  };

  // 프로필 이미지를 Firebase에 업로드
  const profileImageUploadMutation = useMutation({
    mutationFn: ({ authCurrentUser, profileImage }: updateProfileImageProps) =>
      updateProfileImage({ authCurrentUser, profileImage }),
    onSuccess: (url) => {
      queryClient.invalidateQueries();
      // 성공 시 이미지 state 업로드해서 사진 미리보기
      if (url) setProfileImage(url);
    },
    onError: (error) => {
      console.log('프로필 이미지 업로드 실패', error);
    }
  });

  //input을 클릭해서 파일 업로드
  const onChangeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (selectedFile?.size! > 1024 * 1024) {
      const onClickSave = () => {
        setIsModalOpen((prev) => ({ ...prev, isModalOpen04: false }));
        modal.close();
        return;
      };

      const openModalParams: Parameters<typeof modal.open>[0] = {
        title: '[알림]',
        message: '최대 1MB까지 업로드 가능합니다',
        leftButtonLabel: '',
        onClickLeftButton: undefined,
        rightButtonLabel: '확인',
        onClickRightButton: onClickSave
      };
      modal.open(openModalParams);
      setIsModalOpen((prev) => ({ ...prev, isModalOpen04: true }));
    } else if (authCurrentUser) {
      try {
        // 프로필 이미지 사이즈 업데이트
        const resizedImage = await resizeProfileImageFile(selectedFile);
        profileImageUploadMutation.mutate({ authCurrentUser, profileImage: resizedImage });
      } catch (err) {
        console.log('프로필 사이즈 전환 실패', err);
      }
    }
  };

  // 닉네임 중복확인
  const nicknameCheck = async (nickname: string) => {
    const userRef = collection(db, 'users');
    const q = query(userRef, where('displayName', '==', nickname));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length > 0) {
      const onClickSave = () => {
        setIsModalOpen((prev) => ({ ...prev, isModalOpen05: false }));
        modal.close();
      };

      const openModalParams: Parameters<typeof modal.open>[0] = {
        title: '이미 존재하는 닉네임입니다.',
        message: '',
        leftButtonLabel: '',
        onClickLeftButton: undefined,
        rightButtonLabel: '확인',
        onClickRightButton: onClickSave
      };
      modal.open(openModalParams);
      setIsModalOpen((prev) => ({ ...prev, isModalOpen05: true }));
      setIsDisplayNameChanged(false);
      // setIsChecked(false);
      setIsFormValid(false);
      return;
    } else if (nickname === '') {
      const onClickSave = () => {
        setIsModalOpen((prev) => ({ ...prev, isModalOpen06: false }));
        modal.close();
      };

      const openModalParams: Parameters<typeof modal.open>[0] = {
        title: '닉네임을 입력해주세요.',
        message: '',
        leftButtonLabel: '',
        onClickLeftButton: undefined,
        rightButtonLabel: '확인',
        onClickRightButton: onClickSave
      };
      modal.open(openModalParams);
      setIsModalOpen((prev) => ({ ...prev, isModalOpen06: true }));
      return;
    } else if (querySnapshot.docs.length === 0) {
      const onClickSave = () => {
        setIsModalOpen((prev) => ({ ...prev, isModalOpen07: false }));
        modal.close();
      };

      const openModalParams: Parameters<typeof modal.open>[0] = {
        title: '사용 가능한 닉네임입니다.',
        message: '',
        leftButtonLabel: '',
        onClickLeftButton: undefined,
        rightButtonLabel: '확인',
        onClickRightButton: onClickSave
      };
      modal.open(openModalParams);
      setIsModalOpen((prev) => ({ ...prev, isModalOpen07: true }));
      setIsFormValid(true);
      // setIsChecked(true);
      setIsDisplayNameChanged(true);
    }
  };

  return (
    <div>
      <St.ProFileEditContainer>
        <St.ProfileImageContainer>
          {isEditing ? (
            <>
              <St.PenWrapper onClick={onClickUpload}>
                <GoPencil />
              </St.PenWrapper>
              <St.MyImage src={profileImage} alt="defaultImg" />
            </>
          ) : (
            <St.MyImage src={authCurrentUser?.photoURL || defaultImg} alt="defaultImg" />
          )}
        </St.ProfileImageContainer>
        <St.ProfileInfo>
          <div style={{ display: 'flex' }}>
            {isEditing ? (
              <>
                <St.DisplayNameModify
                  autoFocus
                  defaultValue={authCurrentUser?.displayName ?? ''}
                  onChange={onChangeDisplayName}
                  style={{ borderColor: isValid ? 'black' : 'red' }}
                />
                <St.DisplayNameCheckBtn
                  onClick={() => nicknameCheck(displayName)}
                  disabled={displayName == '' || displayName == authCurrentUser?.displayName}
                >
                  중복확인
                </St.DisplayNameCheckBtn>
              </>
            ) : (
              <St.MyNickname>{authCurrentUser?.displayName || ''}</St.MyNickname>
            )}
          </div>
          {isEditing ? null : <St.MyEmail>{authCurrentUser?.email}</St.MyEmail>}
          <St.UserInfoModify>
            {isEditing ? (
              <St.ModifyBox>
                <St.FileInput type="file" onChange={onChangeUpload} accept="image/*" ref={fileRef} />
                <div style={{ display: 'flex', gap: '5px' }}>
                  <St.ModifyButton onClick={() => setIsEditing(false)}>취소</St.ModifyButton>
                  <St.ModifyButton
                    onClick={onSubmitModifyProfile}
                    disabled={
                      !displayName ||
                      (displayName === authCurrentUser?.displayName && profileImage === authCurrentUser?.photoURL) ||
                      !isValid
                    }
                  >
                    수정완료
                  </St.ModifyButton>
                </div>
                <St.ErrorMsg>
                  {!isValid && errorMsg !== '변경된 내용이 없습니다.' && <span>{errorMsg}</span>}
                  {displayName === authCurrentUser?.displayName && profileImage === authCurrentUser?.photoURL && (
                    <span>변경된 내용이 없습니다.</span>
                  )}
                </St.ErrorMsg>
              </St.ModifyBox>
            ) : (
              <>
                <St.ProfileModifyBtn onClick={() => setIsEditing(true)}>프로필 수정</St.ProfileModifyBtn>
              </>
            )}
          </St.UserInfoModify>
        </St.ProfileInfo>
      </St.ProFileEditContainer>
    </div>
  );
}

export default EditProfile;
