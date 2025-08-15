import axios from "axios";
import { DeleteIcon } from "../icons/DeleteIcon";
import { ViewIcon } from "../icons/ViewIcon";
import { BACKEND_URL } from "../config";

interface CardProps{
    title:string
    link:string
    type:"twitter" | "youtube"
}

export function Card({title,link,type}:CardProps){
    return <div>
        <div className="p-4 bg-white rounded-md  border-gray-200  max-w-72 border min-h-48 min-w-72">
            <div className="flex justify-between ">
                <div className="flex items-center text-md">
                    <div className="text-gray-500 pr-2"></div>
                    {title}
                </div>
                <div className="flex items-center">
                    <div className="pr-2 text-gray-500" >
                        <a href={link} target="_blank"></a>
                    <ViewIcon onClick={ ()=>{
                        window.open(link, "_blank")
                    }}/>
                    </div>
                    <div className="pr-2 text-gray-500">
                    <DeleteIcon onClick={async ()=>{
                try {
                await axios.delete(`${BACKEND_URL}/api/v1/content`, {
                    data: { title },
                    headers: { "token": localStorage.getItem("token") }
                     });
                alert("Deleted successfully!"); 
                } catch (err) {
                console.error(err);
                alert("Delete failed");
            }}}/>
                    </div>
                    </div>
                </div>
                <div className="pt-4">
                {type=== "youtube" && <iframe  className="w-full" src={link.replace("watch","embed").replace("?v=", "/")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe> }
                {type === "twitter" && <blockquote className="twitter-tweet">
                    <a href={link.replace("x.com", "twitter.com")}></a> 
                </blockquote>}
                <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
                </div>
            </div>
        </div>
}