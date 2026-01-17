import {Router} from "express"
import { addUrl, getShortenUrl } from "../controllers/url.controller.js"

const router = Router();


router.post("/",addUrl)

router.get("/:shortcode", getShortenUrl);


export default router;