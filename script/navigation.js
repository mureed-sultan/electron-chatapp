
let PROJECT_ID = "jylv2qqp";
let DATASET = "production";
let QUERY = encodeURIComponent('*[_type == "user"]');
const API_TOKEN = 'skAhl0vQv23LlXtU3x0E6Ele9ED9z7sdWWCDBjf1HwTHMxi0WLDhQzyMoTnVcR6UhFQKJxa0yBli3DlyWQDQRZzci5oU9SA98fdBYv1fNrlrrzkxXTkwpwLV6P6xKhBSRfEYEVfbUPs7sZ2sc6ulsa4PrNZnNBIqEXqFOb3ULj9o7e6m5s15'; 

async function pushDataToSanity(data) {
  const apiUrl = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/${DATASET}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`,
      },
      body: JSON.stringify({ mutations: [{ create: data }] }),
    });

    const result = await response.json();
    console.log('Data pushed to Sanity:', result);
  } catch (error) {
    console.error('Error pushing data to Sanity:', error);
  }
}
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

function navigateToChat() {
  const firstName = document.querySelector(".first-name").value;
  const lastName = document.querySelector(".last-name").value;
  const phoneNo = getURLParameter("phoneNo");
  const userObj = {
    _type: 'user',
    firstName:firstName ,
    lastName: lastName,
    phoneNumber: phoneNo,
  };

  if (firstName.length > 3 & lastName.length>3) {
    console.log(pushDataToSanity(userObj) == 'Data pushed to Sanity')
    // window.location.href = `fullname.html${queryParams}`;

  }
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
