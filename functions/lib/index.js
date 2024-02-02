"use strict";
/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendCollectionToAlgolia = exports.onPostsDeleted = exports.onPostsCreated = void 0;
// import * as logger from "firebase-functions/logger";
const algoliasearch_1 = require("algoliasearch");
const admin = require("firebase-admin");
const functions = require("firebase-functions");
admin.initializeApp();
const db = admin.firestore();
const env = functions.config();
const client = (0, algoliasearch_1.default)(env.algolia.app_id, env.algolia.api_key);
const index = client.initIndex('posts');
exports.onPostsCreated = functions
    .region('asia-northeast3')
    .firestore.document('posts/{productId}')
    .onCreate((snap, ctx) => {
    return index.saveObject(Object.assign({ objectID: snap.id }, snap.data()));
});
exports.onPostsDeleted = functions
    .region('asia-northeast3')
    .firestore.document('posts/{productId}')
    .onDelete((snap, ctx) => {
    return index.deleteObject(snap.id);
});
exports.sendCollectionToAlgolia = functions.region('asia-northeast3').https.onRequest(async (req, res) => {
    const algoliaRecords = [];
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
    index.saveObjects(algoliaRecords, (_error, content) => {
        res.status(200).send('posts was indexed to Algolia successfully.');
    });
});
//# sourceMappingURL=index.js.map