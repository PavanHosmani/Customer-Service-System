import { useState } from 'react';
import './App.css'
import React from 'react';
import { useTable , useSortBy,useGlobalFilter,usePagination} from 'react-table';
import axios from 'axios';
import { use } from 'react';

function App() {
    const columns=React.useMemo(()=>[
        {Header:"CustomerId",accessor:"customerId"},
        {Header:"Name",accessor:"name"},
        {Header:"Email",accessor:"email"},
        {Header:"Balance",accessor:"balance"},
        {Header:"Edit",id:"Edit",accessor:"edit",
          Cell:props=>(
            <button className='editBtn' onClick={()=>handleUpdate(props.cell.row.original)}>Edit</button>
          )
        },
        {Header:"Delete",id:"Delete",accessor:"delete",
          Cell:props=>(
            <button className='deleteBtn' onClick={()=>handleDelete(props.cell.row.original)}>Delete</button>
          )
        },
    ],[]);
     
    const [customers,setCustomers]= useState([]);
    const data = React.useMemo(()=>customers,[]);
    const[isModalOpen,setIsModalOpen]=useState(false);
    const {getTableProps,getTableBodyProps,state,headerGroups,page,prepareRow,setGlobalFilter,pageCount,nextPage,previousPage,canPreviousPage,canNextPage,gotoPage}  = useTable({columns,data:customers,initialState:{pageSize:3}},useGlobalFilter,useSortBy,usePagination)
    const [customerData,setcustomerData]=useState({name:"",email:"",balance:""});
    const [errorMsg,setErrorMsg]=useState("");

    const {globalFilter,pageIndex}=state;

const openPopup=()=>{
  setIsModalOpen(true);
}

const handleUpdate=(customer)=>{
setcustomerData(customer);
openPopup();
}

const handleDelete=async(customer)=>{
  const isConfirmed = window.confirm("Are you sure you want to Delete");
  if(isConfirmed){
    await axios.delete(`http://localhost:8081/customers/${customer.customerId}`).then((res)=>{
        console.log(res.data);
      });
  }
  window.location.reload();
}


const closePopup=()=>{
  setIsModalOpen(false);
  setcustomerData({name:"",email:"",balance:""})
  setErrorMsg("")
  getAllCustomers();
}
    const getAllCustomers=()=>{
      axios.get("http://localhost:8081/customers").then((res)=>{
        console.log(res.data);
        setCustomers(res.data);
      });
    }
    const handleSubmit=async(e)=>{
      e.preventDefault();
      let errMsg="";
      if(!customerData.name || !customerData.email || !customerData.balance){
          errMsg="All fields are Required";
          setErrorMsg(errMsg);
      }
      if((errMsg.length===0) && customerData.customerId){
        await axios.patch(`http://localhost:8081/customers/${customerData.customerId}`,customerData).then((res)=>{
        console.log(res.data);
      });
      }else if(errMsg.length===0){
        await axios.post("http://localhost:8081/Addcustomers",customerData).then((res)=>{
        console.log(res.data);
      });
      }
      if(errMsg.length===0){
        closePopup();
      }
      
    }

    const setCustomer=(e)=>{
      setcustomerData({...customerData,[e.target.name]:e.target.value});
    }

  React.useEffect(()=>{
    getAllCustomers();
  },[]);

  return (
    <>
    <div className='main-container'>
      <h3>Full Stack with React JS, SpringBoot & MySQL</h3>
      <div className='search-panel'>
        <input  className='searchinput' value={globalFilter || ""} onChange={(e)=>setGlobalFilter(e.target.value)}  type='search' placeholder='Search Customer here' name='inputsearch' id='inputsearch'/>
        <button className='addBtn' onClick={openPopup}>Add</button>
      </div>

      {isModalOpen && <div className='addPopup'>
        <span className='closeBtn' onClick={closePopup}>&times;</span>
        <h4>Customer Details</h4>
        {errorMsg && <span className='err'>{errorMsg}</span>}
        <div className='popupdiv'>
          <label htmlFor='name'>Name</label>
          <br></br>
          <input className='popupinput' value={customerData.name} onChange={setCustomer} type='text' name='name' id='name'/>
        </div>

        <div className='popupdiv'>
          <label htmlFor='name'>Email</label>
          <br></br>
          <input className='popupinput' value={customerData.email} onChange={setCustomer} type='text' name='email' id='email'/>
        </div>

        <div className='popupdiv'>
          <label htmlFor='name'>Balance</label>
          <br></br>
          <input className='popupinput' value={customerData.balance} onChange={setCustomer} type='text' name='balance' id='balance'/>
          <br />
          <button className='addCustomer' onClick={handleSubmit}>{customerData.customerId?"Update Customer":"Add Customer"}</button>
        </div>
      </div>}

      <table className='table' {...getTableProps()}>
        <thead>
        {headerGroups.map((hg)=>(
          <tr {...hg.getHeaderGroupProps()} key={hg.id}>
            { hg.headers.map((column)=>(
              <th {...column.getHeaderProps(column.getSortByToggleProps())} key={column.id}> {column.render("Header")}
              {column.isSorted && <span>{column.isSortedDesc?"down arrow":"up arrow"}</span>}
              </th>
            ))}
          </tr> 
        ))}
        </thead>
        <tbody {...getTableBodyProps()}>
        {page.map(row=>{
          prepareRow(row);
          return (
              <tr {...row.getRowProps()} key={row.id}>
               {row.cells.map((cell)=>(
                <td{...cell.getCellProps()} key={cell.id} >{cell.render("Cell")}</td>
               ))} 

          </tr>)
        })}
        </tbody>
      </table>

      <div className='paginationdev'>
          <button disabled={!canPreviousPage} onClick={()=>gotoPage(0)} className='pagBtn'>First</button>
          <button disabled={!canPreviousPage} className='pagBtn'  onClick={previousPage}>Prev</button>
          <span className='pageidx'> {pageIndex+1} of {pageCount}</span>
          <button disabled={!canNextPage} className='pagBtn'  onClick={nextPage}>Next</button>
          <button disabled={!canNextPage}  onClick={()=>gotoPage(pageCount-1)} className='pagBtn'>Last</button>
      </div>
      </div>
    </>
  )
}

export default App
