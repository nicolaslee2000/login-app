import React, {useState,useEffect} from 'react';
import { onSnapshot, collection } from "firebase/firestore";
import BlogSection from '../components/BlogSection';
import {db} from '../firebase-config';
import {deleteDoc, doc} from "firebase/firestore";
import { toast } from 'react-toastify';

const Post = (user) => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const unsub = onSnapshot(
            collection(db, "blogs"),
            (snapshot) => {
                let list = [];
                snapshot.docs.forEach((doc) => {
                    list.push({id: doc.id, ...doc.data()})
                });
                setBlogs(list);
                setLoading(false);
            }, (error) => {
                console.log(error)
            }
        );

        return () => {
            unsub();
        }
    }, []);

    const handleDelete = async (id) => {
        if(window.confirm("deleted?")) {
            try {
                setLoading(true);
                await deleteDoc(doc(db, "blogs",id));
                toast.success("blog deleted successfully");
                setLoading(false);
            } catch (err) {
                console.log(err);
            }
        }
    }

    return ( 
        <div>
        <h2> Blog</h2>
            <BlogSection blogs = {blogs}
            user = {user}
            handleDelete = {handleDelete}/>
        </div>
    )
}

export default Post;
