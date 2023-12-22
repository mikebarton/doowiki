import * as React from "react";
import { theme as lightTheme, darkTheme } from "../themes/index";
import { KeyObject } from "crypto";

// import { darkTheme, theme as lightTheme } from "./ui/theme";

/*
  Thanks to Okiki for the inspo!
  https://blog.okikio.dev/psa-add-dark-mode-to-your-sites-or-at-least-let-the-browsers-do-it-for-you

  This example uses Okiki's method of combining matchMedia, 
  localStorage and Stitches to allow you to toggle 
  through multiple color modes whilst also taking into account
  the user's operating system preferences.
  
  1. Create your theme(s) and import from `./stitches.config'
  2. Add to list of available themes (below)
  3. Wrap your app in <ColorModeProvider>
  4. Use ColorModeContext.Consumer to access the toggle function / name
*/

const { createContext, useState, useEffect } = React;
interface IColorModeContext {
  colourMode: string,
  setColourMode: (mode : string) => void
}
export const ColorModeContext = createContext<IColorModeContext>({} as IColorModeContext);

const DEFAULT_COLOR_MODE = "light";

type ColorMode = string;
type MediaTheme = string;
type ColorModeProviderType = [ColorMode, (mode: string) => void];

type AvailableThemes = {
  // [x: string]: typeof defaultTheme | typeof darkTheme;
  dark: string;
  light: string;
};

/* 
  Any available themes. The value of each key 
  returns the className from stitches' createTheme()
*/
const available_themes: AvailableThemes = {
  dark: darkTheme.className,
  light: lightTheme.className,
};

const saveColorMode = (newMode: ColorMode) => {
  try {
    if (typeof newMode === "string")
      window.localStorage.setItem("color-mode", newMode);
  } catch (e) {
    console.warn(e);
  }
};

const getSavedColorModePreference = (): keyof AvailableThemes => {
  try {
    const savedMode = window.localStorage.getItem("color-mode");
    // If the user has explicitly chosen a color mode,
    // let's use it. Otherwise, this value will be null.
    if (typeof savedMode === "string") return savedMode as keyof AvailableThemes;
  } catch (e) {
    // When Chrome in incognito, localStorage cannot be accessed
    console.warn(e);
    return DEFAULT_COLOR_MODE;
  }
  return DEFAULT_COLOR_MODE;
};

const getMediaTheme = (): keyof AvailableThemes => {
  // If they haven't been explicitly set, let's check the media query
  const mql = matchMedia("(prefers-color-scheme: dark)");
  const hasMediaQueryPreference = typeof mql.matches === "boolean";
  if (hasMediaQueryPreference) return mql.matches ? "dark" : "light";
  return DEFAULT_COLOR_MODE;
};

const useColorMode = (): ColorModeProviderType => {
  const [colorMode, setTheColorMode] = useState<keyof AvailableThemes>('light');
  const html = document.documentElement;

  // Set color mode in localStorage, as well as in the html tag
  const applyColorMode = (newMode: keyof AvailableThemes) => {
    html.classList.remove(available_themes[colorMode]);
    html.classList.add(available_themes[newMode]);
    setTheColorMode(newMode);
  };

  let savedColorMode = getSavedColorModePreference();
  if (savedColorMode == null) {
    // If no localStorage exists, use the user's OS setting
    savedColorMode = getMediaTheme();
  }
  // html.setAttribute("data-color-mode", savedColorMode);
  html.classList.add(available_themes[savedColorMode]);
  // Set initial state
  useEffect(() => {
    setTheColorMode(savedColorMode);
  }, [savedColorMode]);

  // Listen out for if a user changes operating system mode,
  // but don't save the change in local storage.
  // The only two options here are dark or light.
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      applyColorMode(e.matches ? "dark" : "light");
    });

  window
    .matchMedia("(prefers-color-scheme: light)")
    .addEventListener("change", (e) => {
      applyColorMode(e.matches ? "light" : "dark");
    });

  const setColorMode = (mode : any): void => {
    applyColorMode(mode);
    saveColorMode(mode);
  };

  return [colorMode as string, setColorMode];
};

type ColorModeProviderProps = {
  children?: any;
};

const ColorModeProvider = ({ children }: ColorModeProviderProps) => {
  const [colorMode, setColorMode] = useColorMode();
  return (
    <ColorModeContext.Provider
      value={{
        colourMode: colorMode,
        setColourMode: setColorMode,
      }}
    >
      {children}
    </ColorModeContext.Provider>
  );
};

export default ColorModeProvider;
