3. Create an environment variable
Update your development environment with your SENDGRID_API_KEY. Run the following in your shell:

~~~
echo "export SENDGRID_API_KEY='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'" > sendgrid.env
echo "sendgrid.env" >> .gitignore
source ./sendgrid.env
~~~

4. Install the package

~~~
$ npm install --save @sendgrid/mail
~~~

5. Send your first email
The following is the minimum needed code to send an email:

~~~
// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
javascript
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const msg = {
  to: 'test@example.com', // Change to your recipient
  from: 'test@example.com', // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })
~~~

