    // Function to fetch the image asset data from Sanity
    async function fetchImageAsset(assetRef) {
        const PROJECT_ID = "jylv2qqp";
        const DATASET = "production";
        const ASSET_ID = assetRef.split('-')[0]; // Get the asset ID from the _ref value
        const UrlGet = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/assets/${DATASET}/${ASSET_ID}`;
    
        try {
          const response = await fetch(UrlGet);
          if (!response.ok) {
            throw new Error('Failed to fetch image asset data from Sanity API');
          }
          const data = await response.json();
          return data;
        } catch (error) {
          console.error(error);
          return null;
        }
      }
    
        // Function to make the API request and fetch data
        async function fetchUsers() {
          try {
            const PROJECT_ID = "jylv2qqp";
            const DATASET = "production";
            const QUERY = encodeURIComponent('*[_type == "user"]{firstName, lastName, image}');
    
            const UrlGet = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;
    
            const response = await fetch(UrlGet);
            const data = await response.json();
    
            return data.result; // Assuming the data is returned in a 'result' property
          } catch (error) {
            console.error("Error fetching data:", error);
            return [];
          }
        }
    
        // Function to create the list items with user information
        async function createListItems(users) {
          const userListElement = document.getElementById("userList");
    
          for (const user of users) {
            const listItem = document.createElement("li");
            const image = document.createElement("img");
            const name = document.createTextNode(`${user.firstName} ${user.lastName}`);
    
            if (user.image && user.image.asset && user.image.asset._ref) {
            const assetRef = user.image.asset._ref;
            const ASSET_ID = assetRef.split('-')[1]; // Get the asset ID from the _ref value
            const ASSET_DIMENSIONS = '200x200'; // Adjust the dimensions as needed, e.g., 200x200
            const ASSET_FORMAT = 'jpg'; // Adjust the format as needed, e.g., jpg, png, etc.
            const imageUrl = `https://cdn.sanity.io/images/jylv2qqp/production/${ASSET_ID}-${ASSET_DIMENSIONS}.${ASSET_FORMAT}`;
            image.src = imageUrl;
          } else {
           console.log('imge not availbe')
          }
    
          
          listItem.appendChild(image);
          listItem.appendChild(name);
          
          userListElement.appendChild(listItem);
          listItem.addEventListener("click", () => {
            const chatMessagesContainer = document.getElementById('chat-messages');
            chatMessagesContainer.innerHTML = '';
    
            const chatThreadData = user.chatThreads;
            if (chatThreadData && chatThreadData.length > 0) {
              chatThreadData.forEach((chatThread) => {
                const participants = chatThread.participants;
                const chatParticipants = participants.map((participant) => `${participant.firstName} ${participant.lastName}`).join(', ');
    
                const chatThreadElement = document.createElement('div');
                chatThreadElement.innerHTML = `
                  <strong>Chat with: ${chatParticipants}</strong><br>
                  <!-- Add code to render the messages in 'chatThread' -->
                `;
                chatMessagesContainer.appendChild(chatThreadElement);
              });
            } else {
              const noChatElement = document.createElement('div');
              noChatElement.innerText = 'No chat messages found';
              chatMessagesContainer.appendChild(noChatElement);
            }
          });
          }
        }
    
        async function main() {
          const users = await fetchUsers();
          createListItems(users);
        }
    
        main();