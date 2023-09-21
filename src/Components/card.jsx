import { Card } from 'antd'
import React from 'react'
import './Table.css'
import { fetchBeers,updateSearchQuery,updateCurrentPage } from "../Actions/beerActions";
import { connect } from "react-redux";


const CardView = (props) => {
    const {beers} = props;
    
    // console.log(search,"search...............")
    // console.log(currentPage,"page...............")
    // console.log(total,"total...............")

    // const data = props.data

    // console.log(data,'======card data')

    const card = beers.map((item =>
      
        <Card
        title={item.name}
        style={{background: 'pink'}}>
        <p style={{fontWeight:'bold'}}>{item.tagline}</p>
        <p>{item.description}</p>

        </Card>
        ))
    
  return (
    <div className='card'>
        {card}
    </div>
  )
}

const mapStateToProps = (state) => ({
  beers: state.beer.beers,
  loading: state.beer.loading,
  error: state.beer.error,
  brewDate: state.beer.brewDate,
  searchQuery: state.beer.searchQuery,
  currentPage: state.beer.currentPage,
  totalItems: state.beer.totalItems, 
});

export default connect(mapStateToProps, {
  fetchBeers,
  updateSearchQuery,
  updateCurrentPage
})(CardView);