"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const typeorm_1 = require("typeorm");
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const tasks_entity_1 = require("./src/tasks/tasks.entity");
const tasks_router_1 = require("./src/tasks/tasks.router");
// Instantiate express app
const app = (0, express_1.default)();
dotenv_1.default.config();
// Parse request body
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: 14918,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [tasks_entity_1.Task],
    synchronize: true,
    ssl: {
        ca: process.env.SSL_CERT,
    },
});
const port = process.env.PORT;
exports.AppDataSource.initialize()
    .then(() => {
    app.listen(port);
    console.log('Data Source has been initialized!');
})
    .catch((err) => {
    console.error('Error during Data Source initialization', err);
});
app.use('/', tasks_router_1.tasksRouter);
