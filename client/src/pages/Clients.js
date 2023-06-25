import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const Clients = () => {
  const [clients, setClients] = useState([]);
  const [selectedClientID, setSelectedClientID] = useState(null);
  const [selectedRole, setSelectedRole] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [editedClient, setEditedClient] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: ""
  });
  

  useEffect(() => {
    fetchData();
  }, []);

  // fetching data from the database 
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/Api/v1/getallclient"
      );
      setClients(response.data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  // handleDelete function 

  const handleDelete = async (clientId) => {

    console.log(clientId)
    try {
      const result = await axios.delete(
        `http://localhost:5000/Api/v1/delclient/${clientId}`
        
      );
      if (result) {
        fetchData();
      }
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  };

  // handleView function 

  const handleView = (clientId) => {
    setSelectedClientID(clientId);
  };


  // handleEdit dunction 
  const handleEdit = (clientId) => {
    const selectedClient = clients.find((client) => client._id === clientId);
    if (selectedClient) {
      setEditedClient({
        name: selectedClient.name,
        email: selectedClient.email,
        password: selectedClient.password,
        phone: selectedClient.phone,
        address: selectedClient.address
      });
      setSelectedClientID(clientId);
    }
  };
  
  // handleUpdate function 

  const handleUpdate = async () => {
    try {

      console.log(editedClient); // Access the editedClient state
      // Perform the update using Axios
      let abc = await axios.put(`http://localhost:5000/Api/v1/update/${selectedClientID}`, editedClient);
  
      // Update successful
      console.log('Update successful');
      if(abc){
        fetchData()
      }
    } catch (error) {
      console.error('Error updating client:', error);
    }
  };

  // useEffect(()=>{
  //   handleUpdate()
  // })


  // Searching functionality 

  const filteredClients = clients.filter((client) => {
    const clientName = client.name.toLowerCase();
    const clientEmail = client.email.toLowerCase();
    const clientPhone = client.phone.toLowerCase();
    const query = searchQuery.toLowerCase();

    return (
      clientName.includes(query) ||
      clientEmail.includes(query) ||
      clientPhone.includes(query)
    );
  });

  return (
    <>
      <div className="container mt-4">
        <div className="row shadow-lg py-4 rounded d-flex justify-content-between">
          <div className="col">
            <div className="d-flex justify-content-between">
              <h5 className="fw-bold text-secondary">Total Clients</h5>
              <Link className="btn bg-button text-light border-0  text-decoration-none" to={"/AddNewClient"} >Add new client</Link>
            </div>
            <hr />
          </div>
        </div>

        <div className="row justify-content-between mt-2 bg-white rounded shadow-lg py-3">
          <div className="col-lg-8 mt-1">
            <label htmlFor="filter"> Search here </label>
            <input type="text" name="search" className="form-control" placeholder="Search client..." value={searchQuery}  onChange={(e) => setSearchQuery(e.target.value)}/>
          </div>

          <div className="col-lg-4">
            <label htmlFor="filter"> Filter: </label>
            <select name="filter" className="form-select mt-1" value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} >
              <option value="All">All</option>
              <option value="Client">Agents</option>
              <option value="User">Users</option>
            </select>
          </div>
        </div>

        {filteredClients.length === 0 ? (
          <div className="row mt-3">
            <div className="col text-center text-secondary"> No users found.</div>
          </div>
        ) : (
          <div className="row shadow-lg p-3 my-2 bg-body rounded">
            <div className="col">
              <div className="table-responsive">
                <table className="table mt-2">
                  <thead className="table bg-secondary text-light">
                    <tr>
                      <th className="bg-primary text-center">Sr</th>
                      <th className="text-center">Name</th>
                      <th className="text-center">Email</th>
                      <th className="text-center">Phone</th>
                      <th className="text-center">Role</th>
                      <th colSpan={3} className="bg-primary text-center">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredClients.map((client, index) => {
                      if (
                        selectedRole === "All" ||
                        client.role.toLowerCase() === selectedRole.toLowerCase()
                      ) {
                        if (
                          client.role === "user" ||
                          client.role === "client"
                        ) {
                          return (
                            <tr key={index}>
                              <td className="text-secondary text-center">
                                {index}
                              </td>
                              <td className="text-center text-capitalize">
                                {client.name}
                              </td>
                              <td className="text-center">{client.email}</td>
                              <td className="text-center">{client.phone}</td>
                              <td className="text-center">{client.role}</td>
                              <td className="text-center">
                                <button className="border-0 bg-light text-info" data-bs-toggle="modal" data-bs-target="#editModal" 
                                onClick={() => handleEdit(client._id)}
                                >
                                  <i className="fa-solid fa-pen-to-square "></i>
                                </button>
                              </td>
                              <td className="text-center">
                                <button
                                  className="border-0 bg-light text-success"
                                  data-bs-toggle="modal"
                                  data-bs-target="#viewClient"
                                  onClick={() => handleView(client._id)}
                                >
                                  <i className="fa-solid fa-eye"></i>
                                </button>
                              </td>
                              <td className="text-center">
                                <button
                                  className="border-0 bg-light text-danger"
                                  onClick={() => handleDelete(client._id)}
                                >
                                  <i className="fa-solid fa-trash"></i>
                                </button>
                              </td>
                            </tr>
                          );
                        }
                      }
                      return null; // Skip rendering if the role is not 'user' or 'client'
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* View Modal */}
      <div
        className="modal fade"
        id="viewClient"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-secondary">
              <h5
                className="modal-title fw-bold text-white text-uppercase"
                id="exampleModalLabel"
              >
                Client Details
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              {clients.map((client) => {
                if (client._id === selectedClientID) {
                  return (
                    <>
                      <div className="userDetail m-4">
                        <h5 className="fw-bold text-primary">
                          Name{" "}
                          <span className="text-secondary mx-3">
                            {client.name}
                          </span>
                        </h5>
                        <p className="fw-bold text-primary">
                          Email:{" "}
                          <span className="text-secondary mx-3">
                            {client.email}
                          </span>
                        </p>
                        <p className="fw-bold text-primary">
                          Phone:{" "}
                          <span className="text-secondary mx-3">
                            {" "}
                            {client.phone}
                          </span>
                        </p>
                        <p className="fw-bold text-primary">
                          Role:{" "}
                          <span className="text-secondary mx-3">
                            {" "}
                            {client.role}
                          </span>
                        </p>
                        <p className="fw-bold text-primary">
                          Address:{" "}
                          <span className="text-secondary mx-3">
                            {" "}
                            {client.address}
                          </span>
                        </p>
                      </div>
                    </>
                  );
                }
                return null;
              })}
            </div>
            <div className="modal-footer text-start">
              <div className="container-fluid">
                <div className="row">
                  <div className="col">
                    <button type="button" className="btn bg-button text-white w-100" data-bs-dismiss="modal"> Close </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <div className="modal fade" id="editModal" tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-secondary">
              <h5
                className="modal-title text-white text-uppercase fw-bold"
                id="exampleModalLabel"
              >
                Update User 
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
            {clients.map((client) => {
              if (client._id === selectedClientID) {
                return (
                  <>
                    <div>
                    <input
                        type="text"
                        placeholder="Enter your name..."
                        className="form-control"
                        value={editedClient.name}
                        onChange={(e) =>
                          setEditedClient({ ...editedClient, name: e.target.value })
                        }
                        required
                      />

                      <input
                        type="email"
                        placeholder="Enter your email..."
                        className="form-control mt-3"
                        value={editedClient.email}
                        onChange={(e) =>
                          setEditedClient({ ...editedClient, email: e.target.value })
                        }
                        required
                      />

                      <input
                        type="password"
                        placeholder="Enter your password..."
                        className="form-control mt-3"
                        value={editedClient.password}
                        onChange={(e) =>
                          setEditedClient({ ...editedClient, password: e.target.value })
                        }
                        required
                      />

                      <input
                        type="number"
                        placeholder="Enter your phone number..."
                        className="form-control mt-3"
                        value={editedClient.phone}
                        onChange={(e) =>
                          setEditedClient({ ...editedClient, phone: e.target.value })
                        }
                        required
                      />

                      <textarea
                        name=""
                        id=""
                        cols="47"
                        rows="3"
                        placeholder="Address..."
                        className="form-control mt-3"
                        value={editedClient.address}
                        onChange={(e) =>
                          setEditedClient({ ...editedClient, address: e.target.value })
                        }
                        required
                      ></textarea>

                    </div>
                  </>
                );
              }
              return null;
            })}
            </div>
            <div className="modal-footer">
              <div className="container-fluid">
                <div className="row">
                  <div className="col">
                    <button
                      type="button"
                      className="btn bg-button text-white w-100"
                      data-bs-dismiss="modal"

                      onClick={()=> handleUpdate()}
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

export default Clients;
