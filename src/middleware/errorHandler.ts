import { Request, Response, NextFunction } from "express";

export const errorHandler = (err:any, req: Request, res: Response, next: NextFunction) =>{
      console.log("Full Error Oject", err);
      console.error(`[Error] ${err.Message}`);

      const status = err.status || 500;

      res.status(status).json({
            sccess: false,
            message: err.message || "Internal Server Error!",
            stack: process.env.NODE_ENV ==='developer'?err.stack :{}
      });
};