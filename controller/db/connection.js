const mongoose = require('mongoose');
require('dotenv').config();

let url = process.env.DATABASE_URL;

(async () => {
    try{
        mongoose.set("strictQuery", true);
        await mongoose.connect(url);
        // console.log("Connection done");
    }catch(err){
        return err;
    }
})();
