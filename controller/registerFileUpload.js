const fs = require('fs');
const path = require('path');

function registerFileUpload(req, res, next)
{
    let file = req.file;

    if(file!=undefined)
    {
        let acceptabType = [ 'image/jpeg', 'image/png' ];
    
        if(acceptabType.includes(file.mimetype))
        {
            let filename = Date.now() + path.extname(file.originalname);
            let filepath = path.join(__dirname, '../uploads', filename);

            fs.writeFileSync(filepath, file.buffer);

            req.validate.image = filename;
        }
        else
        {
            res.render('./register', { error : "Image should be in jpeg, jpg, png format" });
        }
    }
    else
    {
        res.render('./register', { error : "Image is required" });
    }
    next();
}

module.exports = registerFileUpload;