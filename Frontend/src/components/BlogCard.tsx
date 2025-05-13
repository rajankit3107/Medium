import { Link } from "react-router-dom"

interface BlogCardProps {
    id : Number,
    authorName : string,
    title : string,
    content  : string,
    publishDate  : string
}

export const BlogCard = ({id, authorName, title, content, publishDate} : BlogCardProps) => {
    
    return (
        <Link to={`/blog/${id}`}>
            <div className="flex flex-col gap-2 p-4 border-2 border-slate-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                <div className="flex gap-2 items-center">
                    <Avatar name={authorName} />
                    <div className="flex flex-col font-thin text-sm">
                    {authorName} . {publishDate}
                    </div>
                </div>
                <div className="text-lg font-semibold">
                    {title}
                </div>
                <div className="text-sm font-light text-slate-500">
                    {content.slice(0,100) + "..."}
                </div>
                <div className="text-xs font-thin text-slate-400">
                    {`${Math.ceil(content.length / 100)} minute(s) read`}
                </div>
            
            </div>
        </Link>
    )   
}

function Avatar({ name } : { name : string }) {

    return (
        <div className="bg-slate-200 w-10 h-10 rounded-full flex justify-center items-center text-xs font-extralight">
            {name[0].toUpperCase()}
        </div>
    )

}

export default Avatar