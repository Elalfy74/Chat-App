import admin from "firebase-admin";

import config from "config";

export default admin.initializeApp({
  credential: admin.credential.cert({
    projectId: config.get("FB_PROJECT_ID"),
    privateKey: config.get("FB_PRIVATE_KEY"),
    clientEmail: config.get("FB_CLIENT_EMAIL"),
  }),
  storageBucket: config.get("bucketUrl"),
});
