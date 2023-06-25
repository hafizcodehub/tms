import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AssignedTicket = () => {
  const auth = localStorage.getItem("user");
  const user = JSON.parse(auth);
  const role = user.role;

  const [tickets, setTickets] = useState([]);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/Api/v1/getallTickets");
      setTickets(response.data);

      const response1 = await axios.get("http://localhost:5000/Api/v1/getallclient");
      setClients(response1.data);
    } catch (error) {
      console.error("Error fetching Tickets:", error);
    }
  };

  const filteredTickets = role === "client"
    ? tickets.filter((ticket) => {
        const assignedAgent = ticket.assignedAgent;
        const client = clients.find((client) => client.name === assignedAgent && client.name === user.name);
        return client !== undefined;
      })
    : tickets;

  return (
    <>
      <div className="container my-5">
        <div className="shadow-lg">
          <h2 className="text-center text-uppercase fw-bold my-3 py-4">Assigned Tickets</h2>
        </div>
        <hr />
        <div className="row d-flex justify-content-center">
          {filteredTickets.length === 0 ? (
              <div className='shadow-lg p-3 bg-light'>
            <p className="text-center text-danger mt-2">No data found.</p>
              </div>
            ) : (
            filteredTickets.map((ticket) => (
              <div className="col-lg-3" key={ticket.id}>
                <div className="card shadow-lg p-3 mt-3">
                  <h5 className='text-secondary text-uppercase fw-bold'>Username: <span className='text-dark'>{ticket.username}</span>  </h5> <hr />
                  <p className='text-secondary  fw-bold'>User Email: <span className='text-dark mx-3'>{ticket.useremail}</span></p>
                  <p className='text-secondary  fw-bold'>Subject: <span className='text-dark text-capitalize mx-3'>{ticket.subject}</span></p>
                  <p className='text-secondary  fw-bold'>Message: <br /><span className='text-dark text-capitalize'>{ticket.message}</span></p>
                  <hr />
                  <p className='text-secondary  fw-bold'>Status: <span className='text-dark text-capitalize'>{ticket.status}</span></p>
                  <p className='text-secondary  fw-bold'>Assigned Agent: <span className='text-dark text-capitalize'>{ticket.assignedAgent}</span></p>

                 {role === "client" ? <Link className='btn bg-button text-light text-uppercase fw-bold' to="/room">Start Meeting</Link> : null }
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default AssignedTicket;
