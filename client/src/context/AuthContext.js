import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../firebase';

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const createUser = async (email, password) => {
    try {
      return await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Error creating user:', error.message);
      throw error; 
    }
  };

  const signIn = async (email, password) => {
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Error signing in:', error.message);
      throw error; 
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log('Auth state changed, current user:', currentUser);
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ createUser, user, logout, signIn }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};


