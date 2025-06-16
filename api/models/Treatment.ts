import mongoose, { HydratedDocument, Model } from "mongoose";
import Counter from "./Counter";

export interface TreatmentFields {
    medicalRecord: mongoose.Types.ObjectId;
    patient: mongoose.Types.ObjectId;
    type: 'medication' | 'procedure' | 'surgery' | 'recommendation';
    name: string;
    description: string;
    dosage?: string;
    frequency?: string;
    duration?: string;
    startDate: Date;
    endDate?: Date;
    status: 'scheduled' | 'in-progress' | 'completed' | 'canceled';
    assignedBy: mongoose.Types.ObjectId;
    updatedBy: mongoose.Types.ObjectId;
    treatmentNumber: string;
}

type TreatmentModel = Model<TreatmentFields, {}>;

const Schema = mongoose.Schema;

const TreatmentSchema = new Schema<HydratedDocument<TreatmentFields>, TreatmentModel>({
    medicalRecord: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MedicalRecord',
        required: true,
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true,
    },
    type: {
        type: String,
        enum: ['medication', 'procedure', 'surgery', 'recommendation'],
        required: true,
    },
    name: { type: String, required: true },
    description: { type: String, required: true },
    dosage: { type: String },
    frequency: { type: String },
    duration: { type: String },
    startDate: { type: Date, required: true, default: Date.now },
    endDate: { type: Date },
    status: {
        type: String,
        enum: ['scheduled', 'in-progress', 'completed', 'canceled'],
        default: 'scheduled',
        required: true,
    },
    assignedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    treatmentNumber: {
        type: String,
        unique: true,
    },
}, { timestamps: true });

TreatmentSchema.index({ patient: 1, startDate: -1 });
TreatmentSchema.index({ medicalRecord: 1 });
TreatmentSchema.index({ status: 1 });

TreatmentSchema.pre('save', async function (next) {
    if (!this.isNew) return next();

    try {
        const counter = await Counter.findOneAndUpdate(
            { name: 'treatment' },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );

        this.treatmentNumber = `TRT-${counter.seq}`;
        next();
    } catch (err) {
        next(err as Error);
    }
});

const Treatment = mongoose.model("Treatment", TreatmentSchema);
export default Treatment;
