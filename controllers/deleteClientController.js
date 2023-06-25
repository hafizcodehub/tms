const userSchema = require('../Model/userSchema');

const deleteClientController = async (req, res) => {
    
  const clientId = req.params.id; 

  try {
    const deletedClient = await userSchema.deleteOne({_id:clientId});
    
    if (!deletedClient) {
      return res.status(404).json({ error: 'Client not found' });
    }
    
    return res.status(200).json({ message: 'Client deleted successfully' });
  } catch (error) {
    console.error('Error deleting client:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};

module.exports = deleteClientController;
