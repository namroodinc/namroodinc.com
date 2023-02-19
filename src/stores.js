import { createContext, useContext } from "react";
import { BlogPostStore } from "./stores/BlogPostStore";
import { HomeStore } from "./stores/HomeStore";
import { SiteStore } from "./stores/SiteStore";

export const stores = Object.freeze({
  blogPostStore: new BlogPostStore(),
  homeStore: new HomeStore(),
  siteStore: new SiteStore()
});

export const StoresContext = createContext(stores);
export const StoresProvider = StoresContext.Provider;
export const useStore = (store) => useContext(StoresContext)[store];
