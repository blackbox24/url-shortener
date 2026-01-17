import {Router} from "express"
import { addUrl, deleteShortenUrl, getShortenUrl, statShortenUrl, updateShortenUrl } from "../controllers/url.controller.js"

const router = Router();


router.post("/",addUrl)

router.get("/:shortcode", getShortenUrl);


router.post("/:shortcode", updateShortenUrl);

router.delete("/:shortcode", deleteShortenUrl);

router.get("/:shortcode/stats", statShortenUrl);

export default router;