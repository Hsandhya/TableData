import { useEffect } from "react";
import { connect } from "react-redux";
import "./Table.css";
import { Pagination, Switch } from "antd";
import {
  fetchBeers,
  updateSearchQuery,
  updateCurrentPage,
  updateBrewedBefore,
} from "../Actions/beerActions";
import CardView from "./card";

const Table = (props) => {
  const {
    searchQuery,
    currentPage,
    brewBefore,
    updateCurrentPage,
    updateBrewedBefore,
    updateSearchQuery,
    beers,
    totalItems,
    fetchBeers,
  } = props;

  useEffect(() => {
    fetchBeers(searchQuery, currentPage, brewBefore);
  }, [searchQuery, currentPage, brewBefore, fetchBeers]);

  const handleSearch = (e) => {
    const query = e.target.value;
    updateSearchQuery(query);
  };

  const handlePagination = (page) => {
    updateCurrentPage(page);
  };

  const handlebrewState = (date) => {
    if (!date) {
      updateBrewedBefore("brewed_before");
    } else {
      updateBrewedBefore("brewed_after");
    }
  };

  return (
    <div className="container-fluid mt-4 mb-4">
      <h3>Table Data</h3>
      <div style={{ display: "flex", justifyContent:"space-between", gap: "1rem" }}>
        <input
          placeholder="Search by name or Tagline or Description..."
          value={searchQuery}
          onChange={handleSearch}
        />

        <Switch
          checkedChildren="After 2010/08"
          unCheckedChildren="Before 2010/08"
          onClick={handlebrewState}
        ></Switch>
      </div>

      <div className="table-view">
        <table className="table table-striped table-hover mt-4">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Image</th>
              <th>Tagline</th>
              <th>Description</th>
              <th>First Brewed</th>
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
  brewBefore: state.beer.brewBefore,
});

export default connect(mapStateToProps, {
  fetchBeers,
  updateSearchQuery,
  updateCurrentPage,
  updateBrewedBefore,
})(Table);
