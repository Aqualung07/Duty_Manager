import { DataTypes } from "sequelize";
import { DataBase } from "../data/db.js";

class Duties {
  private instance;

  constructor() {
    this.instance = DataBase.getConnection().define(
      "Duties",
      {
        id: {
          type: DataTypes.STRING,
          primaryKey: true,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        tableName: "duties",
      }
    );
  }

  public getInstance() {
    return this.instance;
  }
}

export const Duties_db = new Duties();
