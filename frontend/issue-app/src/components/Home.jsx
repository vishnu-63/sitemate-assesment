import { useEffect, useState } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";
import Modal from "./Modal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Home() {
    const [issues,setIssues]=useState([])
    
    const [showModal, setShowModal] = useState(false);
    const [issueToDelete, setIssueToDelete] = useState(null);
   


    useEffect(()=>{
        axios.get("http://localhost:3000/api/issues")
        .then((res)=>setIssues(res.data))
        .catch(err=>console.log(err))
    
    },[])

    const handleDeleteClick = (issueId) => {
        setIssueToDelete(issueId); // Store the ID of the issue to delete
        setShowModal(true); // Show the modal
    };

    const handleModalClose = () => {
        setShowModal(false);
        setIssueToDelete(null); // Clear the selected issue
    };

    const handleDeleteConfirm = () => {
        // Perform delete operation
        axios.delete(`http://localhost:3000/api/issue/${issueToDelete}`)
            .then(() => {
                setIssues(issues.filter(issue => issue._id !== issueToDelete)); // Update the issues state
                handleModalClose(); // Close the modal
                toast.success("Issue Successfully Deleted ")
            })
            .catch(err =>{
                console.error(err)
                toast.error("Unable to Delete Issue")

            });
    };

    return (
        <div className="container">
            <h1 className="heading">List Of Issues</h1>
            <div className="d-flex justify-content-end mb-3  ">
                    <Link to="/create" className="btn btn-success">+ Create An Issue</Link>
                </div>
            <div className="d-flex flex-column justify-content-center align-items-center border bg-white shadow pt-3 pb-5 rounded border-bottom-info" style={{ minHeight: '10rem' }}>
            
                
                {issues.length===0 && <h2 className="heading py">Oops No Issues Found!!</h2>}
                { issues.length>0 && <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Descritpion</th>
                            <th>Created At</th>
                            <th>Updated At</th>
                            <th>Actions</th>
                        </tr>
                        
                    </thead>
                    {                     
                        <tbody>
                            {
                            issues.map((issue,idx)=>(
                                <tr key={idx}>
                                    <td>{issue._id}</td>
                                    <td>{issue.title.length > 30 ? `${issue.title.substring(0, 30)}...`:issue.title}</td>
                                    <td>{issue.description.length > 30 ? `${issue.description.substring(0, 30)}...` : issue.description}</td>
                                    <td>{new Date(issue.createdAt).toLocaleString()}</td>
                                    <td>{new Date(issue.updatedAt).toLocaleString()}</td>
                                    <td>
                                        <Link to={`/issue/${issue._id}`} className="btn btn-sm btn-info me-2">View</Link>
                                        
                                        <Link to={`update-issue/${issue._id}`} className="btn btn-sm btn-primary me-2">Edit</Link>
                                        
                                        <button className="btn btn-sm btn-danger me-2" onClick={() => handleDeleteClick(issue._id)}>Delete</button>
                                    </td>
                                </tr>
                               

                            ))
                        }
                    </tbody> }
                   
                </table> }  
            </div>
            {/* Render the Modal */}
            <Modal
                show={showModal} 
                onClose={handleModalClose} 
                onConfirm={handleDeleteConfirm} 
                title={"Delete Issue"}
                body={"Are You Sure?"}
                buttonText={"Delete"}
            />
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
                    
       
    )
}