import React, { useEffect, useState } from 'react';

const UserForm = ({ onClose, onSubmit, user }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    username: '',
    address: { street: '', city: '' },
    company: { name: '' },
    website: '',
  });
  
  const [errors, setErrors] = useState({});
  
  useEffect(() => {
    if (user) {
      setFormData({
        ...user,
        address: user.address,
        company: user.company,
        username: user.username || `USER-${user.name.split(' ')[0]}`,
      });
    }
  }, [user]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name || formData.name.length < 3) newErrors.name = 'Name is required and must be at least 3 characters.';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is required and must be valid.';
    if (!/\d{10}/.test(formData.phone)) newErrors.phone = 'Phone is required and must be valid.';
    if (!formData.username || formData.username.length < 3) newErrors.username = 'Username is required.';
    if (!formData.address.street || !formData.address.city) newErrors.address = 'Address is required.';
    if (formData.company.name && formData.company.name.length < 3) newErrors.company = 'Company name must be at least 3 characters.';
    if (formData.website && !/^(ftp|http|https):\/\/[^ "]+$/.test(formData.website)) newErrors.website = 'Website must be a valid URL.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({ ...formData, id: user ? user.id : Date.now() });
      onClose();
    }
  };

  return (
    <div className="modal">
      <h2>{user ? 'Edit User' : 'Create User'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="text"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>
        <div>
          
          <div>
  <label>Username:</label>
  <input
    type="text"
    value={formData.username}
    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
  />
  {errors.username && <span className="error">{errors.username}</span>}
</div>

          {errors.username && <span className="error">{errors.username}</span>}
        </div>
        <div>
          <label>Address Street:</label>
          <input
            type="text"
            value={formData.address.street}
            onChange={(e) => setFormData({ ...formData, address: { ...formData.address, street: e.target.value } })}
          />
          {errors.address && <span className="error">{errors.address}</span>}
        </div>
        <div>
          <label>City:</label>
          <input
            type="text"
            value={formData.address.city}
            onChange={(e) => setFormData({ ...formData, address: { ...formData.address, city: e.target.value } })}
          />
          {errors.address && <span className="error">{errors.address}</span>}
        </div>
        <div>
          <label>Company Name:</label>
          <input
            type="text"
            value={formData.company.name}
            onChange={(e) => setFormData({ ...formData, company: { name: e.target.value } })}
          />
          {errors.company && <span className="error">{errors.company}</span>}
        </div>
        <div>
          <label>Website:</label>
          <input
            type="text"
            value={formData.website}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
          />
          {errors.website && <span className="error">{errors.website}</span>}
        </div>
        <button type="submit">Submit</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default UserForm;
