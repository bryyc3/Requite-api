import { type Request, type Response } from "express";
import  * as dbService from "../services/dbServices.js";

export async function testInput(req: Request, res: Response){
    const test = await dbService.testDbInput();
}