import React, {useEffect, useState} from 'react';
import {UserAuth} from '../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { addDoc, collection , doc, updateDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { toast } from "react-toastify";
import {db} from "../firebase-config"
import { Category } from '@mui/icons-material';

const initialState = { 
    name: '',
    currentDegree: [],
    identity: [],
    degreeName: '',
}

const currentDegreeOption = [
    "학사",
    "석사",
    "박사",
    "박사 후 과정"
]

const SignUp = () => {
    const {user} = UserAuth();
    const [form, setForm] = useState(initialState);

    const navigate = useNavigate();

    const {id} = useParams();

    const {name, currentDegree, identity, degreeName} = form;

    const handleTags = (tags) => {
        setForm({...form, tags});
    }

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const onCurrentDegreeChange = (e) =>  {
        setForm({...form, currentDegree: e.target.value})
    }

    useEffect(() => {
        id && getUserDetail();
    }, [id]);

    const getUserDetail = async () => {
        const docRef = doc(db, "users", id);
        const snapshot = await getDoc(docRef);
        if(snapshot.exists()) {
            setForm({...snapshot.data()});
        }
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(name, currentDegree, identity, degreeName) {
                await addDoc(collection(db, "users"),{
                ...form, 
                        timestamp: serverTimestamp(),
                        author: user.displayName,
                        userId: user.uid
                    })
            
    }
}

    return (
        <div>
            <div> {"SignUp User"} </div>
            <form onSubmit = {handleSubmit}>
                <div>
                    <input 
                    type="text"
                    placeholder ="name"
                    name = "name"
                    value = {name}
                    onChange = {handleChange} />
                </div>
                <div>
                    <select
                        value = {currentDegree}
                        onChange= {onCurrentDegreeChange}
                    >
                        <option> Please select Degree </option>
                        {currentDegreeOption.map((option,index) => (
                            <option value={option || ""} key = {index}>
                                {option}
                            </option>
                        ))}

                    </select>
                </div>
                <div>
                    <textarea 
                    placeholder = "degreeName"
                    value = {degreeName}
                    name = "degreeName"
                    onChange = {handleChange}/>
                </div>
                <div>
                    <button type="submit">
                        Submit
                    </button>
                </div>
            </form>
        </div>

    )

}

export default SignUp;