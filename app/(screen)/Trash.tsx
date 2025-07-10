import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import { useCallback, useRef, useState } from "react";
import {
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MenuModal from "../(components)/Menu";
import "../../global.css";

const TRASH_KEY = "scribbly-trash";

type NoteType = {
  id: string;
  title: string;
  content: string;
  date: string;
  favourite: boolean;
};

export default function App() {
  const [extraMenu, setExtraMenu] = useState<boolean>(false);
  const [notes, setNotes] = useState<NoteType[]>();
  const [currentIndex, setCurrentIndex] = useState<number>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [trash, setTrash] = useState<NoteType[]>([]);
  const [isFavourite, setIsFavourite] = useState<boolean>();
  const currentIdRef = useRef<string | null>(null);
  const currentLikeRef = useRef<boolean | null>(null);
  const confirmRef = useRef<boolean | null>(null)
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState<boolean>(false);

  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [informationModalVisible, setInformationModalVisible] =
    useState<boolean>(false);


  const [viewNote, setViewNote] = useState<any>();

  useFocusEffect(
    useCallback(() => {
      loadNotes();
      return;
    }, [])
  );
  const loadNotes = async () => {
    try {
      const loadedData = await AsyncStorage.getItem(TRASH_KEY);
      const parsedData: NoteType[] = loadedData ? JSON.parse(loadedData) : [];
      const favouriteNotes = parsedData.filter((item) => item.favourite);
      setNotes(favouriteNotes);
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

  // Toggle extraMenu
  const toggleExtraMenu = (index: any) => {
    setExtraMenu(!extraMenu);
    setCurrentIndex(index);
  };

  // Hande delete functionality
  const handleDelete = async (id: string) => {
    const remaining: any = notes?.filter((n) => n.id !== id);
    const deleted = notes?.find((n) => n.id === id);

    setExtraMenu(!extraMenu);
    try {
      await AsyncStorage.setItem(TRASH_KEY, JSON.stringify(remaining));
      loadNotes();
    } catch (err) {
      console.log(err);
    }
    const trashContent = await AsyncStorage.getItem(TRASH_KEY);
    const parsedTrashContent = trashContent ? JSON.parse(trashContent) : [];
    console.log(trash);
    const newTrashContent = [...parsedTrashContent, deleted];
    setTrash(newTrashContent);
    AsyncStorage.setItem(TRASH_KEY, JSON.stringify(newTrashContent));
  };

  // handle information viewing
  const handleInformation = (id: string) => {
    setExtraMenu(!extraMenu);
    const toBeViewed = notes?.find((n) => n.id === id);
    setViewNote(toBeViewed);
    setInformationModalVisible(true);
  };

  const ConfirmDelete = () => {
    confirmRef.current = true
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-dark">
      <View className="flex-row items-center justify-between mb-6 px-4 pt-2 bg-primary-dark  sticky top-0 z-10">
        <Text className="text-2xl font-bold text-primary-button">Scribbly</Text>
        {/* Menu button */}
        <TouchableOpacity
          onPress={() => {
            console.log("open the menu");
            setMenuOpen(!menuOpen);
          }}
        >
          <Ionicons name="menu" size={27} className="text-primary-button" />
        </TouchableOpacity>
      </View>

      <ScrollView className="p-4">
        {menuOpen && <MenuModal />}
        <View className="space-y-4 pb-20 ">
          {notes
            ?.slice()
            .reverse()
            .map((note, index) => (
              <View
                key={index}
                className="bg-gray-800 rounded-2xl overflow-visible p-4  shadow-lg"
              >
                {/* Additional stuff when ellipsis isclicked */}
                {extraMenu && currentIndex == index && (
                  <View
                    className={` absolute top-1 right-14 mt-2 z-50 flex-row items-center bg-gray-700 rounded-2xl px-3 py-2 shadow-2xl border border-gray-600 space-x-3`}
                  >
                    {/*information */}
                    <TouchableOpacity
                      onPress={() => {
                        const id = note.id;
                        handleInformation(id);
                      }}
                      className="p-2 rounded-full hover:bg-gray-600 active:scale-95"
                    >
                      <Ionicons
                        name="information-circle-outline"
                        size={20}
                        color="#E5E7EB"
                      />
                    </TouchableOpacity>
                    {/* delete */}
                    <TouchableOpacity
                      onPress={async () => {
                        setConfirmDeleteModal(true);
                        const id = note.id;
                         if (confirmRef.current === true) {
                          handleDelete(id);
                          console.log('deleted')
                        }else{
                            console.log('denied')
                        }
                      }}
                      className="p-2 rounded-full hover:bg-gray-600 active:scale-95"
                    >
                      <Ionicons
                        name="trash-outline"
                        size={20}
                        color="#F87171"
                      />
                    </TouchableOpacity>
                  </View>
                )}

                {/* Notes card */}
                <View className="flex-row items-start justify-between mb-2">
                  <Text
                    className="text-white font-semibold text-lg flex-1"
                    numberOfLines={1}
                  >
                    {note.title}
                  </Text>
                  <TouchableOpacity onPress={() => toggleExtraMenu(index)}>
                    <Ionicons
                      name="ellipsis-horizontal"
                      size={20}
                      color="#9CA3AF"
                    />
                  </TouchableOpacity>
                </View>

                <Text
                  className="text-gray-300 text-sm leading-5"
                  numberOfLines={3}
                >
                  {note.content}
                </Text>

                <View className="flex-row items-center justify-between mt-3">
                  <Text className="text-gray-400 text-xs ">
                    {note.date || ""}
                  </Text>
                </View>
              </View>
            ))}
        </View>

        {/* No note in storage */}
        {(!notes || notes.length === 0) && (
          <View className="items-center justify-center mt-20">
            <Ionicons name="document-outline" size={64} color="#4B5563" />
            <Text className="text-gray-500 mt-4 text-center">
              No notes yet{"\n"}delete some notes to send them here
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/")}
              className="py-2 px-4 bg-primary-button mt-4 rounded-xl shadow-xl "
            >
              <Text className="text-sm font-medium text-default">Home</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* View Information MOdal */}
        {
          <Modal
            visible={confirmDeleteModal}
            transparent
            animationType="fade"
            onRequestClose={() => setConfirmDeleteModal(false)}
          >
            <View className="flex-1 bg-black/60 justify-center items-center px-4">
              <View className="bg-primary-dark w-full rounded-2xl p-6 shadow-2xl border border-gray-700 space-y-4">
                <Text className="text-[16px] text-white font-semibold">
                  Are you sure you want to permanently delete this note?{" "}
                </Text>
                <View className="justify-between flex flex-row">
                  <TouchableOpacity
                    onPress={() => setConfirmDeleteModal(false)}
                    className="mt-3 bg-primary-button py-2 px-4 rounded-xl self-end"
                  >
                    <Text className="text-default font-medium">No, don't</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={ConfirmDelete}
                    className="mt-3 bg-red-600/90 py-2 px-4 rounded-xl self-end"
                  >
                    <Text className="text-white font-medium">yes,delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        }

        {/* Confirm delete */}
      </ScrollView>
    </SafeAreaView>
  );
}
