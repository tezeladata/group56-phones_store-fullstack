// Utilities
import AppError from "../Utils/AppError.js";
import catchAsync from "../Utils/catchAsync.js";
import ReadFile from "../Utils/ReadFile.js";
import WriteFile from "../Utils/WriteFile.js";

export const getAllPhones = catchAsync(async (req, res, next) => {
    const result = await ReadFile(process.env.PHONES_DB);

    if (!result.length) {
        return next(new AppError("No phones were found", 404))
    }

    res.status(200).json(result)
})

export const getSinglePhone = catchAsync(async (req, res, next) => {
    const {id} = req.params;
    
    const allPhones = await ReadFile(process.env.PHONES_DB);
    const foundPhone = allPhones.filter(item => item.id === id);

    if (foundPhone.length === 0) {
        return next(new AppError(`Phone not found with id: ${id}`, 404))
    };

    return res.status(200).json(foundPhone[0])
});

export const addPhone = catchAsync(async (req, res, next) => {
    const allPhones = await ReadFile(process.env.PHONES_DB);

    const {slug, brand, model, releaseYear, price, currency, specs, options } = req.body

    // validation and error handling
    if ([slug, brand, model, releaseYear, price, currency, specs, options].filter(item => item === undefined).length > 0) {
        return next(new AppError("Not enough data to create new phone", 400))
    }
    if (typeof releaseYear !== "number" || typeof price !== "number") {
        return next(new AppError("Invalid format for price or release year", 400))
    }
    if (!options.length || options.length === 0) {
        return next(new AppError("Invalid format for options"))
    }

    const validProperties = ["display", "processor", "ram", "storage", "camera", "battery"]
    const specKeys = Object.keys(specs);
    const hasOnlyValidKeys = specKeys.every(key => validProperties.includes(key));
    const hasAllRequiredKeys = validProperties.every(key => specKeys.includes(key));

    if (!hasOnlyValidKeys || !hasAllRequiredKeys) {
        return next(new AppError("Invalid properties in specs object", 406));
    }

    const newPhone = {
        id: allPhones.length+1,
        slug,
        brand,
        model,
        releaseYear,
        price,
        currency,
        specs, options,
        inStock: true,
        rating: 0,
        createdAt: Date()
    }

    allPhones.push(newPhone);
    await WriteFile(process.env.PHONES_DB, allPhones);

    return res.status(200).json(newPhone);
})