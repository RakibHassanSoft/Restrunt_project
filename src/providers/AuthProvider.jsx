import React, { createContext, useEffect, useState } from 'react';
import {GoogleAuthProvider ,signOut, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, updateProfile, signInWithPopup } from "firebase/auth";
import {app} from '../firebase/firebase.config'
import useAxiosPublic from '../hooks/useAxiosPublic';

export const AuthContext = createContext(null)
const auth = getAuth(app);

const AuthProvider = ({children}) => {

    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true)
  const axiosPublic = useAxiosPublic()
   //Create user 
   const createUser =(email,password)=>{
      setLoading(true);
     return createUserWithEmailAndPassword(auth,email,password)
   }
   //sign in user
   const singIn =(email,password)=>{
      setLoading(true);
     return signInWithEmailAndPassword(auth,email,password)
   }
   //sign in by google
   const provider = new GoogleAuthProvider();
   const signInByGoolge =()=>{
    setLoading(true);
     return signInWithPopup(auth,provider)
   }
   //sign out
   const signOutUser =()=>{
    setLoading(false);
     return signOut(auth)
   }

   //update user 
   const updateUser = (name,photo)=>{
     return updateProfile(auth.currentUser, {
        displayName: name, photoURL: photo
      })
      
   }
    //Monitoring user 
    useEffect(()=>{
        const unSubscribe =onAuthStateChanged(auth,currentUser=>{
            setUser(currentUser);
            // console.log("current User",currentUser);
            if(currentUser){
                    //get token and store client side
                    const userInfo = {email :currentUser.email}
                    axiosPublic.post('/jwt',userInfo)
                    .then(res=>{
                       if(res.data.token){
                        localStorage.setItem('access-token',res.data.token);
                       }
                    })
            }else{
                //TODO: remove token (if token store in client side local store,caching,in memory)
                localStorage.removeItem('accenss-token')
            }
            setLoading(false);
        });
        return ()=>{
            setUser(null)
            return unSubscribe;
        }
    },[axiosPublic])


    const authInfo = {
        user,
        loading,
        createUser,
        singIn,
        signInByGoolge,
        signOutUser,
        updateUser,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;