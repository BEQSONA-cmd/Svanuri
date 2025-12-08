import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "database.db",
    logging: false,
});

async function init(){
    await sequelize.authenticate();
    await sequelize.sync();
}

init();

export default sequelize;
