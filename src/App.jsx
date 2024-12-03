import { Route, Routes } from 'react-router-dom';
import NavBar from "./Components/NavBar/NavBar";
import HomePage from "./Pages/HomePage";
import Contact from "./Pages/Contact"
import Footer from "./Components/Footer"

// one page application structure -> navigation switches the main component

function App() {
  return (
    <main>
      <NavBar />
      <ScrollToTop />
      <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/contact" element={<Contact/>}/>
     </Routes>
      <Footer />
    </main>
  );
}

export default App;