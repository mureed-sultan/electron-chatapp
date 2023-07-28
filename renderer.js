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
let chatBox = document.getElementById("chat-messages");
setTimeout(() => {
  const userItem = document.getElementsByClassName("users-render");
  const chatPerson = document.getElementById("chatperson-name");
  const handleClick = (clickedElement) => {
    Array.from(userItem).forEach((e) => {
      if (e === clickedElement) {
        e.classList.add("active");
        chatPerson.innerHTML = e.innerHTML;

        window.sendChatPerson.firebaseChatPerson(
          chatPerson.innerHTML.replace(" ", "")
        );
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
  const anchrUser = document.querySelectorAll("ul.user-list li");
  Array.from(anchrUser).forEach((e) => {
    e.addEventListener('click',()=>{
      chatBox.innerHTML = '';
    })
  });
}, 2000);
window.getChat.onGetChat((date, sender, message, authUser) => {
  if (sender == authUser) {
    chatBox.innerHTML +=
    '<li class="right-message"><span>' + message + "</span></li>";
  } else {
    chatBox.innerHTML +='<li class="left-message"><span>' + message + "</span></li>";
  }
});
window.clearChatSec.onChangeChat((date, data) => {
  chatBox.innerHTML = '<li class="left-message">No Chat Found</span></li>';
});


function sendChatMessage() {
  const messageEnter = document.getElementById("message-input");
  window.sendChat.firebaseChat(messageEnter.value);
  messageEnter.value ="";
}
