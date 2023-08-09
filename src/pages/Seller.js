import React, { useState, useContext } from 'react';
import axios from 'axios';
import { OmsContext } from '../components/auth/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const Seller = ({ suppliers, updateSupplier, deleteSuppliers, handleUpdateSupplier }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    supplier_name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const [editingId, setEditingId] = useState(null);

  const { backendUrl } = useContext(OmsContext);


  const handleAddSupplier = () => {
    setEditingId(null);
    setFormData({
      supplier_name: '',
      email: '',
      password: '',
      password_confirmation: '',
    });
    setShowForm(true);
  };

  const handleEditSupplier = (supplier) => {
    console.log('Editing Supplier ID:', supplier.id); // Check the 'id' value
    setEditingId(supplier.id);
    setFormData({
      supplier_name: supplier.supplier_name,
      email: supplier.email,
      password: '',
      password_confirmation: '',
    });
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const token = localStorage.getItem('token');
      const url = `${backendUrl}/suppliers/${editingId || ''}`;
      
      const requestData = { // Create a copy of the formData without password_confirmation
        supplier_name: formData.supplier_name,
        email: formData.email,
        password: formData.password,
      };
  
      const response = await axios[editingId ? 'put' : 'post'](url, requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const updatedSupplier = response.data;
      if (editingId) {
        updateSupplier(updatedSupplier);
      } else {
        handleUpdateSupplier(updatedSupplier);
      }
  
      setShowForm(false);
    } catch (error) {
      console.error('Error adding/editing supplier:', error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h3 className="mb-0">Suppliers</h3>
          <button
            className="btn btn-primary"
            onClick={handleAddSupplier}
          >
            Add Supplier
          </button>
        </div>
        <div className="card-body position-relative">
          {showForm && (
            <div className="position-absolute bg-light p-4 rounded w-50" style={{ zIndex: 1, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
              <h3 className="mb-4 text-center">
                {editingId ? 'Edit Supplier' : 'Add Supplier'}
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    name="supplier_name"
                    value={formData.supplier_name}
                    onChange={handleFormChange}
                    className="form-control"
                    placeholder="Enter Supplier Name"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    className="form-control"
                    placeholder="Enter Email"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleFormChange}
                    className="form-control"
                    placeholder="Enter Password"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    name="password_confirmation"
                    value={formData.password_confirmation}
                    onChange={handleFormChange}
                    className="form-control"
                    placeholder="Enter Password Confirmation"
                  />
                </div>
                <div className="d-flex justify-content-between">
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    {editingId ? 'Save Changes' : 'Create Supplier'}
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={handleCloseForm}
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="table-responsive mt-4">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Supplier Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {suppliers.map((supplier) => (
                  <tr key={supplier.id}>
                    <td>{supplier.supplier_name}</td>
                    <td>{supplier.email}</td>
                    <td>
                      <button
                        className="btn btn-success btn-sm mr-2 px-4"
                        onClick={() => handleEditSupplier(supplier)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm px-4"
                        onClick={() => deleteSuppliers(supplier.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Seller;
