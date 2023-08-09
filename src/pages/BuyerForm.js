import React, { useState, useContext } from 'react';
import { OmsContext } from '../components/auth/AuthContext';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const BuyerForm = ({buyers, suppliers, handleUpdateBuyerForm}) => {
  const {backendUrl} = useContext(OmsContext);
  const [formData, setFormData] = useState({
    supplier_name: "",
    buyer_name: "",
    assigned_to: "",
    country: "",
    boxMark: "",
    variety: "",
    s1: "",
    stems: "",
    quantity: "",
    boxtype: "",
    cost: "",
    amount: "",
    price: "",
    total: "",
    duty: "",
  });
  
  async function handleSubmit(e) {
    e.preventDefault();
    try {
    const response = await axios.post(`${backendUrl}/buyer_foams`, formData);
    const data = response.data
   handleUpdateBuyerForm(data);
    setFormData({supplier_name: "", buyer_name: "", assigned_to: "", country: "", boxMark: "", type: "", variety: "", s1: "", stems: "", quantity: "", boxtype: "", st: "",
     cost: "", amount: "", price: "", total: "", duty: ""});
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
        <h2 className="text-center font-weight-bold mb-4">Buyer Form</h2>
        <form onSubmit={handleSubmit} className="space-y-1 mb-2rem">
          <div className="row mb-3">
          <div  className="col-md-6 mb-2">
            <label htmlFor="supplierName" style={{ fontWeight: 'bold' }}>Supplier Name:</label>
            <select
              id="supplierName"
              name="supplier_name"
              value={formData.supplier_name}
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

          <div  className="col-md-6 mb-2">
            <label htmlFor="buyerName" style={{ fontWeight: 'bold' }}>Buyer Name:</label>
            <select
              id="buyerName"
              name="buyer_name"
              value={formData.buyer_name}
              onChange={handleChange}
              className="form-control"
            >
              <option value="">Select a buyer...</option>
              {buyers.map((buyer) => (
                <option key={buyer.id} value={buyer.buyer_name}>
                  {buyer.buyer_name}
                </option>
              ))}
            </select>
          </div>

          <div  className="col-md-6 mb-2">
            <label htmlFor="assignedTo" style={{ fontWeight: 'bold' }}>Assigned To:</label>
            <select
              id="assignedTo"
              name="assigned_to"
              value={formData.assigned_to}
              onChange={handleChange}
              className="form-control"
            >
              <option value="">Assign to...</option>
              {buyers.map((buyer) => (
                <option key={buyer.id} value={buyer.buyer_name}>
                  {buyer.buyer_name}
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
            <label htmlFor="boxMark" style={{ fontWeight: 'bold' }}>Box Mark:</label>
            <input
              type="text"
              id="boxMark"
              name="boxMark"
              value={formData.boxMark}
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
              type="text"
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
            <label htmlFor="price" style={{ fontWeight: 'bold' }}>Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter Price"
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

          <div className="mb-3 mt-2">
            <label htmlFor="duty" style={{ fontWeight: 'bold' }}>Duty:</label>
            <input
              type="text"
              id="duty"
              name="duty"
              value={formData.duty}
              onChange={handleChange}
              className="form-control text-center"
              placeholder="Enter Duty"
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

export default BuyerForm;
