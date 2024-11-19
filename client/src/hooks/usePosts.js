import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authentication";

const usePosts = () => {
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const apiCall = async (method, url, data = null) => {
    const token = getToken();
    try {
      setIsError(false);
      setIsLoading(true);
      setErrorMessage("");
      const response = await axios({
        method,
        url: `http://localhost:4000${url}`,
        data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsLoading(false);
      return response.data;
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
      setErrorMessage(error.response?.data?.message || "An error occurred");
      throw error;
    }
  };

  const getPosts = async (input) => {
    const { status, keywords, page } = input;
    const params = new URLSearchParams({ status, keywords, page });
    const result = await apiCall("get", `/posts?${params.toString()}`);
    setPosts(result.data);
    setTotalPages(result.total_pages);
  };
  const getPostById = async (postId) => {
    const result = await apiCall("get", `/posts/${postId}`);
    setPost(result.data);
  };

  const createPost = async (data) => {
    await apiCall("post", "/posts", data);
    navigate("/");
  };

  const updatePostById = async (postId, data) => {
    await apiCall("put", `/posts/${postId}`, data);
    navigate("/");
  };

  const deletePost = async (postId) => {
    await apiCall("delete", `/posts/${postId}`);
    const newPosts = posts.filter((post) => post._id !== postId);
    setPosts(newPosts);
  };

  return {
    posts,
    setPosts,
    post,
    setPost,
    totalPages,
    isError,
    isLoading,
    errorMessage,
    getPosts,
    getPostById,
    createPost,
    updatePostById,
    deletePost,
  };
};

export default usePosts;
