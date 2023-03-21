const path = require('path');
const fs = require('fs');

function postFileUpload(req, res, next)
{
    let file = req.file;

    if(file!=undefined)
    {
        let acceptabType = [ 'image/jpeg', 'image/png' ];

        if(acceptabType.includes(file.mimetype))
        {
            let filename = Date.now() + path.extname(file.originalname);
            let filepath = path.join(__dirname, '../postUploads', filename);

            fs.writeFileSync(filepath, file.buffer);

            req.post.image = filename;
            next();

        }
        else
        {
            res.render('./createPost', {error : 'Image should be in jpeg, jpg, png format' });
        }
    }
    else
    {
        res.render('./createPost', {error : 'Image is required' });
    }

}

module.exports = postFileUpload;