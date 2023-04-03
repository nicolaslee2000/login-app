import React, { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import ReactTagInput from "@pathofdev/react-tag-input";
import { useNavigate } from "react-router-dom";
import { db, storage } from "../firebase-config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const initialState = {
  title: "",
  tags: [],
  category: "",
  description: "",
};

const categoryOption = [
  "Fashion",
  "Technology",
  "Food",
  "Politics",
  "Sports",
  "Business",
];

const AddEditBlog = () => {
  const { user } = UserAuth();
  const [form, setForm] = useState(initialState);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);

  const navigate = useNavigate();

  const { title, tags, category, description } = form;

  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setProgress(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is puased");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            setForm((prev) => ({ ...prev, imgUrl: downloadUrl }));
          });
        }
      );
    };

    file && uploadFile();
  }, [file]);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTags = (tags) => {
    setForm({ ...form, tags });
  };

  const onCategoryChange = (e) => {
    setForm({ ...form, category: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (category && tags && title && file && description) {
      try {
        await addDoc(collection(db, "blogs"), {
          ...form,
          timestamp: serverTimestamp(),
          author: user.displayName,
          userId: user.uid,
        });
      } catch (err) {
        console.log(err);
      }
    }

    navigate("/");
  };

  return (
    <div
      style={{
        display: "flex",
        alignContent: "center",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div
        style={{ fontWeight: "normal", fontSize: "3em", marginBottom: "20px" }}
      >
        Post
      </div>
      <div
        style={{
          backgroundColor: "red",
          width: "max(80%, 500px)",
          margin: "auto",
          display: "flex",
        }}
      >
        <form onSubmit={handleSubmit}>
          <h4 style={{ marginBottom: "10px" }}>Title</h4>
          <div>
            <input
              type="text"
              placeholder="Title"
              name="title"
              value={title}
              onChange={handleChange}
            />
          </div>
          <div>
            <ReactTagInput
              tags={tags}
              placeholder="Tags"
              onChange={handleTags}
            />
          </div>
          <div>
            <select value={category} onChange={onCategoryChange}>
              <option>Please select category</option>
              {categoryOption.map((option, index) => (
                <option value={option || ""} key={index}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div>
            <textarea
              placeholder="Description"
              value={description}
              name="description"
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="file"
              className="form-control"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <div>
            <button type="submit" disabled={progress != null && progress < 100}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditBlog;
