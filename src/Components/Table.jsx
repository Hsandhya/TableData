import { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./Table.css";
import { Pagination, Switch } from "antd";
import {
  fetchBeers,
  updateSearchQuery,
  updateCurrentPage,
  updateBrewedState,
} from "../Actions/beerActions";
import CardView from "./card";

const Table = (props) => {
  const {
    searchQuery,
    currentPage,
    brewedState,
    updateCurrentPage,
    updateBrewedState,
    updateSearchQuery,
    beers,
    totalItems,
    fetchBeers,
  } = props;

  useEffect(() => {
    fetchBeers(searchQuery, currentPage, brewedState);
  }, [searchQuery, currentPage, brewedState, fetchBeers]);

  const handleSearch = (e) => {
    const query = e.target.value;
    updateSearchQuery(query);
  };

  const handlePagination = (page) => {
    updateCurrentPage(page);
  };

  const handlebrewState = (date) => {
    if (!date) {
      updateBrewedState("brewed_before");
    } else {
      updateBrewedState("brewed_after");
    }
  };

  const [isFilterChecked, setIsfilterChecked] = useState(false)

  const handleAppliedFilter =(checked) =>
  {
    if (checked)
    {
      setIsfilterChecked(!isFilterChecked)
      updateBrewedState("brewed_before");
      
      
    }
    else
    {
      setIsfilterChecked(false)
      updateBrewedState(currentPage)
     
    }
    
  }

  return (
    <div className="container-fluid mt-4 mb-4">
      <h3>Table Data</h3>
      <div style={{ display: "flex", justifyContent:"space-between", gap: "1rem" }}>
        <input
          placeholder="Search by name or Tagline or Description..."
          value={searchQuery}
          onChange={handleSearch}
        />
       {isFilterChecked &&
        <Switch
          checkedChildren="After 2013/08"
          unCheckedChildren="Before 2013/08"
          onClick={handlebrewState}
  
        ></Switch>}
      </div>

      <div style={{marginTop:'1rem', display:'flex', gap:'0.5rem'}}>Date Filter
        <Switch  onClick={handleAppliedFilter}></Switch>
        </div>

      <div className="table-view">
        <table className="table table-striped table-hover mt-4 pr-3">
          <thead className="table-dark">
            <tr>
              <th className="heading-class" style={{borderTopLeftRadius:'8px'}}>ID</th>
              <th>Name</th>
              <th>Image</th>
              <th>Tagline</th>
              <th>Description</th>
              <th style={{borderTopRightRadius:'8px'}}>First Brewed</th>
            </tr>
          </thead>
          <tbody>
            {beers.map((data) => (
              <tr key={data.id}>
                <td>{data.id}</td>
                <td>{data.name}</td>
                <td>
                  <img
                    style={{ height: "80px", width: "40px" }}
                    src={data.image_url}
                    alt="Failed_loading"
                  />
                </td>
                <td>{data.tagline}</td>
                <td>{data.description}</td>
                <td>{data.first_brewed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card-view">
        <CardView data={beers} />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Pagination
          current={currentPage}
          total={totalItems}
          onChange={handlePagination}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  beers: state.beer.beers,
  loading: state.beer.loading,
  error: state.beer.error,
  searchQuery: state.beer.searchQuery,
  currentPage: state.beer.currentPage,
  totalItems: state.beer.totalItems,
  brewedState: state.beer.brewedState,
});

export default connect(mapStateToProps, {
  fetchBeers,
  updateSearchQuery,
  updateCurrentPage,
  updateBrewedState,
})(Table);
