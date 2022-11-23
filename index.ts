import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import FinnhubAPI from "@stoqey/finnhub";
import { TypedRequestBody } from "./util/type";
import * as dotenv from "dotenv";

// env config
dotenv.config();

const port = process.env.PORT;

var whitelist = [process.env.PATH_INC_APP_URL];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

const app = express();
const finnhubAPI = new FinnhubAPI(process.env.FINNHUB_API_KEY);

// config cors
app.use(cors(corsOptions));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// api
app.post(
  "/api/v1/quote",
  async (req: TypedRequestBody<{ symbol: string }>, res: Response) => {
    const { symbol } = req.body;

    const quote = await finnhubAPI.getQuote(symbol);

    res.status(200).send(quote);
  }
);

// run app
app.listen(port, () =>
  console.log(`Path inc backend endpoint is running on port ${port}`)
);
