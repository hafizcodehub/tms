import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';


const AddNewClient = () => {

  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const submitClient = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/Api/v1/newclient", {
        name,
        email,
        password,
        phone,
        address
      });


      if (response.data.message === "Client successfully created") {
        toast.success('Data stored successfully');
        navigate('/clients')
        
        setName('');
        setEmail('');
        setPassword('');
        setPhone('');
        setAddress('');
      }
      
    } catch (error) {
      toast.error('Data not stored');
    }

  };

  return (
    <>
      <div className="container my-5">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-4 border py-3 shadow-lg">
            <h2 className='text-center my-4 fw-bold text-uppercase'>Add new client</h2>
            <hr />

            <input type="text" className='form-control mt-5' placeholder='Name' required
              onChange={(e) => setName(e.target.value)} value={name} />

            <input type="email" className='form-control mt-2' placeholder='Email' required
              onChange={(e) => setEmail(e.target.value)} value={email} />

            <input type="password" className='form-control mt-2' placeholder='Password' required
              onChange={(e) => setPassword(e.target.value)} value={password} />

            <input type="number" className='form-control mt-2' placeholder='Phone' required
              onChange={(e) => setPhone(e.target.value)} value={phone} />

              <textarea name="" id="" cols="47" rows="3" placeholder='Address...' className='form-control mt-3'
              onChange={(e)=>setAddress(e.target.value)} value={address} required></textarea>

              
            <div className="d-grid">
              <button className='btn mt-4 bg-button text-white mt-3 mb-2' type='submit' onClick={submitClient}>Submit</button>
            </div>
          </div>
        </div>
        <Toaster />
      </div>
    </>
  );
};

export default AddNewClient;
