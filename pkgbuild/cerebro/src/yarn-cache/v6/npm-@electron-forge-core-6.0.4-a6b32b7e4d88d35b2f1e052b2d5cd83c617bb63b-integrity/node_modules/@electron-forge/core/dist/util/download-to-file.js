"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadToFile = void 0;
const path = __importStar(require("path"));
const fs = __importStar(require("fs-extra"));
const got_1 = __importStar(require("got"));
const progress_1 = __importDefault(require("progress"));
const PROGRESS_BAR_DELAY_IN_SECONDS = 30;
async function downloadToFile(targetFilePath, url) {
    let downloadCompleted = false;
    let bar;
    let progressPercent;
    await fs.mkdirp(path.dirname(targetFilePath));
    const writeStream = fs.createWriteStream(targetFilePath);
    const start = new Date();
    const timeout = setTimeout(() => {
        if (!downloadCompleted) {
            bar = new progress_1.default(`Downloading ${path.basename(url)}: [:bar] :percent ETA: :eta seconds `, {
                curr: progressPercent,
                total: 100,
            });
            // https://github.com/visionmedia/node-progress/issues/159
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            bar.start = start;
        }
    }, PROGRESS_BAR_DELAY_IN_SECONDS * 1000);
    await new Promise((resolve, reject) => {
        const downloadStream = got_1.default.stream(url);
        downloadStream.on('downloadProgress', async (progress) => {
            progressPercent = progress.percent;
            if (bar) {
                bar.update(progress.percent);
            }
        });
        downloadStream.on('error', (error) => {
            if (error instanceof got_1.HTTPError && error.response.statusCode === 404) {
                error.message += ` for ${error.response.url}`;
            }
            if (writeStream.destroy) {
                writeStream.destroy(error);
            }
            reject(error);
        });
        writeStream.on('error', (error) => reject(error));
        writeStream.on('close', () => resolve());
        downloadStream.pipe(writeStream);
    });
    downloadCompleted = true;
    if (timeout) {
        clearTimeout(timeout);
    }
}
exports.downloadToFile = downloadToFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG93bmxvYWQtdG8tZmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsL2Rvd25sb2FkLXRvLWZpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBNkI7QUFFN0IsNkNBQStCO0FBQy9CLDJDQUFxQztBQUNyQyx3REFBbUM7QUFFbkMsTUFBTSw2QkFBNkIsR0FBRyxFQUFFLENBQUM7QUFFbEMsS0FBSyxVQUFVLGNBQWMsQ0FBQyxjQUFzQixFQUFFLEdBQVc7SUFDdEUsSUFBSSxpQkFBaUIsR0FBRyxLQUFLLENBQUM7SUFDOUIsSUFBSSxHQUE0QixDQUFDO0lBQ2pDLElBQUksZUFBdUIsQ0FBQztJQUM1QixNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO0lBQzlDLE1BQU0sV0FBVyxHQUFHLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUV6RCxNQUFNLEtBQUssR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO0lBQ3pCLE1BQU0sT0FBTyxHQUFHLFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDOUIsSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQ3RCLEdBQUcsR0FBRyxJQUFJLGtCQUFXLENBQUMsZUFBZSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxzQ0FBc0MsRUFBRTtnQkFDN0YsSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLEtBQUssRUFBRSxHQUFHO2FBQ1gsQ0FBQyxDQUFDO1lBQ0gsMERBQTBEO1lBQzFELDhEQUE4RDtZQUM3RCxHQUFXLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztTQUM1QjtJQUNILENBQUMsRUFBRSw2QkFBNkIsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUV6QyxNQUFNLElBQUksT0FBTyxDQUFPLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQzFDLE1BQU0sY0FBYyxHQUFHLGFBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdkMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEVBQUU7WUFDdkQsZUFBZSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUM7WUFDbkMsSUFBSSxHQUFHLEVBQUU7Z0JBQ1AsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDOUI7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUNILGNBQWMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDbkMsSUFBSSxLQUFLLFlBQVksZUFBUyxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsVUFBVSxLQUFLLEdBQUcsRUFBRTtnQkFDbkUsS0FBSyxDQUFDLE9BQU8sSUFBSSxRQUFRLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUM7YUFDL0M7WUFDRCxJQUFJLFdBQVcsQ0FBQyxPQUFPLEVBQUU7Z0JBQ3ZCLFdBQVcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDNUI7WUFFRCxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEIsQ0FBQyxDQUFDLENBQUM7UUFDSCxXQUFXLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDbEQsV0FBVyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUV6QyxjQUFjLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ25DLENBQUMsQ0FBQyxDQUFDO0lBRUgsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO0lBQ3pCLElBQUksT0FBTyxFQUFFO1FBQ1gsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ3ZCO0FBQ0gsQ0FBQztBQWhERCx3Q0FnREMifQ==