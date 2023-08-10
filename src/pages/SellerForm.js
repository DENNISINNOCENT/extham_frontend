import React, { useState, useContext } from 'react';
import { OmsContext } from '../components/auth/AuthContext';
import axios from 'axios';

const SellerForm = ({suppliers, buyers, handleUpdateSupplierForm}) => {
  const {backendUrl} = useContext(OmsContext);
  const [formData, setFormData] = useState({
    supplier_credentials: "",
    assign_to: "",
    country: "",
    boxmark: "",
    type_flower: "",
    variety: "",
    s1: "",
    stems: "",
    quantity: "",
    boxtype: "",
    cost: "",
    amount: "",
    total: "",
  });
  
  async function handleSubmit(e) {
    e.preventDefault();
    try {
    const response = await axios.post(`${backendUrl}/supplies`, formData);
    const data = response.data
    handleUpdateSupplierForm(data);
    setFormData({supplier_credentials: "", assign_to: "", country: "", boxmark: "", type_flower: "", variety: "", stems: "", quantity: "", boxtype: "",
     cost: "", amount: "", total: ""});
    console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container items-center">
      <div className="card p-4">
        <h2 className="text-center font-weight-bold mb-4">Supplier Form</h2>
        <form onSubmit={handleSubmit} className="space-y-1 mb-2rem">
          <div className="row mb-3">
          <div  className="col-md-6 mb-2">
            <label htmlFor="supplierCredentials" style={{ fontWeight: 'bold' }}>Supplier Name:</label>
            <select
              id="supplierCredentials"
              name="supplier_credentials"
              value={formData.supplier_credentials}
              onChange={handleChange}
              className="form-control"
            >
              <option value="">Select a supplier...</option>
              {suppliers.map((supplier) => (
                <option key={supplier.id} value={supplier.supplier_name}>
                  {supplier.supplier_name}
                </option>
              ))}
            </select>
          </div>

           {/* <div  className="col-md-6 mb-2">
            <label htmlFor="SupplierName" style={{ fontWeight: 'bold' }}>Supplier Name:</label>
            <select
              id="SupplierName"
              name="supplier_name"
              value={formData.supplier_name}
              onChange={handleChange}
              className="form-control"
            >
              <option value="">Select a Supplier...</option>
              {suppliers.map((supplier) => (
                <option key={supplier.id} value={supplier.supplier_name}>
                  {supplier.supplier_name}
                </option>
              ))}
            </select>
          </div>  */}

          <div  className="col-md-6 mb-2">
            <label htmlFor="assignTo" style={{ fontWeight: 'bold' }}>Assigned To:</label>
            <select
              id="assign_to"
              name="assign_to"
              value={formData.assign_to}
              onChange={handleChange}
              className="form-control"
            >
              <option value="">Assign to...</option>
              {suppliers.map((supplier) => (
                <option key={supplier.id} value={supplier.supplier_name}>
                  {supplier.supplier_name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6 mb-2">
            <label htmlFor="country" style={{ fontWeight: 'bold' }}>Country:</label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter Country"
            />
          </div>

          <div className="col-md-6 mb-2">
            <label htmlFor="boxmark" style={{ fontWeight: 'bold' }}>Box Mark:</label>
            <input
              type="text"
              id="boxmark"
              name="boxmark"
              value={formData.boxmark}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter Box Mark"
            />
          </div>

          <div className="col-md-6 mb-2">
            <label htmlFor="variety" style={{ fontWeight: 'bold' }}>Variety:</label>
            <input
              type="text"
              id="variety"
              name="variety"
              value={formData.variety}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter Variety"
            />
            </div>

            <div className="col-md-6 mb-2">
            <label htmlFor="s1" style={{ fontWeight: 'bold' }}>S1:</label>
            <input
              type="text"
              id="s1"
              name="s1"
              value={formData.s1}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter S1"
            />
          </div>
          
          <div className="col-md-6 mb-2">
            <label htmlFor="quantity" style={{ fontWeight: 'bold' }}>Quantity:</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter Quantity"
            />
          </div>
          <div  className="col-md-6 mb-2">
            <label htmlFor="boxtype" style={{ fontWeight: 'bold' }}>Box Type:</label>
            <input
              type="text"
              id="boxtype"
              name="boxtype"
              value={formData.boxtype}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter Box Type"
            />
          </div>

          <div  className="col-md-6 mb-2">
            <label htmlFor="stems" style={{ fontWeight: 'bold' }}>Stems:</label>
            <input
              type="number"
              id="stems"
              name="stems"
              value={formData.stems}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter Stems"
            />
          </div>

          <div  className="col-md-6 mb-2">
            <label htmlFor="cost" style={{ fontWeight: 'bold' }}>Cost:</label>
            <input
              type="number"
              id="cost"
              name="cost"
              value={formData.cost}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter Cost"
            />
          </div>

          <div  className="col-md-6 mb-2">
            <label htmlFor="amount" style={{ fontWeight: 'bold' }}>Amount:</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter Amount"
            />
          </div>

          <div  className="col-md-6 mb-2">
            <label htmlFor="total" style={{ fontWeight: 'bold' }}>Total:</label>
            <input
              type="number"
              id="total"
              name="total"
              value={formData.total}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter Total"
            />
          </div>
          </div>
          <div className="flex justify-center my-4">
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellerForm;
