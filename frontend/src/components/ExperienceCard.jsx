import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function ExperienceCard({ experience, onDelete }) {
  const { user } = useAuth();
  if (!experience) return null;

  const truncateDescription = (text, maxLength = 100) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  const formattedDate = new Date(experience.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const isCreator = user && experience.creator && user.id === experience.creator._id;

  return (
    <div className="border border-gray-200 p-4 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow flex flex-col h-full">
      {experience.imageUrl && (
        <img
          src={experience.imageUrl}
          alt={experience.title}
          className="w-full h-48 object-cover rounded mb-4"
        />
      )}
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-xl font-bold text-gray-800">{experience.title}</h2>
        {experience.price && (
          <span className="font-semibold text-green-600">${experience.price}</span>
        )}
      </div>
      <p className="text-sm text-gray-500 mb-3">{experience.location}</p>
      
      <p className="text-gray-700 text-sm mb-4 flex-grow">
        {truncateDescription(experience.description, 50)}
      </p>
      
      <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100 text-xs text-gray-500">
        <div className="flex items-center gap-2">
          {isCreator ? (
            <>
              <Link 
                to={`/edit/${experience._id}`}
                className="text-blue-600 hover:text-blue-800 font-medium px-2 py-1 rounded hover:bg-blue-50 transition"
              >
                Edit
              </Link>
              <button 
                onClick={() => onDelete && onDelete(experience._id)}
                className="text-red-600 hover:text-red-800 font-medium px-2 py-1 rounded hover:bg-red-50 transition"
              >
                Delete
              </button>
            </>
          ) : (
            <span className="font-medium">By: {experience.creator?.name || "Unknown User"}</span>
          )}
        </div>
        <span>{formattedDate}</span>
      </div>
    </div>
  );
}

export default ExperienceCard;