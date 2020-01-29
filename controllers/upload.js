var fs  = require('fs')

module.exports = {
    uploadData : (req, res) => {

        if(req.body.submit === false){

        } else {
            let imageFile = req.files.file;
            let filename = imageFile.name
            let fileNameWithoutSpace = filename.replace(/\s/g, '');
            imageFile.mv(`${__dirname}/../document/${fileNameWithoutSpace}`, function (err) {
                if (err) {
                    return res.status(500).send(err);
                }
            });
        }

        if (!fs.existsSync()){

            // Creates /tmp/a/apple, regardless of whether `/tmp` and /tmp/a exist.
            // fs.mkdir(dir, { recursive: true }, (err) => {
            //     let imageFile = req.files.file;
            //     let filename = imageFile.name
            //     let fileNameWithoutSpace = filename.replace(/\s/g, '');
            //     console.log(fileNameWithoutSpace);

            //     imageFile.mv(`${__dirname}/../${dir}/${fileNameWithoutSpace}`, function (err) {
            //         if (err) {
            //             return res.status(500).send(err);
            //         }
            //     });

            //     console.log(err);
            //     // if (err) throw err;
            // });
            // fs.mkdirSync(dir);
        }else {
            console.log("Directory already exist");
        }
        res.json({test:'test'})
    },
    deleteImage : (req, res) => {
        fs.unlink('coba.png', function (err) {
            if (err) throw err;
            // if no error, file has been deleted successfully
            console.log('File deleted!');
        });
    },
    getImage:(req,res) => {
        let sql = `select name from images order by created_at asc`
        const db =require('../db')
        db.query(sql,(err,result)=>{
            res.send(result)
        })
    },
    uploadVideo : (req,res) => {
        let videoFile = req.files.file
        let filename = videoFile.name
        let fileNameWithoutSpace = filename.replace(/\s/g, '');

        imageFile.mv(`${__dirname}/../images/${fileNameWithoutSpace}`, function (err) {
            if (err) {
                return res.status(500).send(err);
            }
        });
    }
}