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
import "../../global.css";
import { useMenu } from "../context/MenuContext";

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
  const [trash, setTrash] = useState<NoteType[]>([]);
  const currentIdRef = useRef<string | null>(null);

  const confirmRef = useRef<boolean | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState<boolean>(false);
  const [restoreModal, setRestoreModal] = useState<boolean>(false);
  const [emptyTrashModal, setEmptyTrashModal] = useState<boolean>(false);

  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [informationModalVisible, setInformationModalVisible] =
    useState<boolean>(false);

  const [viewNote, setViewNote] = useState<any>();
  const { toggleMenu } = useMenu();

  useFocusEffect(
    useCallback(() => {
      loadNotes();
    }, [])
  );

  const loadNotes = async () => {
    try {
      const loadedData = await AsyncStorage.getItem(TRASH_KEY);
      const parsedData: NoteType[] = loadedData ? JSON.parse(loadedData) : [];
      setNotes(parsedData);
    } catch (err) {
      console.log(err);
    }
  };

  // Toggle extraMenu
  const toggleExtraMenu = (index: any) => {
    setExtraMenu(!extraMenu);
    setCurrentIndex(index);
  };

  // Handle delete functionality
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

  // Handle restore (UI only)
  const handleRestore = (id: string) => {
    setExtraMenu(!extraMenu);
    setRestoreModal(true);
  };

  // Handle empty trash (UI only)
  const handleEmptyTrash = () => {
    setEmptyTrashModal(true);
  };

  // Handle information viewing
  const handleInformation = (id: string) => {
    setExtraMenu(!extraMenu);
    const toBeViewed = notes?.find((n) => n.id === id);
    setViewNote(toBeViewed);
    setInformationModalVisible(true);
  };

  const ConfirmDelete = () => {
    confirmRef.current = true;
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-dark">
      <View className="flex-row items-center justify-between mb-6 px-4 pt-2 bg-primary-dark sticky top-0 z-10">
        <View className="flex flex-row items-center">
          <TouchableOpacity
            onPress={() => router.back()}
            className="mr-4"
            activeOpacity={0.7}
          >
            <Ionicons
              name="chevron-back"
              size={24}
              className="text-primary-btnLight"
            />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-primary-button">Trash</Text>
        </View>
        <View className="flex-row items-center space-x-3">
          {/* Empty Trash Button */}
          {notes && notes.length > 0 && (
            <TouchableOpacity
              onPress={handleEmptyTrash}
              className="bg-red-600/20 px-3 py-1 rounded-lg border border-red-600/30"
            >
              <Text className="text-red-400 text-sm font-medium">Empty</Text>
            </TouchableOpacity>
          )}

          {/* Menu button */}
          <TouchableOpacity onPress={toggleMenu}>
            <Ionicons name="menu" size={27} className="text-primary-button" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="p-4">
        <View className="space-y-4 pb-20">
          {notes
            ?.slice()
            .reverse()
            .map((note, index) => (
              <View
                key={index}
                className="bg-gray-800 rounded-2xl overflow-visible p-4 shadow-lg border border-gray-700/50"
              >
                {/* Trash indicator */}
                <View className="absolute top-2 left-2 bg-red-600/20 rounded-full p-1">
                  <Ionicons name="trash" size={12} color="#F87171" />
                </View>

                {/* Additional menu when ellipsis is clicked */}
                {extraMenu && currentIndex == index && (
                  <View className="absolute top-1 right-14 mt-2 z-50 flex-row items-center bg-gray-700 rounded-2xl px-3 py-2 shadow-2xl border border-gray-600 space-x-3">
                    {/* Restore */}
                    <TouchableOpacity
                      onPress={() => handleRestore(note.id)}
                      className="p-2 rounded-full hover:bg-gray-600 active:scale-95"
                    >
                      <Ionicons
                        name="refresh-outline"
                        size={20}
                        color="#10B981"
                      />
                    </TouchableOpacity>

                    {/* Information */}
                    <TouchableOpacity
                      onPress={() => handleInformation(note.id)}
                      className="p-2 rounded-full hover:bg-gray-600 active:scale-95"
                    >
                      <Ionicons
                        name="information-circle-outline"
                        size={20}
                        color="#E5E7EB"
                      />
                    </TouchableOpacity>

                    {/* Permanent Delete */}
                    <TouchableOpacity
                      onPress={() => {
                        setConfirmDeleteModal(true);
                        const id = note.id;
                        if (confirmRef.current === true) {
                          handleDelete(id);
                          console.log("deleted");
                        } else {
                          console.log("denied");
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
                <View className="flex-row items-start justify-between mb-2 ml-8">
                  <Text
                    className="text-white font-semibold text-lg flex-1 opacity-75"
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
                  className="text-gray-300 text-sm leading-5 opacity-75"
                  numberOfLines={3}
                >
                  {note.content}
                </Text>

                <View className="flex-row items-center justify-between mt-3">
                  <Text className="text-gray-400 text-xs">
                    {note.date || ""}
                  </Text>
                  <Text className="text-red-400 text-xs font-medium">
                    In Trash
                  </Text>
                </View>
              </View>
            ))}
        </View>

        {/* No notes in trash */}
        {(!notes || notes.length === 0) && (
          <View className="items-center justify-center mt-20">
            <Ionicons name="trash-outline" size={64} color="#4B5563" />
            <Text className="text-gray-500 mt-4 text-center">
              Trash is empty{"\n"}Deleted notes will appear here
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/")}
              className="py-2 px-4 bg-primary-button mt-4 rounded-xl shadow-xl"
            >
              <Text className="text-sm font-medium text-default">Home</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Permanent Delete Confirmation Modal */}
        <Modal
          visible={confirmDeleteModal}
          transparent
          animationType="fade"
          onRequestClose={() => setConfirmDeleteModal(false)}
        >
          <View className="flex-1 bg-black/60 justify-center items-center px-4">
            <View className="bg-primary-dark w-full rounded-2xl p-6 shadow-2xl border border-gray-700 space-y-4">
              <Text className="text-[16px] text-white font-semibold">
                Permanently delete this note?
              </Text>
              <Text className="text-gray-400 text-sm">
                This action cannot be undone. The note will be deleted forever.
              </Text>
              <View className="justify-between flex flex-row">
                <TouchableOpacity
                  onPress={() => setConfirmDeleteModal(false)}
                  className="mt-3 bg-primary-button py-2 px-4 rounded-xl self-end"
                >
                  <Text className="text-default font-medium">Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={ConfirmDelete}
                  className="mt-3 bg-red-600/90 py-2 px-4 rounded-xl self-end"
                >
                  <Text className="text-white font-medium">Delete Forever</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Restore Confirmation Modal */}
        <Modal
          visible={restoreModal}
          transparent
          animationType="fade"
          onRequestClose={() => setRestoreModal(false)}
        >
          <View className="flex-1 bg-black/60 justify-center items-center px-4">
            <View className="bg-primary-dark w-full rounded-2xl p-6 shadow-2xl border border-gray-700 space-y-4">
              <Text className="text-[16px] text-white font-semibold">
                Restore this note?
              </Text>
              <Text className="text-gray-400 text-sm">
                This will move the note back to your main notes list.
              </Text>
              <View className="justify-between flex flex-row">
                <TouchableOpacity
                  onPress={() => setRestoreModal(false)}
                  className="mt-3 bg-gray-600 py-2 px-4 rounded-xl self-end"
                >
                  <Text className="text-white font-medium">Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setRestoreModal(false)}
                  className="mt-3 bg-green-600 py-2 px-4 rounded-xl self-end"
                >
                  <Text className="text-white font-medium">Restore</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Empty Trash Modal */}
        <Modal
          visible={emptyTrashModal}
          transparent
          animationType="fade"
          onRequestClose={() => setEmptyTrashModal(false)}
        >
          <View className="flex-1 bg-black/60 justify-center items-center px-4">
            <View className="bg-primary-dark w-full rounded-2xl p-6 shadow-2xl border border-gray-700 space-y-4">
              <Text className="text-[16px] text-white font-semibold">
                Empty Trash?
              </Text>
              <Text className="text-gray-400 text-sm">
                This will permanently delete all notes in trash. This action
                cannot be undone.
              </Text>
              <View className="justify-between flex flex-row">
                <TouchableOpacity
                  onPress={() => setEmptyTrashModal(false)}
                  className="mt-3 bg-primary-button py-2 px-4 rounded-xl self-end"
                >
                  <Text className="text-default font-medium">Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setEmptyTrashModal(false)}
                  className="mt-3 bg-red-600/90 py-2 px-4 rounded-xl self-end"
                >
                  <Text className="text-white font-medium">Empty Trash</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}
