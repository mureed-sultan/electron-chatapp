const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("authUser", {
  authFirebase: (email, password) =>
    ipcRenderer.send("auth-user-firebase", email, password),
});

contextBridge.exposeInMainWorld("registerUser", {
  regFirebase: (firstName, lastName, phoneNumber) =>
    ipcRenderer.send("reg-user-firebase", firstName, lastName, phoneNumber),
});
contextBridge.exposeInMainWorld("getUsers", {
  onGetUser: (callback) => {
    // Listen for data updates from main.js and call the provided callback
    ipcRenderer.on("updateUsers", (_, data) => {
      callback(data);
    });
  },
});
contextBridge.exposeInMainWorld("getChat", {
  onGetChat: (callback) => {
    // Listen for data updates from main.js and call the provided callback
    ipcRenderer.on("updateChat", (_, date, sender, message) => {
      callback(date, sender, message);
    });
  },
});

contextBridge.exposeInMainWorld("clearChatSec", {
  onChangeChat: (callback) => {
    // Listen for data updates from main.js and call the provided callback
    ipcRenderer.on("clearChat", (_, data) => {
      callback(data);
    });
  },
});

contextBridge.exposeInMainWorld("sendChat", {
  firebaseChat: (chatText) => ipcRenderer.send("uploadChat", chatText),
});
contextBridge.exposeInMainWorld("sendChatPerson", {
  firebaseChatPerson: (chatPerson) => ipcRenderer.send("activeChatPerson", chatPerson),
});
