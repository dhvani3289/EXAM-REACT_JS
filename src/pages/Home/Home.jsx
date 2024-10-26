import { useEffect, useState } from 'react';
import './home.css'
import axios from 'axios';
import { Container, Row } from 'react-bootstrap';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";



function Home() {

    let [blogData, setBlogData] = useState([]);
    let [position, setPosition] = useState(-1);

    useEffect(() => {
        getBlogData();
    }, [setBlogData])

    let getBlogData = () => {
        let getData = axios.get("http://localhost:3000/data")

        if (position != -1) {
            blogData.map((v, i) => {
                console.log(v.title);
                if (position == i) {
                    blogData[position] = blogData
                }
            })
            setBlogData(getData);
            setPosition(-1);
        } else {
            axios.get("http://localhost:3000/data")
                .then((res) => {
                    setBlogData(res.data);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        setBlogData([]);
    }

    let deleteData = ((i) => {
        axios.delete("http://localhost:3000/data/" + i);
        window.location = "/";
        localStorage.setItem("user", JSON.stringify([...blogData]));
        setBlogData([...blogData]);
    })

    let updateData = ((index) => {
        setPosition(index)
        const updatedList = blogData.filter((v, i) => {
            if (index === i) {
                return v
            }
        })
        setBlogData(updatedList[0])
    });

    let sorting = (e) => {
        let sortBy = e.target.value;
        let allData = [...blogData];
        if (sortBy === "ascending") {
            allData.sort((a, b) => a.title.localeCompare(b.title));
        }
        else {
            allData.sort((a, b) => b.title.localeCompare(a.title));
        }
        setBlogData(allData);
    }


    return (
        <>
            <Container>
            <div className='sorting'>
                        <select onClick={sorting} name="sorting">
                            <option hidden>SORT-BY</option>
                            <option value="ascending" >ascending</option>
                            <option value="descending">descending</option>
                        </select>
                    </div>
                <Row>
                  
                    {
                        blogData.map((v, i) => {
                            return (
                                <>
                                    <div className='blog-box'>
                                        <div>
                                            <h3>
                                                <img src={v.image} />
                                            </h3>
                                        </div>
                                        <div>
                                            <h1>{v.title}</h1>
                                            <h2>{v.description}</h2>
                                        </div>
                                        <div className='blog-btn-wrap'>
                                            <button className='blog-btn' onClick={() => deleteData(v.id)}><MdDelete />
                                            </button>
                                            <button className='blog-btn' onClick={() => updateData(v.id)}><FaEdit />
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }

                </Row>
            </Container>
        </>
    )
}

export default Home;