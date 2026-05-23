import { usePhones } from "../context/phones.context";
import { FaStar } from "react-icons/fa";

const Phones = () => {
    const {phones} = usePhones();

    return (
        <section>
            <h1>Phones</h1>

            <hr />

            <section>
                {
                    phones.map((phone, ind) => (
                        <div key={ind} className={phone._id}>
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
                            <hr />
                        </div>
                    ))
                }
            </section>
        </section>
    )
};

export default Phones;