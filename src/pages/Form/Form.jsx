import { useState, useEffect } from 'react';
import './form.css'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function Form() {

    let [formData, setFormData] = useState({});

    let handleChange = (e) => {
        let { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    let submitData = async (e) => {
        e.preventDefault();
        let blog = await axios.post("http://localhost:3000/data", formData)
            .then((res) => {
                console.log(res.data);
                toast.success("blog submitted successfully");
                window.location = "/"
            })
            .catch((err) => {
                console.log(err);
                toast.error("Error")
            })
    }

    return (
        <>
            <div className='form-main'>
                <form method="post" onSubmit={(e) => submitData(e)} >
                    <div className="form-wrap">
                        <h2>ADD BLOG</h2>
                        <input type="text" placeholder="image url" name="image" onChange={(e) => handleChange(e)} />
                        <input type="text" name="title" placeholder="Title" onChange={(e) => handleChange(e)} />
                        <textarea name="description" placeholder="Description" onChange={(e) => handleChange(e)} cols={38} rows={2}></textarea>
                        <button type="submit">Add Blog</button>

                    </div>

                </form>
            </div>
            <ToastContainer />
        </>
    )
}

export default Form;



















{/* <table border={1} align="center" cellPadding={10}>
                        <thead>
                            <h2>ADD BLOG</h2>
                            <tr>
                                <td> Image </td>
                                <td>
                                    <input type="text" placeholder="image url" name="image" onChange={(e) => handleChange(e)} />
                                </td>
                            </tr>
                            <tr>
                                <td>Title</td>
                                <td>
                                    <input type="text" name="title" placeholder="Title" onChange={(e) => handleChange(e)} />
                                </td>
                            </tr>
                            <tr>
                                <td> Description</td>
                                <td>
                                    <textarea name="description" placeholder="Description" onChange={(e) => handleChange(e)} cols={21} rows={3}></textarea>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2" className="add-btn">
                                    <button type="submit">Add Blog</button>
                                </td>
                            </tr>
                        </thead>
                    </table> */}