import AppError from "../Utils/AppError.js"

export const allowedTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new AppError("You don't have permission", 401));
        };

        next();
    }
};