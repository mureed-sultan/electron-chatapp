// get login cridential and send to main file

function login() {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  window.authUser.authFirebase(email, password);
}

function saveUserDataAndNavigate() {
  const firstName = document.querySelector(".first-name").value;
  const lastName = document.querySelector(".last-name").value;
  const phoneNo = getURLParameter("phoneNo");
  const warningText = document.getElementById("warning-text");
  if (!firstName || !lastName || !phoneNo) {
    warningText.style.display = "block";
    setTimeout(() => {
      warningText.style.display = "none";
    }, 5000);
  } else {
    window.registerUser.regFirebase(firstName, lastName, phoneNo);
  }
}
const userListSec = document.getElementById("userList");
window.getUsers.onGetUser((data) => {
  userListSec.innerHTML += "<li><a class='users-render'>" + data + "</a></li>";
});
let chatBox = document.getElementById('chat-messages')
window.getChat.onGetChat((date, sender, message) => {
    console.log('sender', sender=="Mureed Sultan")
console.log(date, sender, message)
if (sender == 'Mureed Sultan') {
    chatBox.innerHTML += '<li class="right-message">'+message+'</li>'
}else{
    chatBox.innerHTML += '<li class="left-message">'+message+'</li>'
}

//   userListSec.innerHTML += "<li><a class='users-render'>" + data + "</a></li>";
});

setTimeout(() => {
    const userItem = document.getElementsByClassName("users-render");
    const chatPerson = document.getElementById("chatperson-name");  
    const handleClick = (clickedElement) => {
      Array.from(userItem).forEach((e) => {
        if (e === clickedElement) {
          e.classList.add("active");
          chatPerson.innerHTML = e.innerHTML;
        } else {
          e.classList.remove("active");
        }
      });
    };
  
    Array.from(userItem).forEach((e) => {
      e.addEventListener("click", () => {
        handleClick(e);
      });
    });
  }, 1000);
  
