import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Dashboard = () => {

  const [clients, setClients] = useState([]);
  const [tickets, setTickets] = useState([]);

  const [pendingTickets, setPendingTickets] = useState([]);



  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Getting all clients
      const response = await axios.get("http://localhost:5000/Api/v1/getallclient");
      setClients(response.data);

      // Getting all tickets
      const response1 = await axios.get("http://localhost:5000/Api/v1/getallTickets");
      setTickets(response1.data);

      // Filtering pending tickets
      const pendingTickets = response1.data.filter(ticket => ticket.status === "pending");
      setPendingTickets(pendingTickets);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };


  return (
    <>

    <h1 className='mt-5 text-center text-uppercase text-primary fw-bold'>Welcome</h1>
    <h3 className='mt-4 text-center text-uppercase text-secondary'>Ticket Management System</h3>
      <div className="container my-5 pb-5">
        <div className="row justify-content-center">
            <div className="col-lg-4">
              <Link className="nav-link text-secondary fw-bold" aria-current="page" to="/clients">
                <div className="card border-3 shadow-lg p-3" >
                <h4 className="d-flex justify-content-between">
                <span className='text-secondary'><i class="fa-solid fa-user h1"></i></span>
                
                <span>{clients.length -1}</span>
                </h4>
                <hr />
                <h5 className='text-uppercase'>Total Users</h5>
                </div>
              </Link>
            </div>

            <div className="col-lg-3">
              <Link className="nav-link text-secondary fw-bold" aria-current="page" to="/tickets">
                <div className="card  border-3 shadow-lg p-3" >
                <h4 className="d-flex justify-content-between">
                <span className='text-secondary'><i class="fa-solid fa-ticket h1 "></i></span>
                <span >{tickets.length}</span>
                </h4>
                <hr />
                <h5 className='text-uppercase'>Total Tickets</h5>
                </div>
              </Link>
            </div>

            <div className="col-lg-4">
              <Link className="nav-link text-secondary fw-bold" aria-current="page" to="/pending">
                <div className="card border-3 shadow-lg p-3" >
                <h4 className="d-flex justify-content-between">
                <span ><i class="fa-solid fa-clock h1"></i></span>
                <span> <span className='text-light bg-danger px-3 rounded-circle'>{pendingTickets.length}</span> </span>
                </h4>
                <hr />
                <h5 className='text-uppercase'>Pending Tickets</h5>
                </div>
              </Link>
            </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard