# 망고 Mango

## <b>프로젝트 소개</b>

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

<img src="https://teamsparta.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F83c75a39-3aba-4ba4-a792-7aefe4b07895%2F22012cde-6fae-4ac0-b9a8-7aac3b0242f8%2F%25E1%2584%2582%25E1%2585%25A9%25E1%2584%2589%25E1%2585%25A7%25E1%2586%25AB_%25E1%2584%258A%25E1%2585%25A5%25E1%2586%25B7%25E1%2584%2582%25E1%2585%25A6%25E1%2584%258B%25E1%2585%25B5%25E1%2586%25AF_(1).png?table=block&id=1651ea47-ce64-45c9-94a4-d8b54be94837&spaceId=83c75a39-3aba-4ba4-a792-7aefe4b07895">

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

<img width="1101" alt="Screen Shot 2024-01-22 at 10 00 18 AM" src="https://github.com/hyeomin/final-project/assets/121536857/3adedf5a-6de7-4c1b-bb89-bae1a28cfbb4">


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

<img width="1110" alt="Screen Shot 2024-01-22 at 9 57 05 AM" src="https://github.com/hyeomin/final-project/assets/121536857/aa616626-d5ec-4e7d-aea1-01e97401b675">
<img width="1092" alt="Screen Shot 2024-01-22 at 9 57 10 AM" src="https://github.com/hyeomin/final-project/assets/121536857/11e435b7-d027-49fa-9814-93785bbb2c19">


### 게시글 상세페이지

게시글 작성 후 해당 게시글을 누르고 들어가면 상세 내용이 보입니다. 내가 작성한 게시글인 경우 오른쪽에 … 버튼을 눌러서 게시글 수정 혹은 삭제가 가능합니다.

<img width="1116" alt="Screen Shot 2024-01-22 at 10 01 23 AM" src="https://github.com/hyeomin/final-project/assets/121536857/cda18979-3d41-4c23-85e1-7f84721ba97f">

하단에는 댓글을 남길 수 있으며, 로그인을 안한 경우에는 모달을 띄워서 작성을 막는 방식으로 로그인을 유도하고 있습니다. 하단 ‘이전 게시물’ ‘다음 게시물’을 누르면 다른 게시물로 이동합니다.

<img width="1119" alt="Screen Shot 2024-01-22 at 10 01 37 AM" src="https://github.com/hyeomin/final-project/assets/121536857/1d279bc3-d5f0-41fe-9a93-ac46c4e84771">

### 마이페이지

오른쪽 상단을 누르면 유저 관련 정보를 확인할 수도 있으며, 마이페이지로 이동 혹은 로그아웃을 실행시킬 수 있습니다.

<details>
 <summary>프로필 관리</summary>

</details>

마이페이지에서는 프로필 이름과 사진 수정이 가능하며, 지금까지 올린 게시물 수, 받은 좋아요 수 기준 랭킹과 등급을 확인할 수 있습니다.



각 캘린더 해당일자에 몇 개의 글을 썼는지 확인할 수 있습니다.

<img width="682" alt="Screen Shot 2024-01-22 at 9 57 49 AM" src="https://github.com/hyeomin/final-project/assets/121536857/2d66de20-5439-48c8-9adf-e1513f4b5e3b">

각각 탭을 눌러 내가 작성한 게시물과 좋아요 한 게시물을 확인할 수 있습니다.

<img width="1114" alt="Screen Shot 2024-01-22 at 9 57 56 AM" src="https://github.com/hyeomin/final-project/assets/121536857/48d8238b-6586-4045-96b9-3740ef119009">

### 망고 소개

망고 소개 페이지에서는 동적인 영상 재생과 함께 하단에 망고 서비스의 취지와 이용안내가 담겨있습니다.

<img width="1113" alt="Screen Shot 2024-01-22 at 9 58 02 AM" src="https://github.com/hyeomin/final-project/assets/121536857/649aa6e9-cab8-4877-a246-10f2747fcebf">
<img width="1115" alt="Screen Shot 2024-01-22 at 9 58 09 AM" src="https://github.com/hyeomin/final-project/assets/121536857/0152f847-b741-4bcc-b3e7-e367be80f5b1">
<img width="1107" alt="Screen Shot 2024-01-22 at 9 58 15 AM" src="https://github.com/hyeomin/final-project/assets/121536857/dc48a4e7-070e-4b5e-9a33-d11d7b80902e">
