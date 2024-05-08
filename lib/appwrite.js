import { Account, Client } from "react-native-appwrite";

// import { Account, Client } from "";
export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.lolly.vidsh",
  projectId: "6638343800113cab3d3f",
  databaseId: "663835ff001dab22b1df",
  userCollectionId: "6638363700161e139b87",
  videoCollectionId: "663836610022d20e3335",
  storageId: "6638387400087e4461e6",
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
  .setProject(appwriteConfig.projectId) // Your project ID
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
export const createUser = () => {
  // Register User
  account.create(ID.unique(), "me@example.com", "password", "Jane Doe").then(
    function (response) {
      console.log(response);
    },
    function (error) {
      console.log(error);
    }
  );
};
