const nodemailer = require("nodemailer")
const config =  require ("../config.js")
// const bodyEmail = require ("./bodyEmail.js")

const orderEmail =(userDetails,total, orderDetails, )=>{

    const transport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: config.user,
            pass: config.password,
        },
    });
    
    const mailOptions = {
	    to: userDetails.email,
	    subject: "Order confirmation.Thanks for your Purchase at Xolskis Comics",

	    html:bodyEmail
	};
	transport.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log(error);
	        // return res.redirect('/contacts') OJO!!
	    }
	    console.log(`Message sent`);

	});
    


}


module.exports = orderEmail;