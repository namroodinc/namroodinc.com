import { BrowserRouter, Routes, Route } from "react-router-dom";
import BlogPost from "./components/blogPost";
import Home from "./components/home";
import Layout from "./components/layout";
import Page from "./components/page";
import { StoresProvider, stores } from "./stores";
import PitchLab from "./packages/pitchlab";
import PitchLabLayout from "./packages/pitchlab/layout";
import Sport from "./packages/pitchlab/sport";

import "./App.css";
import Team from "./packages/pitchlab/team";

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
            <Route path="packages/pitchlab" element={<PitchLabLayout />}>
              <Route index element={<PitchLab />} />
              <Route path=":sport" element={<Sport />} />
              <Route path=":sport/team/:teamId" element={<Team />} />
            </Route>
          </Route>
        </Routes>
      </StoresProvider>
    </BrowserRouter>
  );
}

export default App;
