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

const { app, BrowserWindow, ipcMain } = require("electron");
const { initializeApp } = require("firebase/app");
const {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} = require("firebase/auth");
require("firebase/auth");
require("firebase/firestore");

// require('./script/firebase.js')
const appFirebase = initializeApp(firebaseConfig);
const auth = getAuth(appFirebase);


function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: __dirname + "/preload.js",
    },
  });

  mainWindow.loadFile("./pages/chat.html");
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
ipcMain.on("login", (event, email, password) => {
  loginWithEmailAndPassword(email, password);
  event.reply("login-response", "Login request received.");
});

ipcMain.on("save-user-data", (event, userObj) => {
  userRegister(userObj.firstName + "@email.com", userObj.lastName);
});
