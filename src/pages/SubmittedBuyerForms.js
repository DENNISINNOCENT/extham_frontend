import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const SubmittedBuyerForms = ({ buyer_foams, deleteBuyerForms, updateBuyerForms }) => {
  return (
    <div className="container mt-4">
        <h2 className="text-center font-weight-bold mb-4">Submitted Buyer Forms</h2>
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
                <th>Price</th>
                <th>Total</th>
                <th>Duty</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {buyer_foams.map((buyer_foam) => (
                <tr key={buyer_foam.id}>
                  <td>{buyer_foam.supplier_name}</td>
                  <td>{buyer_foam.country}</td>
                  <td>{buyer_foam.boxMark}</td>
                  <td>{buyer_foam.variety}</td>
                  <td>{buyer_foam.s1}</td>
                  <td>{buyer_foam.stems}</td>
                  <td>{buyer_foam.quantity}</td>
                  <td>{buyer_foam.boxtype}</td>
                  <td>{buyer_foam.cost}</td>
                  <td>{buyer_foam.amount}</td>
                  <td>{buyer_foam.price}</td>
                  <td>{buyer_foam.total}</td>
                  <td>{buyer_foam.duty}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm mx-1"
                      onClick={() => updateBuyerForms(buyer_foam)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm mx-1"
                      onClick={() => deleteBuyerForms(buyer_foam.id)}
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
  );
};

export default SubmittedBuyerForms;
