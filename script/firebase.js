const firebaseConfig = {
  apiKey: "AIzaSyB2Mo0py70RAyKSId-h9uzGI7UZRukni3w",
  authDomain: "electron-59067.firebaseapp.com",
  databaseURL: "https://electron-59067-default-rtdb.firebaseio.com",
  projectId: "electron-59067",
  storageBucket: "electron-59067.appspot.com",
  messagingSenderId: "910549463067",
  appId: "1:910549463067:web:da2a4ad2e3e4c9639c08be",
  measurementId: "G-9SF86WJ68J",
};

var { initializeApp } = require("firebase/app");
var { getAuth } = require("firebase/auth");
require("firebase/auth");
require("firebase/firestore");
var admin = require('firebase-admin');
var { getDatabase, onValue } = require('firebase/database');




const serviceAccount = require("../assets/json/electron-59067-firebase-adminsdk-5e07a-d8340b74cb.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://electron-59067-default-rtdb.firebaseio.com",
});

const appFirebase = initializeApp(firebaseConfig);
const auth = getAuth(appFirebase);
const database = getDatabase();

const ref = admin.database().ref("user1/chat/Message");

// ref.on('value', (snapshot) => {
//   const message = snapshot.val();
//   console.log('Message:', message);
// }, (errorObject) => {
//   console.log('The read failed: ' + errorObject.name);
// });

// let list = document.getElementById("userList");
async function fetchUserEmails() {
  try {
    const userList = await admin.auth().listUsers();
    const userEmails = userList.users.map((user) => user.email);
    // list.innerHTML += userEmails;
    console.log("user",userEmails);
    return userEmails;
  } catch (error) {
    console.error("Error fetching user emails:", error.message);
    return [];
  }
}
const chatRef = admin.database().ref("chats");

const newChatData = {
  chatId: "chat123",
  messages: [
    {
      sender: "user1",
      message: "Hello!",
      timestamp: Date.now(),
    },
    {
      sender: "user2",
      message: "Hi there!",
      timestamp: Date.now(),
    },
  ],
};

// chatRef.child(newChatData.chatId).set(newChatData)
//   .then(() => {
//     console.log('New chat section added to the database.');
//   })
//   .catch((error) => {
//     console.error('Error adding chat section:', error);
//   });

function sendUserEmailsToRenderer(userEmails) {
  mainWindow.webContents.send("user-emails", userEmails);
}
// fetchUserEmails()
//   .then((userEmails) => {
//     console.log("Registered user emails:", userEmails);
//     sendUserEmailsToRenderer(userEmails);
//   })
//   .catch((error) => {
//     console.error("Error fetching user emails:", error.message);
//   });
