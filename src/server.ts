import express from 'express';
import bodyParser from 'body-parser';
import { filter_Image_From_URL, delete_Local_Files } from './util/util';
import { reduce } from 'bluebird';

(async () => {

  /*********Init the Express application******/
  const application = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // Use the bodyParserMiddleware for post requests
  application.use(bodyParser.json());

  // IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredImage?image_URL={{URL}}
  // endpoint to filterImage from a public url.
  // IT SHOULD:
  //    1. validate the image_URL query
  //    2. call filter_Image_From_URL(image_url) in order to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server when the respone is finished
  /***************QUERY PARAMATERS***************/
  // Image_url: URL with accessible=public
  /******************RETURNS*********************/
  //the_filtered_image_file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  application.get("/filteredImage", async (req, res) => {

    const image_Url = req.query.image_url;
    if (image_Url) {
      filter_Image_From_URL(image_Url).then((response) => {
        res.sendFile(response);
        res.on("finished", function () {
          delete_Local_Files([response])
        })
      })
    } else {
      res.status(404).send("The Image url is not found, Please provide a valid url");
    }
  })


  //! END @TODO1

  // Root Endpoint


  // Displays a clear message to the user
  application.get("/", async (req, res) => {
    res.send("try GET /filteredimage?image_url={{}}")
  });


  // Start Server
  application.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();
