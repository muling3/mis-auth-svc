"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("./jwt");
const users_1 = require("./users");
let AuthController = class AuthController {
    // Full path = /api/auth/login (global prefix + no Kong strip).
    // This path is whitelisted in Kong (no jwt) — you can't log in with a token
    // you don't have yet.
    login(body) {
        const user = (0, users_1.findUser)(body?.usernameOrEmail ?? '', body?.password ?? '');
        if (!user)
            throw new common_1.UnauthorizedException('invalid credentials');
        const access_token = (0, jwt_1.signJwt)({
            sub: user.id,
            name: user.name,
            email: user.email,
            roles: user.roles,
        });
        return {
            access_token,
            token_type: 'Bearer',
            expires_in: 3600,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                roles: user.roles,
            },
        };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)()
], AuthController);
//# sourceMappingURL=auth.controller.js.map