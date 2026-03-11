import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ExperienceForm from '../components/ExperienceForm';
import api from '../api/axios';

function EditExperience() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const { data } = await api.get(`/experiences/${id}`);
        setInitialData(data.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load the experience details.');
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, [id]);

  const handleSubmit = async (formData) => {
    setSaving(true);
    setError('');

    try {
      await api.patch(`/experiences/${id}`, formData);
      navigate('/my-experiences');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to update experience');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center text-gray-500 font-medium">
        Loading experience details...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center">
          Edit Experience
        </h1>
        <p className="mt-2 text-center text-gray-600">
          Make updates to "{initialData?.title}"
        </p>
      </div>

      {error && (
        <div className="max-w-2xl mx-auto mb-6 bg-red-50 text-red-700 p-4 rounded-md text-sm text-center">
          {error}
        </div>
      )}

      {initialData && (
        <ExperienceForm 
          initialData={initialData}
          onSubmit={handleSubmit} 
          isLoading={saving} 
        />
      )}
    </div>
  );
}

export default EditExperience;