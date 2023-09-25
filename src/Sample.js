//------------- array of objects  -------------------

// const employee =[
//     {
//         'id':1,
//         'name':'sandhya'
//     },
//     {
//         'id':2,
//         'name':'san'
//     }
// ]


// ---------------- callback function --------------


// function func()
// {
//     console.log('How are you?')
// }

// function func2()
// {
//     alert('WELCOME......')
// }


// function myfunction(name,aa)
// {
//     console.log('Hi......',name);
//     aa()
// }

// setTimeout(func2,5000)
// myfunction('sandy',func)


// ---------------- Props -----------------


// import React from 'react'


// const Value=(props) =>
// {
//     return(
//     <h1>Hellooo world {props.val}</h1>
//     )
// }

// const Sample = () => {

//     const aa = 'sandy'
//   return (

    

//     <div>
//         <Value val={aa}/>
//     </div>
//   )
// }

// export default Sample


// ---------------- Promise -----------------



// let count = true

// let countValue = new Promise(function(resolve,reject){
// if(count)
// {
//     resolve('True');
// }
// else
// {
//     reject('False')
// }
// }).then((response)=>
// (console.log(response,'Response')
// )).catch((error)=>
// (console.log(error,'error')
// ))



import { useState, useEffect } from "react";
import "./Table.css";
import { Pagination,DatePicker,Switch} from "antd";
import dayjs from 'dayjs'
import { useSelector,useDispatch } from "react-redux";
import { getProducts } from "./store/DataSlice";

const Table = () => {

  const dispatch = useDispatch();
  const {data:datas} = useSelector(state => state.data)

  console.log(datas);


  const [data, setData] = useState([]);
  const [currentpage, setCurrentpage] = useState(1);
  const [perPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [ brewBefore,setBrewBefore]= useState("brewed_before='08-2010'")
  const [ brewAfter,setBrewAfter]= useState('brewed_after="08-2015"')
  const [ brewState, setBrewState ]= useState("brewed_before='08-2023'")

  useEffect(() => {
    // const fetchData = () => {
    //   try {
    //     const response = await fetch(
    //       `https://api.punkapi.com/v2/beers?page=1&per_page=75&${brewState}`
    //     );
    //     const jsonData = await response.json();
    //     setData(jsonData);
    //   } catch (error) 
    //   {
    //     console.log('Error:', error)
    //   }
    // };

    // fetchData();

    dispatch(getProducts());

  }, [dispatch]);

 

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

  const handlePaginationChange = (page) => 
  {
    setCurrentpage(page);
  };

 const onChange = (date, dateString) => {
  const newVal = dayjs(dateString).format('MM-YYYY')
    if(brewBefore){
  
        setBrewBefore(newVal) 
       setBrewState(brewBefore)
        console.log("im if state");
    }
    else{
    setBrewAfter(newVal)
    setBrewState(brewAfter)
    console.log("im else state");
    }

       
  };
  console.log(brewBefore,"brew-------before");

  const onSwitchChange = (checked) => {

    if (checked) { //After
      setBrewState(`brewed_after=${brewAfter}`)
    } 
    else { //Before
      
      setBrewState(`brewed_before=${brewBefore}`)
    }
  };
  console.log(brewState,'brew state----------------');
  
  // const clickFunc = ()=>
  // {
  //   setBrewState('brewed_after="08-2008"');
  // }

  

  return (
    <div className="container-fluid mt-4 mb-4">
        <h3>Table Data</h3>
      <div style={{ display: "flex", justifyContent: "center", gap:'1rem'}}>
      <input
        placeholder="Search by name or Tagline or Description..."
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <DatePicker onChange={onChange} picker="month" />

      <Switch checkedChildren="After" unCheckedChildren="Before" onChange={onSwitchChange}   />
      </div>

      {/* <Button onClick={clickFunc}>Click here</Button> */}

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
          {datas.map((data) => (
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
