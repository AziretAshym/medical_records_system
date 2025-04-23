import mongoose, { HydratedDocument, Model } from "mongoose";
import {PatientFields} from "../types";

type PatientModel = Model<PatientFields, {}>;

const Schema = mongoose.Schema;

const PatientSchema = new Schema<HydratedDocument<PatientFields>, PatientModel>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true,
    },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    bloodType: { type: String },
    allergies: [{ type: String }],
    chronicDiseases: [{ type: String }],
}, { timestamps: true });

PatientSchema.index({ lastName: 1, firstName: 1 });
PatientSchema.index({ phone: 1 });

const Patient = mongoose.model("Patient", PatientSchema);
export default Patient;