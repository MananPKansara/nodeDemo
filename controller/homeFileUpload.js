const path = require('path');
const fs = require('fs');

function homeFileUpload(req, res, next)
{
    if(req.file!=undefined)
    {
        let file = req.file;

        let acceptabType = [ 'image/jpeg', 'image/png' ];
            
        if(acceptabType.includes(file.mimetype))
        {
            let filename = Date.now() + path.extname(file.originalname);
            let filepath = path.join(__dirname, './../postUploads', filename);
    
            fs.writeFileSync(filepath, file.buffer);
    
            req.post.image = filename; 
        }
        else
        {
            res.send({error : "Image should be in jpeg, jpg, png format"});
        }

    }else{
        console.log("file absent");
    }
    next(); 
}

module.exports = homeFileUpload;