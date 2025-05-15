import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";
import { Appbar } from "../components/AppBar"; // Assuming you have an AppBar component

// Define the Blog type (ensure this matches your useBlog hook's return type)
interface Blog {
  id: string; // Assuming the id is a string
  title: string;
  content: string;
  author: {
    name: string;
  };
  // Add other relevant properties like publishDate, etc.
  // publishDate?: string;
}

export const Blog = () => {
  const { id } = useParams<{ id: string }>(); // More specific type for useParams

  const { loading, blog } = useBlog({
    id: id || "", // Use the destructured id
  });

  if (loading) {
    return (
      <div>
        <Appbar />
        <div className="flex justify-center items-center h-screen">
           {/* Simple loading text as a fallback */}
           <div className="text-xl text-gray-700">Loading...</div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div>
        <Appbar />
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-xl font-semibold text-gray-700">Blog not found.</h1>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Appbar />
      <div className="container mx-auto px-4 py-8 max-w-screen-lg"> {/* Centered container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12"> {/* Responsive grid */}
          {/* Main Blog Content */}
          <div className="lg:col-span-8">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
              {blog.title}
            </h1>
            {/* Add author and potential publish date */}
            <div className="text-gray-600 text-sm mb-8">
              By <span className="font-semibold">{blog.author.name}</span>
              {/* {blog.publishDate && <span> on {new Date(blog.publishDate).toLocaleDateString()}</span>} */}
            </div>
            {/* Styling for content without Tailwind Typography */}
            <div className="text-lg leading-relaxed text-gray-800 whitespace-pre-wrap">
              {blog.content}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                About the Author
              </h2>
              <div className="flex items-center mb-4">
                {/* Placeholder for author avatar */}
                <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center text-blue-800 font-semibold mr-3">
                  {blog.author.name ? blog.author.name[0].toUpperCase() : 'A'}
                </div>
                <span className="text-lg font-semibold text-gray-900">{blog.author.name}</span>
              </div>
              {/* Add author bio or more details here if available */}
              <p className="text-gray-700 text-sm">
                {/* Placeholder bio */}
                Passionate writer and explorer of new ideas.
              </p>
            </div>

            {/* Related Blogs Section (Placeholder) */}
            <div className="mt-8 bg-gray-50 p-6 rounded-lg shadow-sm">
               <h2 className="text-xl font-bold text-gray-800 mb-4">
                Related Blogs
              </h2>
              {/* You'll need to fetch and display related blogs here */}
              <p className="text-gray-600 italic">
                (Related blogs coming soon)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
