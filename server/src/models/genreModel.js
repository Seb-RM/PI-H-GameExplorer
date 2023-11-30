import { DataTypes } from "sequelize";
import sequelize from "../DB_connection.js";

const Genre = sequelize.define(
    "Genre",
    {
        id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        },
        apiId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        },
        name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Other",
        },
    },
    { timestamps: false }
);
export default Genre;
