/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// import * as logger from "firebase-functions/logger";

import algoliasearch from 'algoliasearch';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp();
const db = admin.firestore();
const env = functions.config();

const client = algoliasearch(env.algolia.app_id, env.algolia.api_key);
const index = client.initIndex('posts');

export const onPostsCreated = functions
  .region('asia-northeast3')
  .firestore.document('posts/{productId}')
  .onCreate((snap, ctx) => {
    return index.saveObject({
      objectID: snap.id,
      ...snap.data()
    });
  });

export const onPostsDeleted = functions
  .region('asia-northeast3')
  .firestore.document('posts/{productId}')
  .onDelete((snap, ctx) => {
    return index.deleteObject(snap.id);
  });

export const sendCollectionToAlgolia = functions.region('asia-northeast3').https.onRequest(async (req, res) => {
  const algoliaRecords: any[] = [];

  const querySnapshot = await db.collection('posts').get();

  querySnapshot.docs.forEach((doc) => {
    const document = doc.data();
    const record = {
      objectID: doc.id,
      title: document.title,
      content: document.content,
      hashtags: document.hashtags
    };

    algoliaRecords.push(record);
  });

  index.saveObjects(algoliaRecords, (_error: any, content: any) => {
    res.status(200).send('posts was indexed to Algolia successfully.');
  });
});
