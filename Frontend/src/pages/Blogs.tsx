import { AppBar } from "../components/AppBar";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks"; // Assuming useBlogs is in a 'hooks' directory

export const Blogs = () => {
    const { loading, blogs } = useBlogs();

    if (loading) {
        return (
            // Use a more visually appealing loading indicator
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    // Handle the case where there are no blogs
    if (!blogs || blogs.length === 0) {
        return (
            <div>
                <AppBar />
                <div className="flex justify-center items-center h-screen">
                    No blogs found.
                </div>
            </div>
        );
    }

    return (
        <div>
            <AppBar />
            <div className="flex justify-center w-full"> {/* Use w-full to center properly */}
                <div className="max-w-xl w-full px-4 md:px-0"> {/* Add padding and make it full width within max-w */}
                    {/* Add a key prop when mapping over elements */}
                    {blogs.map((blog) => (
                        <BlogCard
                            id = {blog.id}
                            key={blog.id} // Assuming blog has a unique id
                            authorName={blog.author.name || "Anonymus"} 
                            title={blog.title}
                            content={blog.content}
                            publishDate="14th May 2025" // Consider fetching the actual publish date from the backend
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
