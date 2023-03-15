import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import InputGroup from '../component/InputGroup'
import Swal from 'sweetalert2'

function EditUser() {
   const [form, setForm] = useState({});
  const {id} = useParams();
  const navigate = useNavigate()
  const [errors, setErrors] = useState({});

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    
  };

  const onSubmitHandler = (e)=>{
    e.preventDefault();
    axios.put(`http://localhost:8000/api/v2/users/${id}`, form)
    .then(res=>{
      setTimeout(() => {
          Swal.fire({
  icon: 'success',
  
  text: 'sua thanh cong',
  
})
 navigate('/')     }, 2000)
      
      
    })
    .catch(err=>setErrors(err.response.data))
    
  }

  useEffect( () => {
     axios.get(`http://localhost:8000/api/v2/users/${id}`).then((res) => {
      setForm(res.data);
    });
  }, []);
  return (
    <div className="container mt-4 col-12 col-lg-4">
        <form onSubmit={onSubmitHandler}>
          <InputGroup
            label="Email"
            type="text"
            name="Email"
            onChangeHandler={onChangeHandler}
            errors={errors.Email}
            value={form.Email}
          />
          <InputGroup
            label="Lastname"
            type="text"
            name="Lastname"
            onChangeHandler={onChangeHandler}
            errors={errors.Lastname}
            value={form.Lastname}
          />
          <InputGroup
            label="Firstname"
            type="text"
            name="Firstname"
            onChangeHandler={onChangeHandler}
            errors={errors.Firstname}
            value={form.Firstname}
          />
          <InputGroup
            label="Age"
            type="text"
            name="Age"
            onChangeHandler={onChangeHandler}
            errors={errors.Age}
            value={form.Age}
          />
          <button className="btn btn-primary" type="submit">Add user</button>
        </form>
      </div>
  )
}

export default EditUser
