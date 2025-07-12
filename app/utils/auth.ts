import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_DETAILS = "scribbly-user-details";
const SETTINGS = "scribbly-settings";


// Verify pin
export const verifyPin = async (inputPin: string) => {
  const savedDetails: any = await AsyncStorage.getItem(USER_DETAILS);
  const parsed = JSON.parse(savedDetails);
  console.log(parsed);
  return inputPin === parsed.pin;
};

// fetch name for display in home
export const fetchName =  async() => {
  const userDetails: any = await AsyncStorage.getItem(USER_DETAILS);
  const parsed = JSON.parse(userDetails)
  if (!userDetails) {console.log('no user details')}
  return parsed.name
};

// Create user
export const createUser = async (form: any) => {
  await AsyncStorage.setItem(USER_DETAILS, JSON.stringify(form));
  console.log("account details saved!");
};

export const switchMode=async(mode:string)=>{
  const currentSettings = await AsyncStorage.getItem(SETTINGS)
  console.log(currentSettings)
}
