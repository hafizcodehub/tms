import React, { useState } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const Navigate = useNavigate();

  const submitLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/Api/v1/login", {
        email,
        password
      });

      const { role } = response.data.user; // Retrieve the role from the response data

      if (role === "admin") {
        toast.success('Login Successful')
        localStorage.setItem('user', JSON.stringify(response.data.user));
        Navigate('/Dashboard');
      }
       else if (role === "user") {
        toast.success('Login Successful')
        localStorage.setItem('user', JSON.stringify(response.data.user));
        Navigate('/Tickets');
      } 
      else if (role === "client") {
        toast.success('Login Successful');
        localStorage.setItem('user', JSON.stringify(response.data.user));
        Navigate('/AssignedTicket');
      }
    } catch (error) {
      // Handle request errors
      toast.error('Email or password is invalid');
    }
  };

  return (
    <>

        <div className="container mt-5">
            <div className="row justify-content-center  py-4">
                <div className="col-lg-4 shadow-lg bg-secondary">
                    <div className="img-wrapper text-center my-4">
                        <img src="./images/icon.png" alt="" className='img-fluid mb-5' height={300} width={300}/>
                    </div>
                    <h3 className='text-center text-light my-2'>Ticket Management System</h3>

                </div>
                <div className="col-lg-4 bg-light pb-5 shadow-lg">
                    <div className="myForm my-2 px-4 " >
                        <form>
                            <h1 className='mt-5'>WELCOME</h1>
                            <p className='mb-5'>Please login here to discuss your complaint...</p>
                            <input type="email" placeholder='Enter your email...' className='form-control'
                                    onChange={(e)=>setEmail(e.target.value)} value={email} required/>

                            <input type="password" placeholder='Enter your password...' className='form-control mt-3'
                            onChange={(e)=>setPassword(e.target.value)} value={password} required/>

                            


                            <div className="d-grid">
                            <button className='btn mt-5 text-white bg-button' onClick={submitLogin} >Login</button>
                            </div>

                            <p className='mt-4'>You don't have an account?  please  <span>
                            <Link to="/registration" className='text-secondary text-decoration-none'>Register</Link>
                            </span></p>
                        </form>
                    </div>
                </div>
            </div>
            <Toaster />

        </div>
    </>
  )
}

export default Login