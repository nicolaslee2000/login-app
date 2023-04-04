import React, { useEffect } from "react";

const Like = ({ handleLike, likes, userId }) => {
  useEffect(() => {
  }, []);

  const LikeStatus = () => {
    if (likes?.length > 0) {
      return likes.find((id) => id === userId) ? (
        <>
          <i/>
          {likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      ) : (
        <>
          {likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }
    return (
      <div>
        <i />
        Like
      </div>
    );
  };
  return (
    <>
      <span
        onClick={!userId ? null : handleLike}
      >
        {!userId ? (
          <button
            type="button"
            title="Please Login to like post"
          >
            <LikeStatus />
          </button>
        ) : (
          <button type="button">
            <LikeStatus />
          </button>
        )}
      </span>
    </>
  );
};

export default Like;