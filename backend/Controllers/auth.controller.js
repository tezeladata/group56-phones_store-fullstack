import Users from "../models/users.model.js";
import catchAsync from "../Utils/catchAsync.js";

export const signUp = catchAsync(async (req, res, next) => {
    const {fullname, email, password} = req.body;
    const newUser = await Users.create({fullname, email, password});

    console.log(newUser);
});