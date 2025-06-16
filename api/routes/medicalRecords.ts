import express from "express";
import MedicalRecord from "../models/MedicalRecord";
import Patient from "../models/Patient";
import mongoose from "mongoose";
import auth, { RequestWithUser } from "../middleware/auth";

const medicalRecordsRouter = express.Router();

medicalRecordsRouter.get('/', async (req, res, next) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        const records = await MedicalRecord.find()
            .populate('doctor', 'name specialization')
            .populate('patient', 'firstName lastName')
            .sort({ visitDate: -1 })
            .skip(skip)
            .limit(limit);

        const total = await MedicalRecord.countDocuments();

        res.send({
            total,
            page,
            limit,
            records,
        })
    } catch (e) {
        next(e);
    }
});


medicalRecordsRouter.get("/patient/:patientId", async (req, res, next) => {
    try {
        const patientId = req.params.patientId;

        const patient = await Patient.findById(patientId);
        if (!patient) {
            res.status(404).send({ error: "Patient not found" });
            return;
        }

        const records = await MedicalRecord.find({ patient: patientId })
            .populate('doctor', 'name specialization')
            .sort({ visitDate: -1 });

        res.send(records);
        return;
    } catch (e) {
        next(e);
    }
});

medicalRecordsRouter.get("/:id", async (req, res, next) => {
    try {
        const record = await MedicalRecord.findById(req.params.id)
            .populate('doctor', 'name specialization')
            .populate('patient', 'firstName lastName');

        if (!record) {
            res.status(404).send({ error: "Medical record not found" });
            return;
        }

        res.send(record);
        return;
    } catch (e) {
        next(e);
    }
});

medicalRecordsRouter.post("/", async (req, res, next) => {
    const userReq = req as RequestWithUser;
    try {
        const patient = await Patient.findById(userReq.body.patient);
        if (!patient) {
            res.status(400).send({ error: "Patient not found" });
            return;
        }

        const recordData = {
            patient: userReq.body.patient,
            doctor: userReq.body.doctor || userReq.user._id,
            visitDate: userReq.body.visitDate || new Date(),
            symptoms: userReq.body.symptoms,
            diagnosis: userReq.body.diagnosis,
            notes: userReq.body.notes,
            createdBy: userReq.user._id,
            updatedBy: userReq.user._id,
        };

        const record = new MedicalRecord(recordData);
        await record.save();

        await record.populate('doctor', 'name specialization');
        await record.populate('patient', 'firstName lastName');

        res.status(201).send(record);
    } catch (e) {
        next(e);
    }
});

medicalRecordsRouter.put("/:id", auth, async (req, res, next) => {
    const userReq = req as RequestWithUser;

    try {
        const recordId = userReq.params.id;

        const existingRecord = await MedicalRecord.findById(recordId);
        if (!existingRecord) {
            res.status(404).send({ error: "Medical record not found" });
            return;
        }

        const recordData = {
            visitDate: req.body.visitDate,
            symptoms: req.body.symptoms,
            diagnosis: req.body.diagnosis,
            notes: req.body.notes,
            updatedBy: userReq.user._id,
        };

        const record = await MedicalRecord.findByIdAndUpdate(
            recordId,
            recordData,
            { new: true, runValidators: true }
        )
            .populate('doctor', 'name specialization')
            .populate('patient', 'firstName lastName');

        res.send(record);
        return;
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(400).send(error);
            return;
        }
        next(error);
    }
});

medicalRecordsRouter.delete("/:id", auth, async (req, res, next) => {
    const userReq = req as RequestWithUser;

    try {
        const recordId = userReq.params.id;

        const record = await MedicalRecord.findById(recordId);
        if (!record) {
            res.status(404).send({ error: "Medical record not found" });
            return;
        }

        if (
            userReq.user.role !== 'admin' &&
            (record.createdBy.toString() !== userReq.user._id.toString() || userReq.user.role !== 'doctor')
        ) {
            res.status(403).send({ error: "Not authorized to delete this record" });
            return;
        }

        await MedicalRecord.findByIdAndDelete(recordId);

        res.send({ message: "Medical record deleted successfully" });
        return;
    } catch (e) {
        next(e);
    }
});

export default medicalRecordsRouter;