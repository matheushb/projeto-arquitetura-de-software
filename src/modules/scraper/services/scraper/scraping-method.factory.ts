import { ObjectValues } from "../../../../infra/types/object-values.type";
import { DatabreachStrategy } from "./strategies/databreach.strategy";
import { ForumStrategy } from "./strategies/forum.strategy";
import { TelegramStrategy } from "./strategies/telegram.strategy";

export const Source = {
  FORUM: "FORUM",
  TELEGRAM: "TELEGRAM",
  DATABREACH: "DATABREACH",
} as const;

export type Source = ObjectValues<typeof Source>;

export class ScrapingMethodFactory {
  static createScraper(source: Source | string) {
    switch (source.toUpperCase()) {
      case Source.DATABREACH:
        return new DatabreachStrategy();
      case Source.TELEGRAM:
        return new TelegramStrategy();
      case Source.FORUM:
        return new ForumStrategy();
      default:
        throw new Error("Invalid scraping method");
    }
  }
}
