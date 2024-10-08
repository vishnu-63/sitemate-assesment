import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UpdateIssue() {
    const [issue, setIssue] = useState({
        title: '',
        description: ''
    });
    const [error, setError] = useState(null); // State for error handling
    const navigate = useNavigate();
    const id = useParams().id;

    useEffect(() => {
        const fetchIssue = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/api/issue/${id}`);
                setIssue({
                    title: res.data.title,
                    description: res.data.description
                });
                setError(null); // Clear any previous error
            } catch (err) {
                // Check for 404 status and set an error message
                if (err.response && err.response.status === 404) {
                    setError("Issue not found");
                } else {
                    setError("An unexpected error occurred");
                }
                console.log(err);
            }
        };

        fetchIssue();
    }, [id]);

    const handleDescriptionChange = (e) => {
        setIssue(prevData => ({
            ...prevData,
            description: e.target.value
        }));
    };

    const handleTitleChange = (e) => {
        setIssue(prevData => ({
            ...prevData,
            title: e.target.value
        }));
    };

    const handleBackClick = () => {
        navigate(-1); // Go back to the home page
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.put(`http://localhost:3000/api/issue/${id}`, issue)
            .then(res => {
               
                toast.success('Issue Updated Successfully')
                setTimeout(() => {
                    navigate('/');
                }, 500);
               
            })
            .catch(err => {
                toast.error("Error Updating Issue!");
                console.error(err);
            });
    };

    if (error) {
        return (
            <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
                <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 text-center'>
                    <h1>{error}</h1>
                    <button onClick={handleBackClick} className='btn btn-primary mt-3'>Go Back Home</button>
                </div>
            </div>
        );
    }

    return (
        <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
            <div className='w-50 border bg-white shadow px-5 pt-3 pb-5'>
                <h1>Update An Issue</h1>
                <form onSubmit={handleSubmit}>
                    <div className='mb-2'>
                        <label htmlFor="title">Title:</label>
                        <input 
                            type="text" 
                            name='title' 
                            className='form-control' 
                            value={issue.title} // Binding value
                            onChange={handleTitleChange} 
                            required
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="description">Description:</label>
                        <textarea 
                            name="description" 
                            className="form-control" 
                            required
                            id="description" 
                            rows="10" 
                            value={issue.description} // Binding value
                            onChange={handleDescriptionChange} 
                        />
                    </div>
                    <br />                
                    <button type="submit" className='btn btn-success'>Update</button>
                    <button type="button" onClick={handleBackClick} className='btn btn-primary ms-3'>Back</button>
                </form>
            </div>
            <ToastContainer 
                    position="top-right" 
                    autoClose={5000} 
                    hideProgressBar={false} 
                    closeOnClick 
                    pauseOnHover 
                    draggable 
                    rtl={false} 
                />
        </div>
    );
}
