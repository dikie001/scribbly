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
  ScrollView,
  Alert,
  Keyboard,
} from "react-native";
import { v4 as uuidv4 } from "uuid";
import { useMenu } from "../context/MenuContext";
import MenuModal from "../modals/MenuModal";

dayjs.extend(advanceFormat);

const STORAGE_KEY = "scribbly-notes";

type NoteType = {
  id: string;
  title: string;
  content: string;
  date: string;
  favourite: boolean | null;
  category: string;
  tags: string[];
};

const categories = [
  "Personal",
  "Work",
  "Ideas",
  "Tasks",
  "Shopping",
  "Study",
  "Travel",
  "Other",
];

const NewNote = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>();
  const [selected, setSelected] = useState<string>();
  const [showCategories, setShowCategories] = useState<boolean>(false);
  const [tagInput, setTagInput] = useState<string>("");
  const [wordCount, setWordCount] = useState<number>(0);
  const { toggleMenu } = useMenu();

  const [newNote, setNewNote] = useState({
    id: uuidv4(),
    title: "",
    date: "",
    content: "",
    favourite: null,
    category: "Personal",
    tags: [],
  });
  const [notes, setNotes] = useState<NoteType[]>([]);

  // Handle content change with word count
  const handleContentChange = (text: string) => {
    setNewNote((prev) => ({ ...prev, content: text }));
    const words = text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0);
    setWordCount(words.length);
  };

  // Add tag functionality
  const addTag = () => {
    if (tagInput.trim() && !newNote.tags.includes(tagInput.trim())) {
      setNewNote((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  // Remove tag functionality
  const removeTag = (tagToRemove: string) => {
    setNewNote((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  // Toggle favourite
  const toggleFavourite = () => {
    setNewNote((prev) => ({
      ...prev,
      favourite: !prev.favourite,
    }));
  };

  // Clear all fields
  const clearAll = () => {
    Alert.alert("Clear All", "Are you sure you want to clear all fields?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Clear",
        style: "destructive",
        onPress: () => {
          setNewNote({
            title: "",
            content: "",
            date: "",
            id: uuidv4(),
            favourite: null,
            category: "Personal",
            tags: [],
          });
          setWordCount(0);
          setTagInput("");
        },
      },
    ]);
  };

  // Creating new note
  const createNote = async () => {
    if (!newNote.title.trim() || !newNote.content.trim()) {
      Alert.alert("Error", "Please fill in both title and content");
      return;
    }

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

      Alert.alert("Success", "Note saved successfully!", [
        {
          text: "OK",
          onPress: () => {
            // Revert inputs to null/ empty
            setNewNote({
              title: "",
              content: "",
              date: "",
              id: uuidv4(),
              favourite: null,
              category: "Personal",
              tags: [],
            });
            setWordCount(0);
            setTagInput("");
            setNotes([]);
          },
        },
      ]);
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Failed to save note. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-gray-900 h-screen">
      <View className="flex-row items-center justify-between mb-2 px-4 pt-2 bg-primary-dark sticky top-0 z-10">
        <Text className="text-2xl font-bold text-primary-button">Scribbly</Text>
        {/* Header actions */}
        <View className="flex-row items-center gap-4">
          {/* <TouchableOpacity onPress={clearAll}>
            <Ionicons name="trash-outline" size={24} color="rgb(239 68 68)" />
          </TouchableOpacity> */}
          <TouchableOpacity onPress={toggleMenu}>
            <Ionicons name="menu" size={27} className="text-primary-button" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        className="flex-1 px-4 py-4"
        showsVerticalScrollIndicator={false}
      >
        <Text className="text-primary-btnLight text-2xl font-semibold text-center mb-6">
          Create new note
        </Text>

        <View className="max-w-md mx-auto w-full">
          {/* Title with character count */}
          <View className="mb-4">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-slate-400 font-medium">Title</Text>
              <Text className="text-slate-500 text-sm">
                {newNote.title.length}/100
              </Text>
            </View>
            <TextInput
              autoFocus
              value={newNote.title}
              maxLength={100}
              autoComplete="off"
              onChangeText={(text) =>
                setNewNote((prev) => ({ ...prev, title: text }))
              }
              placeholder="i.e code snippets..."
              placeholderTextColor="rgb(196 181 253 / 0.5)"
              className="bg-gray-800 h-12 ring-1 rounded-xl outline-0 px-4 text-primary-light focus:ring-2 ring-primary-btnLight"
            />
          </View>

          {/* Category Selection */}
          <View className="mb-4">
            <Text className="text-slate-400 font-medium mb-2">Category</Text>
            <TouchableOpacity
              onPress={() => setShowCategories(!showCategories)}
              className="bg-gray-800 h-12 ring-1 rounded-xl px-4 flex-row items-center justify-between ring-primary-btnLight"
            >
              <Text className="text-primary-light">{newNote.category}</Text>
              <Ionicons
                name={showCategories ? "chevron-up" : "chevron-down"}
                size={20}
                color="rgb(196 181 253)"
              />
            </TouchableOpacity>

            {showCategories && (
              <View className="bg-gray-800 mt-2 rounded-xl ring-1 ring-primary-btnLight max-h-40">
                <ScrollView showsVerticalScrollIndicator={false}>
                  {categories.map((category) => (
                    <TouchableOpacity
                      key={category}
                      onPress={() => {
                        setNewNote((prev) => ({ ...prev, category }));
                        setShowCategories(false);
                      }}
                      className={`px-4 py-3 border-b border-gray-700 ${
                        newNote.category === category
                          ? "bg-primary-button/20"
                          : ""
                      }`}
                    >
                      <Text className="text-primary-light">{category}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>

          {/* Tags Section */}
          <View className="mb-4">
            <Text className="text-slate-400 font-medium mb-2">Tags</Text>
            <View className="flex-row items-center gap-2 mb-2">
              <TextInput
                value={tagInput}
                onChangeText={setTagInput}
                placeholder="Add a tag..."
                placeholderTextColor="rgb(196 181 253 / 0.5)"
                className="bg-gray-800 h-10 ring-1 rounded-lg outline-0 px-3 text-primary-light focus:ring-2 ring-primary-btnLight flex-1"
                onSubmitEditing={addTag}
              />
              <TouchableOpacity
                onPress={addTag}
                className="bg-primary-button h-10 px-4 rounded-lg flex items-center justify-center"
              >
                <Ionicons name="add" size={20} color="white" />
              </TouchableOpacity>
            </View>

            {/* Display Tags */}
            {newNote.tags.length > 0 && (
              <View className="flex-row flex-wrap gap-2">
                {newNote.tags.map((tag, index) => (
                  <View
                    key={index}
                    className="bg-primary-button/20 rounded-full px-3 py-1 flex-row items-center gap-1"
                  >
                    <Text className="text-primary-light text-sm">#{tag}</Text>
                    <TouchableOpacity onPress={() => removeTag(tag)}>
                      <Ionicons
                        name="close"
                        size={16}
                        color="rgb(196 181 253)"
                      />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Content with word count */}
          <View className="mb-4">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-slate-400 font-medium">Content</Text>
              <Text className="text-slate-500 text-sm">{wordCount} words</Text>
            </View>
            <TextInput
              value={newNote.content}
              onChangeText={handleContentChange}
              placeholder="Start typing your thoughts..."
              multiline
              textAlignVertical="top"
              placeholderTextColor="rgb(196 181 253 / 0.5)"
              className="bg-gray-800 ring-1 py-3 min-h-32 rounded-xl outline-0 px-4 text-primary-light focus:ring-2 ring-primary-btnLight"
            />
          </View>

          {/* Action Buttons */}
          <View className="flex-row gap-3 mb-6">
            {/* Favourite Button */}
            <TouchableOpacity
              onPress={toggleFavourite}
              className={`flex-1 py-3 px-4 rounded-xl border-2 ${
                newNote.favourite
                  ? "border-yellow-500 bg-yellow-500/20"
                  : "border-gray-600 bg-gray-800"
              }`}
            >
              <View className="flex-row items-center justify-center gap-2">
                <Ionicons
                  name={newNote.favourite ? "star" : "star-outline"}
                  size={20}
                  color={newNote.favourite ? "#eab308" : "rgb(156 163 175)"}
                />
                <Text
                  className={`font-medium ${
                    newNote.favourite ? "text-yellow-500" : "text-gray-400"
                  }`}
                >
                  {newNote.favourite ? "Favourite" : "Add to Favourite"}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Save Button */}
          <TouchableOpacity
            onPress={createNote}
            disabled={
              loading || !newNote.title.trim() || !newNote.content.trim()
            }
            className={`py-4 px-4 shadow-xl rounded-xl mt-2 mb-24 ${
              loading || !newNote.title.trim() || !newNote.content.trim()
                ? "bg-gray-600"
                : "bg-primary-button"
            }`}
          >
            <View>
              {loading ? (
                <View className="flex flex-row justify-center items-center gap-2">
                  <ActivityIndicator color="white" />
                  <Text className="text-center font-medium text-white text-[16px]">
                    Saving...
                  </Text>
                </View>
              ) : (
                <View className="flex-row items-center justify-center gap-2">
                  <Ionicons name="save-outline" size={20} color="white" />
                  <Text className="text-center font-medium text-white text-[16px]">
                    Create Note
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {menuOpen && <MenuModal />}
    </SafeAreaView>
  );
};

export default NewNote;
