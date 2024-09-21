import { v2 as cloudinary } from 'cloudinary';

import dotenv from 'dotenv';
dotenv.config();


   // Configuration
cloudinary.config({ 
    cloud_name: process.env.Cloud_name, 
    api_key: process.env.API_key, 
    api_secret: process.env.API_secret // Click 'View API Keys' above to copy your API secret
});

export default cloudinary;




