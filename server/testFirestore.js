const db = require('./config/db');

db.collection('test').get()
  .then(snapshot => {
    console.log('Successfully connected to Firestore. Documents:', snapshot.size);
  })
  .catch(error => {
    console.error('Error connecting to Firestore:', error);
  });


  