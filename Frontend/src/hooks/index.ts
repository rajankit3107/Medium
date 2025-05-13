import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

// Define the Blog type based on your backend response
export interface Blog {
  content: string;
  title: string;
  id: number;
  // Assuming author has a name property
  author: {
    name: string;
  };
  // Add other properties if your backend returns them (e.g., publishedDate, etc.)
   publishedDate?: string;
}

// Define the expected shape of the backend response data
interface BlogsResponse {
  blogs: Blog[];
  blog : Blog
  
}

export const useBlog = ({ id } : {id : string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

  useEffect(() => {
    axios.get<BlogsResponse>(`${BACKEND_URL}/api/v1/blog/${id}`, { // Specify the expected response data type
        headers: {
            Authorization: localStorage.getItem("token") || ""
        }
    })
        .then(response => {
            // Now TypeScript knows response.data is of type BlogsResponse
            setBlog(response.data.blog);
            setLoading(false);
        })
        .catch(error => {
            console.error("Error fetching blogs:", error);
            setLoading(false);
        });
  }, [id]);
  return {
    loading,
    blog
  }
}

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    axios.get<BlogsResponse>(`${BACKEND_URL}/api/v1/blog/bulk`, { // Specify the expected response data type
        headers: {
            Authorization: localStorage.getItem("token") || ""
        }
    })
        .then(response => {
            // Now TypeScript knows response.data is of type BlogsResponse
            setBlogs(response.data.blogs);
            setLoading(false);
        })
        .catch(error => {
            console.error("Error fetching blogs:", error);
            setLoading(false);
        });
  }, []);

  return {
    loading,
    blogs,
    
  };
};
