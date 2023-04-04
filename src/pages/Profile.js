
import {useState } from "react";
import { db, storage } from "../firebase-config";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Avatar, TextField } from "@material-ui/core";
import { UserAuth } from "../context/AuthContext";
import {v4 as uuidv4} from 'uuid'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import { serverTimestamp, addDoc, updateDoc, collection } from 'firebase/firestore';

export default function Profile() {
    const user = UserAuth();
    const [name, setName] = useState(user?.displayName)
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

        let userObj = {displayName : name}
        let imagesObj = {uName : name}
        try {
            if(file) {
                const imageName = uuidv4() + "." + file?.name?.split(".")?.pop
            }
        } catch (error) {

        }
    }

    return (
        <form onSubmit= {handleSubmit}>
            <TextField
            value={name || ""}
            required
            onChange={(e) => setName(e.target.value)}
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
        </form>
    )
}