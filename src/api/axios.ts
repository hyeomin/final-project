import axios from 'axios';

const baseURL = `https://firestore.googleapis.com/v1/projects/mango-final/databases/(default)/documents/users`;

export const fetchUsers = async (): Promise<User[] | undefined> => {
  try {
    const resp = await axios.get(baseURL);
    // console.log('resp===>', resp);
    console.log('resp===>', resp.data.documents);
    const users = resp.data.documents.map((doc: any) => {
      const userData: User = {
        displayName: doc.fields.displayName.stringValue,
        profileImg: doc.fields.profileImg.stringValue,
        uid: doc.fields.uid.stringValue
      };
      return userData;
    });
    console.log('users==>', users);
    return users;
  } catch (error) {
    console.error('user 데이터 가져오기 실패!', error);
    return [];
  }
};
