import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import Pending from "./Pending";


const Tickets = () => {
  const auth = localStorage.getItem("user");
  const user = JSON.parse(auth);
  const role = user.role;

  const [tickets, setTickets] = useState([]);
  const [clients, setClients] = useState([]);
  const [selectedTicketID, setSelectedTicketID] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");


  const [editUsername, setEditUsername] = useState("");
  const [editUserEmail, setEditUserEmail] = useState("");
  const [editSubject, setEditSubject] = useState("");
  const [editMessage, setEditMessage] = useState("");
  const [editAssignedAgent, setEditAssignedAgent] = useState("");
  const [editStatus, setEditStatus] = useState("");

  const [selectedTicket, setSelectedTicket] = useState({});

  console.log(selectedTicket)

  useEffect(() => {
    fetchData();
  });

  // fetching data from the database
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/Api/v1/getallTickets");
      setTickets(response.data);
  
      const response1 = await axios.get("http://localhost:5000/Api/v1/getallclient");
      setClients(response1.data);
  
      // Retrieve the selected ticket's details
      const selectedTicketResponse = await axios.get(`http://localhost:5000/Api/v1/getTicket/${selectedTicketID}`);
      setSelectedTicket(selectedTicketResponse.data);
    } catch (error) {
      console.error("Error fetching Tickets:", error);
    }
  };
  

  const filteredTickets = role === "admin"
  ? tickets.filter(
      (ticket) =>
        ((selectedFilter === "Progress" && ticket.status === "in progress") ||
          (selectedFilter === "Closed" && ticket.status === "closed") ||
          selectedFilter === "All") &&
        (ticket.status !== "pending") &&
        (ticket.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ticket.useremail.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  : tickets.filter(
      (ticket) =>
        ticket.useremail === user.email &&
        ((selectedFilter === "Progress" && ticket.status === "in progress") ||
          (selectedFilter === "Closed" && ticket.status === "closed") ||
          selectedFilter === "All") &&
        (ticket.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ticket.useremail.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()))
    );



    // handleDelete function 

    const handleDelete = async (ticketId) => {
      try {
        const result = await axios.delete(
          `http://localhost:5000/api/v1/delticket/${ticketId}`
          
        );
        if (result) {
          fetchData();
        }
      } catch (error) {
        console.error("Error deleting Ticket:", error);
      }
    };
  

    // handleView function 

    const handleView = (ticketId) => {
      setSelectedTicketID(ticketId);
      };
    

      const handleEdit = (ticketId) => {
        setSelectedTicketID(ticketId);
      
        // Find the ticket with the matching ticketId
        const selectedTicket = tickets.find((ticket) => ticket._id === ticketId);
      
        // Set the values of the state variables based on the selected ticket
        setEditUsername(selectedTicket.username);
        setEditUserEmail(selectedTicket.useremail);
        setEditSubject(selectedTicket.subject);
        setEditMessage(selectedTicket.message);
        setEditAssignedAgent(selectedTicket.assignedAgent);
        setEditStatus(selectedTicket.status);
      
        setSelectedTicket(selectedTicket);
      };
      
      
      const handleUpdate = async () => {
        try {
          const updatedTicket = {
            assignedAgent: editAssignedAgent,
            status: editStatus
          };
      
          await axios.put(`http://localhost:5000/Api/v1/assignClient/${selectedTicketID}`, updatedTicket);
          fetchData(); // Fetch the updated data from the server
        } catch (error) {
          console.error("Error updating ticket:", error);
        }
      };
      

  return (
    <>


      <div className="container mt-4">
        <div className="row shadow-lg py-4 rounded d-flex justify-content-between">
          <div className="col">
          <div className="d-flex justify-content-between">
          <h5 className="fw-bold text-secondary">Total Tickets</h5>
          {role === "user" ? (
            <Link className="btn bg-button text-light border-0 text-decoration-none" to="/AddNewTicket">
              Add New Tickets
            </Link>
          ) : (
            null
          )}
        </div>
            <hr />
          </div>
        </div>

        <div className="row justify-content-between mt-2 bg-white rounded shadow-lg py-3">
          <div className="col-lg-8 mt-1">
            <label htmlFor="filter"> Search here </label>
            <input
                type="text"
                name="search"
                className="form-control"
                placeholder="Search tickets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

          </div>

          <div className="col-lg-4">
            <label htmlFor="filter"> Filter: </label>
            <select
                name="filter"
                className="form-select mt-1"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Progress">In Progress</option>
                <option value="Closed">Closed</option>
              </select>

          </div>
        </div>

        <div className="row shadow-lg p-3 my-2 bg-body rounded">
          <div className="col">
            {filteredTickets.length === 0 ? (
              <p className="text-center text-danger">No data found.</p>
            ) : (
              <div className="table-responsive">
                <table className="table mt-2">
                  <thead className="table bg-secondary text-light">
                    <tr>
                      <th className="bg-primary text-center">Sr</th>
                      <th className="text-center">username</th>
                      <th className="text-center">Email</th>
                      <th className="text-center">Subject</th>
                      <th className="text-center">Assigned To</th>
                      <th className="text-center">Status</th>
                      <th className="text-center">Meeting</th>
                      <th colSpan={3} className="bg-primary text-center">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTickets.map((ticket, index) => (
                      <tr key={index}>
                        <td className="text-secondary text-center">
                          {index + 1}
                        </td>
                        <td className="text-center text-capitalize">
                          {ticket.username}
                        </td>
                        <td className="text-center ">{ticket.useremail}</td>
                        <td className="text-center">{ticket.subject}</td>
                        <td className="text-center">
                          {ticket.assignedAgent || "Not Assigned Yet"}
                        </td>
                        <td className="text-center">
                          {role === "admin" ? (
                            <p>{ticket.status}</p>
                          ) : (
                            <p>{ticket.status}</p>
                          )}
                        </td>

                        <td className="text-center">
                            {ticket.status === "in progress" ?
                            <Link type="button" className="btn bg-primary text-white w-7" to="/room" data-bs-dismiss="modal"> Join Meeting </Link>
                            :
                            null
                          }
                        </td>
                        <td className="text-center">
                          {role === "admin" ?
                          <button className="border-0 bg-light text-info" >
                          <i className="fa-solid fa-pen-to-square " data-bs-toggle="modal" data-bs-target="#updateTicketModal"
                          onClick={()=> handleEdit(ticket._id)}></i>
                        </button> : null}
                        </td>
                        <td className="text-center">
                          <button className="border-0 bg-light text-success" data-bs-toggle="modal" data-bs-target="#viewTicketModal"
                          onClick={() => handleView(ticket._id)}>
                            <i className="fa-solid fa-eye"></i>
                          </button>

                        </td>
                        <td className="text-center">
                          <button className="border-0 bg-light text-danger" onClick={() => handleDelete(ticket._id)}>
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>


      <div>
            {/* Modal */}
            <div className="modal fade" id="viewTicketModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header bg-secondary">
                    <h5 className="modal-title fw-bold text-white text-uppercase" id="exampleModalLabel">View Ticket</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <div className="modal-body">
                        {tickets.map((ticket)=>
                          {
                            if(ticket._id === selectedTicketID)
                            return (
                              <>
                                <div className="userDetail m-4">
                                <h5 className="fw-bold text-primary">
                                User Name{" "}
                                <span className="text-secondary mx-3">
                                  {ticket.username}
                                </span>
                              </h5>
                              <p className="fw-bold text-primary">
                                User email:{" "}
                                <span className="text-secondary mx-3">
                                  {ticket.useremail}
                                </span>
                              </p>
                              <p className="fw-bold text-primary">
                                Subject:{" "}
                                <span className="text-secondary mx-3">
                                  {ticket.subject}
                                </span>
                              </p>
                              <p className="fw-bold text-primary">
                                Status:{" "}
                                <span className="text-secondary mx-3">
                                  {ticket.status}
                                </span>
                              </p>
                              <p className="fw-bold text-primary">
                                Assigned to:{" "}
                                <span className="text-secondary mx-3">
                                  {ticket.assignedAgent}
                                </span>
                              </p>
                              <p className="fw-bold text-primary">
                                Message:{" "}
                                <span className="text-secondary mx-3">
                                  {ticket.message}
                                </span>
                              </p>


                                </div>
                              </>
                            );
                            return null
                          }
                          
                          )}
                    </div>
                    <div className="modal-footer text-start">
                    <div className="container-fluid">
                        <div className="row">
                        <div className="col">
                            <button type="button" className="btn bg-primary text-white w-100 mt-3" data-bs-dismiss="modal"> Close </button>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
            
              <div className="modal fade" id="updateTicketModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header bg-secondary">
                    <h5 className="modal-title text-light ">Update Tcket</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                  </div>
                  <div className="modal-body">
                      <div className="mb-3">
                        <label htmlFor="editUsername" className="form-label">
                          Username
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="editUsername"
                          value={editUsername}
                          onChange={(e) => setEditUsername(e.target.value)}
                          readOnly
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="editUserEmail" className="form-label">
                          User Email
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="editUserEmail"
                          value={editUserEmail}
                          onChange={(e) => setEditUserEmail(e.target.value)}
                          readOnly
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="editSubject" className="form-label">
                          Subject
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="editSubject"
                          value={editSubject}
                          onChange={(e) => setEditSubject(e.target.value)}
                          readOnly
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="editMessage" className="form-label">
                          Message
                        </label>
                        <textarea
                          className="form-control"
                          id="editMessage"
                          rows="3"
                          value={editMessage}
                          onChange={(e) => setEditMessage(e.target.value)}
                          readOnly
                        ></textarea>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="editAssignedAgent" className="form-label">
                          Assigned Agent
                        </label>
                        <select
                          className="form-select"
                          id="editAssignedAgent"
                          value={editAssignedAgent}
                          onChange={(e) => setEditAssignedAgent(e.target.value)}
                        >
                         {clients.map((client)=>{
                          if(client.role === "client"){
                            return <option>{client.name}</option>
                          }
                          return null;
                         })}
                        </select>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="editStatus" className="form-label">
                          Status
                        </label>
                        <select
                          className="form-select"
                          id="editStatus"
                          value={editStatus}
                          onChange={(e) => setEditStatus(e.target.value)}
                        >
                          <option value="pending">Pending</option>
                          <option value="in progress">In Progress</option>
                          <option value="closed">Closed</option>
                        </select>
                      </div>
                    </div>

                  <div className="modal-footer text-start">
                    <div className="container-fluid">
                        <div className="row">
                        <div className="col">

                        <button
                        type="button"
                        className="btn bg-button text-white w-100"
                        data-bs-dismiss="modal"
                        onClick={handleUpdate}
                      >
                        Update
                      </button>
                      
                      
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
              </div>
            </div>


    </>
  );
};

export default Tickets;
