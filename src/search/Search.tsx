import React, { useState } from 'react';
import { collection, endAt, getDocs, orderBy, query, startAt, where } from 'firebase/firestore';
import { db } from '../shared/firebase';
import { useNavigate } from 'react-router-dom';
//데이터 가져오고 , filter
function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const searchPosts = async (posts: string) => {
    try {
      //hashtags
      const postsRef = collection(db, 'posts');
      const q = query(postsRef, where('hashtags', 'array-contains', searchTerm)); // array-contains--> 배열만 가능
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        console.log('해시태그', doc.id, ' => ', doc.data());
      });

      // title, content
      const keyword = searchTerm;

      // const q = query(
      //   collection(db, 'posts'), // 포스트 컬렉션
      //   orderBy('title'), // 제목 정렬
      //   startAt(keyword),
      //   endAt(keyword + '\uf8ff')
      // );
      // const resSnap = await getDocs(q);

      // resSnap.forEach((doc) => {
      //   console.log(doc.data()); // 각 문서의 데이터 출력
      // });

      const titleQuery = query(postsRef, orderBy('title'), startAt(keyword), endAt(keyword + '\uf8ff'));
      const contentQuery = query(postsRef, orderBy('content'), startAt(keyword), endAt(keyword + '\uf8ff'));

      const [titleSnap, contentSnap] = await Promise.all([getDocs(titleQuery), getDocs(contentQuery)]);

      const allResults = [...titleSnap.docs, ...contentSnap.docs];

      allResults.forEach((doc) => {
        console.log('title 또는 content', doc.data()); // 각 문서의 데이터 출력
      });

      navigate('/searchPage');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="검색" />
      <button onClick={() => searchPosts(searchTerm)}>Search</button>
    </>
  );
}

export default Search;
