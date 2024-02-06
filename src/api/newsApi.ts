import { addDoc, collection, deleteDoc, doc, getDocs, query } from 'firebase/firestore';
import { QUERY_KEYS } from 'query/keys';
import { db } from 'shared/firebase';
import { NewsType } from 'types/NewsType';

const addNews = async (newNews: Omit<NewsType, 'id'>) => {
  const docRef = await addDoc(collection(db, QUERY_KEYS.NEWS), newNews);
  const newsId = docRef.id;
  //console.log('News uploaded with ID:', newsId);
  return newsId;
};

const getNews = async () => {
  const q = query(collection(db, QUERY_KEYS.NEWS));
  const querySnapshot = await getDocs(q);
  const news: NewsType[] = [];
  querySnapshot.forEach((doc) => {
    const newsData = doc.data() as Omit<NewsType, 'id'>;
    news.push({ id: doc.id, ...newsData });
  });
  return news;
};

const deleteNews = async (newsId: string) => {
  await deleteDoc(doc(db, QUERY_KEYS.NEWS, newsId));
  //console.log('뉴스 삭제 완료');
};

export { addNews, deleteNews, getNews };
