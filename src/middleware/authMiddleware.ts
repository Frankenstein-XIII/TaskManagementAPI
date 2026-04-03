import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { AppError } from "../utils/AppError";

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_dev_only';
export interface AuthRequest extends Request{
      user?:{userId: string; email:string};
}

export const authMiddleware = (req:AuthRequest, res:Response, next:NextFunction) =>{
      try{
            // get the token from the authorization header 
            // standard format: "Bearer <token>"
            const authHeader = req.headers.authorization;
            if(!authHeader?.startsWith('Bearer')){
                  throw new AppError(401, "Access denied. No token provided.");
            }

            const token = authHeader.split(' ')[1];
            // verify the token 
            if(!token){
                  throw new AppError(401, "Malformed token.");
            }
            const decoded = jwt.verify(token, JWT_SECRET) as unknown as  {userId: string;  email: string};
            // attach the user info to the requrest so controllers can use it 
            req.user = decoded;
            next(); // pass the requrest to the controller 
      }
      catch (error){
            next(error);
      }
}

