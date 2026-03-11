import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ExperienceForm from '../components/ExperienceForm';
import api from '../api/axios';

function CreateExperience() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError('');

    try {
      const { data } = await api.post('/experiences', formData);
      // Navigate to the home feed or the specific experience on success
      navigate('/');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to create experience');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center">
          Create a New Experience
        </h1>
        <p className="mt-2 text-center text-gray-600">
          Share your incredible travel experiences with the community.
        </p>
      </div>

      {error && (
        <div className="max-w-2xl mx-auto mb-6 bg-red-50 text-red-700 p-4 rounded-md text-sm text-center">
          {error}
        </div>
      )}

      <ExperienceForm 
        onSubmit={handleSubmit} 
        isLoading={loading} 
      />
    </div>
  );
}

export default CreateExperience;