const multer = require('multer');

const storage = multer.memoryStorage();

const upload = multer(
    {
        storage: storage,
        //limiting file size by 5Mb
        limits: { fileSize: 5 * 1024 * 1024 },
        //accepting only jpg jpeg png files
        fileFilter: function (req, file, cb) {
            const fileRegex = new RegExp('\.(jpg|jpeg|png)$');
            const fileName = file.originalname;

            if (!fileName.match(fileRegex)) {
                //throw exception
                return cb(new Error('Invalid file type'));
            }
            //pass the file
            cb(null, true);
        }
    })


module.exports = upload;