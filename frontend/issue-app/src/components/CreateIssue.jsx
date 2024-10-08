import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CreateIssue() {
    const [inputData, setInputData] = useState({ title: '', description: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        axios.post('http://localhost:3000/api/create', inputData)
            .then(res => {
               
                
                toast.success("Data Posted Successfully!");
                setTimeout(() => {
                    navigate('/');
                }, 500);
                
            })
            .catch(err => {
                toast.error("Error posting data!");
                console.error(err);
            })
            .finally(() => {
                setIsSubmitting(false); // Re-enable button in case of error or after successful navigation
            });;
    };

    const handleDescriptionChange = (e) => {
        setInputData(prevData => ({
            ...prevData,
            description: e.target.value
        }));
    };

    const handleTitleChange = (e) => {
        setInputData(prevData => ({
            ...prevData,
            title: e.target.value
        }));
    };

    return (
        <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
            <div className='w-50 border bg-white shadow px-5 pt-3 pb-5'>
                <h1>Create An Issue</h1>
                <form onSubmit={handleSubmit}>
                    <div className='mb-2'>
                        <label htmlFor="title">Title:</label>
                        <input 
                            type="text" 
                            name='title' 
                            className='form-control' 
                            value={inputData.title} // Binding value
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
                            value={inputData.description} // Binding value
                            onChange={handleDescriptionChange} 
                            
                        />
                    </div>
                    <br />    
                                
                    <button className='btn btn-success' type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                    <Link to="/" className='btn btn-primary ms-3'>Back</Link>
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


