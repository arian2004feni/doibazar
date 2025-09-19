import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase-init";
import { AuthContext } from "./AuthContext";
import AuthModal from "../app/AuthModal";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const closeModal = () => setIsOpen(false);
  const openModal = () => {
    setIsOpen(true);
    setIsLogin(true);
  };

  const provider = new GoogleAuthProvider();

  const createUser = (email, password) => {
    setAuthLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setAuthLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignInUser = () => {
    setAuthLoading(true);
    return signInWithPopup(auth, provider);
  };

  const signOutUser = () => {
    setAuthLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("User Info in useEffect", currentUser);
      setAuthLoading(false);
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const userInfo = {
    user,
    authLoading,
    setAuthLoading,
    createUser,
    signInUser,
    googleSignInUser,
    signOutUser,
    closeModal,
    openModal,
    isOpen,
    isLogin,
    setIsLogin
  };

  return (
    <AuthContext value={userInfo}>
      {children}
      <AuthModal />
    </AuthContext>
  );
};

export default AuthProvider;
