import fs from 'fs';
import Jimp = require('jimp');

// filter_Image_From_URL
// Helper function in order to download, filter, & save the filtered image locally
// return the path to the local image
/*****************INPUTS************************/
//InputURL: string - the accessibility of URL is public to an image file
/*****************Return********************/
// RETURNS: an absolute path to a filtered image locally saved file

export async function filter_Image_From_URL(input_URL: string): Promise<string>{
    return new Promise( async resolve => {
        const image = await Jimp.read(input_URL);
        const out_path = '/tmp/filtered.'+Math.floor(Math.random() * 2000)+'.jpg';
        await image
        .resize(256, 256) // resize
        .quality(61) // set JPEG quality
        .greyscale() // set greyscale
        .write(__dirname+out_path, (img)=>{
            resolve(__dirname+out_path);
        });
    });
}

// delete_Local_Files
// Helper function to delete files on the local device
// useful to clean-up after finishing tasks
/**********************INPUTS****************/
//files: Array<string> an array of paths to files
export async function delete_Local_Files(files:Array<string>){
    for( let file of files) {
        fs.unlinkSync(file);
    }
}
