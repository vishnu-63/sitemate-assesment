import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "./Modal";

export default function ViewIssue() {
    const [issue, setIssue] = useState(false); // Start with null instead of an empty array
    const [error, setError] = useState(null); // State to track errors
    const id = useParams().id;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchIssue = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/api/issue/${id}`)
                setIssue(res.data);
                setError(null); // Clear any previous error
            } catch (err) {

                // Check for 404 status and set an error message
                if (err.response && err.response.status === 404) {
                    setError("Issue not found");
                } else {
                    setError("An unexpected error occurred");
                }
                console.log(err)

            }
        };

        fetchIssue();
    }, [id]);

    const handleBackClick = () => {
        navigate(-1); // Go back to the previous route
    };

    // Render loading state or error message if applicable
    if (error) {
        return (
            <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
                <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>
                    <h3 style={{ textAlign: 'center', color: 'red' }}>
                        {error}
                    </h3>
                    <div className="d-flex justify-content-center mt-4">
                        <Link to="/" className='btn btn-primary'>Back to Home</Link>
                    </div>
                </div>
            </div>
        );
    }

    // Render issue details if no error and issue is found
    if (!issue) {
        return (
            <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
                <h3>Loading...</h3> {/* Loading state can be improved */}
            </div>
        );
    }

    return (
        <div
            className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'
            style={{
                backgroundImage: 'linear-gradient(to right, #f8f9fa, #e9ecef)',
                fontFamily: 'Arial, sans-serif',
                color: '#333'
            }}
        >
            <div
                className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'
                style={{
                    borderColor: '#dee2e6',
                    borderWidth: '1px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    borderRadius: '15px',
                    padding: '40px',
                }}
            >
                <h3 style={{ textAlign: 'center', marginBottom: '20px', color: '#007bff', fontWeight: 'bold' }}>Issue Details</h3>

                <div className="mb-2">
                    <strong>Id:</strong> <span style={{ color: '#6c757d' }}>{issue._id}</span>
                </div>

                <div className="mb-2">
                    <strong>Title:</strong> <span style={{ color: '#6c757d' }}>{issue.title}</span>
                </div>

                <div className="mb-2">
                    <strong>Description:</strong>
                    <br />
                    <span style={{ color: '#6c757d', whiteSpace: 'pre-wrap' }}>
                        {issue.description}
                    </span>
                </div>

                <div className="mb-2">
                    <strong>Created At:</strong> <span style={{ color: '#6c757d' }}>{issue.createdAt}</span>
                </div>

                <div className="mb-2">
                    <strong>Updated At:</strong> <span style={{ color: '#6c757d' }}>{issue.updatedAt}</span>
                </div>

                <div className="d-flex justify-content-center mt-4">
                    <Link to={`/update-issue/${id}`} className="btn btn-success">Edit</Link>
                    <button onClick={handleBackClick} className='btn btn-primary ms-3'>Back</button>
                </div>
                <Modal />
            </div>
        </div>
    );
}
