import express from "express";
import Patient from "../models/Patient";
import mongoose from "mongoose";
import auth from "../middleware/auth";
import permit from "../middleware/permit";

const patientsRouter = express.Router();

patientsRouter.get("/", async (req, res, next) => {
    try {
        const { firstName, lastName, insuranceNumber, limit = 20, page = 1 } = req.query;

        const searchConditions: any = {};

        if (firstName) {
            searchConditions.firstName = { $regex: firstName, $options: 'i' };
        }

        if (lastName) {
            searchConditions.lastName = { $regex: lastName, $options: 'i' };
        }

        if (insuranceNumber) {
            searchConditions.insuranceNumber = insuranceNumber;
        }

        const skip = (+page - 1) * +limit;

        const patients = await Patient.find(searchConditions)
            .limit(+limit)
            .skip(skip)
            .sort({ lastName: 1, firstName: 1 });

        const count = await Patient.countDocuments(searchConditions);

        res.send({
            patients,
            count,
        });
        return;
    } catch (e) {
        next(e);
    }
});

patientsRouter.get("/:id", async (req, res, next) => {
    try {
        const patient = await Patient.findById(req.params.id);

        if (!patient) {
            res.status(404).send({ error: "Patient not found" });
            return;
        }

        res.send(patient);
        return;
    } catch (e) {
        next(e);
    }
});

patientsRouter.post("/", async (req, res, next) => {
    try {
        const patientData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            dateOfBirth: req.body.dateOfBirth,
            gender: req.body.gender,
            address: req.body.address,
            phone: req.body.phone,
            email: req.body.email,
            bloodType: req.body.bloodType,
            allergies: req.body.allergies,
            chronicDiseases: req.body.chronicDiseases,
        };

        const patient = new Patient(patientData);
        await patient.save();

        res.status(201).send(patient);
        return;
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(400).send(error);
            return;
        }
        next(error);
    }
});

patientsRouter.patch("/:id",  async (req, res, next) => {
    try {
        const patientId = req.params.id;

        const patientData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            middleName: req.body.middleName,
            dateOfBirth: req.body.dateOfBirth,
            gender: req.body.gender,
            address: req.body.address,
            phone: req.body.phone,
            email: req.body.email,
            insuranceNumber: req.body.insuranceNumber,
            bloodType: req.body.bloodType,
            allergies: req.body.allergies,
            chronicDiseases: req.body.chronicDiseases,
        };

        const patient = await Patient.findByIdAndUpdate(
            patientId,
            patientData,
            { new: true, runValidators: true }
        );

        if (!patient) {
            res.status(404).send({ error: "Patient not found" });
            return;
        }

        res.send(patient);
        return;
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(400).send(error);
            return;
        }
        next(error);
    }
});


patientsRouter.delete("/:id",  async (req, res, next) => {
    try {
        const patient = await Patient.findByIdAndDelete(req.params.id);

        if (!patient) {
            res.status(404).send({ error: "Patient not found" });
            return;
        }
        res.send({ message: "Patient deleted successfully" });
        return;
    } catch (e) {
        next(e);
    }
});

export default patientsRouter;