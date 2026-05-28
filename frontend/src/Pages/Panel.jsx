import { useEffect, useState } from "react";
import { usePhones } from "../context/phones.context.jsx";
import { FaStar } from "react-icons/fa";

const Panel = () => {
    const { phones, deletePhone, updatePhone, addPhone } = usePhones();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [specsObject, setSpecsObject] = useState({});

    const handleSubmit = async (e, id, option) => {
        const form = e.target;

        const specs = {
            display: form.display.value,
            processor: form.processor.value,
            ram: Number(form.ram.value),
            storage: Number(form.storage.value),
            camera: Number(form.camera.value),
            battery: Number(form.battery.value),
        };

        const data = {
            productName: form.productName.value,
            brand: form.brand.value,
            model: form.model.value,
            releaseYear: Number(form.releaseYear.value),
            price: Number(form.price.value),
            currency: form.currency.value,

            specs,

            options: form.options.value.split(" "),

            inStock: form.inStock.value.toLowerCase() === "true",

            rating: Number(form.rating.value),

            images: form.images.value
        };

        setFormData(data);
        setIsEditing(false);

        if (option === "update") await updatePhone(id, formData)
        else await addPhone(formData);
    };

    useEffect(() => {
        console.log(formData);
    }, [formData]);

    return (
        <section>
            <h1>Phones</h1>

            <hr />

            <div>
                <h2>Add phone</h2>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit(e, "", "post");
                    }}
                >
                    <input
                        type="text"
                        name="productName"
                        placeholder="Product's name" required
                    />
                    <input type="text" name="brand" placeholder="Brand" required />
                    <input type="text" name="model" placeholder="Model" required />
                    <input
                        type="number"
                        name="releaseYear"
                        placeholder="Release year"
                        required
                    />
                    <input type="number" name="price" placeholder="Price" required />
                    <input type="text" name="currency" placeholder="Currency" required />
                    <input type="text" name="display" placeholder="Display" required />
                    <input
                        type="text"
                        name="processor"
                        placeholder="Processor"
                        required
                    />
                    <input type="number" name="ram" placeholder="Ram" required />
                    <input type="number" name="storage" placeholder="Storage" required />
                    <input type="number" name="camera" placeholder="Camera" required />
                    <input type="number" name="battery" placeholder="Battery" required />
                    <input
                        type="text"
                        name="options"
                        placeholder="Enter options (leave space between words)"
                        required
                    />
                    <input
                        type="text"
                        name="inStock"
                        placeholder="Stock (true / false)"
                        required
                    />
                    <input type="number" name="rating" placeholder="Rating" required /> <br />

                    <label htmlFor="image-input">Upload phone files: </label>
                    <input type="file" id="image-input" name="images" required />

                    <button>Submit</button>
                </form>
            </div>

            <hr />

            <section>
                {phones.map((phone, ind) => (
                    <div key={ind}>
                        <h2>
                            {phone.brand} - {phone.model}
                        </h2>
                        <div>
                            {phone.images.map((imgObj, ind) => (
                                <img src={imgObj.url} key={ind} />
                            ))}
                        </div>

                        <div>
                            <h3>Specs:</h3>
                            <p>
                                <b>Battery:</b> {phone.specs.battery}
                            </p>
                            <p>
                                <b>Camera:</b> {phone.specs.camera}
                            </p>
                            <p>
                                <b>Display:</b> {phone.specs.display}
                            </p>
                            <p>
                                <b>Processor:</b> {phone.specs.processor}
                            </p>
                            <p>
                                <b>Ram:</b> {phone.specs.ram}
                            </p>
                            <p>
                                <b>Storage:</b> {phone.specs.storage}
                            </p>
                            <p>
                                <b>Release year:</b> {phone.releaseYear}
                            </p>
                        </div>

                        <p>
                            {phone.price} {phone.currency}
                        </p>
                        <p>{phone.inStock ? "In stock" : "Not in stock"}</p>

                        <div>
                            <p>
                                Rating <FaStar /> - {phone.rating}/10
                            </p>
                        </div>

                        <div>
                            <h3>Options</h3>
                            {phone.options.map((option, ind) => (
                                <p key={ind}>Option: {option}</p>
                            ))}
                        </div>

                        <div>
                            <button
                                onClick={() => setIsEditing(true)}
                                disabled={isEditing}
                            >
                                Edit phone
                            </button>

                            {isEditing && (
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        handleSubmit(e, phone._id, "update");
                                    }}
                                >
                                    <input
                                        type="text"
                                        name="productName"
                                        placeholder="Product's name"
                                    />
                                    <input
                                        type="text"
                                        name="brand"
                                        placeholder="Brand"
                                    />
                                    <input
                                        type="text"
                                        name="model"
                                        placeholder="Model"
                                    />
                                    <input
                                        type="number"
                                        name="releaseYear"
                                        placeholder="Release year"
                                    />
                                    <input
                                        type="number"
                                        name="price"
                                        placeholder="Price"
                                    />
                                    <input
                                        type="text"
                                        name="currency"
                                        placeholder="Currency"
                                    />
                                    <input
                                        type="text"
                                        name="display"
                                        placeholder="Display"
                                    />
                                    <input
                                        type="text"
                                        name="processor"
                                        placeholder="Processor"
                                    />
                                    <input
                                        type="number"
                                        name="ram"
                                        placeholder="Ram"
                                    />
                                    <input
                                        type="number"
                                        name="storage"
                                        placeholder="Storage"
                                    />
                                    <input
                                        type="number"
                                        name="camera"
                                        placeholder="Camera"
                                    />
                                    <input
                                        type="number"
                                        name="battery"
                                        placeholder="Battery"
                                    />
                                    <input
                                        type="text"
                                        name="options"
                                        placeholder="Enter options (leave space between words)"
                                    />
                                    <input
                                        type="text"
                                        name="inStock"
                                        placeholder="Stock (true / false)"
                                    />
                                    <input
                                        type="number"
                                        name="rating"
                                        placeholder="Rating"
                                    />

                                    <button>Submit</button>
                                </form>
                            )}
                        </div>

                        <div>
                            <button onClick={() => deletePhone(phone._id)}>
                                Delete phone
                            </button>
                        </div>

                        <hr />
                    </div>
                ))}
            </section>
        </section>
    );
};

export default Panel;
