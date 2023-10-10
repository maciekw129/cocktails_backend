import * as process from "process";

export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    frontUrl: process.env.FRONT_URL || 'http://localhost:4200',
    database: {
        name: process.env.DATABASE_NAME,
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD
    },
    secrets: {
        at: process.env.AT_SECRET || 'BE03C7A716E98B53EC7774737A33F8488F8BB50E2B48458F01AADCDB41B54973',
        rt: process.env.RT_SECRET || 'BE03C7A716E98B53EC7774737A33F8488F8BB50E2B48458F01AADCDB41B54973'
    },
    production: true
});