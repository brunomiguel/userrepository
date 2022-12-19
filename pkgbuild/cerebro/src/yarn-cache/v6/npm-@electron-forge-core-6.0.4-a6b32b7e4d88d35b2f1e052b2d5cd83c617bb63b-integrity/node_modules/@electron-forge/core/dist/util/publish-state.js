"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const EXTENSION = '.forge.publish';
class PublishState {
    constructor(filePath, hasHash = true) {
        this.state = {};
        this.dir = path_1.default.dirname(filePath);
        this.path = filePath;
        this.hasHash = hasHash;
    }
    static async loadFromDirectory(directory, rootDir) {
        if (!(await fs_extra_1.default.pathExists(directory))) {
            throw new Error(`Attempted to load publish state from a missing directory: ${directory}`);
        }
        const publishes = [];
        for (const dirName of await fs_extra_1.default.readdir(directory)) {
            const subDir = path_1.default.resolve(directory, dirName);
            const states = [];
            if ((await fs_extra_1.default.stat(subDir)).isDirectory()) {
                const filePaths = (await fs_extra_1.default.readdir(subDir)).filter((fileName) => fileName.endsWith(EXTENSION)).map((fileName) => path_1.default.resolve(subDir, fileName));
                for (const filePath of filePaths) {
                    const state = new PublishState(filePath);
                    await state.load();
                    state.state.artifacts = state.state.artifacts.map((artifactPath) => path_1.default.resolve(rootDir, artifactPath));
                    states.push(state);
                }
            }
            publishes.push(states);
        }
        return publishes;
    }
    static async saveToDirectory(directory, artifacts, rootDir) {
        const id = crypto_1.default.createHash('SHA256').update(JSON.stringify(artifacts)).digest('hex');
        for (const artifact of artifacts) {
            artifact.artifacts = artifact.artifacts.map((artifactPath) => path_1.default.relative(rootDir, artifactPath));
            const publishState = new PublishState(path_1.default.resolve(directory, id, 'null'), false);
            publishState.state = artifact;
            await publishState.saveToDisk();
        }
    }
    generateHash() {
        const content = JSON.stringify(this.state || {});
        return crypto_1.default.createHash('SHA256').update(content).digest('hex');
    }
    async load() {
        this.state = await fs_extra_1.default.readJson(this.path);
    }
    async saveToDisk() {
        if (!this.hasHash) {
            this.path = path_1.default.resolve(this.dir, `${this.generateHash()}${EXTENSION}`);
            this.hasHash = true;
        }
        await fs_extra_1.default.mkdirs(path_1.default.dirname(this.path));
        await fs_extra_1.default.writeJson(this.path, this.state);
    }
}
exports.default = PublishState;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGlzaC1zdGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsL3B1Ymxpc2gtc3RhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxvREFBNEI7QUFDNUIsZ0RBQXdCO0FBR3hCLHdEQUEwQjtBQUUxQixNQUFNLFNBQVMsR0FBRyxnQkFBZ0IsQ0FBQztBQUVuQyxNQUFxQixZQUFZO0lBNEMvQixZQUFZLFFBQWdCLEVBQUUsT0FBTyxHQUFHLElBQUk7UUFGckMsVUFBSyxHQUFvQixFQUFxQixDQUFDO1FBR3BELElBQUksQ0FBQyxHQUFHLEdBQUcsY0FBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQztRQUNyQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUN6QixDQUFDO0lBL0NELE1BQU0sQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsU0FBaUIsRUFBRSxPQUFlO1FBQy9ELElBQUksQ0FBQyxDQUFDLE1BQU0sa0JBQUUsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRTtZQUNyQyxNQUFNLElBQUksS0FBSyxDQUFDLDZEQUE2RCxTQUFTLEVBQUUsQ0FBQyxDQUFDO1NBQzNGO1FBRUQsTUFBTSxTQUFTLEdBQXFCLEVBQUUsQ0FBQztRQUN2QyxLQUFLLE1BQU0sT0FBTyxJQUFJLE1BQU0sa0JBQUUsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDakQsTUFBTSxNQUFNLEdBQUcsY0FBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDaEQsTUFBTSxNQUFNLEdBQW1CLEVBQUUsQ0FBQztZQUVsQyxJQUFJLENBQUMsTUFBTSxrQkFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFO2dCQUN6QyxNQUFNLFNBQVMsR0FB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