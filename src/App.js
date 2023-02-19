import Footer from "./components/footer";
import Header from "./components/header";
import Post from "./components/post";
import { StoresProvider, stores } from "./stores";

function App() {
  return (
    <>
      <StoresProvider value={stores}>
        <Header />
        <h1>test</h1>
        <Post />
        <Footer />
      </StoresProvider>
    </>
  );
}

export default App;
