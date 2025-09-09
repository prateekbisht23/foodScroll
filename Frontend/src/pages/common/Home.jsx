import { useState, useEffect, useRef } from "react";
import axios from "axios";
import VideoCard from "../../components/VideoCard";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const videoRefs = useRef(new Map());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (!(video instanceof HTMLVideoElement)) return;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            video.play().catch((err) => {
              console.error(err);
            });
          } else {
            video.pause();
          }
        });
      },
      { threshold: [0, 0.25, 0.6, 0.9, 1] }
    );

    videoRefs.current.forEach((vid) => observer.observe(vid));
    return () => observer.disconnect();
  }, [videos]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/food/", {
        withCredentials: true,
      })
      .then((response) => {
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
    <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory">
      {videos.map((item) => (
        <VideoCard
          key={item._id}
          item={item}
          setVideoRef={setVideoRef}
          defaultLiked={item.liked}
          defaultSaved={item.saved}
        />
      ))}
    </div>
  );
};

export default Home;