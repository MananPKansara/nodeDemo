const fs = require('fs');
const path = require('path');

function profileFileUpload(req, res, next)
{
    console.log(req.file);
    if(req.file!=undefined)
    {
        let file = req.file;
        let filename = Date.now() + path.extname(file.originalname);
        let filepath = path.join(__dirname, '../uploads', filename);

        console.log("Making file " + req.file);
        // upload file from updated user
        fs.writeFileSync(filepath, file.buffer);

        req.userUpdate.image = filename;
        console.log("New uploaded file " + req.userUpdate.image);
        console.log(req.userUpdate.image);
    }
    next()
}

module.exports = profileFileUpload;