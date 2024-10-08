import Issue from "./issue.model.js"


export const createIssueandler=async function (issueObj) {

     // Create a new issue instance using the provided issue data
     const issue = new Issue(issueObj); // Use the Issue model to create a new instance
     const issueResponse = await issue.save(); // Save the new issue to the database
     return issueResponse; // Return the saved issue

}

export const getIssueByIdHandler= async function(issueId) {
    const response = await Issue.findById(issueId);
    return response
}

export const getIssuesHandler= async function() {
    const response = await Issue.find();
    return response
}



export const updateIssueByIdHandler= async function(reqObj,issueId) {
    let issueObj = await Issue.findById(issueId);
    if(issueObj==null) {
        return null;
    }
    if(reqObj.hasOwnProperty("title")){
        issueObj.title=reqObj.title
    }

    if(reqObj.hasOwnProperty("description")){
        issueObj.description=reqObj.description
    }
    const updatedObj=await issueObj.save(issueObj);
    return updatedObj
}


export const deleteIssueByIdHandler=async function deleteIssueByIdHandler(issueId) {

    const deletedIssue = await Issue.findByIdAndDelete(issueId);
    return deletedIssue

}