const sgMail = require('@sendgrid/mail');
require("dotenv").config();

const {MAIL_API_KEY} = process.env;

sgMail.setApiKey(MAIL_API_KEY);


const sendEmail = async (data) => {
    const email = {...data, from: "otrava0910@meta.ua"};
    await sgMail.send(email)
            .then(() => {
                console.log('Email sent')
            })
            .catch((error) => {
                console.error(error)
            });
    return true;
};

module.exports = sendEmail;