import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import { useCallback, useRef, useState } from "react";
import {
  Dimensions,
  Modal,
  SafeAreaView,
  ScrollView,
  Share,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import "../../global.css";
import MenuModal from "../modals/MenuModal";

const STORAGE_KEY = "scribbly-notes";
const TRASH_KEY = "scribbly-trash";
const { width } = Dimensions.get("window");

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
  const currentLikeRef = useRef<boolean | null>(null);
  const [liked, setLiked] = useState();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [indicate, setIndicate] = useState<boolean | null>(null);
  const [informationModalVisible, setInformationModalVisible] =
    useState<boolean>(false);
  const [editNotes, setEditNotes] = useState({
    title: "",
    date: "",
    content: "",
    favourite: null,
  });
  const [viewNote, setViewNote] = useState<any>();

  // Add UI state for search and filter (UI only)
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");

  useFocusEffect(
    useCallback(() => {
      loadNotes();
      return;
    }, [])
  );

  const loadNotes = async () => {
    try {
      const loadedData = await AsyncStorage.getItem(STORAGE_KEY);
      const parsedData: NoteType[] = loadedData ? JSON.parse(loadedData) : [];
      setNotes(parsedData);
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

  // Handle delete functionality
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
    setIsFavourite(!isFavourite);
    const favouriteId = currentIdRef.current;
    const favStatus: boolean = isFavourite ? true : false;
    console.log("FavsStatus: ", favStatus);
    const updatedNote = notes?.map((note) =>
      note.id === favouriteId ? { ...note, favourite: favStatus } : note
    );

    // Save the updated favourite to the storage
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNote));
    loadNotes();
  };

  // Get note count for UI display
  const getNoteStats = () => {
    const totalNotes = notes?.length || 0;
    const favouriteNotes = notes?.filter((note) => note.favourite).length || 0;
    return { totalNotes, favouriteNotes };
  };

  const { totalNotes, favouriteNotes } = getNoteStats();

  return (
    <SafeAreaView className="flex-1 bg-primary-dark">
      <StatusBar barStyle="light-content" backgroundColor="#1F2937" />

      {/* Enhanced Header */}
      <View className="px-4 pt-2 pb-4 bg-primary-dark shadow-lg">
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center space-x-2">
            <View className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full items-center justify-center">
              <Ionicons name="document-text" size={16} color="white" />
            </View>
            <Text className="text-2xl font-bold text-primary-button">
              Scribbly
            </Text>
          </View>

          <View className="flex-row items-center space-x-3">
            {/* Search Toggle Button */}
            <TouchableOpacity
              onPress={() => setShowSearch(!showSearch)}
              className="p-2 rounded-full bg-gray-800 active:scale-95"
            >
              <Ionicons name="search" size={20} color="#A78BFA" />
            </TouchableOpacity>

            {/* View Mode Toggle Button */}
            <TouchableOpacity
              onPress={() => setViewMode(viewMode === "list" ? "grid" : "list")}
              className="p-2 rounded-full bg-gray-800 active:scale-95"
            >
              <Ionicons
                name={viewMode === "list" ? "grid" : "list"}
                size={20}
                color="#A78BFA"
              />
            </TouchableOpacity>

            {/* Menu Button */}
            <TouchableOpacity
              onPress={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-full bg-gray-800 active:scale-95"
            >
              <Ionicons name="menu" size={20} color="#A78BFA" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar (conditionally shown) */}
        {showSearch && (
          <View className="flex-row items-center bg-gray-800 rounded-xl px-4 py-2 mb-3">
            <Ionicons name="search" size={16} color="#9CA3AF" />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search notes..."
              placeholderTextColor="#9CA3AF"
              className="flex-1 text-white ml-2 text-sm"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <Ionicons name="close-circle" size={16} color="#9CA3AF" />
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* Stats Bar */}
        <View className="flex-row items-center justify-between bg-gray-800 rounded-xl px-4 py-3">
          <View className="flex-row items-center space-x-4">
            <View className="flex-row items-center space-x-1">
              <Ionicons
                name="document-text-outline"
                size={16}
                color="#9CA3AF"
              />
              <Text className="text-gray-300 text-sm">{totalNotes} notes</Text>
            </View>
            <View className="flex-row items-center space-x-1">
              <Ionicons name="heart" size={16} color="#A78BFA" />
              <Text className="text-gray-300 text-sm">
                {favouriteNotes} favorites
              </Text>
            </View>
          </View>

          {/* Quick Filter Buttons (UI only) */}
          <View className="flex-row items-center space-x-2">
            <TouchableOpacity className="px-2 py-1 bg-purple-600 rounded-lg">
              <Text className="text-white text-xs">All</Text>
            </TouchableOpacity>
            <TouchableOpacity className="px-2 py-1 bg-gray-700 rounded-lg">
              <Text className="text-gray-300 text-xs">Favorites</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {menuOpen && <MenuModal />}

      <ScrollView className="flex-1 px-4">
        <View
          className={`${viewMode === "grid" ? "flex-row flex-wrap justify-between" : "space-y-4"} pb-20 mt-4`}
        >
          {notes
            ?.slice()
            .reverse()
            .map((note, index) => (
              <View
                key={index}
                className={`bg-gray-800 rounded-2xl overflow-visible p-4 shadow-lg border border-gray-700 ${
                  viewMode === "grid" ? "mb-4" : ""
                }`}
                style={viewMode === "grid" ? { width: width * 0.44 } : {}}
              >
                {/* Enhanced Menu with backdrop */}
                {extraMenu && currentIndex === index && (
                  <>
                    {/* Backdrop */}
                    <TouchableOpacity
                      onPress={() => setExtraMenu(false)}
                      className="absolute -inset-4 bg-black/20 rounded-2xl z-40"
                    />

                    {/* Menu */}
                    <View className="absolute top-1 right-14 mt-2 z-50 bg-gray-900 rounded-2xl px-2 py-2 shadow-2xl border border-gray-600">
                      <View className="flex-row items-center space-x-1">
                        {/* Edit */}
                        <TouchableOpacity
                          onPress={() => {
                            const id = note.id;
                            currentIdRef.current = id;
                            handleEdit();
                          }}
                          className="p-2 rounded-full bg-blue-600 active:scale-95"
                        >
                          <Ionicons
                            name="create-outline"
                            size={16}
                            color="white"
                          />
                        </TouchableOpacity>

                        {/* Share */}
                        <TouchableOpacity
                          onPress={handleShare}
                          className="p-2 rounded-full bg-green-600 active:scale-95"
                        >
                          <Ionicons
                            name="share-social-outline"
                            size={16}
                            color="white"
                          />
                        </TouchableOpacity>

                        {/* Information */}
                        <TouchableOpacity
                          onPress={() => handleInformation(note.id)}
                          className="p-2 rounded-full bg-purple-600 active:scale-95"
                        >
                          <Ionicons
                            name="information-circle-outline"
                            size={16}
                            color="white"
                          />
                        </TouchableOpacity>

                        {/* Delete */}
                        <TouchableOpacity
                          onPress={() => handleDelete(note.id)}
                          className="p-2 rounded-full bg-red-600 active:scale-95"
                        >
                          <Ionicons
                            name="trash-outline"
                            size={16}
                            color="white"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </>
                )}

                {/* Enhanced Note Card */}
                <View className="flex-row items-start justify-between mb-3">
                  <View className="flex-1 mr-2">
                    <Text
                      className="text-white font-semibold text-lg"
                      numberOfLines={1}
                    >
                      {note.title}
                    </Text>
                    {/* Note category indicator (UI only) */}
                    <View className="flex-row items-center mt-1 space-x-2">
                      <View className="w-2 h-2 bg-purple-500 rounded-full" />
                      <Text className="text-gray-500 text-xs">Personal</Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    onPress={() => toggleExtraMenu(index)}
                    className="p-1 rounded-full bg-gray-700 active:scale-95"
                  >
                    <Ionicons
                      name="ellipsis-horizontal"
                      size={16}
                      color="#9CA3AF"
                    />
                  </TouchableOpacity>
                </View>

                <Text
                  className="text-gray-300 text-sm leading-5 mb-4"
                  numberOfLines={3}
                >
                  {note.content}
                </Text>

                {/* Enhanced Footer */}
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center space-x-2">
                    <Ionicons name="time-outline" size={12} color="#9CA3AF" />
                    <Text className="text-gray-400 text-xs">
                      {note.date || ""}
                    </Text>
                  </View>

                  <View className="flex-row items-center space-x-3">
                    {/* Word count indicator (UI only) */}
                    <Text className="text-gray-500 text-xs">
                      {note.content.split(" ").length} words
                    </Text>

                    {/* Favourite Button */}
                    <TouchableOpacity
                      onPress={() => {
                        const id = note.id;
                        currentIdRef.current = id;
                        handleToggleFavourite();
                      }}
                      className="p-1 rounded-full active:scale-95"
                    >
                      <Ionicons
                        name={note.favourite ? "heart" : "heart-outline"}
                        size={18}
                        color={note.favourite ? "#A78BFA" : "#9CA3AF"}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
        </View>

        {/* Enhanced Empty State */}
        {(!notes || notes.length === 0) && (
          <View className="items-center justify-center mt-20 px-8">
            <View className="w-24 h-24 bg-gray-800 rounded-full items-center justify-center mb-6">
              <Ionicons name="document-outline" size={40} color="#4B5563" />
            </View>
            <Text className="text-gray-400 text-xl font-semibold mb-2">
              No notes yet
            </Text>
            <Text className="text-gray-500 text-center mb-8 leading-6">
              Start capturing your thoughts and ideas.{"\n"}Your first note is
              just a tap away!
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/(tabs)/NewNote")}
              className="py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl shadow-xl active:scale-95 flex-row items-center space-x-2"
            >
              <Ionicons name="add" size={16} color="white" />
              <Text className="text-white font-medium">
                Create your first note
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Enhanced Edit Modal */}
        <Modal
          visible={modalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View className="flex-1 bg-black/70 justify-center items-center px-4">
            <View className="bg-gray-900 w-full rounded-2xl p-6 space-y-4 shadow-2xl border border-gray-700">
              {/* Modal Header */}
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-white text-xl font-bold">Edit Note</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Ionicons name="close" size={24} color="#9CA3AF" />
                </TouchableOpacity>
              </View>

              {/* Title Input */}
              <View className="space-y-2">
                <Text className="text-gray-300 text-sm font-medium">Title</Text>
                <TextInput
                  value={editNotes?.title}
                  onChangeText={(text) =>
                    setEditNotes((prev) => ({ ...prev, title: text }))
                  }
                  placeholder="Enter note title..."
                  placeholderTextColor="#6B7280"
                  className="bg-gray-800 text-white p-4 rounded-xl border border-gray-600 focus:border-purple-500"
                />
              </View>

              {/* Content Input */}
              <View className="space-y-2">
                <Text className="text-gray-300 text-sm font-medium">
                  Content
                </Text>
                <TextInput
                  value={editNotes?.content}
                  onChangeText={(text) =>
                    setEditNotes((prev) => ({ ...prev, content: text }))
                  }
                  placeholder="Write your note content..."
                  placeholderTextColor="#6B7280"
                  className="bg-gray-800 text-white p-4 rounded-xl border border-gray-600 focus:border-purple-500 h-32 text-start"
                  multiline
                  textAlignVertical="top"
                />
              </View>

              {/* Action Buttons */}
              <View className="flex-row justify-end space-x-3 mt-6">
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  className="px-6 py-3 bg-gray-700 rounded-xl active:scale-95"
                >
                  <Text className="text-white font-medium">Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    const id = currentId;
                    setCurrentId(id);
                    handleSaveEdit();
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl active:scale-95"
                >
                  <Text className="text-white font-medium">Save Changes</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Enhanced Information Modal */}
        <Modal
          visible={informationModalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setInformationModalVisible(false)}
        >
          <View className="flex-1 bg-black/70 justify-center items-center px-4">
            <View className="bg-gray-900 w-full rounded-2xl p-6 shadow-2xl border border-gray-700 max-h-4/5">
              {/* Modal Header */}
              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-white text-xl font-bold">
                  Note Details
                </Text>
                <TouchableOpacity
                  onPress={() => setInformationModalVisible(false)}
                >
                  <Ionicons name="close" size={24} color="#9CA3AF" />
                </TouchableOpacity>
              </View>

              <ScrollView showsVerticalScrollIndicator={false}>
                {/* Note Title */}
                <Text className="text-white text-2xl font-bold mb-3">
                  {viewNote?.title}
                </Text>

                {/* Note Metadata */}
                <View className="flex-row items-center justify-between mb-4 p-3 bg-gray-800 rounded-xl">
                  <View className="flex-row items-center space-x-2">
                    <Ionicons
                      name="calendar-outline"
                      size={16}
                      color="#9CA3AF"
                    />
                    <Text className="text-gray-400 text-sm">
                      {viewNote?.date}
                    </Text>
                  </View>
                  <View className="flex-row items-center space-x-2">
                    <Ionicons
                      name="document-text-outline"
                      size={16}
                      color="#9CA3AF"
                    />
                    <Text className="text-gray-400 text-sm">
                      {viewNote?.content?.split(" ").length || 0} words
                    </Text>
                  </View>
                </View>

                {/* Note Content */}
                <View className="bg-gray-800 rounded-xl p-4 mb-4">
                  <Text className="text-gray-300 text-base leading-relaxed">
                    {viewNote?.content}
                  </Text>
                </View>

                {/* Additional Actions (UI only) */}
                <View className="flex-row items-center space-x-2 mb-4">
                  <TouchableOpacity className="flex-1 bg-purple-600 py-2 rounded-lg flex-row items-center justify-center space-x-2">
                    <Ionicons name="copy-outline" size={16} color="white" />
                    <Text className="text-white text-sm font-medium">Copy</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="flex-1 bg-blue-600 py-2 rounded-lg flex-row items-center justify-center space-x-2">
                    <Ionicons
                      name="share-social-outline"
                      size={16}
                      color="white"
                    />
                    <Text className="text-white text-sm font-medium">
                      Share
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>

              {/* Close Button */}
              <TouchableOpacity
                onPress={() => setInformationModalVisible(false)}
                className="bg-gray-700 py-3 px-6 rounded-xl self-center active:scale-95"
              >
                <Text className="text-white font-medium">Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}
