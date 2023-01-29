import { Sequelize } from "sequelize";
import { env_config } from "../env.js";

class DB {
  private connection: Sequelize;

  constructor() {
    const { db_name, user, password, host } = env_config.getConfig();

    this.connection = new Sequelize(db_name, user, password, {
      host: host,
      dialect: "postgres",
    });
  }

  public async connect(): Promise<void> {
    try {
      await this.connection.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }

  public getConnection(): Sequelize {
    return this.connection;
  }
}

const DataBase = new DB();

export { DataBase };
