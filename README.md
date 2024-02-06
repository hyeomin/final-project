# 망고 Mango

## <b>프로젝트 소개</b>

![노션 썸네일 (1)](https://github.com/hyeomin/final-project/assets/121536857/4052cb5c-70da-40dd-b53c-efc26df14f67)


망고는 망해가는 지구를 함께 고쳐나가자는 미션을 가진 라이프스타일 관련 웹 어플리케이션입니다.

사용자들은 서로 친환경 라이프에 대한 노하우를 공유하거나 제품 추천을 할 수도 있고,
각자의 친환경 습관을 인증하게 되면 캘린더에 스티커가 쌓여서
사용자들이 지속가능한 친환경 라이프스타일을 영위할 수 있도록 돕습니다.

부담스럽고 귀찮은 것이 아닌, 재밌고 흥미로운 친환경 라이프스타일을 지향합니다.

망고와 함께 환경을 도울 수 있는 라이프스타일로 거듭나 보세요!

## <b>개발 일정</b>

2024.01.04 - 현재진행형

## <b>팀원</b>

| 팀원   | 블로그                             | GitHub                        |
| ------ | ---------------------------------- | ----------------------------- |
| 김혜민 Kim    | https://zerotonine2da.tistory.com/ | https://github.com/zerotonine2da |
| 박솔이 Soli   | https://soliweekly.tistory.com/    | https://github.com/Solyi-Park    |
| 박혜민 Ashley | https://hyeomin-codex.tistory.com/ | https://github.com/hyeomin       |
| 박희원 Hailey | https://heenee.tistory.com/        | https://github.com/heeneeee      |


## <b>사용 기술 스택</b>

![Web App Reference Architecture (1)](https://github.com/hyeomin/final-project/assets/121536857/62e18735-6ee3-4403-a66d-7e40fcc8435d)


## 사용 라이브러리

- react-quill
- react-calendar
- swiper
- react-hook-form

## <b>버전 관리</b>

<img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white"><img src="https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white">

## 협업툴

<img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white"><img src="https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white">

# 망고 페이지 소개

### 홈

첫 화면에서 어드민이 작성하여 홍보하고 싶은 메인 게시글 몇 가지와, 하단에 좋아요 수 기준으로 정렬된 인기 게시물, 그리고 인기 유저들을 확인할 수 있습니다. 게시글은 조회 수, 좋아요 수, 댓글 수 등을 확인할 수 있습니다.

<img width="1062" alt="Screen Shot 2024-01-22 at 9 56 31 AM" src="https://github.com/hyeomin/final-project/assets/121536857/29eca7d0-32e4-4f75-b202-e2a1f07b1e6d">

<details>
 <summary>인기게시물 및 Top 10 유저</summary>
<img width="798" alt="Screen Shot 2024-01-22 at 9 56 41 AM" src="https://github.com/hyeomin/final-project/assets/121536857/e6ec9ea7-364a-4ae7-8a2a-4c5893c54cae">
</details>

게시물은 오른쪽 상단 하트 버튼을 눌러 ‘좋아요’ 기능을 활용할 수 있으며, 로그인이 안된 상태에서는 커스텀으로 만든 모달을 띄워 실행을 막아놨기 때문에 로그인을 유도할 수 있습니다.

<details>
 <summary>로그인 유도 (커스텀 모달)</summary>
<img width="1101" alt="Screen Shot 2024-01-22 at 10 00 18 AM" src="https://github.com/hyeomin/final-project/assets/121536857/3adedf5a-6de7-4c1b-bb89-bae1a28cfbb4">
</details>


### By Mango와 커뮤니티

Navigation Bar에 있는 By Mango 혹은 Community 탭으로 넘어가면 관리자가 작성하는 콘텐츠와 유저들이 작성한 콘텐츠를 각각 볼 수 있으며, 더보기 기능을 활용하여 보여지는 게시물 수를 조절합니다.

<details>
 <summary>By Mango</summary>
<img width="1045" alt="Screen Shot 2024-02-06 at 7 52 49 PM" src="https://github.com/hyeomin/final-project/assets/121536857/47d0f66e-1e1d-4040-aa56-813f1424386f">
</details>

<details>
 <summary>Community</summary>
<img width="1033" alt="Screen Shot 2024-02-06 at 7 54 51 PM" src="https://github.com/hyeomin/final-project/assets/121536857/0e083777-52f4-4b95-a7fa-efd404f22902">
</details>


### 글쓰기

글쓰기 탭에서는 React-Quill을 활용한 에디터 기능을 사용할 수 있습니다. 게시글 작성 시 카테고리 선택, 해시태그 선택, 그리고 커버 이미지를 선택할 수 있습니다.

<details>
 <summary>React-Quill</summary>
 - 카테고리 선택 및 제출 버튼
 - session에 저장하는 임시저장 가능
<img width="837" alt="Screen Shot 2024-02-06 at 9 11 00 PM" src="https://github.com/hyeomin/final-project/assets/121536857/42fbfa47-902d-4b7b-a276-c6ea76595bce">
</details>

<details>
 <summary>해시태그</summary>
<img width="1007" alt="Screen Shot 2024-02-06 at 9 13 16 PM" src="https://github.com/hyeomin/final-project/assets/121536857/82be80c2-79ad-45a9-a012-0549672494e2">
</details>

<details>
 <summary>커버이미지 업로드</summary>
 <img width="825" alt="Screen Shot 2024-02-06 at 9 10 24 PM" src="https://github.com/hyeomin/final-project/assets/121536857/ad919924-80c0-4f7f-8a5d-2148740fa262">
</details>


### 게시글 상세페이지

게시글 작성 후 해당 게시글을 누르고 들어가면 상세 내용이 보입니다. 내가 작성한 게시글인 경우 오른쪽에 … 버튼을 눌러서 게시글 수정 혹은 삭제가 가능합니다.
하단에는 댓글을 남길 수 있으며, 로그인을 안한 경우에는 모달을 띄워서 작성을 막는 방식으로 로그인을 유도하고 있습니다. 하단 ‘이전 게시물’ ‘다음 게시물’을 누르면 다른 게시물로 이동합니다.

<details>
 <summary>게시글 상세페이지</summary>
 <img width="1001" alt="Screen Shot 2024-02-06 at 9 14 30 PM" src="https://github.com/hyeomin/final-project/assets/121536857/aacdfe3e-181f-4196-b84a-2dd4c9345227">
</details>


### 마이페이지

오른쪽 상단을 누르면 유저 관련 정보를 확인할 수도 있으며, 마이페이지로 이동 혹은 로그아웃을 실행시킬 수 있습니다.

<details>
 <summary>Auth Toggle</summary>
<img width="333" alt="Screen Shot 2024-02-06 at 9 25 52 PM" src="https://github.com/hyeomin/final-project/assets/121536857/8f878035-51dc-4081-9b14-d02374cf5ff7">
</details>

마이페이지에서는 프로필 이름과 사진 수정이 가능하며, 지금까지 올린 게시물 수, 받은 좋아요 수 기준 랭킹과 등급을 확인할 수 있습니다.

<details>
 <summary>프로필 관리</summary>
<img width="1039" alt="Screen Shot 2024-02-06 at 9 15 19 PM" src="https://github.com/hyeomin/final-project/assets/121536857/c14b45e6-535b-4e0a-b11c-9884c22d8f42">
</details>

각 캘린더 해당일자에 몇 개의 글을 썼는지 확인할 수 있습니다.

<details>
 <summary>망고 캘린더</summary>
![망고캘린더](https://github.com/hyeomin/final-project/assets/121536857/9f9f2e2d-4486-4bbb-bbab-7baf7f6c70fa)
</details>

각각 탭을 눌러 내가 작성한 게시글과 좋아요 한 게시글을 확인할 수 있습니다.

<details>
 <summary>나의 관련 게시글</summary>
<img width="1031" alt="Screen Shot 2024-02-06 at 9 30 59 PM" src="https://github.com/hyeomin/final-project/assets/121536857/4bef2fd4-5193-4728-8cc5-0c75f725f18d">
</details>

### 망고 소개

망고 소개 페이지에서는 동적인 영상 재생과 함께 하단에 망고 서비스의 취지와 이용안내가 담겨있습니다.

<details>
 <summary>상단 영상</summary>
<img width="1307" alt="Screen Shot 2024-02-06 at 9 32 26 PM" src="https://github.com/hyeomin/final-project/assets/121536857/0b20f77a-f564-48c9-b85e-569748023b02">
</details>

<details>
 <summary>소개 내용</summary>
<img width="1241" alt="Screen Shot 2024-02-06 at 9 32 37 PM" src="https://github.com/hyeomin/final-project/assets/121536857/daa8c9e4-9979-4921-924c-d80d38e96427">
</details>

어드민은 뉴스룸에 유튜브 링크를 첨부하여 유튜브 API로 반환받은 정보들을 카드로 만들 수 있습니다.

<details>
 <summary>뉴스룸</summary>
<img width="1247" alt="Screen Shot 2024-02-06 at 9 35 12 PM" src="https://github.com/hyeomin/final-project/assets/121536857/7c167c3f-3604-440a-97cd-bb6e7a81e9b0">
</details>

<details>
 <summary>Get Started</summary>
<img width="1171" alt="Screen Shot 2024-02-06 at 9 35 42 PM" src="https://github.com/hyeomin/final-project/assets/121536857/3caff683-d806-4d4d-9bba-6f87c971b4f1">
</details>
