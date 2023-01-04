"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const assert_1 = __importDefault(require("assert"));
const index_1 = __importDefault(require("./index"));
const puppeteer_core_1 = __importDefault(require("puppeteer-core"));
const main = async () => {
    await index_1.default.initialize(electron_1.app);
    const browser = await index_1.default.connect(electron_1.app, puppeteer_core_1.default);
    const window = new electron_1.BrowserWindow();
    const page = await index_1.default.getPage(browser, window);
    const url = "https://example.com/";
    await window.loadURL(url);
    console.log(page.url());
    assert_1.default.strictEqual(page.url(), url);
    window.destroy();
};
main();
//# sourceMappingURL=test.js.map