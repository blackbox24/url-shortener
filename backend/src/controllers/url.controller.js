import pool from "../config/db.js";
import {urlSchema}from "../validations/validateSchema.js";
import { generateCode, getFormattedDate } from "../utils/helpers.js";



export const addUrl = async(req,resp) => {
    try{
        const { body } = await urlSchema.parseAsync(req);
        const {url} = body;
        const shortcode = await generateCode(url);
        const date = getFormattedDate()

        console.log(date)

        const query = pool.query("INSERT INTO urls(name,shortcode) VALUES ($1,$2)",[url, shortcode])

        return resp.status(201).json({
            id: query.id,
            url:url,
            shortCode: shortcode,
            createdAt: date,
            updatedAt: date
        })
    }catch(error){
        console.log(error)
        return resp.status(400).json({"message": "Error occurred in server",error})
    }
}