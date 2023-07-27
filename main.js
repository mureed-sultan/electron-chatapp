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
require("firebase/auth");
var admin = require("firebase-admin");
const serviceAccount = require("./assets/json/electron-59067-firebase-adminsdk-5e07a-d8340b74cb.json");

const { app, BrowserWindow, ipcMain } = require("electron");
const {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} = require("firebase/auth");
const {
  getFirestore,
  collection,
  getDocs,
  addDoc,
} = require("firebase/firestore");
require("firebase/auth");

const appFirebase = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore(appFirebase);
const usersRef = collection(db, "users");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://electron-59067-default-rtdb.firebaseio.com",
});









const ref = admin.database().ref("chats/user1_user2/messageId2/message");

// ref.on(
//   "value",
//   (snapshot) => {
//     const message = snapshot.val();
//     console.log("Message:", message);
//   },
//   (errorObject) => {
//     console.log("The read failed: " + errorObject.name);
//   }
// );

const dbRef = admin.database().ref("chats/MureedSultan_MubeenOlkh");

async function addNewMessage() {
  try {
    const newMessageRef = dbRef.push(); // Generate a unique key for the new message
    await newMessageRef.set({
      sender: "Mubben Olkh",
      message: "Great Very Great",
      timestamp: Date.now(),
    });
    console.log("New message added to the database.");
  } catch (error) {
    console.error("Error adding new message to the database: ", error);
  }
}

// Call the addNewMessage function to add a new message
// addNewMessage();


async function displayChatMessages() {
  try {
    const snapshot = await dbRef.once("value");
    const messages = snapshot.val();

    if (messages) {
      console.log("Chat Messages:");
      Object.keys(messages).forEach((messageId) => {
        const { sender, message, timestamp } = messages[messageId];
        const date = new Date(timestamp).toLocaleString();
        mainWindow.webContents.send("updateChat",date, sender, message)

        console.log(`${date} | ${sender}: ${message}`);
      });
    } else {
      console.log("No messages found.");
    }
  } catch (error) {
    console.error("Error retrieving chat messages: ", error);
  }
}

// Call the function to display chat messages
displayChatMessages();



















getDocs(usersRef)
  .then((querySnapshot) => {
    if (querySnapshot.empty) {
      console.log("No documents found in the 'users' collection.");
    } else {
      querySnapshot.forEach((doc) => {
        console.log(doc.data().phoneNumber)
        mainWindow.webContents.send(
          "updateUsers",
          doc.data().firstName + " " + doc.data().lastName
        );
      });
    }
  })
  .catch((error) => {
    console.error("Error fetching documents from 'users' collection:", error);
  });

function handleAuthUser(event, email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("userloged in ");
    })
    .catch((error) => {
      console.log(error.code);
    });
}
function cleanPhoneNumber(phoneNumber) {
  const phoneNumberParts = phoneNumber.split(" ");
  const remainingNumber = phoneNumberParts[1];
  const cleanedNumber = remainingNumber.replace(/-/g, "");
  return cleanedNumber;
}
const handleRegUser = (event, firstName, lastName, phoneNo) => {
  let usrReg = {
    firstName: firstName,
    lastName: lastName,
    phoneNumber: phoneNo,
  };
  createUserWithEmailAndPassword(
    auth,
    firstName + "@email.com",
    cleanPhoneNumber(phoneNo)
  )
    .then((userCredential) => {
      console.log("User registration successful:", userCredential.user.email);
      mainWindow.loadFile(`./pages/chat.html`);
    })
    .catch((error) => {
      console.error("User registration error:", error.code);
    });
  addDoc(usersRef, usrReg)
    .then((docRef) => {
      console.log("Document written with ID:", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document to 'users' collection:", error);
    });
};

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      preload: __dirname + "/preload.js",
    },
  });

  mainWindow.loadFile("./pages/chat.html");
  ipcMain.on("auth-user-firebase", handleAuthUser);
  ipcMain.on("reg-user-firebase", handleRegUser);
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


ipcMain.on("login", (event, email, password) => {
  loginWithEmailAndPassword(email + "@email.com", password);
  event.reply("login-response", "Login request received.");
});

ipcMain.on("reg-user-data", (event, userObj) => {
  const cleanedPhoneNumber = cleanPhoneNumber(userObj.phoneNumber);
  userRegister(
    userObj.firstName + userObj.lastName + "@email.com",
    cleanedPhoneNumber
  );
});
