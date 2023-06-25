const ticketSchema = require('../Model/ticketSchema');

const assignClientController = async (req, res) =>
{

    const { id } = req.params;
    try {
        
        const ticket = await ticketSchema.findById(id);

        if(!ticket)
        {
            return res.status(404).json({error:"user not found"})
        }

        ticket.assignedAgent = req.body.assignedAgent;
        ticket.status = req.body.status;

        const updateTicket = await ticket.save();

        res.send(updateTicket);

    } catch (error) {
        console.log(error)
        res.status(500).json({error : error.message})
    }


}
module.exports = assignClientController