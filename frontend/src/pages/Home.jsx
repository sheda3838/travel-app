import React, { useState, useEffect, useCallback } from "react";
import api from "../api/axios";
import ExperienceCard from "../components/ExperienceCard";
import ExperienceModel from "../components/ExperienceModel";
import Pagination from "../components/Pagination";

function Home() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination and search state
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");

  // Modal state
  const [selectedExperience, setSelectedExperience] = useState(null);

  const fetchExperiences = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get(
        `/experiences?page=${page}&limit=6&q=${searchQuery}`,
      );
      setExperiences(data.data);
      setTotalPages(data.pages);
      setPage(data.page);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch experiences");
    } finally {
      setLoading(false);
    }
  }, [page, searchQuery]);

  useEffect(() => {
    fetchExperiences();
  }, [fetchExperiences]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    setPage(1); // Reset to page 1 on new search
  };

  const closeModel = () => {
    setSelectedExperience(null);
  };

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this experience? This action cannot be undone.",
      )
    ) {
      try {
        await api.delete(`/experiences/${id}`);
        // Close modal if open for this experience
        if (selectedExperience?._id === id) {
          setSelectedExperience(null);
        }
        // Dynamically update state instead of refetching from DB
        setExperiences((prev) => prev.filter((exp) => exp._id !== id));
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || "Failed to delete experience");
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header and Search */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-800">
          Discover Experiences
        </h1>
        <form onSubmit={handleSearch} className="flex w-full md:w-auto">
          <input
            type="text"
            placeholder="Search destination or title..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-l-md w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            className="bg-primary text-white px-5 py-2 rounded-r-md hover:bg-primary-hover transition"
          >
            Search
          </button>
        </form>
      </div>

      {/* Main Content Area */}
      {loading ? (
        <div className="text-center py-20 text-xl font-medium text-gray-500">
          Loading experiences...
        </div>
      ) : error ? (
        <div className="text-center py-20 text-red-500">{error}</div>
      ) : experiences.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          No experiences found. Try adjusting your search query!
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiences.map((exp) => (
              <div
                key={exp._id}
                className="cursor-pointer transform hover:-translate-y-1 transition duration-200 h-full"
                onClick={() => setSelectedExperience(exp)}
              >
                <ExperienceCard experience={exp} onDelete={handleDelete} />
              </div>
            ))}
          </div>

          <Pagination page={page} pages={totalPages} onPageChange={setPage} />
        </>
      )}

      {/* Modal Overlay for Experience Details */}
      {selectedExperience && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 overflow-y-auto backdrop-blur-sm"
          onClick={closeModel}
        >
          <div
            className="relative w-full max-w-5xl my-8 md:my-auto outline-none focus:outline-none"
            onClick={(e) => e.stopPropagation()} // Prevent clicking inside modal from closing it
          >
            <button
              onClick={closeModel}
              className="absolute -top-12 right-0 text-white bg-gray-800 bg-opacity-50 hover:bg-opacity-100 rounded-full w-10 h-10 flex items-center justify-center font-bold text-xl z-50 transition"
              aria-label="Close modal"
            >
              &times;
            </button>
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto w-full">
              <ExperienceModel
                experience={selectedExperience}
                onDelete={handleDelete}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
