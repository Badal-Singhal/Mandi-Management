import React, { useEffect, useState } from "react";
import "./../App.css"; // Ensure your CSS file is imported
import { useNavigate } from "react-router-dom";
import { getPurchaseBook, showParchi } from "../API/Auth";

const PurchaseBook = () => {
  const navigate = useNavigate();
  const [purchaseBook, setPurchaseBook] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  

  const handleOnGoBackClick = () => {
    navigate("/");
  };

  const handleOnCreateReceiptClick = () => {
    navigate("/create-receipt");
  };

  useEffect(() => {
    let obj = {};
    
    getPurchaseBook(obj).then((res) => {
      setPurchaseBook(res.data);
      let map = new Map();
      for (let i = 0; i < res.data.length; i++) {
        map.set(res.data[i].parchi_no, res.data[i]);
      }
      console.log(map.size);
      localStorage.setItem("parchiNumber", map.size);
    });
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = purchaseBook.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(purchaseBook.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePaginationChange = (e) => {
    setItemsPerPage(e.target.value);
    setCurrentPage(1); // Reset to the first page when items per page changes
  };

  const handleShowParchi=(val)=>{
    console.log(val);
    let obj={}
    obj['photo_path']=val.photo_path
    showParchi(obj).then((res)=>{
      let base64data=res.data
      navigate('/view-image', { state: { base64data} });
    })
    
  }

  // Pagination Controls
  const maxPagesToShow = 4;
  const pageRange = Math.floor(maxPagesToShow / 2);

  const startPage = Math.max(1, currentPage - pageRange);
  const endPage = Math.min(totalPages, currentPage + pageRange);

  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <div className="purchase-book-container">
      <div className="d-flex justify-content-between">
        <div>
          <h2 id="heading">Purchase Book</h2>
        </div>
        <div className="mobile-btn-container">
          <button
            onClick={handleOnGoBackClick}
            className="btn btn-secondary me-2"
          >
            Go Back
          </button>
          <button
            className="btn btn-success"
            onClick={handleOnCreateReceiptClick}
          >
            Create Receipt
          </button>
        </div>
      </div>

      <table className="purchase-book-table">
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Date</th>
            <th>Parchi No.</th>
            <th>Name of firm</th>
            <th>Jins ka naam</th>
            <th>Anumanit vazan</th>
            <th>Dar</th>
            <th>Remarks</th>
            <th>View Photo</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((val, index) => (
              <tr key={index}>
                <td>{indexOfFirstItem + index + 1}</td>
                <td>{val.created_at.split("T")[0]}</td>
                <td><button onClick={()=>handleShowParchi(val)} className="parchi-link-btn">{val.parchi_no}</button></td>
                <td>{val.supplierName}</td>
                <td>{val.dheri}</td>
                <td>{val.weight}</td>
                <td>{val.dheri !== "Sarso" ? val.rate : val.finalRate}</td>
                <td>{val.remarks}</td>
                <td><button onClick={()=>handleShowParchi(val)} className="parchi-link-btn">View Image</button></td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" style={{ textAlign: "center" }}>
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="pagination">
        <button
          className="pagination-btn arrow"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={!hasPrev}
        >
          &lt;
        </button>
        {Array.from(
          { length: endPage - startPage + 1 },
          (_, index) => startPage + index
        ).map((pageNumber) => (
          <button
            key={pageNumber}
            className={`pagination-btn ${
              pageNumber === currentPage ? "active" : ""
            }`}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
        <button
          className="pagination-btn arrow"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={!hasNext}
        >
          &gt;
        </button>
      </div>

      {/* Rows Per Page Dropdown */}
      <div className="rows-per-page-container">
        <span>Rows per page:</span>
        <select
          className="rows-per-page-dropdown"
          defaultValue="10"
          onChange={handlePaginationChange}
        >
          <option value="2">2</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
    </div>
  );
};

export default PurchaseBook;
