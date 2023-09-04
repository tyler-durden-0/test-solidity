"use client"
import React, { useState, useEffect } from 'react';
import {auth, db} from '../../utils/initFarebase';
import { getStorage, ref, uploadBytes } from "firebase/storage";


export default function AuthPage() {
    const [file, setFile] = useState('')
    const storage = getStorage();
    const storageRef = ref(storage, 'some-child');

    useEffect(()=> {
        console.log('upload file', auth);
    }, [])

    const handleFile = async (event: any) => {
        console.log('event', event);
        console.log('event.target.files', [...event.target.files][0]);
        const file = [...event.target.files][0];
        setFile(prev => prev = event.target.value)
        // 'file' comes from the Blob or File API
        uploadBytes(storageRef, file).then((snapshot) => {
            console.log('Uploaded a blob or file!');
            console.log('snapshot', snapshot)
        });
    }



    return(
        <>
            <input         
                type="file"
                id="file"
                name="file"
                onChange={handleFile}
                value={file}/>

        </>
    )
}