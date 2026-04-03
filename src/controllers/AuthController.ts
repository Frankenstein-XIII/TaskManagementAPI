import { Request, Response, NextFunction } from "express";
import { userService } from "../services/UserService";
import jwt from 'jsonwebtoken';


const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_for_dev_only";

export class AuthController{
      public static async  register(req: Request, res:Response, next:NextFunction){
            try{
                  const {email, password} = req.body;
                  if(!email || !password) throw new Error("Emial and password required.");
                  
                  const user = await userService.register(email, password);
                  res.status(201).json({message: "User registed", userid: user.id});
            }
            catch(error){
                  next(error);
            }
      }

      public static async login(req:Request, res:Response, next:NextFunction){
            try{
                  const {email, password} = req.body;
                  const user = await userService.login(email, password);

                  const token = jwt.sign(
                        {userid: user.id, email: user.email},
                        JWT_SECRET, {expiresIn: '1h'}
                  )
            res.status(200).json({token});
            }
            catch (error){
                  next(error);
            }
      }
}