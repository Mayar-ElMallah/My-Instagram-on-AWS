"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function ful_filled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(ful_filled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const Jimp = require("jimp");
//Filter_Image_From_URL
// Helper function to download, filter, and save image which is filtered locally
// returns the absolute path to the local image
/**************************INPUTS**************/
//    inputURL: string - accesibility of URL to an image file IS PUBLIC
/***************RETURNS********************/
//    an absolute path to a filtered image locally saved file
function filter_Image_FromP_URL(input_URL) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            const image = yield Jimp.read(input_URL);
            const out_path = '/tmp/filtered.' + Math.floor(Math.random() * 2000) + '.jpg';
            yield image
                .resize(256, 256) // resize
                .quality(61) // set JPEG quality
                .greyscale() // set greyscale
                .write(__dirname + out_path, (img) => {
                resolve(__dirname + out_path);
            });
        }));
    });
}
exports.filter_Image_From_URL = filter_Image_From_URL;
/***************DeleteLocalFiles**************?
// Helper function to delete files on the local disk
// useful to cleanup after finishing
/*****************INPUTS*******************/
//    files: Array<string> an array of absolute paths to files
function delete_Local_Files(files) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let file of files) {
            fs_1.default.unlinkSync(file);
        }
    });
}
exports.delete_Local_Files = delete_Local_Files;
//# sourceMappingURL=util.js.map
