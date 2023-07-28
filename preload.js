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
    ipcRenderer.on("updateUsers", (_, data) => {
      callback(data);
    });
  },
});
contextBridge.exposeInMainWorld("getChat", {
  onGetChat: (callback) => {
    ipcRenderer.on("updateChat", (_, date, sender, message, authUser) => {
      callback(date, sender, message,authUser);
    });
  },
});

contextBridge.exposeInMainWorld("clearChatSec", {
  onChangeChat: (callback) => {
    ipcRenderer.on("clearChat", (_, data) => {
      callback(data);
    });
  },
});

contextBridge.exposeInMainWorld("sendChat", {
  firebaseChat: (chatText) => ipcRenderer.send("uploadChat", chatText),
});
contextBridge.exposeInMainWorld("sendChatPerson", {
  firebaseChatPerson: (chatPerson) =>
    ipcRenderer.send("activeChatPerson", chatPerson),
});
