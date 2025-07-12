import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";
import advanceFormat from "dayjs/plugin/advancedFormat";
import React, { useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { v4 as uuidv4 } from "uuid";
import MenuModal from "../modals/MenuModal";
import { useMenu } from "../context/MenuContext";

dayjs.extend(advanceFormat);

const STORAGE_KEY = "scribbly-notes";

type NoteType = {
  id: string;
  title: string;
  content: string;
  date: string;
  favourite: boolean | null;
};
const NewNote = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const {toggleMenu}=useMenu()

  const [newNote, setNewNote] = useState({
    id: uuidv4(),
    title: "",
    date: "",
    content: "",
    favourite: null,
  });
  const [notes, setNotes] = useState<NoteType[]>([]);

  // Creating new note
  const createNote = async () => {
    newNote.date = dayjs().format("MMMM Do YYYY, h:mm a");
    // Get notes from storage first
    const dataInStorage = await AsyncStorage.getItem(STORAGE_KEY);
    const parsedDataInStorage: NoteType[] = dataInStorage
      ? JSON.parse(dataInStorage)
      : [];
    setNotes(parsedDataInStorage);

    // Update the existing notes in state
    const updatedNotes = [...parsedDataInStorage, newNote];
    setNotes(updatedNotes);
    try {
      setLoading(true);

      // Set the updated notes to storage
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotes));
      console.log("Note Saved!");
      // Revert inputs to null/ empty
      setNewNote({
        title: "",
        content: "",
        date: "",
        id: uuidv4(),
        favourite: null,
      });
      setNotes([]);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView className="bg-gray-900 h-screen">
      <View className="flex-row items-center justify-between mb-2 px-4 pt-2 bg-primary-dark  sticky top-0 z-10">
        <Text className="text-2xl font-bold text-primary-button">Scribbly</Text>
        {/* Menu button */}
        <TouchableOpacity
          onPress={toggleMenu}
        >
          <Ionicons name="menu" size={27} className="text-primary-button" />
        </TouchableOpacity>
      </View>
      <View className="px-4 py-4">
        <Text className="text-primary-btnLight text-2xl font-semibold text-center">
          Create new note
        </Text>
        {/* Title  */}
        <View className="mt-3 max-w-md mx-auto w-full">
          <label className="text-slate-400 font-medium">Title</label>
          <TextInput
            autoFocus
            value={newNote.title}
            onChangeText={(text) =>
              setNewNote((prev) => ({ ...prev, title: text }))
            }
            placeholder=" i.e code snippets..."
            placeholderTextColor="rgb(196 181 253 / 0.5)"
            className="bg-gray-800 h-10 ring-1 rounded-xl outline-0 px-4  text-primary-light focus:ring-2 ring-primary-btnLight "
          />

          {/* Content */}
          <View className="mt-4 ">
            <label className="text-slate-400 font-medium">Content</label>
            <TextInput
              value={newNote.content}
              onChangeText={(text) =>
                setNewNote((prev) => ({ ...prev, content: text }))
              }
              placeholder="Start typing your thoughts... "
              multiline
              textAlignVertical="top"
              placeholderTextColor="rgb(196 181 253 / 0.5)"
              className="bg-gray-800 ring-1 py-2 min-h-20 rounded-xl outline-0 px-4  text-primary-light focus:ring-2 ring-primary-btnLight "
            />
          </View>

          {/* Save Button */}
          <TouchableOpacity
            onPress={createNote}
            className="py-3 px-4 shadow-xl  rounded-xl bg-primary-button mt-5 "
          >
            <View className="">
              {loading ? (
                <View className="flex flex-row justify-center items-center gap-2">
                  <ActivityIndicator />
                  <Text className="text-center font-medium text-[16px]">
                    saving...
                  </Text>
                </View>
              ) : (
                <Text className="text-center font-medium text-white">
                  Create note
                </Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
        {menuOpen && <MenuModal />}
      </View>
    </SafeAreaView>
  );
};

export default NewNote;
