import { Stack } from "expo-router";
import "../global.css";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(screen)/Trash" options={{ headerShown: false }} />
      <Stack.Screen name="(screen)/Settings" options={{ headerShown: false }} />
      <Stack.Screen name="(screen)/ContactSupport" options={{ headerShown: false }} />
      <Stack.Screen
        name="(screen)/PrivacyPolicy"
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="(quickContact)/AuthSupport"
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
    </Stack>
  );
}
