import express from "express";
import {config} from "dotenv"
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbConnection } from "./database/dbConnection.js";
import messageRouter from "./router/messageRouter.js";
import {errorMiddleware} from "./middlewares/errorMiddleware.js";
import userRouter from "./router/userRouter.js";
import appointmentRouter from "./router/appointmentRouter.js";
import symptomChecker from "./router/symptomChecker.js";
import medicalRecordsRouter from "./router/medicalRecordsRouter.js";
import emergencyRoutes from "./router/emergencyRoutes.js";


const app=express();
config({ path:"./config/config.env"});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(
    cors({
        origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
        methods:["GET", "POST","PUT","DELETE"],
        credentials:true,
    })
);

app.use(cookieParser());

// ✅ Multer should handle form-data requests before JSON parsing
// import {upload} from "./middlewares/multer.js";
// app.use(upload.single("file"));
// app.use(fileUpload({
//     useTempFiles: true,
//     tempFileDir: "/tmp/",
//   })
// );


dbConnection();

app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);
app.use("/api/v1/symptom-checker",symptomChecker);
app.use("/api/v1/medical-records",medicalRecordsRouter);
app.use("/api/v1/emergency",emergencyRoutes);


//console.log("Registered Routes:", app._router.stack
//    .filter(r => r.route)
//    .map(r => r.route.path)
//);

app.use(errorMiddleware);
export default app;