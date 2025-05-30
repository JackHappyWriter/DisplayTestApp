const { Firestore } = require('@google-cloud/firestore');

// Your GCP project ID
const projectId = 'mixtape-stage';

// Specify the database ID if it's not the default one.
// If your Firestore DB is named 'mixtape' and it's NOT the (default) database,
// you need to specify it here.
// If 'mixtape' IS the (default) database, you can omit the databaseId property.
const databaseId = 'mixtape'; // Assuming 'mixtape' is its actual databaseId

// Create a new client
const firestore = new Firestore({
  projectId: projectId,
  databaseId: databaseId // Only include this line if your 'mixtape' DB is not the (default) one
});

async function accessMixtapeFirestore() {
  try {
    // Example: Add a new document to a collection in your 'mixtape' database
    const docRef = firestore.collection('songs').doc('my-first-song');
    await docRef.set({
      title: 'Awesome Track',
      artist: 'Node.js Band',
      duration: 240,
      genre: 'Rock'
    });
    console.log('Document successfully written to Firestore!');

    // Example: Read a document
    const snapshot = await firestore.collection('songs').get();
    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    }
    snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
    });

  } catch (error) {
    console.error('Error accessing Firestore:', error);
  }
}

accessMixtapeFirestore();