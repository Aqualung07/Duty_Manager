class env {
  private config;

  constructor() {
    this.config = {
      user: "admin",
      password: "admin",
      host: "127.0.0.1",
      db_name: "duties",
    };
  }

  public getConfig() {
    return this.config;
  }
}

export const env_config = new env();
