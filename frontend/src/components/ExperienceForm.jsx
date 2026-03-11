import React, { useState, useEffect } from "react";

function ExperienceForm({ initialData = {}, onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
    imageUrl: "",
  });

  //populate form if we are editing an existing experience
  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        location: initialData.location || "",
        price: initialData.price || "",
        imageUrl: initialData.imageUrl || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      price: formData.price ? Number(formData.price) : undefined,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 sm:p-6 rounded-lg shadow-md max-w-2xl mx-auto"
    >
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
          Title *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="E.g., Sunset Yoga in Bali"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="location"
          className="block text-gray-700 font-medium mb-2"
        >
          Location *
        </label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="E.g., Bali, Indonesia"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="imageUrl"
          className="block text-gray-700 font-medium mb-2"
        >
          Image URL *
        </label>
        <input
          type="url"
          id="imageUrl"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="https://example.com/image.jpg"
        />
        {formData.imageUrl && (
          <div className="mt-4">
            <p className="text-sm text-gray-500 mb-2">Image Preview:</p>
            <img
              src={formData.imageUrl}
              alt="Experience Preview"
              className="w-full h-48 object-cover rounded-md border"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://via.placeholder.com/400x200?text=Invalid+Image+URL";
              }}
            />
          </div>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="price" className="block text-gray-700 font-medium mb-2">
          Price (Optional)
        </label>
        <div className="relative">
          <span className="absolute left-3 top-2 text-gray-500">$</span>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            className="w-full pl-8 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="0.00"
          />
        </div>
      </div>

      <div className="mb-6">
        <label
          htmlFor="description"
          className="block text-gray-700 font-medium mb-2"
        >
          Description *
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows="5"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          placeholder="Describe your experience..."
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-2 px-4 text-white font-medium rounded-md transition ${
          isLoading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-primary hover:bg-primary-hover"
        }`}
      >
        {isLoading ? "Saving..." : "Save Experience"}
      </button>
    </form>
  );
}

export default ExperienceForm;
