"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";

const uploads = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const username = session?.user?.name;

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (files.length === 0 && !name && !description) {
      console.warn(
        "No files, name, or description. Please provide at least one of them.",
      );
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("username", username);

    if (files) {
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }
    }
    try {
      const response = await axios.post(
        "http://localhost:3001/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      console.log("Post uploaded:", response.data);
    } catch (error) {
      console.error("Error uploading post:", error);
    }
  };

  return (
    <>
      <div id="inputBox">
        <form
          onSubmit={handleSubmit}
          id="postForm"
          encType="multipart/form-data"
        >
          <label htmlFor="name">Product Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <br />
          <label htmlFor="description">Write sth: </label>
          <textarea
            id="description"
            name="description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <br />
          <br />
          <label htmlFor="price">Price:</label>
          <input
            type="decimal"
            id="price"
            name="price"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <br />
          <br />
          <label htmlFor="input-files">Pictures:</label>
          <input
            type="file"
            name="files"
            id="input-files"
            className="form-control-file border"
            onChange={handleFileChange}
            multiple
          />
          <br />
          <br />
          <button type="submit">Post</button>
        </form>
        <div className="row">
          <div className="col-sm-12">
            <div className="preview-images" />
          </div>
        </div>
      </div>
    </>
  );
};

export default uploads;
