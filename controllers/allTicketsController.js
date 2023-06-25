const ticketSchema = require('../Model/ticketSchema');

const allTicketsController = async (req, res)=>
{
    try {
        const tickets = await ticketSchema.find();

        res.status(200).json(tickets);
    } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
    }
}
module.exports = allTicketsController