import dotenv from "dotenv";
import app from "./app.js";
import connectDb from "./conf/db.js";
dotenv.config();
const port = process.env.PORT || 5000;
connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`App is listening at :: ${port}`);
    });
  })
  .catch((error) => {
    console.log(`Error occur while setting up app :: ${error}`);
  });
