import {Router} from "express"
import { addUrl } from "../controllers/url.controller.js"

const router = Router();


router.post("/",addUrl)


export default router;