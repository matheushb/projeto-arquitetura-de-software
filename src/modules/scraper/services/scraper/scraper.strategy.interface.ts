import { ScraperResult } from "../../entities/scraper-result";

export interface ScrapingStrategy {
  handle(searchInput: string): Promise<ScraperResult[]>;
}
