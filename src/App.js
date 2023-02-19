import BlogPostList from "./components/blogPostList";
import Footer from "./components/footer";
import Header from "./components/header";
import { StoresProvider, stores } from "./stores";

function App() {
  return (
    <>
      <StoresProvider value={stores}>
        <Header />
        <h1>test</h1>
        <BlogPostList />
        <Footer />
      </StoresProvider>
    </>
  );
}

export default App;
