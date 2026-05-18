"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USERS = void 0;
exports.findUser = findUser;
exports.USERS = [
    {
        id: 'u-case-001',
        username: 'caseofficer',
        email: 'case.officer@mis.local',
        password: 'case123',
        name: 'Case Officer',
        roles: ['case-officer'],
    },
    {
        id: 'u-rep-001',
        username: 'reportanalyst',
        email: 'report.analyst@mis.local',
        password: 'report123',
        name: 'Report Analyst',
        roles: ['reporting-analyst'],
    },
];
function findUser(usernameOrEmail, password) {
    const id = usernameOrEmail?.toLowerCase().trim();
    return exports.USERS.find((u) => (u.username.toLowerCase() === id || u.email.toLowerCase() === id) &&
        u.password === password);
}
//# sourceMappingURL=users.js.map