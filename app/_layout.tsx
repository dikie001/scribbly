import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, Stack } from "expo-router";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import "../global.css";
import { MenuProvider } from "./context/MenuContext";
import MenuModal from "./modals/MenuModal";
import { getSettings } from "./utils/miniFunctions";

const howareyou = "kephkhale";
const USER_DETAILS = "scribbly-user-details";

type SettingsType = {
  displayMode: boolean;
  autoSave: boolean;
  viewMode: boolean;
  notifications: boolean;
  usePin: boolean;
};

export default function RootLayout() {
  const [settings, setSettings] = useState<any>([]);
  useEffect(() => {
    const allSettings = async () => {
      const currentSettings = await getSettings();
      const parsedSettings = currentSettings ? JSON.parse(currentSettings) : [];
      setSettings(parsedSettings);
    };

    allSettings();
  }, []);

  const CheckAuthenticationAndstatus = async () => {
    console.log("pin:", settings.usePin);
    if (settings.usePin === false){
      console.log('user specified not to use pin...')
      router.push("/")
    }
    else if (settings.usePin === true || !settings.usePin) {
      console.log('user allowed use of pin...')
      try {
        const userDetails = await AsyncStorage.getItem(USER_DETAILS);
        if (userDetails) {
          router.push("/authentication/Login");
        } else {
          router.push("/authentication/Signup");
        }
      } catch (err) {
        console.log("AsyncStorage: ", err);
      }
    }
  };
  useEffect(() => {
    CheckAuthenticationAndstatus();
  }, []);

  useEffect(()=>{
    CheckAuthenticationAndstatus()
  },[settings])

  return (
    <MenuProvider>
      <>
        <MenuModal />
        <Toast />
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="(screen)/Trash"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(screen)/Settings"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(screen)/ContactSupport"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(screen)/PrivacyPolicy"
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="(quickContact)/AuthSupport"
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="authentication/Signup"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="authentication/Login"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(quickContact)/BugReport"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(quickContact)/FeatureRequest"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(screen)/DeveloperInfo"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(screen)/ForgotPin"
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="(optionals)/BuyMeCoffee"
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="(screen)/ResetPin"
            options={{ headerShown: false }}
          />
        </Stack>
      </>
    </MenuProvider>
  );
}
