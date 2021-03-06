import "reflect-metadata";
import "dotenv/config";
import * as express from 'express'
import * as bodyParser from "body-parser";
import {createConnection, getConnection} from "typeorm";
import {errorHanlder} from "./middleware/error";
import router from "./controller";
import {initializeCronTasks} from "./scripts/cron";


const port = process.env.SERVER_PORT || 5000;
const nodeEnv = process.env.NODE_ENV || 'development';


const main = async () => {
    await createConnection();
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(router);
    app.use(errorHanlder);

    initializeCronTasks();

    return app;
};

main()
    .then(app => {
        app.listen(port, () => {
            console.log(`MYRO server started: port -> ${port}`);
        });
    })
    .catch(async e => {
        await getConnection().close();
        console.error(e);
    });
