"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rebuild_1 = require("@electron/rebuild");
if (!process.send) {
    console.error('The remote rebuilder expects to be spawned with an IPC channel');
    // eslint-disable-next-line no-process-exit
    process.exit(1);
}
const options = JSON.parse(process.argv[2]);
const rebuilder = (0, rebuild_1.rebuild)(options);
rebuilder.lifecycle.on('module-found', () => { var _a; return (_a = process.send) === null || _a === void 0 ? void 0 : _a.call(process, { msg: 'module-found' }); });
rebuilder.lifecycle.on('module-done', () => { var _a; return (_a = process.send) === null || _a === void 0 ? void 0 : _a.call(process, { msg: 'module-done' }); });
rebuilder
    .then(() => {
    var _a;
    (_a = process.send) === null || _a === void 0 ? void 0 : _a.call(process, { msg: 'rebuild-done' });
    // eslint-disable-next-line no-process-exit
    return process.exit(0);
})
    .catch((err) => {
    var _a;
    (_a = process.send) === null || _a === void 0 ? void 0 : _a.call(process, {
        msg: 'rebuild-error',
        err: {
            message: err.message,
            stack: err.stack,
        },
    });
    // eslint-disable-next-line no-process-exit
    process.exit(0);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtb3RlLXJlYnVpbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcmVtb3RlLXJlYnVpbGQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQ0FBNEQ7QUFFNUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUU7SUFDakIsT0FBTyxDQUFDLEtBQUssQ0FBQyxnRUFBZ0UsQ0FBQyxDQUFDO0lBQ2hGLDJDQUEyQztJQUMzQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ2pCO0FBRUQsTUFBTSxPQUFPLEdBQW1CLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBRTVELE1BQU0sU0FBUyxHQUFHLElBQUEsaUJBQU8sRUFBQyxPQUFPLENBQUMsQ0FBQztBQUVuQyxTQUFTLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxjQUFjLEVBQUUsR0FBRyxFQUFFLFdBQUMsT0FBQSxNQUFBLE9BQU8sQ0FBQyxJQUFJLHdEQUFHLEVBQUUsR0FBRyxFQUFFLGNBQWMsRUFBRSxDQUFDLENBQUEsRUFBQSxDQUFDLENBQUM7QUFDdEYsU0FBUyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLEdBQUcsRUFBRSxXQUFDLE9BQUEsTUFBQSxPQUFPLENBQUMsSUFBSSx3REFBRyxFQUFFLEdBQUcsRUFBRSxhQUFhLEVBQUUsQ0FBQyxDQUFBLEVBQUEsQ0FBQyxDQUFDO0FBRXBGLFNBQVM7S0FDTixJQUFJLENBQUMsR0FBRyxFQUFFOztJQUNULE1BQUEsT0FBTyxDQUFDLElBQUksd0RBQUcsRUFBRSxHQUFHLEVBQUUsY0FBYyxFQUFFLENBQUMsQ0FBQztJQUN4QywyQ0FBMkM7SUFDM0MsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3pCLENBQUMsQ0FBQztLQUNELEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFOztJQUNiLE1BQUEsT0FBTyxDQUFDLElBQUksd0RBQUc7UUFDYixHQUFHLEVBQUUsZUFBZTtRQUNwQixHQUFHLEVBQUU7WUFDSCxPQUFPLEVBQUUsR0FBRyxDQUFDLE9BQU87WUFDcEIsS0FBSyxFQUFFLEdBQUcsQ0FBQyxLQUFLO1NBQ2pCO0tBQ0YsQ0FBQyxDQUFDO0lBQ0gsMkNBQTJDO0lBQzNDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbEIsQ0FBQyxDQUFDLENBQUMifQ==