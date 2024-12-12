import React from 'react';
import {  signOut } from "firebase/auth";
import auth from '../firebase-config';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const handleLogout = () => {               
        signOut(auth).then(() => {
        // Sign-out successful.
            navigate("/");
            console.log("Signed out successfully")
        }).catch((error) => {
        // An error happened.
        });
    }

    return(
        <>
            <nav>
                <p>
                    Welcome Home
                </p>

                <div>
                    <button onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </nav>
        </>
    )

    return (
        <main className="profile">
            <section>
                <h1>Welcome, {userData.name || "User"}!</h1>
                <div className="profile-details">
                    <p><strong>Name:</strong> {userData.name}</p>
                    <p><strong>Email:</strong> {auth.currentUser.email}</p>
                    <p><strong>Age:</strong> {userData.age || "Not provided"}</p>
                    <p><strong>Gender:</strong> {userData.gender || "Not provided"}</p>
                </div>
            </section>
        </main>
    );
};
export default Home;