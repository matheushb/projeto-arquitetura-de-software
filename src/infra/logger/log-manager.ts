export class LogManager {
  public static instance: LogManager;
  public logs: string[] = [];

  private constructor() {}

  public static getInstance(): LogManager {
    if (!LogManager.instance) {
      LogManager.instance = new LogManager();
    }
    return LogManager.instance;
  }

  public addLog(log: string) {
    this.logs.push(log);
  }

  public getLogs(): string[] {
    return this.logs;
  }
}
