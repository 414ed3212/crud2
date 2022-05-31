import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
// import   * as yup from 'yup'
import '../Modal.css'
const Modal = () => {
    // df navigate
    const history = useNavigate()
    //set option values
    const [value, setValue] = useState('')
    //set input Errors
    const [formErrors, setFormErrors] = useState({})
    //check submit
    const [isSubmit, setIsSubmit] = useState(false)
    const setOption = (e) => {
        const getOption = e.target.value
        setValue(getOption)
        //try async later
    }
    
    //default inputs
    const [inputs, setInputs] = useState({
        sku: "",
        name: "",
        price: "",
        size: "",
        height: "",
        width: "",
        lenght: "",
        weight: "",
    })
    //ready to send input back-end
    const handleChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }

    //init data for api
    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormErrors(validate(inputs))
        setIsSubmit(true)
        await axios.post('http://localhost/Crud/server/api/App/index.php', {
            sku: inputs.sku,
            name: inputs.name,
            price: inputs.price,
            size: inputs.size,
            height: inputs.height,
            width: inputs.width,
            lenght: inputs.lenght,
            weight: inputs.weight,
            value: value,
        })
            .then((res) => {
                if (res.data.Status === "Invalid") {
                    history('/error')
                }
            })
            .catch((err) => { return err })
    }
    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            history("/")
        }
    })
    //for Cancel,X
    const click = () => {
        history("/")
    }
    const validate = (values) => {
        let errors = {}

        if (!values.height ^ !values.width ^ !values.lenght ^ !values.weight ^ !values.size) {
            errors.forSingleError = "enter required fields and choose only one option"
        }
        //back for 3 time error
        if (!values.sku) {
            errors.sku = "sku is required"
        }
        if (!values.name) {
            errors.name = "name is required"
        }
        if (!values.price) {
            errors.price = "price is required"
        }
        if (!values.size && value === "DVD") {
            errors.size = "size is required"
        }
        if (!values.height && value === "Furniture") {
            errors.height = "height is required"
        }
        if (!values.width && value === "Furniture") {
            errors.width = "width is required"
        }
        if (!values.lenght && value === "Furniture") {
            errors.lenght = "lenght is required"
        }
        if (!values.weight && value === "Book") {
            errors.weight = "weight is required"
        }
        return errors
    }
    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <button onClick={click}>X</button>
                </div>
                <div className="title">
                    <form onSubmit={handleSubmit} id="product_form">
                        <p className='modal--errors'>{formErrors.forSingleError}</p>
                        <span>SKU</span><input type="text" placeholder='SKU' name="sku" onChange={handleChange} value={inputs.sku}></input>
                        <p className='modal--errors'>{formErrors.sku}</p>
                        <span>Name</span><input type="text" placeholder='Name' name="name" onChange={handleChange} value={inputs.name} ></input>
                        <p className='modal--errors'>{formErrors.name}</p>
                        <span>Price($)</span><input type="number" min="0" placeholder='Price' name="price" onChange={handleChange} value={inputs.price}></input>
                        <p className='modal--errors'>{formErrors.price}</p>


                        <div className="Options">
                            <select name="listType" id="productType" onChange={(e) => setOption(e)}>
                                <option value="switcher">Type Switcher</option>
                                <option id="DVD" value="DVD" >DVD</option>
                                <option id="Forniture" value="Furniture">Furniture</option>
                                <option id="Book" value="Book">Book</option>
                            </select>
                            {
                                value === "DVD" && (
                                    <div>
                                        <p className='modal--errors'>{formErrors.size}</p>
                                        <span>Size(MB)</span><input type="number" min="0" name="size" onChange={handleChange} className="modal--input" value={inputs.size}></input>
                                        <h5>Please,provide disc space in MB</h5>
                                    </div>
                                )
                            }
                            {
                                value === "Furniture" && (
                                    <div>
                                        <p className='modal--errors'>{formErrors.height}</p>
                                        <span>Height(CM)</span><input type="number" min="0" id="Height" name="height" onChange={handleChange} className="modal--input" value={inputs.height} ></input>
                                        <p className='modal--errors'>{formErrors.width}</p>
                                        <span>Width(CM)</span><input type="number" min="0" id="Width" name="width" onChange={handleChange} className="modal--input" value={inputs.width}  ></input>
                                        <p className='modal--errors'>{formErrors.lenght}</p>
                                        <span>Lenght(CM)</span><input type="number" min="0" id="Lenght" name="lenght" onChange={handleChange} className="modal--input" value={inputs.lenght} ></input>
                                    </div>
                                )
                            }

                            {
                                value === "Book" && (
                                    <div>
                                        <p className='modal--errors'>{formErrors.weight}</p>
                                        <span>Weight(KG)</span><input type="number" min="0" id="Weight" name="weight" onChange={handleChange} className="modal--input" value={inputs.weight}></input>
                                        <h5>Please,provide weight in kg</h5>
                                    </div>
                                )
                            }

                        </div>
                        <div className='submitBtn1'>
                            <button className="submitBtn2">Save</button>
                        </div>
                    </form>
                </div>
                <div className="footer">
                    <button id="cancelBtn" onClick={click}>Cancel</button>
                </div>
            </div>
        </div>
    )
}


export default Modal