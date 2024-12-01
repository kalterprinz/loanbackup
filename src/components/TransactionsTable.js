import React, { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi'; 
import axios from 'axios';
import Modal from 'react-modal';
import './TransactionsTable.css';

const TransactionsTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editData, setEditData] = useState({
    loanId: '',
    applicantName: '',
    loanAmount: '',
    loanType: '',
    loanTerm: '',
    paymentStatus: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch transactions from the backend
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:3001/loans', {
          params: { defaultStatus: 'pending' },
        });
        setTransactions(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching transactions:', err);
        setError('Failed to load transactions');
        setLoading(false);
      }
    };
  
    fetchTransactions();
  }, []);
  

  // Handle Edit Functionality
  const handleEdit = (transaction) => {
    setEditData(transaction);
    setModalIsOpen(true);
  };

  const handleSave = async () => {
    try {
        await axios.put(`http://localhost:3001/loan/${editData._id}`, editData); // Use _id instead of loanId
        setModalIsOpen(false);

        // Update the transactions list with the edited transaction
        const updatedTransactions = transactions.map(t =>
            t._id === editData._id ? { ...t, ...editData } : t // Ensure deep merge of changes
        );

        setTransactions(updatedTransactions);
    } catch (err) {
        console.error('Error updating transaction:', err);
    }
};


  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData(prevState => ({ ...prevState, [name]: value }));
  };


  // Filter transactions based on the search term
  const filteredTransactions = transactions.filter(transaction => 
    transaction.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.loanAmount.toString().includes(searchTerm.toLowerCase()) ||
    transaction.loanType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.loanTerm.toString().includes(searchTerm.toLowerCase()) ||
    transaction.applicationDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.paymentStatus.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + itemsPerPage);

  // Handle page change
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="transactions-table">
      <div className="transactions-header">
        <span>Recent Transactions</span>
        <div className="search-bar1">
          <input 
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          
        </div>
      </div> 
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Applicant Name</th>
                <th>Loan Amount</th>
                <th>Loan Type</th>
                <th>Tenure</th>
                <th>Date Applied</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTransactions.length > 0 ? (
                paginatedTransactions.map((transaction, index) => (
                  <tr key={index}>
                    <td>{transaction.applicantName}</td>
                    <td>{transaction.loanAmount}</td>
                    <td>{transaction.loanType}</td>
                    <td>{transaction.loanTerm}</td>
                    <td>{new Date(transaction.applicationDate).toLocaleDateString()}</td>
                    <td>{transaction.paymentStatus}</td>
                    <td className="action-buttons">
                      <button
                        className="btn btn-edit"
                        onClick={() => handleEdit(transaction)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No transactions found</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="pagination-controls">
            <button 
              className="page" 
              onClick={handlePreviousPage} 
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="pagespan" >{currentPage} of {totalPages}</span>
            <button 
              className="page" 
              onClick={handleNextPage} 
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* Modal for Editing */}
        <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
          <h3>Update Information</h3>
          <label>Applicant Name</label>
          <input 
            type="text" 
            name="applicantName" 
            value={editData.applicantName} 
            onChange={handleChange}
          />
          <label>Loan Amount</label>
          <input 
            type="number" 
            name="loanAmount" 
            value={editData.loanAmount} 
            onChange={handleChange}
          />
          <label>Loan Type</label>
          <input 
            type="text" 
            name="loanType" 
            value={editData.loanType} 
            onChange={handleChange}
          />
          <label>Loan Term</label>
          <input 
            type="number" 
            name="loanTerm" 
            value={editData.loanTerm} 
            onChange={handleChange}
          />
          <label>Payment Status</label>
          <input 
            type="text" 
            name="paymentStatus" 
            value={editData.paymentStatus} 
            onChange={handleChange}
          />
          <div className="button-containermodal">
            <button className="modal-button" onClick={handleSave}>Save</button>
            <button className="modal-button close" onClick={() => setModalIsOpen(false)}>Close</button>
          </div>
        </Modal>

    </div>
  );
};

export default TransactionsTable;