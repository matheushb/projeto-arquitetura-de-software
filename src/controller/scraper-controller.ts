import { Request, Response, Router } from "express";
import { ScraperHandler } from "../model/scraper-service";

const scraperService = new ScraperHandler();

export const showForm = (req: Request, res: Response) => {
  res.render("index", { word: "" });
};

export const handleWord = async (req: Request, res: Response) => {
  const word = req.body.word || "";

  const result = await scraperService.handle(word);

  console.log(result);

  res.render("index", { word: JSON.stringify(result) });
};

const router = Router();

router.get("/", showForm);
router.post("/submit", handleWord);

export default router;
