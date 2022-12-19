"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initGit = void 0;
const child_process_1 = require("child_process");
const debug_1 = __importDefault(require("debug"));
const d = (0, debug_1.default)('electron-forge:init:git');
const initGit = async (dir) => {
    await new Promise((resolve, reject) => {
        (0, child_process_1.exec)('git rev-parse --show-toplevel', {
            cwd: dir,
        }, (err) => {
            if (err) {
                // not run within a Git repository
                d('executing "git init" in directory:', dir);
                (0, child_process_1.exec)('git init', { cwd: dir }, (initErr) => (initErr ? reject(initErr) : resolve()));
            }
            else {
                d('.git directory already exists, skipping git initialization');
                resolve();
            }
        });
    });
};
exports.initGit = initGit;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pdC1naXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBpL2luaXQtc2NyaXB0cy9pbml0LWdpdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxpREFBcUM7QUFFckMsa0RBQTBCO0FBRTFCLE1BQU0sQ0FBQyxHQUFHLElBQUEsZUFBSyxFQUFDLHlCQUF5QixDQUFDLENBQUM7QUFFcEMsTUFBTSxPQUFPLEdBQUcsS0FBSyxFQUFFLEdBQVcsRUFBaUIsRUFBRTtJQUMxRCxNQUFNLElBQUksT0FBTyxDQUFPLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQzFDLElBQUEsb0JBQUksRUFDRiwrQkFBK0IsRUFDL0I7WUFDRSxHQUFHLEVBQUUsR0FBRztTQUNULEVBQ0QsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUNOLElBQUksR0FBRyxFQUFFO2dCQUNQLGtDQUFrQztnQkFDbEMsQ0FBQyxDQUFDLG9DQUFvQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUM3QyxJQUFBLG9CQUFJLEVBQUMsVUFBVSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDdEY7aUJBQU07Z0JBQ0wsQ0FBQyxDQUFDLDREQUE0RCxDQUFDLENBQUM7Z0JBQ2hFLE9BQU8sRUFBRSxDQUFDO2FBQ1g7UUFDSCxDQUFDLENBQ0YsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDO0FBbkJXLFFBQUEsT0FBTyxXQW1CbEIifQ==