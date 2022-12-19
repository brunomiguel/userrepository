"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isInstalled(pkg) {
    try {
        require(pkg);
        return true;
    }
    catch {
        // Package doesn't exist -- must not be installable on this platform
        return false;
    }
}
exports.default = isInstalled;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXMtaW5zdGFsbGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWwvaXMtaW5zdGFsbGVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsU0FBd0IsV0FBVyxDQUFDLEdBQVc7SUFDN0MsSUFBSTtRQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNiLE9BQU8sSUFBSSxDQUFDO0tBQ2I7SUFBQyxNQUFNO1FBQ04sb0VBQW9FO1FBQ3BFLE9BQU8sS0FBSyxDQUFDO0tBQ2Q7QUFDSCxDQUFDO0FBUkQsOEJBUUMifQ==