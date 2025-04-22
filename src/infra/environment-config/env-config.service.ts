import "dotenv/config";

export enum EnvConfigKeys {
  EMAIL_USER = "EMAIL_USER",
  EMAIL_PASS = "EMAIL_PASS",
  EMAIL_HOST = "EMAIL_HOST",
  EMAIL_PORT = "EMAIL_PORT",
}

class EnvConfigService {
  private envConfig: { [key: string]: string | undefined } = {
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
    EMAIL_HOST: process.env.EMAIL_HOST,
    EMAIL_PORT: process.env.EMAIL_PORT,
  } as const;

  get(key: EnvConfigKeys): string {
    const value = this.envConfig[key];
    if (!value) {
      throw new Error(`Config key ${key} not found`);
    }
    return value;
  }

  getAll(): { [key: string]: string | undefined } {
    return this.envConfig;
  }
}

const envConfigService = new EnvConfigService();
export default envConfigService;
