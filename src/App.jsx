import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import HomePage from "./Pages/HomePage";
import Contact from "./Pages/Contact";
import ContactAuth from "./Pages/Contact";
import Footer from "./Components/Footer";
import Acc from "./Pages/Acc";
import auth from "./firebase-config";
import Signup from "./Pages/AuthPage";
import Login from "./Pages/Login";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth") === "true");

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth(true);
        localStorage.setItem("isAuth", "true");
      } else {
        setIsAuth(false);
        localStorage.removeItem("isAuth");
      }
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  const publicRoutes = (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/authpage" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Signup />} />
      </Routes>
      <Footer />
    </>
  );

  const privateRoutes = (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contactauth" element={<ContactAuth />} />
        <Route path="/acc" element={<Acc />} />
        <Route path="/*" element={<Acc />} />
      </Routes>
      <Footer />
    </>
  );

  return <main>{isAuth ? privateRoutes : publicRoutes}</main>;
}

export default App;
