import pool from "../config/db.js";

// Source - https://stackoverflow.com/a
// Posted by golakers
// Retrieved 2026-01-17, License - CC BY-SA 3.0

export function getFormattedDate() {
    var date = new Date();

    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();

    month = (month < 10 ? "0" : "") + month;
    day = (day < 10 ? "0" : "") + day;
    hour = (hour < 10 ? "0" : "") + hour;
    min = (min < 10 ? "0" : "") + min;
    sec = (sec < 10 ? "0" : "") + sec;

    var str = date.getFullYear() + "-" + month + "-" + day + "_" +  hour + ":" + min + ":" + sec;

    /*alert(str);*/

    return str;
}


export const generateCode = async (url) => {
    const query = await pool.query("SELECT * FROM urls")
    const rowCount = query.rowCount + 1
    const shortcode = url.split('/')[2][0] + `${rowCount}`
    return shortcode;
}