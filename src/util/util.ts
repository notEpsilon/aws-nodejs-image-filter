import fs from "fs";
import path from "path";
import sharp from "sharp";
import Jimp = require("jimp");
import rimraf from "rimraf";

// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file
export async function filterImageFromURL(inputURL: string): Promise<string> {
  return await new Promise((resolve, reject) => {
    (async () => {
      const photo = await Jimp.read(inputURL);
      const id = Math.floor(Math.random() * 2000);
      const outputPath = path.join(__dirname, `filtered.${id}.jpeg`);
      photo
        .resize(256, 256)
        .quality(60)
        .greyscale()
        .write(outputPath, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(outputPath);
          }
        });
    })();
  });
}

// deleteLocalFiles
// helper function to delete files on the local disk
// useful to cleanup after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files
export async function deleteLocalFile(file: string) {
  await new Promise((resolve, reject) => {
    rimraf(file, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(null);
      }
    });
  });
}
