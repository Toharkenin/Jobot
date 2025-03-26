import express from "express";
import { checkApplicationStatus } from "../Controllers/userJob/applicationStatus";
import { applyToJob, getUserJob } from "../Controllers/userJob/userApplyToJob";

const router = express.Router();

router.post("/get-job-by-id", checkApplicationStatus);
router.post("/apply-job/:jobId", applyToJob);
router.post("/get-user-job", getUserJob);

export default router;
