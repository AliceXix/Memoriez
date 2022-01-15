const mongoose: any = require("mongoose");

import MONGO_URI from "../utils/index";

mongoose
  .connect(MONGO_URI)
  .then((x: any) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err: unknown) => {
    console.error("Error connecting to mongo: ", err);
  });

  export default mongoose