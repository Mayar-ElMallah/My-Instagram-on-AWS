"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function ful_filled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(ful_filled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __import_Default = (this && this.__import_Default) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express1 = __import_Default(require("express"));
const bodyParser_1 = __import_Default(require("body-parser"));
const util1 = require("./util/util");
(() => __awaiter(this, void 0, void 0, function* () {
    // Init the Express application
    const application = express1.default();
    // Set the network port
    const port = process.env.PORT || 8082;
    // Use the body parser middleware for post requests
    application.use(bodyparser_1.default.json());
    // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
    // GET /filteredimage?image_url={{URL}}
    // endpoint to filter an image from a public url.
    // IT SHOULD
    //    1. validate the image_url query
    //    2. call filterImageFromURL(image_url) to filter the image
    //    3. send the resulting file in the response
    //    4. deletes any files on the server on finish of the response
    // QUERY PARAMATERS
    //    image_url: URL of a publicly accessible image
    // RETURNS
    //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]
    /**************************************************************************** */
    application.get("/filteredImage", (req: express.Request, res: express.Response) => __awaiter(this, void 0, void 0, function* () {
        const image_Url = req.query.image_url;
        if (image_Url) {
            util1.filter_Image_From_URL(image_Url).then((response) => {
                res.sendFile(response);
                res.on("finished", function () {
                    util1.delete_Local_Files([response]);
                });
            });
        }
        else {
            res.status(404).send("The Image url is not found, Please provide a valid url");
        }
    }));
    //! END @TODO1
    // Root Endpoint
    // Displays a simple message to the user
    application.get("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
        res.send("try GET /filteredimage?image_url={{}}");
    }));
    // Start the Server
    application.listen(port, () => {
        console.log(`server running http://localhost:${port}`);
        console.log(`press CTRL+C to stop server`);
    });
}))();
//# sourceMappingURL=server.js.map
