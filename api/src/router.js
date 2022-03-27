const { Router } = require('express');
const router = Router();
const path = require('path');
const multer = require('multer');
const { sendFile } = require('express/lib/response');

const storage = multer.diskStorage({destination: 'api/uploads/', filename: filename})
const photoPath = path.resolve(__dirname, '../../client/photo-viewer.html');


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

router.get('/photo-viewer', (req, res) => {
    res.sendFile(photoPath);
})
module.exports=router;

