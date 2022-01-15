//this is for sending emaail;
//nodemailer
const nodemailer = require("nodemailer");
const {EMAIL, EMAIL_PASSWORD} = process.env;

const smtpGlobalTransport = nodemailer.createTransport({
	host : 'smtpout.secureserver.net', // hostname
	//secureConnection: true, // use SSL
	port : 465, // port for secure SMTP
	connectionTimeout : 30000,
	greetingTimeout : 30000,
	socketTimeout : 30000,
	auth : {
		user : EMAIL,
		pass : EMAIL_PASSWORD
	}
});

//this function will return a promise;
module.exports.sendEmail = (emailObj) => {
    return new Promise((resolve, reject) => {
        smtpGlobalTransport.sendMail(emailObj, (error, response) => {
            if (error) {
                console.log("Global SMTP Outgoing error -> ", error);
                reject({msg : "email failed", error : true, body: error.message});
            } else {
                console.log("message sent");
                resolve({msg : "email sent", error : false, body: response});
            }
        });
    })
}

//to invite user
module.exports.inviteUserEmailTemplate = (to, password) => {
    return {
        subject : 'Welcome to calorie app',
        to,
        from : EMAIL,
        generateTextFromHTML : true,
        bcc : '',
        cc : '',
        html : `Your email ${to} is now registered with calorie app use password ${password} to login into the app. Thank You`
    };
}