import mongoose, { HydratedDocument, Model } from "mongoose";
import Counter from "./Counter";

export interface MedicalRecordFields {
    patient: mongoose.Types.ObjectId;
    doctor: mongoose.Types.ObjectId;
    visitDate: Date;
    symptoms: string[];
    diagnosis: string;
    notes: string;
    createdBy: mongoose.Types.ObjectId;
    updatedBy: mongoose.Types.ObjectId;
    recordNumber: string;
}

type MedicalRecordModel = Model<MedicalRecordFields, {}>;

const Schema = mongoose.Schema;

const MedicalRecordSchema = new Schema<HydratedDocument<MedicalRecordFields>, MedicalRecordModel>({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    visitDate: { type: Date, required: true, default: Date.now },
    symptoms: [{ type: String }],
    diagnosis: { type: String, required: true },
    notes: { type: String },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    recordNumber: { type: String, unique: true }, // ➕ добавили
}, { timestamps: true });

MedicalRecordSchema.index({ patient: 1, visitDate: -1 });
MedicalRecordSchema.index({ doctor: 1 });
MedicalRecordSchema.index({ diagnosis: 'text' });

MedicalRecordSchema.pre('save', async function (next) {
    if (!this.isNew) return next();

    try {
        const counter = await Counter.findOneAndUpdate(
            { name: 'medicalRecord' },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );

        this.recordNumber = `MR-${counter.seq}`;
        next();
    } catch (error) {
        next(error as Error);
    }
});

const MedicalRecord = mongoose.model("MedicalRecord", MedicalRecordSchema);
export default MedicalRecord;
