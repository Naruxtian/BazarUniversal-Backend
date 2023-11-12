import { collection, doc, getDocs, query, where, setDoc} from "firebase/firestore";
import { NextFunction, Request, Response } from "express";
import * as fs from 'fs';
import * as path from 'path';
import asyncHandler from "../middleware/async"
import ResponseHttp from "../util/response";
import ErrorResponse from "../util/errorResponse";
import {db} from "../config/firebaseConfig";
import { Data } from "../models/Data";

export const uploadItems = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const filePath = path.resolve("src/data", 'products.json');
        const jsonData: Data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

        const batch: any[] = [];
        jsonData.products.forEach((item) => {
            const docRef = doc(collection(db, "items"));
            batch.push(setDoc(docRef, item));
        });
        await Promise.all(batch);

        new ResponseHttp(res).send("Data uploaded", jsonData, true, 200);
    } catch (error: any) {
        console.error(error);
        const errorCode = error.code || 500;
        const errorMessage = error.message;
        next(new ErrorResponse(errorMessage, errorCode));
    }
});

export const searchItems = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {q} = req.query;
        const queri = query(collection(db, "items"));
        const querySnapshot = await getDocs(queri);
        const items: any[] = [];
        querySnapshot.forEach((doc) => {
            items.push({ ...doc.data(), id: doc.id });
        });

        if(q == undefined) {
            new ResponseHttp(res).send("Es necesario ingresar un parametro de busqueda", null, false, 400);
        }

        const data = items.filter((item) => 
        item.title.toLowerCase().includes(q!.toString().toLowerCase()) ||
        item.description.toLowerCase().includes(q!.toString().toLowerCase()) ||
        item.brand.toLowerCase().includes(q!.toString().toLowerCase()) ||
        item.category.toLowerCase().includes(q!.toString().toLowerCase())
        );

        new ResponseHttp(res).send("Search result", data, true, 200);
    } catch (error: any) {
        console.error(error);
        const errorCode = error.code || 500;
        const errorMessage = error.message;
        next(new ErrorResponse(errorMessage, errorCode));
    }
});

export const getItem = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;
        const q = query(collection(db, "items"), where("id", "==", parseInt(id)));
        const querySnapshot = await getDocs(q);
        const items: any[] = [];
        querySnapshot.forEach((doc) => {
            items.push({ ...doc.data() });
        });
        
        new ResponseHttp(res).send("Item detail", items[0], true, 200);
    } catch (error: any) {
        const errorCode = error.code;
        const errorMessage = error.message;
        next(new ErrorResponse(errorMessage, errorCode));
    }
});