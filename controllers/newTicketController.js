const ticketSchema = require('../Model/ticketSchema')

const newTicketController = async (req, res) =>
{
    try {
        
        const {username, useremail, subject , message,assignedAgent,status } = req.body;

        if (!username) {
            return res.status(400).send("Username is required");
          }
        if (!useremail) {
            return res.status(400).send("Email is required");
          }
        if (!subject) {
            return res.status(400).send("subject is required");
          }
        if (!message) {
            return res.status(400).send("message is required");
          }

       const newTIcket = new ticketSchema({username, useremail, subject , message,assignedAgent,status});
       const savedTicket = await newTIcket.save();
        
       if (savedTicket) {
        return res.status(200).send({Message: "Ticket successfully created"});
      } else {
        return res.status(500).send("There was an error creating the Ticket...!");
      }

    } catch (error) {
        console.log(error.message);
        return res.status(500).send("Internal Server Error");
    }
}

module.exports = newTicketController