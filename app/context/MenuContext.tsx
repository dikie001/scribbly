// MenuContext.tsx
import React, { createContext, useContext, useState } from "react";

// 1. Define the shape of our context state and actions
type MenuContextType = {
  isMenuOpen: boolean; // true if menu is open
  openMenu: () => void; // function to open menu
  closeMenu: () => void; // function to close menu
  toggleMenu: () => void; // function to toggle open/close
};

// 2. Create the actual context with an initial value of undefined
// We’ll provide the actual value later in the provider
const MenuContext = createContext<MenuContextType | undefined>(undefined);

// 3. The provider component — wraps the part of your app that needs access
export const MenuProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // State to track if menu is open or not
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Opens the menu
  const openMenu = () => setIsMenuOpen(true);

  // Closes the menu
  const closeMenu = () => setIsMenuOpen(false);

  // Toggles the menu open/close
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  // Provide state + actions to children via context
  return (
    <MenuContext.Provider
      value={{ isMenuOpen, openMenu, closeMenu, toggleMenu }}
    >
      {children}
    </MenuContext.Provider>
  );
};

// 4. Custom hook to access the menu context from anywhere
export const useMenu = () => {
  const context = useContext(MenuContext);

  // Throw error if used outside the provider
  if (!context) throw new Error("useMenu must be used within a MenuProvider");

  return context;
};
