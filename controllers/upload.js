var fs  = require('fs')

module.exports = {
    uploadData : (req, res) => {


        let dir = "./document"
        console.log(req);

        if (req.files !== null) {
            let imageFile = req.files.file;
            let filename = imageFile.name
            let fileNameWithoutSpace = filename.replace(/\s/g, '');
            imageFile.mv(`${__dirname}/../document/${fileNameWithoutSpace}`, function (err) {
                if (err) {
                    return res.status(500).send({success:false,file:req.files,body:req.body});
                } else{
                    return res.status(200).send({success:true,file:req.files.file.name,body:req.body});
                }
            });
        } else {
            return res.status(200).send({success:false,message:'ini files nya null mas'});
        }

        // res.send({file:req.files,body:req.body})


        // if (req.files.file.length !== undefined) {
        //     if (!fs.existsSync()){
        //         // Creates /tmp/a/apple, regardless of whether `/tmp` and /tmp/a exist.
        //         fs.mkdir(dir, { recursive: true }, (err) => {
        //             for (let i = 0; i < req.files.file.length; i++) {    
        //                 let imageFile = req.files.file[i];
        //                 let filename = imageFile.name
        //                 let fileNameWithoutSpace = filename.replace(/\s/g, '');
        //                 imageFile.mv(`${__dirname}/../document/${fileNameWithoutSpace}`, function (err) {
        //                     if (err) {
        //                         return res.status(500).send(err);
        //                     }
        //                 });
        //             }
        //             // if (err) throw err;
        //         });
        //         // fs.mkdirSync(dir);
        //         return res.status(200).send({success:true});
        //     }else {
        //         console.log("Directory already exist");
        //     }
        // } else {
        //     let imageFile = req.files.file;
        //     let filename = imageFile.name
        //     let fileNameWithoutSpace = filename.replace(/\s/g, '');
        //     imageFile.mv(`${__dirname}/../document/${fileNameWithoutSpace}`, function (err) {
        //         if (err) {
        //             return res.status(500).send(err);
        //         } else{
        //             return res.status(200).send({success:true});
        //         }
        //     });
        // }
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