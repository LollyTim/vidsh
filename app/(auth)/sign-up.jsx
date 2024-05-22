import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useState, useEffect } from "react";
import { useRouter, useNavigation } from "expo-router";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { createUser } from "../../lib/appwrite";
import { initializeApp } from "@firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "@firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA7NPzVymncAW3nGGOZtcnG59lAaYAz-EY",
  authDomain: "vidsh-5df72.firebaseapp.com",
  projectId: "vidsh-5df72",
  storageBucket: "vidsh-5df72.appspot.com",
  messagingSenderId: "365000814346",
  appId: "1:365000814346:web:e145dc70b87478b94094f3",
  measurementId: "G-NYH2N8R256",
};

const app = initializeApp(firebaseConfig);

const SignUp = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    console.log(form.email, form.password, form.username);
    // Add your sign-up logic here
    if (!form.username || !form.email || !form.password) {
      Alert.alert("ERROR", "Please fill all the fields");
      return;
    }
    setIsSubmitting(true);

    try {
      const result = await createUser(form.email, form.password, form.username);

      //set it tto global state....

      router.replace("/home");
    } catch (error) {
      Alert.alert("ERROR", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignIn = () => {
    router.push("/sign-in");
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", () => {
      // Clean up any resources or event listeners here
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[88vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl text-white font-psemibold mt-10">
            Sign up to Vidsh
          </Text>
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-10"
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />
          <CustomButton
            title={"Sign Up"}
            containerStyles={"mt-7"}
            handlePress={submit}
            isLoading={isSubmitting}
          />
          <View className=" justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Already have an account?
            </Text>
            <Text
              className="font-psemibold text-secondary text-lg underline"
              onPress={handleSignIn}
            >
              Sign In
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
