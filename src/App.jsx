import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from "./Components/NavBar/NavBar";
import HomePage from "./Pages/HomePage";
import Contact from "./Pages/Contact";
import ContactAuth from "./Pages/Contact";
import Footer from "./Components/Footer";
import Acc from "./Pages/Acc";
import { auth } from "./firebase-config";
import AuthPage from "./Pages/AuthPage"
import {onAuthStateChanged} from 'firebase/auth';

// one page application structure -> navigation switches the main component

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  onAuthStateChanged(auth, user => {
    if (user) {
      setIsAuth(true);
      localStorage.setItem("isAuth", true);
    } else {
      setIsAuth(false);
      localStorage.removeItem("isAuth")
    }
  })
const publicRoutes = (
  <>
  <NavBar />
  <Routes>
    <Route path="/" element={<HomePage />}/>
    <Route path="/contact" element={<Contact />}/>
    <Route path="/authpage" element={<AuthPage />}/>
    <Route path="/*" element={<AuthPage />}/>

  </Routes>
  <Footer />
  </>
);

const privateRoutes = (
  <>
  <NavBar />
  <Routes>
    <Route path="/" element={<HomePage />}/>
    <Route path="/contactauth" element={<ContactAuth />}/>
    <Route path="/acc" element={<Acc />}/>
  </Routes>
  <Footer />
  </>
);


  return (
    <main>{isAuth ? privateRoutes : publicRoutes}</main>
  );
}

export default App;