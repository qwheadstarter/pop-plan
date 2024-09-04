"use client";

import Footer from "@/app/components/Footer";
import Header from "@/app/components/header";
import "@/app/globals.css";
import { db } from "../firebase";
import Geolocation from "@/utils/geolocation";
import { useUser } from "@clerk/nextjs";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  writeBatch,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Profile() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [quizResults, setQuizResults] = useState([]);
  const [showQuizResults, setShowQuizResults] = useState(false); // State to toggle quiz results
  const [showLocation, setShowLocation] = useState(false); // State to toggle location section
  const [locationError, setLocationError] = useState(""); // State to handle geolocation error
  const [zipCode, setZipCode] = useState(""); // State for the ZIP code input
  const [locationPermission, setLocationPermission] = useState(false); // State to check if permission was granted
  const [userLocation, setUserLocation] = useState(null); // State to store user's location
  const [confirmRetake, setConfirmRetake] = useState(false); // State to show confirmation page
  const [showProfileImage, setShowProfileImage] = useState(false); // State to handle profile image enlargement
  const [profileImageUrl, setProfileImageUrl] = useState(""); // State to store user's profile image url
  const router = useRouter();

  useEffect(() => {
    async function getQuizResults() {
      if (!user) return;
      const colRef = collection(
        doc(collection(db, "users"), user.id),
        "Quiz Results"
      );
      const docSnap = await getDocs(colRef);

      const quizResults = [];
      docSnap.forEach((doc) => {
        quizResults.push({ id: doc.id, ...doc.data() });
      });
      setQuizResults(quizResults);
    }
    getQuizResults();

    async function getUserData() {
      if (!user) return;
      const docRef = doc(collection(db, "users"), user.id);
      const docSnap = await getDoc(docRef);

      // set fields
      setZipCode(docSnap.data().zipCode);
      setProfileImageUrl(docSnap.data().profileImageUrl);
    }
    getUserData();
  }, [user]);

  if (!isLoaded || !isSignedIn) {
    return <></>;
  }

  const handleZipCodeSubmit = async () => {
    if (zipCode) {
      console.log("User submitted ZIP Code:", zipCode);

      const batch = writeBatch(db);
      const userDocRef = doc(collection(db, "users"), user.id);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        batch.set(userDocRef, { zipCode: zipCode }, { merge: true });
      }

      await batch.commit();
      alert("Saved successfully");
    }
  };

  const handleGiveLocationPermission = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setLocationPermission(true);
          setLocationError(""); // Clear any previous errors
        },
        (error) => {
          setLocationError("User denied Geolocation");
          setLocationPermission(false);
        }
      );
    } else {
      setLocationError("Geolocation is not supported by this browser.");
    }
  };

  const handleEditProfileImage = async (e) => {
    e.preventDefault();
    const image = e.target[0]?.files[0];
    if (image) {
      const storage = getStorage();

      const imageRef = ref(storage, `${user.id}/profileImage/${image.name}`);
      await uploadBytesResumable(imageRef, image);

      const imageUrl = await getDownloadURL(imageRef);

      const batch = writeBatch(db);
      const userDocRef = doc(collection(db, "users"), user.id);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        batch.set(userDocRef, { profileImageUrl: imageUrl }, { merge: true });
      }

      await batch.commit();
      alert("Saved successfully");

      setProfileImageUrl(imageUrl);
    }
  };

  const handleRetakeQuiz = () => {
    setConfirmRetake(true); // Show confirmation page
  };

  const handleYesRetake = () => {
    router.push("/quiz"); // Navigate to the quiz page
  };

  const handleNoGoBack = () => {
    setConfirmRetake(false); // Hide confirmation page and return to profile
  };

  const saveUserBasicInfo = async (userName, age, gender) => {
    const batch = writeBatch(db);
    const userDocRef = doc(collection(db, "users"), user.id);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      batch.set(userDocRef, { name: userName }, { merge: true });
      batch.set(userDocRef, { age: age }, { merge: true });
      batch.set(userDocRef, { gender: gender }, { merge: true });
    }

    await batch.commit();
    alert("Saved successfully");
  };

  return (
    <div className="profile-container">
      <Header />
      <div className="profile-hero">
        <div
          className="profile-image-wrapper"
          onClick={() => setShowProfileImage(true)}
        >
          <img
            src={profileImageUrl || "/profile/defaultPic.png"}
            alt="Profile"
            className="profile-image"
          />
        </div>
        <h1 className="welcome-text">Welcome, {user.fullName || "User"}!</h1>
        <div className="buttons-wrapper">
          <button
            className="custom-button"
            onClick={() => setShowQuizResults(!showQuizResults)}
          >
            {showQuizResults ? "Hide Quiz Results" : "See Quiz Results"}
          </button>
          <button className="custom-button" onClick={handleRetakeQuiz}>
            Retake Preference Quiz
          </button>
          <button className="custom-button">Rate Your Plans</button>
          <button className="custom-button">Ask Poppy for a New Plan</button>
          <button
            className="custom-button"
            onClick={() => setShowLocation(!showLocation)}
          >
            {showLocation ? "Hide Location" : "Update Location"}
          </button>
        </div>
      </div>

      {/* Conditionally render the confirmation view for retaking quiz */}
      {confirmRetake && (
        <div className="overlay">
          <div className="confirmation-box">
            <h3 className="content-title">
              Are you sure you want to retake your preference quiz?
            </h3>
            <p>
              All previous results will be lost and replaced with the new
              results.
            </p>
            <div className="expanded-buttons-wrapper">
              <button className="custom-button" onClick={handleYesRetake}>
                Yes, Retake Quiz
              </button>
              <button className="custom-button" onClick={handleNoGoBack}>
                No, Go Back
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Regular Profile Content */}
      {!confirmRetake && !showProfileImage && (
        <div className="content">
          {showQuizResults && (
            <>
              <h3 className="content-title">Quiz Results</h3>
              <div className="results-container">
                {quizResults.map((result, idx) => (
                  <p key={idx} className="result-text">
                    <strong>{result.category}</strong>:{" "}
                    <span>{JSON.stringify(result.answer, null, 2)}</span>
                  </p>
                ))}
              </div>
            </>
          )}

          {showLocation && (
            <>
              <h3 className="content-title">Your Location</h3>
              {!locationPermission && (
                <>
                  <button
                    className="custom-button"
                    onClick={handleGiveLocationPermission}
                  >
                    Give Location Permission
                  </button>
                  {locationError && (
                    <div className="location-input-container">
                      <input
                        type="text"
                        className="location-input"
                        placeholder="Enter your ZIP Code"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                      />
                      <button
                        className="custom-button"
                        onClick={handleZipCodeSubmit}
                      >
                        Submit
                      </button>
                    </div>
                  )}
                </>
              )}
              {locationPermission && userLocation && (
                <div>
                  <p>Your location is:</p>
                  <p>Latitude: {userLocation.latitude}</p>
                  <p>Longitude: {userLocation.longitude}</p>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Conditionally render the expanded profile image view */}
      {showProfileImage && (
        <div className="overlay">
          <div className="expanded-profile-container">
            <img
              src={profileImageUrl || "/profile/defaultPic.png"}
              alt="Expanded Profile"
              className="expanded-profile-image"
              style={{ width: "300px", height: "300px" }} // Ensure image is doubled in size
            />
            <div className="expanded-buttons-wrapper">
              <button
                className="custom-button"
                onClick={() => setShowProfileImage(false)}
              >
                Exit
              </button>
                <form onSubmit={handleEditProfileImage} className="custom-button">
                  <label htmlFor="file-upload" className="file-upload-label">
                    Edit Profile Picture
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                />
                <button type="submit"></button>
              </form>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
