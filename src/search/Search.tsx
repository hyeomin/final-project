import React, { useState } from 'react';
// import { doc } from 'firebase/firestore';
// import algoliasearch from 'algoliasearch/lite';
// import { InstantSearch, SearchBox, Hits, RefinementList, Configure } from 'react-instantsearch-hooks-web';
// import { useNavigate } from 'react-router-dom';
import { collection, endAt, getDocs, orderBy, query, startAt, where } from 'firebase/firestore';
import { db } from '../shared/firebase';
import { useNavigate } from 'react-router-dom';
//데이터 가져오고 , filter
// const searchClient = algoliasearch(
//   process.env.REACT_APP_ALGOLIA_ID as string,
//   process.env.REACT_APP_ALGOLIA_SEARCH_KEY as string
// );

function Search() {
  // const navigate = useNavigate();
  // const Post = ({ hit }: { hit: any }) => {
  // const functions = require('firebase-functions');
  // const admin = require('firebase-admin');

  // // Set up Algolia
  // const { default: algoliasearch } = require('algoliasearch');
  // const algoliaClient = algoliasearch(functions.config().algolia.appid_dev, functions.config().algolia.apikey_dev);
  // const indexName = 'dev_title';
  // const collectionIndex = algoliaClient.initIndex(indexName);

  // // Create a HTTP request cloud functions
  // exports.sendCollectionToAlgolia = functions.region('asia-northeast2').https.onRequest(async (request, response) => {
  //   const firestore = admin.firestore();
  //   const algoliaRecords = [];
  //   const snapshot = await firestore.collection('posts').listDocuments.get();
  //   snapshot.forEach((doc) => {
  //     const document = doc.data();
  //     const record = {
  //       objectID: doc.id,
  //       title: document.title
  //     };
  //     algoliaRecords.push(record);
  //   });

  //   // After all records are created, save them to Algolia
  //   collectionIndex.saveObjects(algoliaRecords, (_error, content) => {
  //     response.status(200).send('COLLECTION was indexed to Algolia successfully.');
  //   });
  // });
  // navigate('/searchPage');
  //   return (
  //     <article>
  //       <h1>{hit.title}</h1>
  //       <p>{hit.content}</p> <button onClick={() => Post(hit)}>Search</button>
  //     </article>
  //   );
  // };
  // return (
  //   <InstantSearch searchClient={searchClient} indexName="posts">
  //     <SearchBox />
  //     <RefinementList attribute="UserId" />
  //     <Hits hitComponent={Post} />
  //     <Configure hitsPerPage={10} />
  //   </InstantSearch>
  // );
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const searchPosts = async (posts: string) => {
    try {
      //hashtags
      const postsRef = collection(db, 'posts');
      const test = query(postsRef, where('title', '>=', [searchTerm]));
      // const q = query(postsRef, where('hashtags', 'array-contains', searchTerm)); // array-contains--> 배열만 가능
      // const querySnapshot = await getDocs(q);
      const querySnapshot = await getDocs(test);

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
