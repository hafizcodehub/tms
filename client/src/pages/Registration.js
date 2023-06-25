import axios from 'axios';
import React, { useState } from 'react'
import { Toaster, toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const Registration = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const Navigate = useNavigate();


    const submitReg = async (e)=>{
        e.preventDefault()
        
        try {
            const response = await axios.post('http://localhost:5000/Api/v1/register', {
              name,
              email,
              password,
              phone,
              address,
            });
      
            if (response.data.Message === 'User successfully created') {
              toast.success('Registration Successfull');
              Navigate('/');
            }
            else if (response.data.Message === 'User already exist') {
              toast.error('User already exists');
            }
      

          } catch (error) {
            toast.error('Registration failed');
          }
        };

  return (
    <>
    <div className="container mt-5">
            <div className="row justify-content-center py-4">
            
            <div className="col-lg-4 shadow-lg bg-secondary">
            <div className="img-wrapper text-center my-4">
                <img src="./images/icon.png" alt="" className='img-fluid mb-5' height={300} width={300}/>
            </div>
            <h3 className='text-center my-2 text-light'>Ticket Management System</h3>
        </div>
                <div className="col-lg-4 bg-light shadow-lg">
                    <div className="myForm my-2 px-4 " >
                        <form >
                            <h3 className='mt-2 mb-4 text-primary'>Registration</h3>
                            <hr />
                            
                            <input type="text" placeholder='Enter your name...' className='form-control'
                                    onChange={(e)=>setName(e.target.value)} value={name} required/>

                            <input type="email" placeholder='Enter your email...' className='form-control mt-3'
                                    onChange={(e)=>setEmail(e.target.value)} value={email} required/>
                                    

                            <input type="password" placeholder='Enter your password...' className='form-control mt-3'
                            onChange={(e)=>setPassword(e.target.value)} value={password} required/>

                            <input type="number" placeholder='Enter your phone number...' className='form-control mt-3'
                            onChange={(e)=>setPhone(e.target.value)} value={phone} required/>

                            <textarea name="" id="" cols="47" rows="3" placeholder='Address...' className='form-control mt-3'
                                    onChange={(e)=>setAddress(e.target.value)} value={address} required></textarea>

                            <div className="d-grid">
                            <button className='btn  mt-4 text-white bg-button' type='submit' onClick={submitReg}>Submit</button>
                            </div>
                        </form>
                        
                        <p className='mt-4'>You have an account?  please  <span>
                            <Link to="/" className='text-secondary text-decoration-none'>Login</Link>
                            </span></p>

                    </div>
                </div>
            </div>
             <Toaster />
        </div>
    </>
  )
}

export default Registration