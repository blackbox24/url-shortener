import {Router} from "express"
import { addUrl, getShortenUrl, updateShortenUrl } from "../controllers/url.controller.js"

const router = Router();


router.post("/",addUrl)

router.get("/:shortcode", getShortenUrl);


router.post("/:shortcode", updateShortenUrl);

export default router;