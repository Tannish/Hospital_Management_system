import express from "express";
import { isDoctorAuthenticated } from "../middlewares/auth.js";
import { assignEmergencyBed, flagEmergencyPatient, getBedAvailability } from "../controller/emergencyController.js";



const router=express.Router();

router.post("/flag",isDoctorAuthenticated,flagEmergencyPatient);
router.post("/assign-bed",isDoctorAuthenticated, assignEmergencyBed);
router.get("/bed-availability",getBedAvailability);

export default router;
