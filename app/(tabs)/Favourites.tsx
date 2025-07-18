import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Modal,
  SafeAreaView,
  ScrollView,
  Share,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import "../../global.css";
import { useMenu } from "../context/MenuContext";
import { fetchName, getMode } from "../utils/miniFunctions";
import { parse } from "@babel/core";

const STORAGE_KEY = "scribbly-notes";
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
  const [currentId, setCurrentId] = useState<string>();
  const currentIdRef = useRef<string | null>(null);
  const [openSearchBar, setOpenSearchBar] = useState<boolean>(false);
  const currentLikeRef = useRef<boolean | null>(null);
  const [viewMode, setViewMode] = useState<string>("list");
  const [liked, setLiked] = useState();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [indicate, setIndicate] = useState<boolean | null>(null);
  const [searchedNotes, setSearchedNotes] = useState<number | null>(null);
  const [informationModalVisible, setInformationModalVisible] =
    useState<boolean>(false);
  const [editNotes, setEditNotes] = useState({
    title: "",
    date: "",
    content: "",
    favourite: null,
  });

  const [viewNote, setViewNote] = useState<any>();
  const { toggleMenu } = useMenu();

  // On first render of the page
  useEffect(() => {
    // load the username from storage
    const loadName = async () => {
      const name = await fetchName();
      setUsername(name);
    };
    loadName();
  }, []);

  // On focusing the page
  useFocusEffect(
    useCallback(() => {
      loadNotes();
      // Notes view mode: list/grid
      loadViewMode();
      return;
    }, [])
  );

  // Load the mode settings from storage
  const loadViewMode = async () => {
    const mode = await getMode();
    const parsed = mode ? JSON.parse(mode) : [];
    console.log(parsed.viewMode);
    if (parsed.viewMode === true) {
      setViewMode("list");
    } else if (parsed.viewMode === false) {
      setViewMode("grid");
    }
    console.log(viewMode);
  };

  // Load notes from storage
  const loadNotes = async () => {
    try {
      const loadedData = await AsyncStorage.getItem(STORAGE_KEY);
      const parsedData: NoteType[] = loadedData ? JSON.parse(loadedData) : [];
      const favouriteNotes = parsedData.filter((item)=>item.favourite)
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

  // handle edit functionality
  const handleEdit = () => {
    const idToEdit = currentIdRef.current;
    setExtraMenu(!extraMenu);
    const toBeEdited: any = notes?.find((n) => n.id === idToEdit);
    setEditNotes(toBeEdited);

    setModalVisible(true);
  };

  // handle share functionality
  const handleShare = async () => {
    setExtraMenu(!extraMenu);
    try {
      await Share.share({
        message: "Check out this cool note from scribbly",
      });
    } catch (err) {
      console.log(err);
    }
  };

  // Hande delete functionality
  const handleDelete = async (id: string) => {
    const remaining: any = notes?.filter((n) => n.id !== id);
    const deleted = notes?.find((n) => n.id === id);

    setExtraMenu(!extraMenu);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(remaining));
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

  // Save the edited notes
  const handleSaveEdit = async () => {
    console.log(editNotes);
    const editedNotes: any = notes?.map((note) =>
      note.id === currentIdRef.current
        ? { ...note, title: editNotes.title, content: editNotes.content }
        : note
    );
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(editedNotes));
    } catch (err) {
      console.error(err);
    }
    setModalVisible(false);
    console.log("editedNotes", editedNotes);
    loadNotes();
  };

  // handle heart button toggle, favourite
  const handleToggleFavourite = async () => {
    // setIsFavourite(!isFavourite);
    const favouriteId = currentIdRef.current;
    const favStatus: boolean = isFavourite ? true : false;
    console.log("FavsStatus: ", favStatus);
    const updatedNote = notes?.map((note) =>
      note.id === favouriteId ? { ...note, favourite: favStatus } : note
    );

    // Save the updated favourite to teh storage
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNote));
    loadNotes();
  };

  // handle the notes view mode: grid/list
  // const handleViewMode = () => {
  //   if (viewMode === "list") {
  //     setViewMode("grid");
  //   } else {
  //     setViewMode("list");
  //   }
  // };

  // Get Notes function for search functionality
  const getNotes = async () => {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    setNotes(parsed);
  };

  // handle search functionality, search for notes based on the title and content
  const handleSearchQuery = (text: string) => {
    if (!notes || (notes.length === 0 && searchedNotes !== 0)) {
      getNotes();
    }
    setSearchQuery(text);
    const filteredNotes = notes?.filter((note: NoteType) =>
      note.title?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setNotes(filteredNotes);
    if (!filteredNotes || filteredNotes.length === 0) {
      setSearchedNotes(0);
      console.log("no notes by that name");
    }
    console.log(filteredNotes);
  };
  return (
    <SafeAreaView className="flex-1 bg-primary-dark">
      <View className="flex-row items-center justify-between mb-6 px-4 pt-2 bg-primary-dark  sticky top-0 z-10">
        <Text className="text-xl font-bold text-primary-button">
          Hi, {username}
        </Text>
        <View className="flex flex-row justify-center items-center gap-5">
          {/* Search button */}
          <TouchableOpacity
            onPress={() => {
              setOpenSearchBar(!openSearchBar);
              loadNotes();
            }}
          >
            <Ionicons name="search" size={20} className="text-primary-button" />
          </TouchableOpacity>

          {/* Notes view Mode: grid/list */}
          {/* <TouchableOpacity onPress={handleViewMode}>
            <Ionicons
              name={viewMode === "list" ? "list" : "grid"}
              size={20}
              className="text-primary-button"
            />
          </TouchableOpacity> */}

          {/* Menu button */}
          <TouchableOpacity onPress={toggleMenu}>
            <Ionicons name="menu" size={27} className="text-primary-button" />
          </TouchableOpacity>
        </View>
      </View>

      {openSearchBar && (
        <View className="bg-primary-dark px-[15px]">
          <TextInput
            placeholder="search for a note"
            autoFocus
            onChangeText={handleSearchQuery}
            autoCorrect
            placeholderTextColor={"rgb(196 181 253 / 0.5)"}
            className="h-9 focus:ring ring-1 ring-primary-button px-4 text-[16px] text-primary-light max-w-sm outline-0 bg-slate-800 rounded-xl"
          />
          <Ionicons
            name="close"
            className="absolute text-primary-button top-2 right-6 "
            onPress={() => {
              setSearchQuery("");
              setOpenSearchBar(!openSearchBar);
              loadNotes();
            }}
            size={18}
          />
        </View>
      )}
      <ScrollView className="p-4">
        <View
          className={` pb-20 ${viewMode === "grid" ? "grid grid-cols-2 gap-2" : viewMode === "list" ? "space-y-3 flex flex-col" : ""}`}
        >
          {notes
            ?.slice()
            .reverse()
            .map((note, index) => (
              <View
                key={index}
                className="bg-gray-800  rounded-2xl  overflow-visible p-4  shadow-lg"
              >
                {/* Additional stuff when ellipsis isclicked */}
                {extraMenu && currentIndex == index && (
                  <View
                    className={`${viewMode === "grid" ? "right-2 top-10 space-x-0 " : "right-14 px-3 space-x-3 top-1 "} absolute mt-2 z-50 flex-row items-center bg-gray-700 rounded-2xl  py-2 shadow-2xl border border-gray-600 `}
                  >
                    {/* edit */}
                    <TouchableOpacity
                      onPress={() => {
                        const id = note.id;
                        currentIdRef.current = id;

                        handleEdit();
                      }}
                      className="p-2 rounded-full hover:bg-gray-600 active:scale-95"
                    >
                      <Ionicons
                        name="create-outline"
                        size={20}
                        color="#E5E7EB"
                      />
                    </TouchableOpacity>
                    {/* Share */}
                    <TouchableOpacity
                      onPress={() => {
                        handleShare();
                      }}
                      className="p-2 rounded-full hover:bg-gray-600 active:scale-95"
                    >
                      <Ionicons
                        name="share-social-outline"
                        size={20}
                        color="#E5E7EB"
                      />
                    </TouchableOpacity>
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
                      onPress={() => {
                        const id = note.id;
                        handleDelete(id);
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
                    {viewMode === "list" && (
                      <Ionicons name="time" className="text-primary-button " />
                    )}{" "}
                    {note.date || ""}
                  </Text>

                  {/* Like button, favourite */}
                  <View className="flex-row space-x-3">
                    <TouchableOpacity
                      className="outline-0"
                      onPress={() => {
                        const id = note.id;
                        currentIdRef.current = id;
                        handleToggleFavourite();
                      }}
                    >
                      <Ionicons
                        name={note.favourite ? "heart" : "heart-outline"}
                        size={20}
                        color={note.favourite ? "#A78BFA" : "#9CA3AF"}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
        </View>

        {/* No note in storage */}
        {(!notes || (notes.length === 0 && searchedNotes !== 0)) && (
          <View className="items-center justify-center mt-20">
            <Ionicons name="document-outline" size={64} color="#4B5563" />
            <Text className="text-gray-500 mt-4 text-center">
              No notes yet{"\n"}click button below to create your first note
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/(tabs)/NewNote")}
              className="py-2 px-4 bg-primary-button mt-4 rounded-xl shadow-xl "
            >
              <Text className="font-medium text-white">Create new Note</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* No notes found in storage matching the searchQuery */}
        {searchedNotes === 0 && (
          <View className="items-center justify-center mt-20">
            <Ionicons name="folder-open-outline" size={64} color="#4B5563" />
            <Text className="text-gray-400 mt-3 text-center">
              No match found!
            </Text>
            <TouchableOpacity
              onPress={() => {
                // revoke the searchbar, reload the notes from storage
                setSearchQuery("");
                setOpenSearchBar(false);
                setSearchedNotes(null);
                loadNotes();
              }}
              className="py-2 px-6 bg-primary-button mt-4 rounded-xl shadow-xl "
            >
              <Text className="text-sm font-medium text-default">Exit</Text>
            </TouchableOpacity>
          </View>
        )}
        {/* 
        {indicate ? (
          <View className="items-center justify-center mt-20">
            <ActivityIndicator size={"large"} />
          </View>
        ) : !notes || (notes.length === 0 && !indicate) ? (
          <View className="items-center justify-center mt-20">
            <Ionicons name="document-outline" size={64} color="#4B5563" />
            <Text className="text-gray-500 mt-4 text-center">
              No notes yet{"\n"}click button below to create your first note
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/(tabs)/NewNote")}
              className="py-2 px-4 bg-primary-button mt-4 rounded-xl shadow-xl "
            >
              <Text className="text-sm font-medium text-default">
                Create new Note
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          ""
        )} */}

        {/* Edit Notes Modal */}
        <Modal
          visible={modalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View className="flex-1 bg-black/60 justify-center items-center px-4">
            <View className="bg-primary-dark w-full rounded-2xl p-6 space-y-4 shadow-2xl border border-gray-700">
              {/* Title Input */}
              <Text className="text-white text-base font-medium">
                Edit Title
              </Text>
              <TextInput
                value={editNotes?.title}
                onChangeText={(text) =>
                  setEditNotes((prev) => ({ ...prev, title: text }))
                }
                placeholder="Note title"
                placeholderTextColor="#9CA3AF"
                className="bg-gray-800 text-white p-3 rounded-xl border border-gray-600 outline-0 focus:ring ring-primary-btnLight"
              />

              {/* Content Input */}
              <Text className="text-white text-base font-medium">
                Edit Content
              </Text>
              <TextInput
                value={editNotes?.content}
                onChangeText={(text) =>
                  setEditNotes((prev) => ({ ...prev, content: text }))
                }
                placeholder="Note content"
                placeholderTextColor="#9CA3AF"
                className="bg-gray-800 text-white p-3 outline-0 focus:ring ring-primary-btnLight rounded-xl border border-gray-600 h-32 text-start"
                multiline
              />

              {/* Actions */}
              <View className="flex-row justify-end space-x-4 mt-4">
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  className="px-4 py-2 bg-gray-600 rounded-xl"
                >
                  <Text className="text-white font-medium">Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    const id = currentId;
                    setCurrentId(id);
                    handleSaveEdit();
                  }}
                  className="px-4 py-2 bg-primary-button rounded-xl"
                >
                  <Text className="text-default font-medium">Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* View Information MOdal */}
        <Modal
          visible={informationModalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setInformationModalVisible(false)}
        >
          <View className="flex-1 bg-black/60 justify-center items-center px-4">
            <View className="bg-primary-dark w-full rounded-2xl p-6 shadow-2xl border border-gray-700 space-y-4">
              {/* Title */}
              <Text className="text-white text-xl font-bold">
                {viewNote?.title}
              </Text>

              {/* Date */}
              <Text className="text-gray-500 text-sm">{viewNote?.date}</Text>

              {/* Content */}
              <Text className="text-gray-300 text-base leading-relaxed">
                {viewNote?.content}
              </Text>

              {/* Close Button */}
              <TouchableOpacity
                onPress={() => setInformationModalVisible(false)}
                className="mt-6 bg-primary-button py-2 px-4 rounded-xl self-end"
              >
                <Text className="text-default font-medium">Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}
