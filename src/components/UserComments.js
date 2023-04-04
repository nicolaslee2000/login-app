

import React from "react";

const UserComments = ({ name, body, createdAt, msg }) => {
  return (
          <div>
            <div>
              {msg ? (
                <h4>{msg}</h4>
              ) : (
                <>
                  <div>
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      alt="user"
                      className="rounded-circle"
                    />
                  </div>
                  <div>
                    <h3>
                      {name} {createdAt.toDate().toDateString()}
                    </h3>
                    <p>{body}</p>
                  </div>
                </>
              )}
            </div>
          </div>
  );
};

export default UserComments;