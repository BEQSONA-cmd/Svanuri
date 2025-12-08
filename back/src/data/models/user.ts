import { DataTypes, Model, Transaction } from "sequelize";
import sequelize from "../db";

class User extends Model {
    declare id: number;
    declare username: string;
    declare password: string;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
    }
);

export default User;
