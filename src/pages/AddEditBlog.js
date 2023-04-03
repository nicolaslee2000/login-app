import React, {useState, useEffect} from 'react';
import { UserAuth } from "../context/AuthContext";
import ReactTagInput from '@pathofdev/react-tag-input';
import { useNavigate, useParams } from 'react-router-dom';
import '@pathofdev/react-tag-input/build/index.css';
import {db, storage} from "../firebase-config"
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import { addDoc, collection, serverTimestamp, doc, getDoc, updateDoc} from 'firebase/firestore';
import { toast } from "react-toastify";

const initialState = {
    title: '',
    tags: [],
    category: '',
    description: '',
    likes: [],
    comments: []
}

const categoryOption = [
    "Jobs",
    "Uni",
    "Event"
];

const AddEditBlog = () => {
    const {user} = UserAuth();
    const [form, setForm] = useState(initialState);
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(null);

    const navigate = useNavigate();
    
    const {id} = useParams();

    const {title, tags, category, description } = form;

    useEffect(() => {
        const uploadFile = () => {
            const storageRef = ref(storage, file.name);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on("state_changed", (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
                setProgress(progress);
                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload is paused");
                            break;
                    case "running":
                        console.log("Upload is running");
                            break;
                        default: 
                            break;
                }             
            }, (error) => {
                console.log(error)
            }, 
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
                    toast.info("Image upload to firebase successfully")
                    setForm((prev) => ({...prev, imgUrl: downloadUrl}))
                })
            }
            );
        };
        
        file && uploadFile();
    }, [file]);

    useEffect(() => {
        id && getBlogDetail();
    }, [id]);

    const getBlogDetail = async () => {
        const docRef = doc(db, "blogs",id);
        const snapshot = await getDoc(docRef);
        if(snapshot.exists()) {
            setForm({...snapshot.data()});
        }
    }


    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    }

    const handleTags = (tags) => {
        setForm({...form, tags});
    };

    const onCategoryChange = (e) => {
        setForm({...form, category: e.target.value})
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(category && tags && title && file && description) {
            if(!id) {
                try {
                    await addDoc(collection(db, "blogs"), {
                        ...form,
                        timestamp: serverTimestamp(),
                        author: user.displayName,
                        userId: user.uid
                    })
                    toast.success("Blog created");
                } catch (err) {
                    console.log(err);
                }
            } else {
                try {
                    await updateDoc(doc(db, "blogs",id), {
                        ...form,
                        timestamp: serverTimestamp(),
                        author: user.displayName,
                        userId: user.uid
                    })
                    toast.success("Blog updated");
                } catch (err) {
                    console.log(err);
                }
            } 
        } else {
            return toast.error("All fields are mandatory to fill");
        }

        navigate("/");
    }

    return (
        <div>
            <div> {id ? "Update Blog": "Create Blog "}</div> 
            <form onSubmit = {handleSubmit}>
                <div>
                    <input 
                    type= "text"
                    placeholder= 'Title'
                    name = 'title'
                    value = {title}
                    onChange = {handleChange}
                    />
                </div>
                <div>
                    <ReactTagInput
                        tags= {tags}
                        placeholder ="Tags"
                        onChange={handleTags}
                    />
                </div>
                <div>
                    <select
                        value = {category}
                        onChange = {onCategoryChange}
                    >
                        <option>Please select category</option>
                        {categoryOption.map((option,index) => (
                            <option value={option || ""} key = {index}> 
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <textarea
                    placeholder = "Description"
                    value = {description}
                    name = "description"
                    onChange = {handleChange}
                    />
                </div>
                <div>
                    <input type="file" className = "form-control" onChange = {(e) => setFile(e.target.files[0])}/>
                </div>
                <div>
                    <button type="submit" disabled ={progress != null && progress < 100}>
                        {id ? "Update": "Submit"}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddEditBlog;