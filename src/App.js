import { BrowserRouter, Routes, Route } from "react-router-dom";
import BlogPost from "./components/blogPost";
import Home from "./components/home";
import Layout from "./components/layout";
import Page from "./components/page";
import { StoresProvider, stores } from "./stores";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <StoresProvider value={stores}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route
              path="about"
              element={<Page id="35UdcXAsSsugQUqQ2oY0Ym" />}
            />
            <Route path="post/:id" element={<BlogPost />} />
          </Route>
        </Routes>
      </StoresProvider>
    </BrowserRouter>
  );
}

export default App;
