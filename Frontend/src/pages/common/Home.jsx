import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SmoothDescription from "../../components/SmoothDescription";
import { CiHeart } from "react-icons/ci";
import { HiOutlineBookmark } from "react-icons/hi2";

const Home = () => {

  const [videos, setVideos] = useState([]);
  const videoRefs = useRef(new Map());
  const containerRef = useRef(null);


  // async function handleLike(item) {

  //   console.log(item._id)

  //   const response = await axios.post("http://localhost:3000/api/food/like",
  //     {
  //       foodId: item._id
  //     },
  //     {
  //       withCredentials: true
  //     }
  //   )
  //   console.log(response.data)

  //   if (response.data.like) {
  //     console.log("Video liked");
  //     setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, likesCount: v.likesCount + 1 } : v))
  //   } else {
  //     console.log("Video UnLiked");
  //     setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, likesCount: v.likesCount - 1 } : v))
  //   }

  // }


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target
          if (!(video instanceof HTMLVideoElement)) return
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            video.play().catch(() => { /* ignore autoplay errors */ })
          } else {
            video.pause()
          }
        })
      },
      { threshold: [0, 0.25, 0.6, 0.9, 1] }
    )

    videoRefs.current.forEach((vid) => observer.observe(vid))
    return () => observer.disconnect()
  }, [videos])


  useEffect(() => {
    axios.get("http://localhost:3000/api/food/",
      {
        withCredentials: true
      }
    )
      .then(response => {
        setVideos(response.data.foodItems);
      });
  }, []);

  const setVideoRef = (id) => (el) => {
    if (!el) {
      videoRefs.current.delete(id);
      return;
    }
    videoRefs.current.set(id, el);
  };

  return (
    <div ref={containerRef} className="h-screen w-full overflow-y-scroll snap-y snap-mandatory ">
      {videos.map((item) => (
        <div
          key={item._id}
          className="h-screen w-full relative snap-start flex items-center justify-center bg-black"
        >
          {/* Video */}
          <video
            ref={setVideoRef(item._id)}
            src={item.video}
            loop
            muted
            playsInline
            preload="metadata"
            className={`absolute top-0 left-0 w-full h-full object-cover `}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/60"></div>

          {/* Top-left dish name */}
          <div className="absolute top-6 left-6 text-white text-2xl font-bold">
            {item.name}
          </div>

          {/* Bottom content */}
          <div className="absolute bottom-10 w-full flex flex-col items-baseline px-6">
            <div className="flex justify-between w-full">
              <Link
                to={`/food-partner/${item.foodPartner}`}
                className="bg-white/10 backdrop-blur-lg text-white text-lg font-medium px-8 py-3 rounded-full hover:bg-white/20 transition"
              >
                Visit Store
              </Link>
              <div className="flex gap-2">
                <button
                  className="bg-white/10 backdrop-blur-lg text-white text-lg font-medium px-2 flex justify-center items-center rounded-full hover:bg-white/20 transition"
                >
                  <CiHeart size={35} />
                </button>
                <button

                  className="bg-white/10 backdrop-blur-lg text-gray-200 text-lg font-thin px-2 flex justify-center items-center rounded-full hover:bg-white/20 transition"
                >
                  <HiOutlineBookmark size={31} />
                </button>
              </div>
            </div>
            <SmoothDescription description={item.description} />
          </div>
        </div>
      ))
      }
    </div >
  );
};

export default Home;
