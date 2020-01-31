var nodemailer = require('nodemailer');
require('dotenv').config();

module.exports = {
    post : (req, res) => {
        let data = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            companyname:req.body.companyname,
            emailaddress:req.body.email,
            phonenumber:req.body.phonenumber,
            message: req.body.message,
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
                            user: 'prosperventura@gmail.com',
                            pass: 'Prosper123!'
                       }
                });
                const mailOptions = {
                    from: 'Prosper Contact" prosperventura@gmail.com', // sender address
                    to: 'prosperventura@gmail.com', // list of receivers
                    subject: 'Contact Form', // Subject line
                    html:   `
                            <h4>First Name :</h4>
                            <p style="margin:0;">${req.body.firstname}</p> <br/>
                            <h4>Last Name :</h4>
                            <p style="margin:0;">${req.body.lastname}</p> <br/>
                            <h4>Email :</h4>
                            <p style="margin:0;">${req.body.email}</p> <br/>
                            <h4>Company Name :</h4>
                            <p style="margin:0;">${req.body.companyname}</p> <br/>
                            <h4>Phone Number :</h4>
                            <p style="margin:0;">${req.body.phonenumber}</p> <br/>
                            <h4>Message :</h4>
                            <p>${req.body.message}</p>
                            `,
                };
                transporter.sendMail(mailOptions, function (err, info) {
                    if(err){
                        res.send(err)
                    }else {
                        res.send(info)
                    }
                    res.status(201).send(err,info)
                });

                const mailOptions2 = {
                    from: 'Prosper Contact" prosperventura@gmail.com', // sender address
                    to: req.body.email, // list of receivers
                    subject: 'Contact Form', // Subject line
                    html:   `
                            <h1>Terima kasih telah menghubungi kami</h1>
                            `,
                };

                transporter.sendMail(mailOptions2, function (err, info) {
                    if(err){
                        res.send(err)
                    }else {
                        res.send(info)
                    }
                    res.status(201).send(err,info)
                });

            }
        })

    },
}