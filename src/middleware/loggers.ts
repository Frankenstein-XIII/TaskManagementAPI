import { Request, Response, NextFunction } from "express";

export const loggerMiddleware = (req:Request, res: Response, next: NextFunction) =>{
      const start = Date.now();

      // The finish even fires when the reaponse is sent back to Postman 
      res.on('finish', () =>{
            const duration = Date.now() - start;
            console.log(`[${req.method}] ${req.originalUrl} - ${res.statusCode} (${duration} ms)`);
      });

      next();
}