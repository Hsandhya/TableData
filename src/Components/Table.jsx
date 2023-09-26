import { useEffect, useState,useRef } from "react";
import { connect } from "react-redux";
import "./Table.css";
import dayjs from 'dayjs'
import { Pagination, Switch, DatePicker,Image,Tour} from "antd";
import {
  fetchBeers,
  updateSearchQuery,
  updateCurrentPage,
  updateBrewedState,
} from "../Actions/beerActions";

import CardView from "./card";

const monthFormat = 'YYYY/MM';

const Table = (props) => {

  const ref1 = useRef(null);
  const ref2 = useRef(null);


  const [open, setOpen] = useState(true);

  const steps = [
    {
      title: 'Search here',
      description: 'Find what you need effortlessly with intuitive search filters. ',
      
      target: () => ref1.current,
    },
  
    {
      title: 'Click here',
      description: ' Manage dates with filter.',
      target: () => ref2.current,
    },
  ];

  console.log(props,"props");
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
    fetchBeers(searchQuery,currentPage, brewedState,totalItems);
  }, [searchQuery, currentPage, brewedState, fetchBeers,totalItems,open]);


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

  const onChange = (date, dateString) => {
    const newVal = dayjs(dateString).format('MM-YYYY')
      if(brewedState === "brewed_before"){
           updateBrewedState(`brewed_before=${newVal}`)
          
          console.log("im if state");
      }
      else{
        updateBrewedState("")
        updateBrewedState(`brewed_after=${newVal}`)
     
      console.log("im else state");
      }
  
         
    };

  return (
    <div className="container-fluid mt-4 mb-4">
      <h3>Table Data</h3>
      <div style={{ display: "flex", justifyContent:"center", gap: "1rem" }}>
  
        
        <input
        ref={ref1}
          className="searchBar"
          placeholder="Search by name or Tagline or Description..."
          value={searchQuery}
          onChange={handleSearch}
        />


        {isFilterChecked &&
        <DatePicker onChange={onChange} 
        picker="month"
        defaultValue={dayjs('2013/10', monthFormat)} 
        format={monthFormat}>

        </DatePicker>
            }

        </div>
      
      
        <Tour open={open} onClose={() => setOpen(false)} steps={steps} />

        
      

      <div style={{marginTop:'1rem', display:'flex',justifyContent:"space-between"}}>
        <div style={{ display:'flex',gap:'0.5rem'}}>Date Filter<Switch ref={ref2} onClick={handleAppliedFilter}></Switch></div>
        {isFilterChecked &&
       
       <Switch
       style={{display:"flex",justifyContent:"space-between"}}
         checkedChildren="After"
         unCheckedChildren="Before"
         onClick={handlebrewState}
 
       ></Switch>}
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
                  <Image
                  height={80}
                  width={40}
                  src={data.image_url}
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
