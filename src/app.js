const express           = require('express');
const cors              = require('cors');
const logger            = require('morgan');
const fileUpload        = require('express-fileupload');

const upload           = require('../routes/upload');
const contact           = require('../routes/contact');

const app       = express();


app.use(cors());
app.use(fileUpload());


app.use('/images', express.static(__dirname + '/../document'));

app.use('/api', upload);
app.use('/api', contact);


app.use(logger('dev'))


app.get('/',(req,res)=>{
    res.status(200).send('prosper rest api')
})


module.exports = app
