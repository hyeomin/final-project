import { addDoc, collection, deleteDoc, doc, getDocs, query } from 'firebase/firestore';
import { QUERY_KEYS } from '../query/keys';
import { db } from '../shared/firebase';

export type NewsType = {
  id: string;
  youtubeId: string;
  title: string;
  date: string;
};

interface AddNewsProps {
  newNews: Omit<NewsType, 'id'>;
}

const addNews = async ({ newNews }: AddNewsProps) => {
  try {
    const docRef = await addDoc(collection(db, QUERY_KEYS.NEWS), newNews);
    const newsId = docRef.id;
    //console.log('News uploaded with ID:', newsId);
    return newsId;
  } catch (error) {
    console.error('Error adding news: ', error);
  }
};

const getNews = async () => {
  try {
    const q = query(collection(db, QUERY_KEYS.NEWS));
    const querySnapshot = await getDocs(q);
    const news: NewsType[] = [];
    querySnapshot.forEach((doc) => {
      const newsData = doc.data() as Omit<NewsType, 'id'>;
      news.push({ id: doc.id, ...newsData });
    });
    return news;
  } catch (error) {
    console.log('뉴스 불러오기 오류', error);
  }
};

const deleteNews = async (newsId: string) => {
  try {
    await deleteDoc(doc(db, QUERY_KEYS.NEWS, newsId));
    //console.log('뉴스 삭제 완료');
  } catch (error) {
    console.log('뉴스 삭제 오류', error);
  }
};

export { addNews, deleteNews, getNews };
