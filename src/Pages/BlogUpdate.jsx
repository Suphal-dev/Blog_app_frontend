import React, { useState, useEffect } from "react";
import "../styles/blogEdit.css";
import { useParams } from "react-router-dom";

import { createApiInstance } from "../axiosConfig.js";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BlogUpdate = () => {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const navigate = useNavigate();
  const api = createApiInstance(navigate);

  const fetchData = async () => {
    try {
      const { data } = await api.get(`/user/single-blog/${id}`);
      console.log(data?.data);

      setTitle(data?.data?.title);
      setCategory(data?.data?.category);
      setContent(data?.data?.content);
      setImageUrl(data?.data?.imageUrl);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      ///validation
      if (
        [title, category, content, imageUrl].some(
          (value) => String(value).trim() === ""
        )
      ) {
        toast.error("Please fill all the fields", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

        fetchData();

        return;
      }

      const { data } = await api.post(`/user/update-blog/${id}`, {
        title,
        category,
        content,
        imageUrl,
      });

      console.log(data);

      if (data.success) {
        toast.success("Blog updated Successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

        navigate("/user-dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="blog_create_container">
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />

        <h1 className="blog_create_title">Update the Blog</h1>

        <form className="blog_create_form" onSubmit={handleSubmit}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Enter the title of your blog post"
          />

          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            name="category"
            required
          >
            <option value="">Select a category</option>
            <option value="Tech">Technology</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Health">Health</option>
            <option value="Travel">Travel</option>
            <option value="Sports">Sports</option>
            <option value="Business">Business</option>
            <option value="Food">Food</option>
            <option value="Politics">Politics</option>
          </select>

          <label htmlFor="image-url">Image URL</label>
          <input
            type="url"
            id="image-url"
            name="image-url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
            placeholder="Enter image URL"
          />

          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            placeholder="Enter a description for your blog post"
          ></textarea>

          <button type="submit">Update </button>
        </form>
      </div>
    </>
  );
};

export default BlogUpdate;
