const { app, BrowserWindow } = require('electron');
const path = require('path');

let PROJECT_ID = "jylv2qqp";
let DATASET = "production";
const QUERY = encodeURIComponent('*[_type == "user"]{..., chatThreads[]->{participants[]->{firstName, lastName}}, friendList[]->{user->{firstName, lastName}, friendUser->{firstName, lastName}}}');


let UrlGet = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;
fetch(UrlGet)
.then((res) => res.json())
.then(({ result }) => {
// console.log(result)
})
.catch((err) => console.error(err));

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadFile('./pages/home.html');

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
