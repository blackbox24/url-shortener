import * as z from "zod"


export const urlSchema = z.object({
    body: z.object({
        url: z.httpUrl()
    })
})