import React, { useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../shared/firebase';
import { useNavigate } from 'react-router-dom';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const searchPosts = async (post: string) => {
    const postsRef = collection(db, 'posts');
    const q = query(postsRef, where('hashtags', 'array-contains', searchTerm));
    const querySnapshot = await getDocs(q);
    console.log('찍히나');
    querySnapshot.forEach((doc) => {
      console.log(doc.id, ' => ', doc.data());
    });
    navigate('/searchPage');
  };
  return (
    <>
      <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="검색" />
      <button onClick={() => searchPosts(searchTerm)}>Search</button>
    </>
  );
}

export default Search;
