import React from 'react'
import { useRef } from "react";
import Swal from 'sweetalert2'
import { Component, useEffect, useState } from "react";
import Header from '../component/Header'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import axios from "axios"
import ReactPaginate from 'react-paginate';
import { DateRangePicker } from 'react-date-range';
import './Main.css'
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'
function Main() {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [users, SetUsers] = useState([]);
  const [allUsers,SetAllUsers]=useState([]);
   const [startDate,SetStartDate]=useState(new Date());
  const [endDate,SetEndDate]=useState([]);
 const [userData, setUserData] = useState("");
 const [checked, setChecked] = useState(false);
  const [limit,setLimit]=useState(100);
  const [pageCount,setPageCount]=useState(1);
  const currentPage=useRef();
  const [show, setShow] = useState(false);
   const [message, setMessage] = useState("");
   useEffect(()=>{
axios.get('http://localhost:8000/api/v2/users')
.then((response)=>{
  SetUsers(response.data)
  SetAllUsers(response.data)
 
})
  },[])
   const handleSelect = (date)=>{
    let ff =allUsers.filter((product)=>{
let fff=new Date(product["createdAt"]);
return(
  fff >= date.selection.startDate &&
  fff <= date.selection.endDate
);
    });
    SetStartDate(date.selection.startDate)
    SetEndDate(date.selection.endDate)
    
    SetUsers(ff);
  }
   const selectionRange = {
    startDate: startDate,
    endDate: endDate,
 
    key: 'selection',
  }


  useEffect(() => {
    currentPage.current=1;
    // getAllUser();
    getPaginatedUsers();
  }, []);
 //pagination
  function handlePageClick(e) {
    console.log(e);
   currentPage.current=e.selected+1;
    getPaginatedUsers();
   

  } 
  function getPaginatedUsers(){
    fetch(`http://localhost:8000/api/v2/paginate?page=${currentPage.current}&limit=${limit}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        
        setPageCount(data.pageCount);
        SetUsers(data.result)
         // console.log(data, "userData");
       
      });

  }
  //search
  const search = (event) => {
    const matchedUsers = users.filter((name) => {
      return `${name.Email} ${name.Age} ${name.Firstname}`
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });

    SetUsers(matchedUsers);
    setSearchPhrase(event.target.value);
  };

//back
 const navigate = useNavigate();
const back=(e)=>{
 window.location.reload(false);
  }
 /* delete */
  const OnDelete = (id__)=>{
Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
})

Swal.fire({
  title: 'Are you sure?',
  text: "You won't be able to revert this!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonText: 'Yes, delete it!',
  cancelButtonText: 'No, cancel!',
  reverseButtons: true
}).then((result) => {
  if (result.isConfirmed) {
   Swal.fire(
      'Deleted!',
      'Your file has been deleted.',
      'success'
    )
   axios.delete(`http://localhost:8000/api/v2/users/${id__}`)
     .then(res=>{
      setMessage(res.data.message)
      setShow(true)
      setTimeout(() => {
        setShow(false)
      }, 4000);
     })
     

  } else if (
    /* Read more about handling dismissals below */
    result.dismiss === Swal.DismissReason.cancel
  ) {
    Swal.fire(
      'Cancelled',
      'Your imaginary file is safe :)',
      'error'
    )
  }
})


    
   }
  return (
    
      
     
    <div className="Header">
    <div>

<Header />
<div className="search-container">
        <input
          type="text"
          placeholder="Search"
          value={searchPhrase}
          onChange={search}
        />
      </div>
<button className="btn btn-primary" onClick={back}>Back</button>
 <Link
                        to={`/add/user`}
                        className="btn btn-success mr-10"
                       
                    >
                        Add
                    </Link>
    </div>

  <input onChange={() => setChecked(checked => !checked)} type="checkbox" value={checked} />finter
        
  {checked ? <div>
      <DateRangePicker
        ranges={[selectionRange]}
        onChange={handleSelect}
      />
<h2>Hover Rows</h2>
                  
      <table class="table table-hover">
        <thead>
          <tr>
            
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
          
            <th>createdAt</th>
              <th>EDIT</th>
          </tr>
        </thead>
<tbody>
  {users.map((product)=>{
let date = new Date(product["createdAt"]);
return(
<tr key={product["_id"]}>
<td>{product["Firstname"]}</td>
<td>{product["Age"]}</td>
<td>{product["Email"]}</td>
<td>{date.toLocaleDateString()}</td>
<td className="gap__actions">
      <span className="badge bg-info"><Link to={`/${product._id}`}>EDIT</Link></span>
      
        <span className="badge bg-danger" onClick={()=>OnDelete(product._id)}>DELETE</span>
    </td>
   
</tr>
 ) })}
  
 </tbody>
          
        </table>
          <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          marginPagesDisplayed={2}
          containerClassName="pagination justify-content-center"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          activeClassName="active"
          forcePage={currentPage.current-1}
        />
        </div>:
      <div>
       <table class="table table-hover">
        <thead>
          <tr>
            
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
          
            <th>createdAt</th>
              <th>EDIT</th>
          </tr>
        </thead>
 <tbody>
  {users.map((product)=>{
let date = new Date(product["createdAt"]);
return(
<tr key={product["_id"]}>
<td>{product["Firstname"]}</td>
<td>{product["Age"]}</td>
<td>{product["Email"]}</td>
<td>{date.toLocaleDateString()}</td>
<td className="gap__actions">
      
 <span className="badge bg-info"><Link to={`/${product._id}`}>EDIT</Link></span>
      
        <span className="badge bg-danger" onClick={()=>OnDelete(product._id)}>DELETE</span>
    
    </td>
</tr>
 ) })}
  
 </tbody></table>
           <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={6}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          marginPagesDisplayed={2}
          containerClassName="pagination justify-content-center"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          activeClassName="active"
          forcePage={currentPage.current-1}
        />
       
</div>
        }
    </div>
   
  )
}

export default Main