import _ from 'lodash';
import {createIssueandler, getIssueByIdHandler,getIssuesHandler,updateIssueByIdHandler,deleteIssueByIdHandler} from "./issue.service.js"


export const createIssue=async function createIssue(req,res) {
    try {
        let issue=req.body
        
        const issueObj= await createIssueandler(issue);
        console.log(issueObj)
        return res.status(200).json(issueObj)
    }
    catch(error){
        // Check for validation errors
        if (error.name === 'ValidationError') { // Check if the error is a validation error
            let obj={}
            const title=error.errors.title ? error.errors.title.message : null
            const description= error.errors.description ? error.errors.description.message : null
            if(title!==null){
                obj.title=title
            }
            if(description!==null) {
                obj.description=description
            }
            console.log(obj)
            return res.status(400).json(obj);
        } else {
            // For other errors, return a generic error message
            return res.status(500).json({
                message: 'An unexpected error occurred',
                error: error.message
            });
        }
    }
    
}

export const getIssueById=async function getIssueById(req,res) {
    try {
        let issueId=req.params.id
        let issueObj=await getIssueByIdHandler(issueId)
        if(issueObj==null){
            console.log("Issue Not Found!!!")
            return res.status(404).json({"message":"Not Found"})

        } 
        console.log(issueObj)
        return res.status(200).json(issueObj);
    }
    catch(error) {
        return res.status(500).json({
            message: 'An unexpected error occurred',
            error: error.message
        });    
    }
    
}

export const getAllIssues=async function getAllIssues(req,res) {
    try {
        let issueObj=await getIssuesHandler()
        if(issueObj.length==0){
            console.log("Issue Not Found!!!")
            return res.status(404).json({"message":"Not Found"});
        }
        console.log(issueObj)
        
        return res.status(200).json(issueObj);
    }
    catch(error) {
        return res.status(500).json({
            message: 'An unexpected error occurred',
            error: error.message
        });    
    }
   
}


export const updateIssueById=async function updateIssueById(req,res) {
    try {
        const issueId=req.params.id
        let reqObj=req.body
        if(_.isEmpty(reqObj)){
            console.log("Body cannot be empty!!")
            return res.status(400).json({"message":"Body cannot be empty"})
        }
        
        let issueObj=await updateIssueByIdHandler(reqObj,issueId)
        if(issueObj==null){
            console.log("Issue Not Found!!!")
            return res.status(404).json({"message":"Not Found"})
        } 
        console.log(issueObj)
        return res.status(200).json(issueObj)
    }
    catch(error) {
        return res.status(500).json({
            message: 'An unexpected error occurred',
            error: error.message
        });  

    }
  
    
}
    

export const deleteIssueById=async function deleteIssueById(req,res) {
    try {
        
        let issueId=req.params.id
        let deletedIssue=await deleteIssueByIdHandler(issueId)
        if(!deletedIssue){
            console.log("Issue Not Found!!!")
            return res.status(404).json({"message":"Not Found"})
        } 
        console.log(`The issue with ${issueId} has been successfully deleted.`)
        return res.status(200).json({"message": "The issue has been successfully deleted."});
        }
        catch(error) {
            return res.status(500).json({
                message: 'An unexpected error occurred',
                error: error.message
            });    
        }
        
    }
