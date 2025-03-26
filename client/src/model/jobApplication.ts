import { Job } from "./jobModel";

export interface JobApplication {
    candidateId: string,
    employerId: string,
    jobId: Job,
    messageToEmployer?: string,
    status? : string,
}