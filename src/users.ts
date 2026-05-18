// Hardcoded PoC users. Two roles from @mis/access-control:
//   case-officer       -> can use the Case service      (case:read/write)
//   reporting-analyst  -> can use the Reporting service (reporting:read/export)
// A case user therefore CANNOT access the Reporting service, and vice versa.
export interface DemoUser {
  id: string;
  username: string;
  email: string;
  password: string; // plaintext — PoC only
  name: string;
  roles: string[];
}

export const USERS: DemoUser[] = [
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

export function findUser(usernameOrEmail: string, password: string): DemoUser | undefined {
  const id = usernameOrEmail?.toLowerCase().trim();
  return USERS.find(
    (u) =>
      (u.username.toLowerCase() === id || u.email.toLowerCase() === id) &&
      u.password === password,
  );
}
