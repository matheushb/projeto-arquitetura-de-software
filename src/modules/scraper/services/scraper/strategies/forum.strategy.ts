import { ScraperResult } from "../../../entities/scraper-result";
import { ScrapingStrategy } from "../scraper.strategy.interface";

export class ForumStrategy implements ScrapingStrategy {
  async handle(searchInput: string): Promise<ScraperResult[]> {
    return new Promise((resolve) => {
      const result: ScraperResult[] = [
        {
          name: "Forum Post",
          date: new Date().toISOString(),
          credentials: [
            `user: ${searchInput}`,
            "user2: password2",
            "user3: password3",
          ],
        },
      ];
      resolve(result);
    });
  }
}
