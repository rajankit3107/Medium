import { Appbar } from "../components/AppBar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import type { ChangeEvent } from "react"; // Import ChangeEvent as a type



// Interface for the data being sent to the backend
interface PublishPayload {
    title: string;
    content: string;
}

// Interface for the expected response from the backend after publishing
interface PublishResponse {
    id: string; // Assuming the backend returns the ID of the newly created blog
    // Add other properties if your backend response includes them
    // success: boolean;
    // message: string;
}


export const Publish = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState(""); // Keeping the name as description
    const [isPublishing, setIsPublishing] = useState(false); // State for publishing status
    const [publishError, setPublishError] = useState<string | null>(null); // State for publishing errors
    const navigate = useNavigate();

    // Renamed function for clarity
    const handlePublish = async () => {
        setIsPublishing(true);
        setPublishError(null); // Clear previous errors
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                 setPublishError("Please log in.");
                 setIsPublishing(false);
                 return; // Stop the process if no token
            }

            const response = await axios.post<PublishResponse>(`${BACKEND_URL}/api/v1/blog`, {
                title,
                content: description // Use the description state
            } as PublishPayload, { // Cast to PublishPayload for type safety
                headers: {
                    Authorization: token
                }
            });

            // Assuming your backend returns the ID of the newly created blog in the response data
            if (response.data && response.data.id) {
                 navigate(`/blog/${response.data.id}`);
            } else {
                 // Handle cases where the backend might not return an ID but is still successful
                 setPublishError("Published successfully, but couldn't retrieve blog ID from response.");
            }

        } catch (error: any) {
            console.error("Error publishing blog:", error);
             // More informative error message
            setPublishError(error.response?.data?.message || "An unexpected error occurred while publishing.");
        } finally {
            setIsPublishing(false); // Always set publishing to false after attempt
        }
    };


    return (
        <div>
            <Appbar />
            <div className="flex justify-center w-full pt-8 px-4"> {/* Added horizontal padding */}
                <div className="max-w-screen-lg w-full">
                    {/* Title Input */}
                    <input
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                        type="text"
                        className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-4" // Added bottom margin
                        placeholder="Title"
                        disabled={isPublishing} // Disable input while publishing
                    />

                    {/* Custom TextEditor */}
                    <TextEditor onChange={(e) => {
                        setDescription(e.target.value)
                    }}
                     disabled={isPublishing} // Add disabled prop to TextEditor
                     />

                    {/* Display publishing error */}
                     {publishError && (
                         <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mt-4" role="alert">
                             <p className="font-bold">Error:</p>
                             <p>{publishError}</p>
                         </div>
                     )}


                    {/* Publish Button */}
                    <button
                        onClick={handlePublish} // Use the dedicated publish function
                        type="button" // Changed to type="button" for better practice
                        className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out" // Added disabled styles
                        disabled={isPublishing || !title || !description} // Disable button if publishing, or if title/description are empty
                    >
                        {isPublishing ? 'Publishing...' : 'Publish post'}
                    </button>
                </div>
            </div>
        </div>
    );
}


// Updated TextEditor to accept a disabled prop
function TextEditor({ onChange, disabled }: {onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void, disabled: boolean}) {
    return <div className="mt-2">
        <div className="w-full mb-4 ">
            <div className="flex items-center justify-between border">
            <div className="my-2 bg-white rounded-b-lg w-full">
                <label className="sr-only">Write post content</label> {/* More descriptive label */}
                <textarea
                    onChange={onChange}
                    id="editor"
                    rows={8}
                    className="focus:outline-none block w-full px-0 text-sm text-gray-800 bg-white border-0 pl-2"
                    placeholder="Write your article..."
                    required
                    disabled={disabled} // Apply disabled prop to the textarea
                />
            </div>
        </div>
       </div>
    </div>

}
