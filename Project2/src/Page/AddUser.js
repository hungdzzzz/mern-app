import axios from "axios";
import InputGroup from '../component/InputGroup'
import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

function AddUser() {
 const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
   const navigate = useNavigate()
  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    
  };
const onSubmitHandler = (e)=>{
    e.preventDefault();
    axios.post('http://localhost:8000/api/v2/addusers', form)
    .then(res=>{
      setMessage(res.data.message)
      /* hide form after save */
      setForm({})
      /* hide errors after save */
      setErrors({})
      setShow(true)
      setTimeout(() => {
          Swal.fire({
  icon: 'success',
  
  text: 'dang nhap thanh cong',
  
})
 navigate('/')     }, 1000)
      
    
    })
    .catch(err=>setErrors(err.response.data))
    
  }

  return (
    <div className="row p-4">
     
      <div className="mt-4">
        <h2>Crud Users</h2>
      </div>
      <div className="col-12 col-lg-4">
          <form onSubmit={onSubmitHandler}>
          <InputGroup
            label="Email"
            type="text"
            name="Email"
            onChangeHandler={onChangeHandler}
            errors={errors.Email}
          />
          <InputGroup
            label="Lastname"
            type="text"
            name="Lastname"
            onChangeHandler={onChangeHandler}
            errors={errors.Lastname}
          />
          <InputGroup
            label="Firstname"
            type="text"
            name="Firstname"
            onChangeHandler={onChangeHandler}
            errors={errors.Firstname}
          />
          <InputGroup
            label="Age"
            type="text"
            name="Age"
            onChangeHandler={onChangeHandler}
            errors={errors.Age}
          />
          <button className="btn btn-primary" type="submit">Add user</button>
        </form>
      </div>
      </div>
  )
}

export default AddUser





