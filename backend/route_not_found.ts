import { Request, Response, NextFunction } from "express";
import { RouteNotFoundError } from "./client_error"

// middleware functions
const ErrorHandler = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const err = new RouteNotFoundError(request.originalUrl);
    next(err);
}

// exporting
export default ErrorHandler;