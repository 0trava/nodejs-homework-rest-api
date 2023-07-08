const express = require('express');
const router = express.Router();



const {getAllContacts,
       getContactById,
       addContact,
       updateContact,
       updateStatusContact,
       removeContact} = require("../../controllers/contacts");


const {isValidId, validateBody, authenticate, ctrlWrapper} = require("../../middlewares");
const {schemas} = require("../../models/contact");
const {updateFavoriteSchema, contactAddSchema} = schemas;





router.get('/', authenticate, ctrlWrapper(getAllContacts));

router.get('/:contactId', authenticate, isValidId, ctrlWrapper(getContactById));

router.post('/', authenticate, validateBody(contactAddSchema), ctrlWrapper(addContact));

router.delete('/:contactId', authenticate, isValidId, ctrlWrapper(removeContact));

router.put('/:contactId',  authenticate, isValidId, validateBody(contactAddSchema), ctrlWrapper(updateContact));

router.patch('/:contactId/favorite', authenticate, isValidId, validateBody(updateFavoriteSchema), ctrlWrapper(updateStatusContact));



module.exports = router;
