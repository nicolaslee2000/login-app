import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

const Detail = () => {
    const {id} = useParams();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        id && getBlogDetail();
    }, [id])

    const getBlogDetail = async () => {
        const docRef = doc(db, 'blogs', id);
        const blogDetail = await getDoc(docRef);
        setBlog(blogDetail.data());
    }  
    
    return (
        <div>
            <div style = {{backgroundImage: `url('${blog?.imgUrl}'}`}}>
                <div>
                    <span>{blog?.timestamp.toDate().toDateString()}</span>
                    <h2>{blog?.title}</h2>
                </div>
                <div>
                    <span>
                        By <p>{blog?.author}</p>
                        {blog?.timestamp.toDate().toDateString()}
                    </span>
                    <p>{blog?.description} </p>
                </div>
            </div>
        </div>
    )
}