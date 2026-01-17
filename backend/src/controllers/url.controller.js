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


export const getShortenUrl = async(req, resp) => {
    try{
        const shortcode = req.params.shortcode;
        const query = await pool.query('SELECT * FROM urls WHERE shortcode=$1',[shortcode]);

        if( query.rowCount === 0){
            return resp.status(404).json({message:"Url not found"})
        }
        
        const result = query.rows[0]
        const accesscount = result.accesscount + 1;

        await pool.query('UPDATE urls SET accesscount=$1 WHERE shortcode=$2',[accesscount, shortcode]);

        return resp.status(200).json({
            id: result.id,
            url: result.name,
            shortCode: result.shortcode,
            createdAt: result.createdat,
            updatedAt: result.updatedat
        })
    }catch(error){
        return resp.status(400).json({message:"Error occurred",err:error})
    }
}

export const updateShortenUrl = async(req, resp) => {
    try{
        const shortcode = req.params.shortcode;
        const {body} = await urlSchema.parseAsync(req)
        const query = await pool.query('UPDATE urls SET name=$1 WHERE shortcode=$2',[body.url, shortcode]);

        if( query.rowCount === 0){
            return resp.status(404).json({message:"Url not found"})
        }
        const fetchRow = await pool.query('SELECT * FROM urls WHERE shortcode=$1',[shortcode])

        const result = fetchRow.rows[0]
        return resp.status(200).json({
            id: result.id,
            url: result.name,
            shortCode: result.shortcode,
            createdAt: result.createdat,
            updatedAt: result.updatedat
        })
    }catch(error){
        return resp.status(400).json({message:"Error occurred",err:error})
    }
}

export const deleteShortenUrl = async(req, resp) => {
    try{
        const shortcode = req.params.shortcode;
        const query = await pool.query('DELETE FROM urls WHERE shortcode=$1',[shortcode]);

        if( query.rowCount === 0){
            return resp.status(404).json({message:"Url not found"})
        }
        return resp.status(204).json()
    }catch(error){
        return resp.status(400).json({message:"Error occurred",err:error})
    }
}

export const statShortenUrl = async(req, resp) => {
    try{
        const shortcode = req.params.shortcode;
        const query = await pool.query('SELECT * FROM urls WHERE shortcode=$1',[shortcode]);

        if( query.rowCount === 0){
            return resp.status(404).json({message:"Url not found"})
        }
        
        const result = query.rows[0]
        return resp.status(200).json({
            id: result.id,
            url: result.name,
            shortCode: result.shortcode,
            createdAt: result.createdat,
            updatedAt: result.updatedat,
            accesscount: result.accesscount
        })
    }catch(error){
        return resp.status(400).json({message:"Error occurred",err:error})
    }
}