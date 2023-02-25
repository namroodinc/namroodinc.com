import { BrowserRouter, Routes, Route } from "react-router-dom";
import BlogPost from "./components/blogPost";
import Layout from "./components/layout";
import { StoresProvider, stores } from "./stores";

import "./App.css";
import Home from "./components/home";

function App() {
  return (
    <BrowserRouter>
      <StoresProvider value={stores}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="post/:id" element={<BlogPost />} />
          </Route>
        </Routes>
      </StoresProvider>
    </BrowserRouter>
  );
}

export default App;
