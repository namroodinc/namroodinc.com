import { createContext, useContext } from "react";
import { TeamsStore } from "./packages/pitchgen/stores/TeamsStore";
import { AssetsStore } from "./stores/AssetsStore";
import { BlogPostStore } from "./stores/BlogPostStore";
import { HomeStore } from "./stores/HomeStore";
import { PageStore } from "./stores/PageStore";
import { SiteStore } from "./stores/SiteStore";

export const stores = Object.freeze({
  assetsStore: new AssetsStore(),
  blogPostStore: new BlogPostStore(),
  homeStore: new HomeStore(),
  pageStore: new PageStore(),
  siteStore: new SiteStore(),
  teamsStore: new TeamsStore()
});

export const StoresContext = createContext(stores);
export const StoresProvider = StoresContext.Provider;
export const useStore = (store) => useContext(StoresContext)[store];
