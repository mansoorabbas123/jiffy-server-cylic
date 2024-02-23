const cloudinary = require('cloudinary').v2;  


cloudinary.config({ 
  // secure:true,
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET,  
});


// delet 
// cloudinary.v2.api
//   .delete_resources(['erxl7bas5hrsyfiwlkvn'], 
//     { type: 'upload', resource_type: 'image' })
//   .then(console.log);

// Function to upload image from buffer to Cloudinary
async function uploadImageToCloudinary(image) {
  return new Promise((resolve,reject) => {
    cloudinary.uploader.upload_stream({ 
      folder: 'jiffy_store' 
    },(error, uploadResult) => {
      if(error) return reject(error);
        return resolve(uploadResult);
    }).end(image.buffer);
})
}

module.exports = {cloudinary,uploadImageToCloudinary};