const { exec } = require("child_process");
exec('npx tsc-alias', () => require('../build'))
