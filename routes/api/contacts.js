const express = require('express');
const router = express.Router();


const {getAllContacts,
       getContactById,
       addContact,
       updateContact,
       updateStatusContact,
       removeContact} = require("../../controllers/contact-controllers");


const {isValidId, validateBody, authenticate} = require("../../middlewares");
const {schemas} = require("../../models/contact");
const {updateFavoriteSchema, contactAddSchema} = schemas;





router.get('/', authenticate, getAllContacts);

router.get('/:contactId', authenticate, isValidId, getContactById);

router.post('/', authenticate, validateBody(contactAddSchema), addContact);

router.delete('/:contactId', authenticate, isValidId, removeContact);

router.put('/:contactId',  authenticate, isValidId, validateBody(contactAddSchema), updateContact);

router.patch('/:contactId/favorite', authenticate, isValidId, validateBody(updateFavoriteSchema), updateStatusContact);



module.exports = router;
