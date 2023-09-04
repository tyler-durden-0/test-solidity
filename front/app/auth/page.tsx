"use client"
import styles from './styles.module.css';
import React, { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore"; 
import {auth, db} from '../../utils/initFarebase';

export default function AuthPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(()=> {
        console.log('auth in auth page', auth);
    }, [])

    const handleEmail = (event: any) => {
        setEmail(prev => prev = event.target.value)
    }

    const handlePassword = (event: any) => {
        setPassword(prev => prev = event.target.value)
    }

    const handleSignUp = async () => {
        console.log('email', email);
        console.log('password', password);
        console.log('SignUp');

        createUserWithEmailAndPassword(auth, email, password).then(async (userCredential) => {
            // Signed in 
            console.log('userCredential', userCredential)
            const user = userCredential.user;
            console.log('user after signUp', user)
            sendEmailVerification(user).then(() => {
                // Email verification sent!
                // ...
                console.log('verification email sent')
            });
            try {
                const docRef = await addDoc(collection(db, "users"), {
                  email: user.email,
                  emailVerified: user.emailVerified,
                  passwordHash: user.uid
                });
                console.log("Document written with ID: ", docRef.id);
              } catch (e) {
                console.error("Error adding document: ", e);
              }
            // ...
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('errorCode', errorCode)
            console.log('errorMessage', errorMessage)
            // ..
        });
    }

    const handleSignIn = async () => {
        console.log('email', email);
        console.log('password', password);
        console.log('SignIn');

        signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
              // Signed in 
              console.log('sign in success')
              const user = userCredential.user;
              console.log(' user after sign in', user)
              // ...
            }).catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log('errorCode', errorCode)
              console.log('errorMessage', errorMessage)
            });
    }


    return(
        <>
            <div className={styles.authWrapper}>
                <div className={styles.auth}>
                    <input         
                        type="email"
                        id="email"
                        name="email"
                        placeholder='Input Email'
                        onChange={handleEmail}
                        value={email}/>
                    <input         
                        type="password"
                        id="password"
                        name="password"
                        placeholder='Input password'
                        onChange={handlePassword}
                        value={password}/>
                    <button className={styles.buttonAuth} onClick={handleSignUp}>Sign Up</button>
                    <button className={styles.buttonAuth} onClick={handleSignIn}>Sign In</button>
                </div>
            </div>

        </>
    )
}