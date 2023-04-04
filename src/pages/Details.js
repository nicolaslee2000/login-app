import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {db} from "../firebase-config";
import {getDoc, doc,updateDoc, serverTimestamp, Timestamp} from "firebase/firestore";
import LikeArticle from '../components/LikeArticle';
import { toast } from "react-toastify";
import UserComments from '../components/UserComments';
import { isEmpty } from "lodash";
import CommentBox from '../components/CommentBox';

const Detail = ({user}) => {
    const userId = user?.uid;
    const {id} = useParams();
    const [blog, setBlog] = useState(null);
    let [likes, setLikes] = useState([]);
    const [comments, setComments] = useState([]);
    const [userComment, setUserComment] = useState("");

    useEffect(() => {
        id && getBlogDetail();
    }, [id])

    const getBlogDetail = async () => {
        const docRef = doc(db, 'blogs', id);
        const blogDetail = await getDoc(docRef);
        setBlog(blogDetail.data());
        setComments(blogDetail.data().comments ? blogDetail.data().comments : []);
        setLikes(blogDetail.data().likes ? blogDetail.data().likes : []);
    }  

    const handleComment = async (e) => {
        e.preventDefault();
        comments.push({
          createdAt: Timestamp.fromDate(new Date()),
          userId,
          name: user?.displayName,
          body: userComment,
        });
        toast.success("Comment posted successfully");
        await updateDoc(doc(db, "blogs", id), {
          ...blog,
          comments,
          timestamp: serverTimestamp(),
        });
        setComments(comments);
        setUserComment("");
      };

    const handleLike = async () => {
        if (userId) {
          if (blog?.likes) {
            const index = likes.findIndex((id) => id === userId);
            if (index === -1) {
              likes.push(userId);
              setLikes([...new Set(likes)]);
            } else {
              likes = likes.filter((id) => id !== userId);
              setLikes(likes);
            }
          }
          await updateDoc(doc(db, "blogs", id), {
            ...blog,
            likes,
            timestamp: serverTimestamp(),
          });
        }
      };
    
    
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
                    <LikeArticle handleLike = {handleLike} likes = {likes} userId= {userId} />
                    <p>{blog?.description} </p>
                </div>
                <div className="custombox">
                <div className="scroll">
                  <h4 className="small-title">{comments?.length} Comment</h4>
                  {isEmpty(comments) ? (
                    <UserComments
                      msg={
                        "No Comment yet posted on this blog. Be the first to comment"
                      }
                    />
                  ) : (
                    <>
                      {comments?.map((comment) => (
                        <UserComments {...comment} />
                      ))}
                    </>
                  )}
                </div>
              </div>
              <CommentBox
                userId={userId}
                userComment={userComment}
                setUserComment={setUserComment}
                handleComment={handleComment}
              />
            </div>
        </div>
    )
}

export default Detail;