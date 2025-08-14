import { DeleteIcon } from "../icons/DeleteIcon";
import { ViewIcon } from "../icons/ViewIcon";
import { Delete } from "./Delete.tsx";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
}

// Helper to get YouTube embed URL
const getYouTubeEmbedUrl = (url: string) => {
  const youtubeRegex = /(?:youtube\.com\/.*[?&]v=|youtu\.be\/)([^&]+)/;
  const match = url.match(youtubeRegex);
  return match && match[1]
    ? `https://www.youtube.com/embed/${match[1]}`
    : url;
};

export function Card({ title, link, type }: CardProps) {
  return (
    <div className="p-4 bg-white rounded-md border-gray-200 max-w-72 border min-h-48 min-w-72">
      <div className="flex justify-between">
        <div className="flex items-center text-md">{title}</div>
        <div className="flex items-center">
          <ViewIcon onClick={() => window.open(link, "_blank")} />
          <button onClick={async () => await Delete(title)}>
            <DeleteIcon />
          </button>
        </div>
      </div>

      <div className="pt-4">
        {type === "youtube" && (
          <iframe
            className="w-full h-44 rounded-md"
            src={getYouTubeEmbedUrl(link)}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}

        {type === "twitter" && (
          <div className="h-48 overflow-scroll">
            <blockquote className="twitter-tweet">
              <a href={link.replace("x.com", "twitter.com")}></a>
            </blockquote>
          </div>
        )}
      </div>
    </div>
  );
}
