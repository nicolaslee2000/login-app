import React from 'react';
import { Link } from 'react-router-dom';

//user?.uid && item.userId === user.uid && () only the user can delete its own post 
const BlogSection = ({blogs, user,handleDelete}) => {
    const userId = user?.uid;
    return ( 
        <div>
        <div>Section</div>
        {blogs?.map((item) => (
                <div key={item.id}> 
                    <div>
                        <img src={item.imgUrl} alt={item.title}/>
                        <div> </div>
                    </div>
                    <div>
                        <h6>{item.category}</h6>
                        <span>{item.title}</span>
                        <span>
                            <p className="author">{item.author}</p>
                            {item.timestamp.toDate().toDateString}
                        </span>
                    </div>
                    <div>
                        {item.description}
                    </div>
                    <Link to = {`/detail/${item.id}`}>
                        read more
                    </Link>
                     { user && user.uid === userId && (   //only the user should be able to update and delete (not working)
                        <div>
                            <div onClick={() => handleDelete(item.id)}>delete</div>
                            <Link to = {`/update/${item.id}`}>update</Link> 
                        </div>
                    )}
                    <div>
                        
                    </div>
                                           
                </div>
        ))}
        </div>
    )
}

export default BlogSection;

//{user && <LikeArticle id= {item.id} likes = {item.likes} />}