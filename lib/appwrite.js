import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  RateLimitException,
} from "react-native-appwrite";

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
const avartars = new Avatars(client);
const databases = new Databases(client);

export async function AddToDataBase(api) {
  const SpellLevel = Object.keys(api);

  const promises = SpellLevel.flatMap((Level) =>
    api[Level].map(async (spells) => {
      const spell = {
        SpellName: spells.spellName,
        School: spells.school,
        CastingTime: spells.castingTime,
        Range: spells.range,
        Duration: spells.duration,
        Components: spells.components,
        Description: spells.description,
        HigherLevel: spells.higherLevel,
        Class: spells.spelllists,
        SpellLevel: Level,
      };

      try {
        const Doc = await databases.createDocument(
          appwriteConfig.databaseId,
          appwriteConfig.videoCollectionId,
          ID.unique(),
          spell
        );
        return Doc;
      } catch (error) {
        if (error.code === "rate_limit_exceeded") {
          console.log("Rate limit exceeded. Retrying the request...");
          // Add your rate limit handling logic here
        } else {
          console.log(error);
          throw new Error(error);
        }
      }
    })
  );

  return Promise.all(promises);
}

export const createUser = async (email, username, password) => {
  // Validate the password before attempting to create the user
  if (password.length < 8 || password.length > 265) {
    throw new Error("Password must be between 8 and 265 characters long.");
  }

  // You may also want to check if the password is not a commonly used one
  // This might require a separate function or library to check against a list of common passwords

  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) throw new Error();

    const avatarUrl = avatars.getInitials(username);
    await signIn(email, password);

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    if (error.code === "rate_limit_exceeded") {
      console.log("Rate limit exceeded. Retrying the request...");
      // Add your rate limit handling logic here
    } else {
      console.log(error);
      throw new Error(error);
    }
  }
};

export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    if (error.code === "rate_limit_exceeded") {
      console.log("Rate limit exceeded. Retrying the request...");
      // Add your rate limit handling logic here
    } else {
      console.log(error);
      throw new Error(error);
    }
  }
}
