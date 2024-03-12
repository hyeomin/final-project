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


## <b>기술적 의사결정</b>

- **React**
    - 팀원 모두 React 관련 경험과 노하우가 쌓인 상태에서 완성도 높은 React 프로젝트를 구현하는 것을 목표로 삼았습니다. CSR 기반의 라이브러리인 React를 보다 장기 프로젝트에 적극 활용함으로써 CSR의 장점과 한계를 한층 더 깊이 이해하고자 했으며, 실제로 SSR 및 SSG의 등장 배경을 실감할 수 있었습니다. 특히, 서버 로직을 구축하는 데 필요한 시간과 자원을 UX 분석과 개선에 할당하고자 했습니다.
- **TypeScript**
    - 런타임에서 발생할 수 있는 많은 오류를 사전에 방지하고, 코드의 예측 가능성과 안정 가능성을 높이기 위해 타입스크립트를 활용하였습니다. 타입스크립트는 컴파일 시점 타입 검사를 수행하기 때문에 데이터의 구조와 예상되는 값의 종류를 명확하게 정의할 수 있고, 협업 시 발생할 수 있는 오해나 실수를 줄여주고 코드 가독성을 높여줍니다.
- **Firebase**
    - Firebase는 Supabase 대비 방대한 커뮤니티와 온라인 정보가 누적되어 있습니다. 이는 프로젝트 개발 과정에서 발생할 수 있는 다양한 문제들을 해결하고, 필요한 기술적 지원을 쉽게 얻을 수 있다는 것을 의미합니다. 반면, Supabase는 상대적으로 정보와 커뮤니티 지원이 부족하여, 프로젝트 진행 중에 발생할 수 있는 다양한 문제에 대응하기 어려울 수 있다고 판단하였습니다. 또한, 구체화된 SQL 구조 대신 파이어베이스의 NoSQL 접근 방식을 사용함으로써, 데이터 모델링의 유연성을 높이고자 했습니다.
- **React-Query**
    - 데이터 변경이 자주 일어나지 않는 API의 경우, 캐싱 처리를 하여 별도 API 호출 없이 캐싱된 데이터를 사용하여 API 호출 횟수를 줄일 수 있다는 장점이 있으며, ‘더보기’ 버튼을 눌러서 활성화 시키는 무한스크롤 기능을 구현하기에 적합합니다. 서버 통신을 하며 API 통신과 상태 업데이트, 데이터 캐싱, 지속적인 동기화, 재시도 등의 다양한 기능을 활용하였으며, Dev tools를 사용하여 디버깅 및 모니터링을 통해 상태, 쿼리 결과, 캐시 정보 등 확인할 수 있습니다.
- **Recoil**
    - 보일러플레이트가 리덕스보다 적고 간단하며, 직관적인 API를 제공하여 서버 통신을 하지 않는 전역 관리의 부분에서는 react-query와 상호보완적이라 판단하였습니다. 상태의 초기값이나 갱신 로직을 간단하게 선언적으로 정의할 수 있어 코드의 의도를 파악하기에 수월하였습니다. atom을 사용하여 상태를 정의하고, 상태를 읽고 갱신하는데 필요한 데이터를 처리하였고, 비동기적인 데이터 로딩 또는 상태 업데이트를 효과적으로 처리하였습니다.
- **Styled-components**
    - 스타일을 컴포넌트로 정의하게 되면 jsx 코드의 가독성이 높아지는 것 뿐만 아니라, 재활용성이 높아진다는 장점이 있습니다. 본 프로젝트는 게시글 전체 혹은 부분적으로 재활용 되어야 하는 컴포넌트들이 있었기 때문에 가장 적합하다고 판단하였습니다. props를 활용하여 프로퍼티 값이 상태에 따라 동적으로 변경되어야 할 때 유동적 스타일링이 가능하였습니다.


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
<img width="400" alt="post-list" src="https://github.com/hyeomin/final-project/assets/121536857/8107975a-edc7-4650-ab19-8d29376f1153">

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
<img width="400" alt="write-page" src="https://github.com/hyeomin/final-project/assets/121536857/1aff061d-b448-4e1a-91fe-0a9093999a32">

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
<img width="400" alt="detail-page" src="https://github.com/hyeomin/final-project/assets/121536857/b3888d8f-7ae7-4180-b0c7-5c053d9ac4fa">

게시글 작성 후 해당 게시글을 누르고 들어가면 상세 내용이 보입니다. 내가 작성한 게시글인 경우 오른쪽에 … 버튼을 눌러서 게시글 수정 혹은 삭제가 가능합니다.
하단에는 댓글을 남길 수 있으며, 로그인을 안한 경우에는 모달을 띄워서 작성을 막는 방식으로 로그인을 유도하고 있습니다. 하단 ‘이전 게시물’ ‘다음 게시물’을 누르면 다른 게시물로 이동합니다.

<details>
 <summary>게시글 상세페이지</summary>
 <img width="1001" alt="Screen Shot 2024-02-06 at 9 14 30 PM" src="https://github.com/hyeomin/final-project/assets/121536857/aacdfe3e-181f-4196-b84a-2dd4c9345227">
</details>


### 마이페이지
<img width="400" alt="my-page" src="https://github.com/hyeomin/final-project/assets/121536857/6be77648-14ea-4e5a-b85e-b6402ba30951">

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
 <img width="600" alt="mango-calendar" src="https://github.com/hyeomin/final-project/assets/121536857/1ef440d8-8202-4bea-bbf6-ce7059cb86b4">
</details>

각각 탭을 눌러 내가 작성한 게시글과 좋아요 한 게시글을 확인할 수 있습니다.

<details>
 <summary>나의 관련 게시글</summary>
<img width="1031" alt="Screen Shot 2024-02-06 at 9 30 59 PM" src="https://github.com/hyeomin/final-project/assets/121536857/4bef2fd4-5193-4728-8cc5-0c75f725f18d">
</details>


### 망고 소개

망고 소개 페이지에서는 동적인 영상 재생과 함께 하단에 망고 서비스의 취지와 이용안내가 담겨있습니다.

<details>
 <summary>상단 영상</summary>
<img width="1307" alt="Screen Shot 2024-02-06 at 9 32 26 PM" src="https://github.com/hyeomin/final-project/assets/121536857/0b20f77a-f564-48c9-b85e-569748023b02">
</details>

<details>
 <summary>소개 내용</summary>
<img width="1241" alt="Screen Shot 2024-02-06 at 9 32 37 PM" src="https://github.com/hyeomin/final-project/assets/121536857/daa8c9e4-9979-4921-924c-d80d38e96427">
</details>

어드민은 뉴스룸에 유튜브 링크를 첨부하여 유튜브 API로 반환받은 정보들을 카드로 만들 수 있습니다.

<details>
 <summary>뉴스룸</summary>
<img width="1247" alt="Screen Shot 2024-02-06 at 9 35 12 PM" src="https://github.com/hyeomin/final-project/assets/121536857/7c167c3f-3604-440a-97cd-bb6e7a81e9b0">
</details>

<details>
 <summary>Get Started</summary>
<img width="1171" alt="Screen Shot 2024-02-06 at 9 35 42 PM" src="https://github.com/hyeomin/final-project/assets/121536857/3caff683-d806-4d4d-9bba-6f87c971b4f1">
</details>
