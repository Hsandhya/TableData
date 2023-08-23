import React, { useState, useEffect } from "react";
import "./Table.css";
import { Pagination } from "antd";

const Table = () => {
  const [data, setData] = useState([]);
  const [currentpage, setCurrentpage] = useState(1);
  const [perPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.punkapi.com/v2/beers?page=1&per_page=75"
        );
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) 
      {
        console.log('Error:', error)
      }
    };

    fetchData();
  }, [currentpage, perPage]);

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentpage(1);
  };

  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tagline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentpage * perPage;
  const indexOfFirstItem = indexOfLastItem - perPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePaginationChange = (page) => {
    setCurrentpage(page);
  };

  return (
    <div className="container-fluid mt-4 mb-4">
        <h3>Table Data</h3>
      <div style={{ display: "flex", justifyContent: "center" }}>
      <input
        placeholder="Search by name or Tagline or Description..."
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
      />
      </div>

      <table className="table table-striped table-hover mt-4">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Tagline</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((data) => (
            <tr key={data.id}>
              <td>{data.id}</td>
              <td>{data.name}</td>
              <td>{data.tagline}</td>
              <td>{data.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Pagination
          current={currentpage}
          onChange={handlePaginationChange}
          pageSize={perPage}
          total={filteredData.length}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default Table;
