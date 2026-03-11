import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function ExperienceModel({ experience, onDelete }) {
  const { user } = useAuth();
  if (!experience) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isCreator =
    user && experience.creator && user.id === experience.creator._id;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 max-w-5xl mx-auto flex flex-col md:flex-row">
      {/* Left side: Image */}
      <div className="md:w-1/2 h-64 md:h-auto">
        {experience.imageUrl ? (
          <img
            src={experience.imageUrl}
            alt={experience.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://via.placeholder.com/800x600?text=Image+Not+Found";
            }}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No Image Available</span>
          </div>
        )}
      </div>

      {/* Right side: Details */}
      <div className="md:w-1/2 p-6 sm:p-8 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-3xl font-bold text-gray-900 leading-tight">
            {experience.title}
          </h1>
          {experience.price && (
            <span className="text-2xl font-bold text-green-600 bg-green-50 px-3 py-1 rounded-lg">
              ${experience.price}
            </span>
          )}
        </div>

        <div className="flex items-center text-gray-600 mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-primary">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
          </svg>
          <span className="text-lg">{experience.location}</span>
        </div>

        <div className="prose max-w-none text-gray-700 flex-grow mb-8 whitespace-pre-line">
          {experience.description}
        </div>

        {/* Footer info & Actions */}
        <div className="mt-auto pt-6 border-t border-gray-100 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row justify-between text-sm text-gray-500 gap-2">
            <div>
              <p>Posted: {formatDate(experience.createdAt)}</p>
              {experience.updatedAt !== experience.createdAt && (
                <p>Updated: {formatDate(experience.updatedAt)}</p>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center mt-2 bg-gray-50 p-4 rounded-lg">
            {isCreator ? (
              <div className="flex gap-3 w-full justify-end">
                <Link
                  to={`/edit/${experience._id}`}
                  className="px-6 py-2 bg-orange-50 text-primary border border-primary font-semibold rounded-lg hover:bg-orange-100 transition text-center"
                >
                  Edit Experience
                </Link>
                <button
                  onClick={() => onDelete && onDelete(experience._id)}
                  className="px-6 py-2 bg-red-100 text-red-700 font-semibold rounded-lg hover:bg-red-200 transition"
                >
                  Delete Experience
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {experience.creator?.name
                    ? experience.creator.name.charAt(0).toUpperCase()
                    : "U"}
                </div>
                <div>
                  <p className="text-sm text-gray-500">Posted by</p>
                  <p className="font-semibold text-gray-900">
                    {experience.creator?.name || "Unknown User"}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExperienceModel;
