import { Link } from "react-router-dom";

interface BlogCardProps {
    id: number; // Changed to number based on your interface
    authorName: string;
    title: string;
    content: string;
    publishDate: string; // Consider fetching the actual publish date
}

// Assuming you have a separate file for the Avatar component,
// it's better practice to import it directly from that file.
// If it's only used here, keep it within this file but maybe outside the main component function.
function Avatar({ name }: { name: string }) {
    return (
        <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-200 rounded-full dark:bg-gray-600"> {/* Refined Avatar styling */}
            <span className="font-medium text-gray-600 dark:text-gray-300">{name[0]?.toUpperCase() || 'A'}</span> {/* Handle empty name and use optional chaining */}
        </div>
    );
}

// If you have a separate Avatar.tsx file, you would export it there and import it here:
// import { Avatar } from "./Avatar";


export const BlogCard = ({ id, authorName, title, content, publishDate }: BlogCardProps) => {

    // Estimate reading time
    const readingTime = Math.ceil(content.length / 250); // More realistic word count per minute estimate (adjust as needed)

    return (
        // Wrap the card in a Link to make the whole card clickable.
        // Removed flex/gap from Link to avoid affecting card layout
        <Link to={`/blog/${id}`} className="block cursor-pointer">
            {/* Added border and padding to the card container */}
            <div className="border border-gray-200 rounded-lg shadow-sm overflow-hidden bg-white hover:shadow-md transition-shadow duration-200 ease-in-out p-4">

                {/* Author Info - Using flex for layout */}
                <div className="flex items-center mb-4"> {/* Added bottom margin */}
                    <Avatar name={authorName} />
                    <div className="ml-3 text-sm font-medium text-gray-700"> {/* Added left margin */}
                       {/* Display author name and publish date */}
                        {authorName}
                        {/* Consider using a more accurate date display */}
                        <span className="text-gray-500 ml-2">&bull; {publishDate}</span> {/* Added a dot separator and left margin */}
                    </div>
                </div>

                {/* Blog Title */}
                <div className="text-xl font-semibold text-gray-800 mb-2"> {/* Added bottom margin */}
                    {title}
                </div>

                {/* Blog Snippet/Content Preview */}
                {/* Using line-clamp for a cleaner snippet */}
                <div className="text-base font-normal text-gray-700 leading-relaxed line-clamp-3"> {/* Adjusted font weight, color, leading, and added line-clamp */}
                    {content}
                </div>

                {/* Read Time */}
                <div className="text-gray-500 text-sm mt-4"> {/* Added top margin and adjusted text color/size */}
                    {`${readingTime} minute(s) read`}
                </div>

            </div>
        </Link>
    );
};

// If Avatar is in this file and you want to export it separately:
export { Avatar };

// If Avatar is only used within BlogCard and you don't export it, remove this line.
// export default Avatar; // Removed the default export if Avatar is internal

// Correcting the default export for BlogCard if it's the main component of this file
// export default BlogCard; // Use this if BlogCard is the default export
