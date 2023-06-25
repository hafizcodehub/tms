const ticketSchema = require('../Model/ticketSchema');

const deleteTicketController = async (req, res) =>
{
    const ticketId = req.params.id; 

    try {
      const deleteTicket = await ticketSchema.deleteOne({_id:ticketId});
      
      if (!deleteTicket) {
        return res.status(404).json({ error: 'Ticket not found' });
      }
      
      return res.status(200).json({ message: 'Ticket deleted successfully' });
    } catch (error) {
      console.error('Error deleting Ticket:', error);
      return res.status(500).json({ error: 'Server error' });
    }
}

module.exports = deleteTicketController