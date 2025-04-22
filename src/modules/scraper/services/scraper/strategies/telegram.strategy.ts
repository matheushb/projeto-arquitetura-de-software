import { ScraperResult } from "../../../entities/scraper-result";
import { ScrapingStrategy } from "../scraper.strategy.interface";

export class TelegramStrategy implements ScrapingStrategy {
  async handle(searchInput: string): Promise<ScraperResult[]> {
    return new Promise((resolve) => {
      const result: ScraperResult[] = [
        {
          name: "Telegram Chat",
          date: new Date().toISOString(),
          credentials: [`user: ${searchInput}`, "user2: password2"],
        },
      ];
      resolve(result);
    });
  }
}
