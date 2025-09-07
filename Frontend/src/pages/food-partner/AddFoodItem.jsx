import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddFoodItem = () => {

  const navigate = useNavigate();

  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [videoFile, setVideoFile] = useState(null);

  const [videoPreview, setVideoPreview] = useState(null);

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {

      setVideoFile(file);

      const url = URL.createObjectURL(file);
      setVideoPreview(url);

    }
  };

  const handleRemoveVideo = () => {
    setVideoPreview(null);
  };


  const handleSubmit = async () => {

    const formData = new FormData();

    formData.append('name', name);
    formData.append('description', description);
    formData.append('video', videoFile);

    const response = await axios.post("http://localhost:3000/api/food/add",
      formData,
      {
        withCredentials: true
      }
    )

    console.log(response.data);

    navigate(`/food-partner/${response.data.food.foodPartner}`)

  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center p-6">
      {/* Form Container */}
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-lg p-8">
        {/* Title */}
        <h1 className="text-2xl font-bold mb-2 text-center">Add New Food Item</h1>
        <p className="text-gray-400 text-center mb-6 text-sm">
          Share your delicious dish with your customers
        </p>

        {/* Form */}
        <div className="flex flex-col gap-5">
          {/* Video Upload or Preview */}
          <div className="w-full">
            {!videoPreview ? (
              <div>
                <label className="block text-sm text-gray-300 mb-1">Upload Video</label>
                <input
                  name={videoFile}
                  type="file"
                  accept="video/*"
                  onChange={handleVideoChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-purple-600 file:text-white hover:file:bg-purple-700"
                />
                <p className="text-xs text-gray-500 mt-1">Max size: 50MB</p>
              </div>
            ) : (
              <div className="relative w-full rounded-xl overflow-hidden shadow-lg">
                <video
                  src={videoPreview}
                  controls
                  className="w-full h-64 object-cover rounded-xl"
                />
                {/* Remove & Change Buttons */}
                <div className="absolute top-3 right-3 flex gap-2">
                  <button
                    type="button"
                    onClick={handleRemoveVideo}
                    className="bg-red-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-700 transition"
                  >
                    Remove
                  </button>
                  <label className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700 transition cursor-pointer">
                    Change
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Dish Name */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Dish Name</label>
            <input
              name={name}
              onChange={(e) => { setName(e.target.value) }}
              type="text"
              placeholder="Enter dish name"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Description</label>
            <textarea
              name={description}
              onChange={(e) => { setDescription(e.target.value) }}
              rows="4"
              placeholder="Write a short description..."
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:scale-105 transition-transform shadow-lg"
          >
            Add Food Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddFoodItem;
