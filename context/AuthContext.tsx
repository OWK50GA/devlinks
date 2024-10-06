'use client'

import React, { createContext, useContext, useEffect, useState } from "react"
import {auth, db} from '../firebase'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from 'firebase/auth'
import { doc, getDoc, setDoc } from "firebase/firestore"

type AuthContextType = {
    currentUser: User | null;
    userDataObj: any;
    signup: (email: string, password: string) => Promise<any>;
    login: (email: string, password: string) => Promise<any>;
    loading: boolean;
    setUserDataObj: React.Dispatch<React.SetStateAction<Record<string, any>>>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null)

export const useAuth = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider') 
    }

    return context
}

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null)
    const [userDataObj, setUserDataObj] = useState({})
    const [loading, setLoading] = useState(true)

    // Auth Handlers

    const signup = (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const login = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = () => {
        setCurrentUser(null)
        setUserDataObj({})
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            try {
                setLoading(true)
                setCurrentUser(user)

                if (!user) {
                    return
                }

                const docRef = doc(db, 'users', user.uid)
                const docSnap = await getDoc(docRef)
                if (!docSnap.exists()) {
                    await setDoc(docRef, userDataObj)
                  } else {
                    setUserDataObj(docSnap.data());
                  }                                                                                          
            } catch (err) {
                console.error('No user found ',err)                                                                                                                                                    
            } finally {
                setLoading(false)
            }
        })

        return unsubscribe

    }, [])

    const value = {
        currentUser, userDataObj, signup, logout, login, loading, setUserDataObj
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}