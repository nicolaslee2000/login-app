
import {useState } from "react";
import { db, storage } from "../firebase-config";
import { ref, uploadBytes, deleteObject, getDownloadURL } from 'firebase/storage';
import { Avatar, DialogActions, TextField } from "@material-ui/core";
import { UserAuth } from "../context/AuthContext";
import {v4 as uuidv4} from 'uuid'
import { updateProfile } from 'firebase/auth';
import { Send } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import { serverTimestamp, addDoc, doc, getDocs, query, where, updateDoc, collection } from 'firebase/firestore';

const uploadFile = (file, filePath) => {
    return new Promise(async (resolve, reject) => {
        const storageRef = ref(storage, filePath);
        try {
            await uploadBytes(storageRef, file);
            const url = await getDownloadURL(storageRef);
            resolve(url)
        } catch (error) {
            reject(error);
        }
    })
}

const deleteFile = (filePath) => {
    const imageRef = ref(storage, filePath);
    return deleteObject(imageRef);
}

const updateUserRecords = (collectionName, uid, updateObj) => {
    return new Promise( async (resolve, reject) => {
        const q = query( collection(db, collectionName), where('uid', "==", uid))
        try {
            const snapshot = await getDocs(q)
            const updatePromises = []
            snapshot.forEach(document => {
                updatePromises.push( updateDoc(doc,(db, collectionName, document.id), updateObj) )
            })
            await Promise.all(updatePromises);
            resolve();
        } catch (error) {
            reject(error)
        }
    })
}

export default function Profile({user}) {
    const [name, setName] = useState(user?.displayName)
    const [degree, setDegree] = useState("")
    const [file, setFile] = useState(null)
    const [photoURL, setPhotoURL] = useState(user?.photoURL)

    const handleChange = (e) => {
        const file = e.target.files[0]
        if(file) {
            setFile(file)
            setPhotoURL(URL.createObjectURL(file))
        }
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()

        let userObj = {displayName : name, }
        let imagesObj = {uName : name}


        try {
            if(file) {
                    const imageName = uuidv4() + "." + file?.name?.split(".")?.pop()
                    const url = await uploadFile(file,`profile/${user?.uid}/${imageName}`);
                
                    if(user?.photoURL) {
                        const prevImage = user?.photoURL?.split(`${user?.uid}%2F`)[1].split("?")[0]
                        if(prevImage) {
                            try {
                                await deleteFile(`profile/${user?.uid}/${prevImage}`)
                            } catch (error) {
                                
                            }
                        }
                    }

                    userObj = {...userObj, photoURL: url}
                    imagesObj = {...imagesObj, uPhoto: url}
            }

            await updateProfile(user, userObj);
            await updateUserRecords('gallery', user?.uid, imagesObj)

            //todo: update gallery images documents related to this user
            
        } catch (error) {
            
            console.log(error)
        }
    }

    return (
        <form onSubmit= {handleSubmit}>
            <TextField
            value={name || ""}
            required
            label="Name"
            onChange={(e) => setName(e.target.value)}
            />

            <TextField
            value={degree || ""}
            required
            label="Degree"
            onChange={(e) => setDegree(e.target.value)}
            />

            <label htmlFor="profilePhoto">
                <input 
                accept="image/*"
                id = "profilePhoto"
                type="file"
                style= {{display:"none"}}
                onChange={handleChange}
                 />
                <Avatar
                src={photoURL}
                />
            </label>
            <DialogActions>
                <Button endIcon = {<Send />} type = "submit"> Submit </Button>
            </DialogActions>
        </form>
    )
}