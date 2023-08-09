import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const SellerFormRequests = ({ supplies, deleteSupplierForms, updateSupplierForms }) => {
  return (
    <div className="container d-flex justify-content-center align-items-center mt-4">
      <div className="col-lg-10">
        <h2 className="text-center font-weight-bold mb-4">Submitted Supplier Forms</h2>
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>Supplier Name</th>
                <th>Country</th>
                <th>Box Mark</th>
                <th>Variety</th>
                <th>S1</th>
                <th>Stems</th>
                <th>Quantity</th>
                <th>Box Type</th>
                <th>Cost</th>
                <th>Amount</th>
                <th>Total</th>
                <th>Duty</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {supplies.map((supply) => (
                <tr key={supply.id}>
                  <td>{supply.supplier_credentials}</td>
                  <td>{supply.country}</td>
                  <td>{supply.boxmark}</td>
                  <td>{supply.variety}</td>
                  <td>{supply.s1}</td>
                  <td>{supply.stems}</td>
                  <td>{supply.quantity}</td>
                  <td>{supply.boxtype}</td>
                  <td>{supply.cost}</td>
                  <td>{supply.amount}</td>
                  <td>{supply.total}</td>
                  <td>{supply.duty}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm mx-1"
                      onClick={() => updateSupplierForms(supply)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm mx-1"
                      onClick={() => deleteSupplierForms(supply.id)}
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
  );
};

export default SellerFormRequests;
