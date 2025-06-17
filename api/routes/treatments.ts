import express from 'express';
import mongoose from 'mongoose';
import Treatment from '../models/Treatment';
import Patient from '../models/Patient';
import MedicalRecord from '../models/MedicalRecord';
import auth, { RequestWithUser } from '../middleware/auth';
import permit from '../middleware/permit';

const treatmentsRouter = express.Router();

treatmentsRouter.get('/', async (_req, res, next) => {
    try {
        const treatments = await Treatment.find()
            .populate('assignedBy', 'name')
            .populate('updatedBy', 'name')
            .populate('patient', 'firstName lastName')
            .sort({ startDate: -1 });

        res.send(treatments);
    } catch (e) {
        next(e);
    }
});


treatmentsRouter.get('/patient/:patientId', async (req, res, next) => {
    try {
        const patientId = req.params.patientId;

        const patient = await Patient.findById(patientId);
        if (!patient) {
            res.status(404).send({ error: 'Patient not found' });
            return;
        }

        const treatments = await Treatment.find({ patient: patientId })
            .populate('assignedBy', 'name')
            .populate('updatedBy', 'name')
            .populate('patient', 'firstName lastName')
            .populate('medicalRecord')
            .sort({ startDate: -1 });

        res.send(treatments);
    } catch (e) {
        next(e);
    }
});

treatmentsRouter.get('/:id', async (req, res, next) => {
    try {
        const treatment = await Treatment.findById(req.params.id)
            .populate('medicalRecord', '_id')
            .populate('patient', 'firstName lastName')
            .populate('assignedBy', 'name')
            .populate('updatedBy', 'name');

        if (!treatment) {
            res.status(404).send({ error: 'Treatment not found' });
            return;
        }

        res.send(treatment);
    } catch (e) {
        next(e);
    }
});

treatmentsRouter.post('/', async (req, res, next) => {
    const userReq = req as RequestWithUser;

    try {
        const { medicalRecord, patient } = req.body;

        const existingPatient = await Patient.findById(patient);
        const existingRecord = await MedicalRecord.findById(medicalRecord);

        if (!existingPatient || !existingRecord) {
            res.status(400).send({ error: 'Patient or Medical Record not found' });
            return;
        }

        const treatment = new Treatment({
            ...req.body,
            assignedBy: userReq.user._id,
            updatedBy: userReq.user._id,
        });

        await treatment.save();

        await treatment.populate('assignedBy', 'name');
        await treatment.populate('updatedBy', 'name');

        res.status(201).send(treatment);
    } catch (e) {
        next(e);
    }
});

treatmentsRouter.put('/:id', auth, permit('admin', 'doctor'), async (req, res, next) => {
    const userReq = req as RequestWithUser;

    try {
        const treatment = await Treatment.findById(req.params.id);
        if (!treatment) {
            res.status(404).send({ error: 'Treatment not found' });
            return;
        }

        const updateData = {
            ...req.body,
            updatedBy: userReq.user._id,
        };

        const updated = await Treatment.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true,
        })
            .populate('assignedBy', 'name')
            .populate('updatedBy', 'name');

        res.send(updated);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(400).send(error);
            return;
        }
        next(error);
    }
});

treatmentsRouter.delete('/:id', auth, async (req, res, next) => {
    const userReq = req as RequestWithUser;

    try {
        const treatment = await Treatment.findById(req.params.id);
        if (!treatment) {
            res.status(404).send({ error: 'Treatment not found' });
            return;
        }

        const isOwner = treatment.assignedBy.toString() === userReq.user._id.toString();
        const isAdmin = userReq.user.role === 'admin';

        if (!isOwner && !isAdmin) {
            res.status(403).send({ error: 'Not authorized to delete this treatment' });
            return;
        }

        await Treatment.findByIdAndDelete(req.params.id);
        res.send({ message: 'Treatment deleted successfully' });
    } catch (e) {
        next(e);
    }
});

export default treatmentsRouter;
