import mongoose, { HydratedDocument, Model } from "mongoose";

export interface MedicalRecordFields {
    patient: mongoose.Types.ObjectId;
    doctor: mongoose.Types.ObjectId;
    visitDate: Date;
    symptoms: string[];
    diagnosis: string;
    notes: string;
    createdBy: mongoose.Types.ObjectId;
    updatedBy: mongoose.Types.ObjectId;
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
}, { timestamps: true });

MedicalRecordSchema.index({ patient: 1, visitDate: -1 });
MedicalRecordSchema.index({ doctor: 1 });
MedicalRecordSchema.index({ diagnosis: 'text' });

const MedicalRecord = mongoose.model("MedicalRecord", MedicalRecordSchema);
export default MedicalRecord;