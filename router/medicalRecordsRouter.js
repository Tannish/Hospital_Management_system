import express from "express";
import { 
    addMedicalRecord, 
    getAllMedicalRecords, 
    getMedicalRecordsByPatient, 
    updateMedicalRecord, 
    deleteMedicalRecord 
} from "../controller/medicalRecordsController.js";
import {isAdminAuthenticated,
        isDoctorAuthenticated,
} from "../middlewares/auth.js";

import {upload} from "../middlewares/multer.js";



const router = express.Router();

router.post("/add",isDoctorAuthenticated, upload.single("file1"),addMedicalRecord);
router.get("/all", isAdminAuthenticated,getAllMedicalRecords);
router.get("/:patientId",isDoctorAuthenticated, getMedicalRecordsByPatient);
router.put("/update/:id", isDoctorAuthenticated,updateMedicalRecord);
router.delete("/delete/:id",isAdminAuthenticated, deleteMedicalRecord);
export default router;
