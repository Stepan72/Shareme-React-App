import { urlFor, client } from "../client";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { MdDownloadForOffline } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";

function Pin({ pin: { postedBy, image, _id, destination } }) {
  const [postHover, setPostHover] = useState(false);
  const [savingPost, setSavingPost] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="m-2">
      <div
        onMouseEnter={() => {
          setPostHover(true);
        }}
        onMouseLeave={() => {
          setPostHover(false);
        }}
        onClick={() => {
          navigate(`/pin-detail/${_id}`);
        }}
        className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
      >
        <img
          src={urlFor(image).width(250).url()}
          alt="user-post"
          className="rounded-lg w-full"
        />
        {postHover && (
          <div
            className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50"
            style={{ height: "100%" }}
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <a
                  href={`${image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none "
                >
                  <MdDownloadForOffline />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Pin;
