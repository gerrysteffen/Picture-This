"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const PORT = 4000;
const router_1 = __importDefault(require("./router"));
const express_session_1 = __importDefault(require("express-session"));
app.use((0, express_session_1.default)({
    name: "qid",
    secret: "superdupersecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: false,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 365,
    },
}));
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE"],
    credentials: true,
}));
app.use(express_1.default.json({ limit: "50mb" }));
app.use(router_1.default);
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
