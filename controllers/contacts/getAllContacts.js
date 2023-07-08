const { Contact } = require('../../models/contact');


const getAllContacts = async (req, res) => {
    const { _id: owner } = req.user;
  
    // Pagination params and favorite
    const { page = 1, limit = 20, favorite } = req.query;
    const skip = (page - 1) * limit;
  
    const result = await Contact.find(
      favorite ? { owner, favorite } : { owner },
      '-createdAt -updatedAt -owner',
      { skip, limit }).populate('owner', 'email subscription');
  
  
    res.json(result);
  };

  module.exports = getAllContacts;