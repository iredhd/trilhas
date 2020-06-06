const admin = require('firebase-admin');
const fs = require('fs');
const { v4: uuid } = require('uuid');
const path = require('path');

const UserController = {
  updateProfilePicture: async ({ headers, body }, res) => {
    let token = headers.authorization || '';
    token = token.split('Bearer ')[1];

    if (!token) {
      return res.status(300).json({
        error: 'NO_AUTH_TOKEN'
      });
    }

    let user;

    const { image } = body;

    if (!image) {
      return res.status(400).json({
        error: 'NO_IMAGE_BASE64'
      });
    }

    try {
      user = await admin.auth().verifyIdToken(token);
    } catch (e) {
      return res.status(300).json({
        error: 'INVALID_AUTH_TOKEN'
      });
    }

    try {
      const id = uuid();
      
      const storage = admin.storage().bucket();
      const userRef = admin.firestore().collection('users').doc(user.uid);

      const userData = (await userRef.get()).data();

      if (userData.profile_picture) {
        const [encodedFileName] = path.basename(userData.profile_picture).split('?')
        const decodedFileName = decodeURIComponent(encodedFileName);
        
        const fileToDelete = storage.file(decodedFileName);
        
        fileToDelete.delete()
      }

      const tmpFile = `/tmp/${id}.jpg`;

      fs.writeFileSync(tmpFile, image, 'base64');
      
      const [file] = await storage.upload(tmpFile, {
        uploadType: 'media',
        destination: `profile-pictures/${id}.jpg`,
        metadata: {
          contentType: 'image/jpeg',
          firebaseStorageDownloadTokens: id
        }
      });

      const fileName = encodeURIComponent(file.name);
      const profile_picture = 'https://firebasestorage.googleapis.com/v0/b/' + storage.name + '/o/' + fileName + '?alt=media&token=' + id
      
      await userRef.set({
        profile_picture
      }, { merge: true });

      const newUserData = await userRef.get();

      return res.status(200).json(newUserData.data());
    } catch (e) {
      return res.status(500).json({
        error: 'UPLOAD_FAIL'
      });
    }
  },
};

module.exports = UserController;
