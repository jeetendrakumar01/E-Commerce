import React, { useState, useEffect } from 'react';

const BASE_URL = "https://e-commerce-website-o5k2.onrender.com";

const Profile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  
  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found');
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`${BASE_URL}/api/auth/profile`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          const message = await response.text();
          throw new Error(message || 'Failed to fetch profile');
        }
        const data = await response.json();
          setUser(data.user);
          setFormData({
            ...data.user
          })
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setFormData(user);
  };

    const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${BASE_URL}/api/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || 'Failed to update profile');
      }
      const data = await response.json();
      setUser(data.user)
      setSuccessMessage('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border p-2" />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border p-2" />
          </div>
          <div>
            <label>Address:</label>
            <input type="text" name="address" value={formData.address || ''} onChange={handleChange} className="w-full border p-2" />
          </div>
          <div>
            <label>Phone:</label>
            <input type="text" name="phone" value={formData.phone || ''} onChange={handleChange} className="w-full border p-2" />
          </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save</button>
            <button onClick={handleCancelClick} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2">Cancel</button>
        </form>
      ) : (
            <div className="space-y-2">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Address:</strong> {user.address || 'Not provided'}</p>
        <p><strong>Phone:</strong> {user.phone || 'Not provided'}</p>
            <button onClick={handleEditClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit</button>
        </div>
      )}
    </div>
  );
};

export default Profile;