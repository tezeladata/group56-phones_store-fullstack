import mongoose from "mongoose";

const phonesSchema = new mongoose.Schema(
    {
        productName: {
            type: String,
            required: [true, "Product name is required"],
            trim: true
        },
        brand: {
            type: String,
            required: [true, "Brand is required"],
            trim: true
        },
        model: {
            type: String,
            required: [true, "Model is required"],
            trim: true
        },
        releaseYear: {
            type: Number,
            required: [true, "Release year is required"]
        },
        price: {
            type: Number,
            required: [true, "Price is required"]
        },
        currency: {
            type: String,
            required: [true, "Currency is required"],
            trim: true
        },
        specs: {
            display: {
                type: String,
                required: [true, "Display is required"],
                trim: true
            },
            processor: {
                type: String,
                required: [true, "Processor is required"],
                trim: true
            },
            ram: {
                type: Number,
                required: [true, "RAM is required"]
            },
            storage: {
                type: Number,
                required: [true, "Storage is required"]
            },
            camera: {
                type: Number,
                required: [true, "Camera is required"]
            },
            battery: {
                type: Number,
                required: [true, "Battery is required"]
            },
        },
        options: {
            type: Array,
            required: [true, "Options array is required"],
            minLength: 2
        },
        inStock: {
            type: Boolean,
            required: [true, "in stock is required"],
        },
        rating: {
            type: Number,
            required: [true, "Rating is required"],
        }
    },
    {
        timestamps: true
    }
);

const Phones = mongoose.model("Phones", phonesSchema);

export default Phones;