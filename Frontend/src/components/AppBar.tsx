import Avatar from "./BlogCard"

export const AppBar = () => {
    return (
        <div className="border-b-2 border-gray-200 bg-white flex justify-between items-center p-4">
            <div className="flex gap-2 items-center">
                Blogsy
            </div>
            <div className="flex gap-2 items-center">
                <Avatar name="Ankit"/>
            </div>

        </div>
    )
}

