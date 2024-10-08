import express from "express";
import {createIssue,deleteIssueById,getAllIssues,getIssueById, updateIssueById} from "../issue/issue.contoller.js"


const router = express.Router();

router.post("/create", createIssue);
router.get("/issue/:id",getIssueById)
router.get("/issues",getAllIssues)
router.put("/issue/:id",updateIssueById)
router.delete("/issue/:id",deleteIssueById)


export default router;
