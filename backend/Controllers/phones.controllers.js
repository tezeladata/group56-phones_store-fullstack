// Utilities
import AppError from "../Utils/AppError.js";
import catchAsync from "../Utils/catchAsync.js";
import Phones from "../models/phones.model.js";

export const getAllPhones = catchAsync(async (req, res, next) => {
    const result = await Phones.find()

    if (result.length === 0) {
        return next(new AppError("No phones were found", 404))
    }

    res.status(200).json(result)
})

export const getSinglePhone = catchAsync(async (req, res, next) => {
    const {id} = req.params;
    
    const foundPhone = await Phones.findById(id)

    if (!foundPhone) {
        return next(new AppError(`Phone not found with id: ${id}`, 404))
    };

    return res.status(200).json(foundPhone)
});

export const addPhone = catchAsync(async (req, res, next) => {
    const newPhone = await Phones.create(req.body)

    return res.status(200).json(newPhone);
});

export const editPhone = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    
    const updatedPhone = await Phones.findByIdAndUpdate(id, req.body, {new: true});
    if (!updatedPhone) {
        return next(new AppError("Phone not found", 404))
    }

    res.status(200).json(updatedPhone);
});

export const deletePhone = catchAsync(async (req, res, next) => {
    const {id} = req.params;

    let allPhones = await ReadFile(process.env.PHONES_DB);
    const foundPhone = allPhones.filter(item => item.id === id);

    if (foundPhone.length === 0) {
        return next(new AppError(`Phone not found with id: ${id}`, 404))
    };

    allPhones = allPhones.filter(item => item.id !== id);
    await WriteFile(process.env.PHONES_DB, allPhones)

    return res.status(204).json()
})