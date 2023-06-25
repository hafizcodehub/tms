const express = require("express");
const router = express.Router();

//Users
const regController = require('../controllers/regController');
const loginController = require('../controllers/loginController');
const newClientController = require('../controllers/newClientController');
const allClientController = require('../controllers/allClientController');
const deleteClientController = require('../controllers/deleteClientController');
const updateClientController = require('../controllers/updateClientController');
//Tickets
const newTicketController = require('../controllers/newTicketController');
const allTicketsController = require('../controllers/allTicketsController');
const deleteTicketController = require('../controllers/deleteTicketController');
const assignClientController = require('../controllers/assignClientController');



//User encpoints
router.post("/register", regController);
router.post("/login", loginController);
router.post("/newclient", newClientController);
router.get("/getallclient", allClientController);
router.delete("/delclient/:id", deleteClientController);
router.put("/update/:id", updateClientController);

//Tickets encpoints
router.post("/newTicket", newTicketController);
router.get("/getallTickets", allTicketsController);
router.delete("/delticket/:id", deleteTicketController);
router.put("/assignClient/:id", assignClientController);


module.exports = router;
