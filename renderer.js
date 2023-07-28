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
if (sender == 'Mureed Sultan') {
    chatBox.innerHTML += '<li class="right-message"><span>'+message+'</span></li>'
}else{
    chatBox.innerHTML += '<li class="left-message"><span>'+message+'</span></li>'
}
});
window.clearChatSec.onChangeChat((date, data) => {
  console.log("This sec work")
    chatBox.innerHTML = '<li class="left-message">No Chat Found</span></li>'
});


setTimeout(() => {
    const userItem = document.getElementsByClassName("users-render");
    const chatPerson = document.getElementById("chatperson-name");  
    const handleClick = (clickedElement) => {
      Array.from(userItem).forEach((e) => {
        if (e === clickedElement) {
          e.classList.add("active");
          chatPerson.innerHTML = e.innerHTML;
          
          window.sendChatPerson.firebaseChatPerson(chatPerson.innerHTML.replace(" ", ""));

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
  
  function sendChatMessage() {
      event.preventDefault();
    const messageEnter = document.getElementById('message-input').value
    console.log(messageEnter)
    window.sendChat.firebaseChat(messageEnter);
  }