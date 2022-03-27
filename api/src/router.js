const { Router } = require('express');
const router = Router();

const multer = require('multer');
const storage = multer.diskStorage({destination: 'api/uploads/', filename: filename})

function filename(req, file, callback) {
    callback(null, file.originalname);
}

function fileFilter(req, file, callback) {
    if(file.mimetype !== 'image/png') {
        req.fileFilter = 'Wrong file type';
        req.fileValidationError = 'Wrong file type'
        callback(null, false, new Error('Wrong file type'));
    } else {
        callback(null, true);
    }
}

const upload = multer({fileFilter: fileFilter, storage: storage});

router.post('/upload',upload.single('photo'), (req, res) => {
    if(req.fileValidationError) {
        res.status(400).json({error: req.fileValidationError});
    } else {
        res.status('201').json({ success: true});
    }
})
module.exports=router;

