function navigateToOTP() {
  const selectedCountryCode =
    document.getElementById("countryCodeSelect").value;
  const phoneNumber = document.querySelector(".phone-number").value;
  const queryParams = `?countryCode=${encodeURIComponent(
    selectedCountryCode
  )}&phoneNumber=${encodeURIComponent(phoneNumber)}`;
  if (phoneNumber.length>=5) {
    window.location.href = `../pages/otp.html${queryParams}`;
  }else{
    alert("Please Enter real Phone")
  }
}
function navigateToFullName() {
  let phoneNo = document.getElementById("phoneNumber").innerHTML;
  const queryParams = `?phoneNo=${encodeURIComponent(phoneNo)}`;
  window.location.href = `fullname.html${queryParams}`;
}



function getURLParameter(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  const results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function displayPhoneNumber() {
  const countryCode = getURLParameter("countryCode");
  const phoneNumber = getURLParameter("phoneNumber");

  const formattedPhoneNumber = `${countryCode} ${phoneNumber.slice(
    0,
    3
  )}-${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`;

  const phoneNumberDisplay = document.querySelector(".phone-number-display");
  phoneNumberDisplay.textContent = `${formattedPhoneNumber}`;
}

document.addEventListener("DOMContentLoaded", displayPhoneNumber);

