"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = (0, express_1.default)();
var cors_1 = __importDefault(require("cors"));
var PORT = 4000;
var router_1 = __importDefault(require("./router"));
var express_session_1 = __importDefault(require("express-session"));
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
app.listen(PORT, function () {
    console.log("Server is listening on port ".concat(PORT));
});
