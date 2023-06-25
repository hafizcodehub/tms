import axios from 'axios';
import React, { useEffect, useState } from 'react';


const Pending = () => {
  const [tickets, setTickets] = useState([]);
  const [clients, setClients] = useState([]);


  const [assignTo, setAssignTo] = useState('');
  const [changedStatus, setChangedStatus] = useState('');

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

  const assignClient = async (ticketId) => {
    try {
      const response = await axios.put(`http://localhost:5000/Api/v1/assignClient/${ticketId}`, {
        assignedAgent: assignTo,
        status: changedStatus
      });

      setTickets(tickets.map(ticket => {
        if (ticket._id === ticketId) {
          return {
            ...ticket,
            assignedAgent: response.data.assignedTo,
            status: response.data.status
          };
        }
        return ticket;
      }));
    } catch (error) {
      console.error("Error assigning client:", error);
    }
  };

  const pendingTickets = tickets.filter(ticket => ticket.status === 'pending');

  return (
    <>
      <div className="container mt-5">
        <div className="shadow-lg">
          <h2 className="text-center text-uppercase fw-bold my-3 py-4">Pending Tickets</h2>
        </div>
        <hr />

        {pendingTickets.length === 0 ? (
          <div className="text-center shadow-lg p-3 text-danger">No pending request ticket.</div>
        ) : (
          <div className="table-responsive shadow-lg">
            <table className="table mt-2">
              <thead className="table bg-secondary text-light">
                <tr>
                  <th className="bg-primary text-center">Sr</th>
                  <th className="text-center">username</th>
                  <th className="text-center">useremail</th>
                  <th className="text-center">Subject</th>
                  <th className="text-center">Assigned To</th>
                  <th className="text-center">Status</th>
                  <th colSpan={3} className="bg-primary text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {pendingTickets.map((ticket, index) => (
                  <tr key={ticket._id}>
                    <td className="text-secondary text-center">{index + 1}</td>
                    <td className="text-center text-capitalize">{ticket.username}</td>
                    <td className="text-center">{ticket.useremail}</td>
                    <td className="text-center">{ticket.subject}</td>
                    <td className="text-center">
                      <select className="form-select form-select-sm" onChange={(e) => setAssignTo(e.target.value)}>
                        <option value="">Select Assignee</option>
                        {clients.map((client) => {
                          if (client.role === 'client') {
                            return (
                              <option key={client.id}>{client.name}</option>
                            );
                          }
                          return null;
                        })}
                      </select>
                    </td>
                    <td>
                      <select className="form-select form-select-sm" onChange={(e) => setChangedStatus(e.target.value)}>
                        <option value={ticket.status}>{ticket.status}</option>
                        <option value="in progress">in progress</option>
                        <option value="closed">closed</option>
                      </select>
                    </td>
                    <td>
                      <div className="d-grid">
                        <button className="btn bg-primary text-light" onClick={() => assignClient(ticket._id)}>
                          Assign
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
    </>
  );
};

export default Pending;
