import pup from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { ScraperResult } from "../../../entities/scraper-result.js";
import { sleep } from "../../../../../infra/utils/sleep.js";
import { ScrapingStrategy } from "../scraper.strategy.interface.js";

export class DatabreachStrategy implements ScrapingStrategy {
  async handle(searchInput: string): Promise<ScraperResult[]> {
    pup.use(StealthPlugin());

    const browser = await (pup as any).launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    await page.goto("https://databreach.com");

    await sleep(3000);

    await page.waitForSelector('input[id="search"]');
    await page.type('input[id="search"]', searchInput, { delay: 40 });

    //apertar o botao
    await page.evaluate(() => {
      const button = document.querySelector(
        "#search-form > div:nth-child(1) > div > div > button"
      ) as HTMLElement;

      button?.click();
    });

    await page.waitForNetworkIdle({ idleTime: 1000 });

    const breaches = await page.evaluate(() => {
      return Array.from(
        document.querySelectorAll('[data-test^="breach-"]')
      ).map((breach) => {
        const name = (breach as any)
          .querySelector(".text-xl.font-bold")
          ?.textContent.trim();
        const date = (breach as any)
          .querySelector(".ml-auto.text-base.text-muted-foreground")
          ?.textContent.trim();
        const credentials = Array.from(
          breach.querySelectorAll(
            ".flex.h-7.content-center.items-center.justify-center.gap-2"
          )
        ).map((cred) => (cred as any).textContent.trim());

        return { name, date, credentials };
      });
    });

    await page.close();

    return breaches;
  }
}
