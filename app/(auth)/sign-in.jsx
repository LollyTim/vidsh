import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";
import { useState, useEffect } from "react";
import { useRouter, useNavigation } from "expo-router";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";

const SignIn = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = () => {
    // Add your sign-in logic here
  };

  const handleSignUp = () => {
    router.push("/sign-up");
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
            Log in to Vidsh
          </Text>
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
            title={"Sign In"}
            containerStyles={"mt-7"}
            handlePress={submit}
            isLoading={isSubmitting}
          />
          <View className=" justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Text
              className="font-psemibold text-secondary text-lg underline"
              onPress={handleSignUp}
            >
              Sign Up
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
