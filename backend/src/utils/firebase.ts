import admin from "firebase-admin";

import config from "config";

export default admin.initializeApp({
  credential: admin.credential.cert({
    projectId: config.get("projectId"),
    privateKey: config.get<string>("privateKey").replace(/\\n/gm, "\n"),
    clientEmail: config.get("clientEmail"),
  }),
  storageBucket: config.get("bucketUrl"),
});
