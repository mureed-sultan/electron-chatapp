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
const ipc = require("electron").ipcMain;
require("firebase/auth");
require("firebase/firestore");
var admin = require("firebase-admin");
var { getDatabase, onValue } = require("firebase/database");

const serviceAccount = require("./assets/json/electron-59067-firebase-adminsdk-5e07a-d8340b74cb.json");

const { app, BrowserWindow, ipcMain } = require("electron");
const {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} = require("firebase/auth");
require("firebase/auth");
require("firebase/firestore");

function createWindow() {
  let icounter = 1;
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: __dirname + "/preload.js",
    },
  });

  mainWindow.loadFile("./pages/chat.html");
  setInterval(() => {
    icounter ++;
    mainWindow.webContents.send("something happend",icounter)
  }, 1500);
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

function loginWithEmailAndPassword(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      mainWindow.loadFile(`./pages/chat.html`);
      console.log("User logged in:", user.email);
    })
    .catch((error) => {
      console.error("Login error:", error);
    });
}

const userRegister = (userEmail, userPass) => {
  createUserWithEmailAndPassword(auth, userEmail, userPass)
    .then((userCredential) => {
      console.log("User registration successful:", userCredential.user.email);
      mainWindow.loadFile(`./pages/chat.html`);
    })
    .catch((error) => {
      console.error("User registration error:", error.code);
    });
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://electron-59067-default-rtdb.firebaseio.com",
});

const appFirebase = initializeApp(firebaseConfig);
const auth = getAuth(appFirebase);
const database = getDatabase();

const ref = admin.database().ref("user1/chat/Message");

ref.on('value', (snapshot) => {
  const message = snapshot.val();
  console.log('Message:', message);
}, (errorObject) => {
  console.log('The read failed: ' + errorObject.name);
});

// let list = document.getElementById("userList");
async function fetchUserEmails() {
  try {
    const userList = await admin.auth().listUsers();
    const userEmails = userList.users.map((user) => user.email);
    // list.innerHTML += userEmails;
    console.log("user", userEmails);
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

function cleanPhoneNumber(phoneNumber) {
  const phoneNumberParts = phoneNumber.split(" ");
  const remainingNumber = phoneNumberParts[1];
  const cleanedNumber = remainingNumber.replace(/-/g, "");
  return cleanedNumber;
}
ipcMain.on("login", (event, email, password) => {
  loginWithEmailAndPassword(email + "@email.com", password);
  event.reply("login-response", "Login request received.");
});

ipcMain.on("save-user-data", (event, userObj) => {
  const cleanedPhoneNumber = cleanPhoneNumber(userObj.phoneNumber);
  userRegister(userObj.firstName + userObj.lastName+ "@email.com", cleanedPhoneNumber);
});