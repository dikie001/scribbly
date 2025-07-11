import AsyncStorage from "@react-native-async-storage/async-storage"


const MENU_KEY = "scribbly-menu-state"

export const getMenuState=()=>{
    const menuState = AsyncStorage.getItem(MENU_KEY)
    return menuState
}