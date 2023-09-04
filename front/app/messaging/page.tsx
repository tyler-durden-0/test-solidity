"use client"
import React, { useState, useEffect } from 'react';
import {messaging, testNotificationSetUp} from '../../utils/initFarebase';
import { getToken } from "firebase/messaging"


export default function AuthPage() {
    const [file, setFile] = useState('');
    function requestPermission() {
        console.log('Requesting permission...');
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            console.log('Notification permission granted.');
          } else {
            console.log('1')
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                  // Разрешение получено, теперь вы можете отправлять уведомления
                }
              });
          }
        })
    }
    // Add the public key generated from the console here.
    // AIzaSyDJKVQehnE8gQ8W86i3msdVvhWalIDsEW8
    // BAVOPiaYQlawP_j_tO5HLzhHVuHPihr33ADysaNsyH9g0yMCPaxa8dCbSmUNWOC5cfPnV8Viy71CobWUJm3E6EE
    // console.log('messaging', messaging)
    // const getTokenFunction = async () => {
    //     getToken(messaging, 
    //         {vapidKey: "BAVOPiaYQlawP_j_tO5HLzhHVuHPihr33ADysaNsyH9g0yMCPaxa8dCbSmUNWOC5cfPnV8Viy71CobWUJm3E6EE"}).then((currentToken) => {
    //         if (currentToken) {
    //             console.log('currentToken', currentToken)
    //             // Send the token to your server and update the UI if necessary
    //             // ...
    //           } else {
    //             // Show permission request UI
    //             console.log('No registration token available. Request permission to generate one.');
    //             // ...
    //           }
    //     }).catch((err) => {
    //         console.log('An error occurred while retrieving token. ', err);
    //         // ...
    //     });
    // }

    useEffect(()=> {
        // testNotificationSetUp()
        // requestPermission();
        // getTokenFunction();
        // console.log('messaging');
    }, [])

    const handleFile = async (event: any) => {
       
    }



    return(
        <>
            <div>Test messaging here</div>

        </>
    )
}