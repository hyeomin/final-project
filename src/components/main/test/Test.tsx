import React from "react";
// import St from '../style';
// import { useState } from 'react';
// import { getComments, getPosts } from './posts';
// import { useQuery, useQueryClient } from '@tanstack/react-query';

// import { QUERY_KEYS } from '../../../query/keys';
// import usePostsQueryTest from './usePostsQueryTest';

// function Main() {
//   const queryClient = useQueryClient();
//   const [content, setContent] = useState('');
//   const onChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => setContent(e.target.value);

//   const { data } = useQuery({
//     queryKey: [QUERY_KEYS.POSTS],
//     queryFn: getPosts
//   });
//   // data에는 아이디 값이 있는데 왜 comments에는 아이디 값이 없지? uuid를 써야하나
//   console.log('data ====>', data);

//   const { data: comments } = useQuery({
//     queryKey: ['comments'],
//     queryFn: getComments
//   });
//   console.log('comments ====>', comments);

//   const { addMutate, updateMutate, deleteMutate, deleteCommentMutate } = usePostsQueryTest();

//   const onSubmitAddBtnClick = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const newPost: Post = {
//       content,
//       createdAt: Date.now()
//     };
//     addMutate(newPost)
//   };
  
//   const onClickDeleteBtn = (id: string) => {
//     deleteMutate(id);
//   };
//   const onClickUpdateBtn = (id: string) => {
//     updateMutate({ id, content });
//   };

//   const deleteCommentBtn = (id: string) => {
//     deleteCommentMutate(id);
//   };
//   const updateCommentBtn = (id: string) => {};

//   const onClickViewAllButton = () => {};
//   const onClickTopRankingAdminPosts = () => {};
//   const onClickRecommendation = () => {};
//   const onClickSharing = () => {};

//   return (
//     <St.Container>
//       <form onSubmit={onSubmitAddBtnClick}>
//         <input value={content} onChange={onChangeContent} type="text" />
//         <button type="submit">추가</button>
//       </form>
//       {data?.map((post) => {
//         return (
//           <div key={post.id} style={{ border: '1px solid black', padding: '10px', margin: '10px' }}>
//             <p>{post.uid}</p>
//             <p>{post.content}</p>
//             <p>{post.createdAt}</p>
//             <p>{post.id}</p>
//             <button onClick={() => onClickDeleteBtn(post.id!)} type="button">
//               삭제
//             </button>
//             <button onClick={() => onClickUpdateBtn(post.id!)} type="button">
//               수정
//             </button>
//           </div>
//         );
//       })}
//       {comments?.map((item) => {
//         return (
//           <div key={item.id} style={{ border: '1px solid black', padding: '10px', margin: '10px' }}>
//             <p>{item.content}</p>
//             <p>{item.uid}</p>
//             <p>{item.id}</p>
//             <button onClick={() => deleteCommentBtn(item.id!)} type="button">
//               삭제
//             </button>
//             <button onClick={() => updateCommentBtn(item.id!)} type="button">
//               수정
//             </button>
//           </div>
//         );
//       })}
//       <St.AdminSection>
//         <img src="" alt="" />
//         <St.PrevNextBottons>
//           <button>prev</button>
//           <button>next</button>
//         </St.PrevNextBottons>
//       </St.AdminSection>
//       <St.TopRankingPosts>
//         <St.Title>
//           <h1>User Pick???</h1>
//           <button type="button" onClick={onClickViewAllButton}>
//             전체보기
//           </button>
//         </St.Title>
//         {/* <St.Nav> */}
//           {/* 전체가 탑랭킹 게시물로 표시된다면 인기 게시물 카테고리가 필요한지 고려 필요
//           <button type="button" onClick={onClickTopRankingAdminPosts}>
//             관리자 게시물
//           </button>
//           <button type="button">인기 게시물</button>
//           <button type="button" onClick={onClickRecommendation}>
//             환경보호 제품 추천
//           </button>
//           <button type="button" onClick={onClickSharing}>
//             제품 나눔
//           </button> */}
//         {/* </St.Nav> */}
//         <St.PostsSlide>
//           <St.ThumbnailsBox>
//             <li>
//               <img src="" alt="img1" />
//             </li>
//             <li>
//               <img src="" alt="img2" />
//             </li>
//             <li>
//               <img src="" alt="img3" />
//             </li>
//             <li>
//               <img src="" alt="img4" />
//             </li>
//           </St.ThumbnailsBox>
//           <div>
//             <button>prev</button>
//             <button>next</button>
//           </div>
//         </St.PostsSlide>
//       </St.TopRankingPosts>
//       {/* <section>
//         <h1>Top 10</h1>
//         <ul>
//             <li>user1</li>
//             <li>user2</li>
//             <li>user3</li>
//             <li>user4</li>
//             <li>user5</li>
//             <li>user6</li>
//             <li>user7</li>
//             <li>user8</li>
//             <li>user9</li>
//             <li>user10</li>
//         </ul>
//       </section> */}
//     </St.Container>
//   );
// }

// export default Main;
