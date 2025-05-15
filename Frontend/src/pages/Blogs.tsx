import { Appbar } from "../components/AppBar";
import { BlogCard } from "../components/BlogCard"; // Assuming this is in your components directory
import { useBlogs } from "../hooks";

// Assuming your Blog interface is defined
// interface Blog {
//     id: string;
//     title: string;
//     content: string;
//     author: {
//         name: string;
//     };
    // publishDate?: string;
// }


export const Blogs = () => {
    const { loading, blogs } = useBlogs();

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                 <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-50"></div>
            </div>
        );
    }

    if (!blogs || blogs.length === 0) {
        return (
            <div>
                <Appbar />
                <div className="flex justify-center items-center h-screen">
                    <p className="text-xl text-gray-600">No blogs found yet.</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Appbar />
            <div className="flex justify-center w-full py-8">
                {/* THIS DIV WRAPS THE BLOG CARDS */}
                {/* Added space-y-8 here to add vertical space between children */}
                <div className="max-w-screen-md w-full px-4 md:px-0 space-y-8">
                    {blogs.map((blog) => (
                        <BlogCard
                            id={blog.id}
                            key={blog.id}
                            authorName={blog.author.name || "Anonymus"}
                            title={blog.title}
                            content={blog.content}
                            publishDate="14th May 2025"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
