import { db } from '../shared/firebase';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';

interface ShareItem {
  //id: string;
  title: string;
  content: string;
  category: string;
}

export const getShareList = async (): Promise<ShareItem[]> => {
  const q = query(collection(db, 'test'), where('category', '==', 'sharing'));
  const querySnapShot = await getDocs(q);

  return querySnapShot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as ShareItem)
  }));
};
