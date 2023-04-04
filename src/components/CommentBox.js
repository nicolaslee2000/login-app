

import React from "react";
import { useNavigate } from "react-router-dom";

const CommentBox = ({ userId, userComment, setUserComment, handleComment }) => {
  const navigate = useNavigate();
  return (
    <>
      <form>
        <div>
          <textarea
            rows="4"
            value={userComment}
            onChange={(e) => setUserComment(e.target.value)}
          />
        </div>
      </form>
      {!userId ? (
        <>
          <h5>Please login or Create an account to post comment</h5>
          <button onClick={() => navigate("/login")}> 
            Login
          </button>
        </>
      ) : (
        <>
          <button
            type="submit"
            onClick={handleComment}
          >
            Post Comment
          </button>
        </>
      )}
    </>
  );
};

export default CommentBox;