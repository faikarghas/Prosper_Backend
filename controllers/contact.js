var nodemailer = require('nodemailer');
require('dotenv').config();

module.exports = {
    post : (req, res) => {
        let data = {
            firstname: req.body.data.firstname,
            lastname: req.body.data.lastname,
            companyname:req.body.data.companyname,
            emailaddress:req.body.data.email,
            phonenumber:req.body.data.phonenumber,
            message: req.body.data.message,
        }

        let sql = 'insert into contact_prosper set ?';
        const db = require('../db');
        db.query(sql, data, (err, result) => {
            if(err){
                res.json({success:false,message:'gagal post'})
            } else {
                var transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
					port: 465,
					secure: true,
					pool:true,
                    auth: {
                            user: process.env.UEMAIL,
                            pass:  process.env.PEMAIL
                       }
                });
                const mailOptions = {
                    from: 'Prosper Contact" prosperventura@gmail.com', // sender address
                    to: 'prosperventura@gmail.com', // list of receivers
                    subject: 'Contact Form', // Subject line
                    html:   `
                            <h4>First Name :</h4>
                            <p style="margin:0;">${req.body.data.firstname}</p> <br/>
                            <h4>Last Name :</h4>
                            <p style="margin:0;">${req.body.data.lastname}</p> <br/>
                            <h4>Email :</h4>
                            <p style="margin:0;">${req.body.data.email}</p> <br/>
                            <h4>Company Name :</h4>
                            <p style="margin:0;">${req.body.data.companyname}</p> <br/>
                            <h4>Phone Number :</h4>
                            <p style="margin:0;">${req.body.data.phonenumber}</p> <br/>
                            <h4>Message :</h4>
                            <p>${req.body.data.message}</p>
                            `,
                };
                transporter.sendMail(mailOptions, function (err, info) {
                    if(err){
                        res.status(401).send(err)
                    }else {
                        res.status(201).send(info)
                    }
                });

            }
        })

    },
}