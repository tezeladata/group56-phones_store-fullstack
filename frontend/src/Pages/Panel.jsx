import { useEffect, useState } from "react";
import { usePhones } from "../context/phones.context.jsx";
import { FaStar } from "react-icons/fa";

const Panel = () => {
    const {phones, deletePhone} = usePhones();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({})

    const handleSubmit = (e) => {
        e.preventDefault();

        const possibleProperties = [
            "productName", "brand", "model", "releaseYear", "price", "currency", "display", "processor", "ram", "storage", "camera", "battery", "options", "inStock", "rating"
        ];

        // specsObject and options fix
        for (let prop of possibleProperties) {
            let inputValue = e.target[prop].value;

            let specsObject = {};
            if (inputValue !== "") {
                if (["display", "processor", "ram", "storage", "camera", "battery"].includes(prop)) {
                    specsObject[prop] = inputValue
                }

                if (prop === "options") {
                    setFormData(prev => ({
                        ...prev,
                        options: inputValue.split(" ")
                    }))
                }

                setFormData(prev => ({
                    ...prev,
                    [prop]: inputValue
                }))
            }
            if (specsObject.length !== 0) {
                setFormData(prev => ({
                    ...prev,
                    specs: specsObject
                }))
            }
        };
    }

    useEffect(() => {
        console.log(formData)
    }, [formData])

    return (
            <section>
                <h1>Phones</h1>
    
                <hr />
    
                <section>
                    {
                        phones.map((phone, ind) => (
                            <div key={ind}>
                                <h2>{phone.brand} - {phone.model}</h2>
                                <div>
                                    {
                                        phone.images.map((imgObj, ind) => (
                                            <img src={imgObj.url} key={ind} />
                                        ))
                                    }
                                </div>
    
                                <div>
                                    <h3>Specs:</h3>
                                    <p><b>Battery:</b> {phone.specs.battery}</p>
                                    <p><b>Camera:</b> {phone.specs.camera}</p>
                                    <p><b>Display:</b> {phone.specs.display}</p>
                                    <p><b>Processor:</b> {phone.specs.processor}</p>
                                    <p><b>Ram:</b> {phone.specs.ram}</p>
                                    <p><b>Storage:</b> {phone.specs.storage}</p>
                                    <p><b>Release year:</b> {phone.releaseYear}</p>
                                </div>
    
                                <p>{phone.price} {phone.currency}</p>
                                <p>{phone.inStock ? "In stock" : "Not in stock"}</p>
    
                                <div>
                                    <p>Rating <FaStar /> - {phone.rating}/10</p>
                                </div>
    
                                <div>
                                    <h3>Options</h3>
                                    {
                                        phone.options.map((option, ind) => (
                                            <p key={ind}>Option: {option}</p>
                                        ))
                                    }
                                </div>

                                <div>
                                    <button onClick={() => setIsEditing(true)} disabled={isEditing}>Edit phone</button>

                                    {isEditing && (
                                        <form onSubmit={handleSubmit}>
                                            <input type="text" name="productName" placeholder="Product's name" />
                                            <input type="text" name="brand" placeholder="Brand" />
                                            <input type="text" name="model" placeholder="Model" />
                                            <input type="number" name="releaseYear" placeholder="Release year" />
                                            <input type="number" name="price" placeholder="Price" />
                                            <input type="text" name="currency" placeholder="Currency" />
                                            <input type="text" name="display" placeholder="Display" />
                                            <input type="text" name="processor" placeholder="Processor" />
                                            <input type="number" name="ram" placeholder="Ram" />
                                            <input type="number" name="storage" placeholder="Storage" />
                                            <input type="number" name="camera" placeholder="Camera" />
                                            <input type="number" name="battery" placeholder="Battery" />
                                            <input type="text" name="options" placeholder="Enter options (leave space between words)" />
                                            <input type="text" name="inStock" placeholder="Stock (true / false)" />
                                            <input type="number" name="rating" placeholder="Rating" />

                                            <button>Submit</button>
                                        </form>
                                    )}
                                </div>

                                <div>
                                    <button onClick={() => deletePhone(phone._id)}>Delete phone</button>
                                </div>

                                <hr />
                            </div>
                        ))
                    }
                </section>
            </section>
    )        
};

export default Panel;