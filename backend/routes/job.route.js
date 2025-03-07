import express from "express"
import { getAdminJobs, getAllJobCategory, getAllJobs, getJobById, postJob } from "../controllers/job.controller.js"
import isAuthenticated from "../middleware/isAuthenticated.js"

const router = express.Router()

router.route("/post").post(isAuthenticated, postJob)
router.route("/get").get( getAllJobs)
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs)
router.route("/get/:id").get(getJobById)
router.route("/category").get(getAllJobCategory)

export default router;