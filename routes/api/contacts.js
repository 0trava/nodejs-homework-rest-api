const express = require('express');
const router = express.Router();


const {getAllContacts,
       getContactById,
       addContact,
       updateContact,
       updateStatusContact,
       removeContact} = require("../../controllers/contact-controllers");


const {isValidId, validateBody} = require("../../middlewares");
const {schemas} = require("../../models/contact");
const {updateFavoriteSchema, contactAddSchema} = schemas;





router.get('/', getAllContacts);

router.get('/:contactId', isValidId, getContactById);

router.post('/', validateBody(contactAddSchema), addContact);

router.delete('/:contactId', isValidId, removeContact);

router.put('/:contactId',  isValidId, validateBody(contactAddSchema), updateContact);

router.patch('/:contactId/favorite', isValidId, validateBody(updateFavoriteSchema), updateStatusContact);



module.exports = router;
