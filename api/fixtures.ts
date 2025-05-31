import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import Patient from "./models/Patient";
import {randomUUID} from "crypto";
import MedicalRecord from "./models/MedicalRecord";
import Treatment from "./models/Treatment";

const run= async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection("users");
    await db.dropCollection("patients");
    await db.dropCollection("medicalrecords");
    await db.dropCollection("treatments");
  } catch (e) {
      console.log("Collections were not presents, skipping drop ");
  }

  const [doc_1, doc_2] = await User.create(
      {
          username: "admin",
          password: "admin",
          role: "admin",
          name: "Admin",
          specialization: "admin",
          token: randomUUID(),
          avatar: "",
      },
      {
          username: "doc_asan",
          password: "123",
          role: "doctor",
          name: "Асан Асанов",
          specialization: "Кардиолог",
          token: randomUUID(),
          avatar: "fixtures/doc_1.jpg",
      },
      {
          username: "doc_uson",
          password: "123",
          role: "doctor",
          name: "Усон Усонов",
          specialization: "Травматолог",
          token: randomUUID(),
          avatar: "fixtures/doc_2.webp",
      },
  );
    const [patient1, patient2, patient3] = await Patient.create(
        {
            firstName: "Айжан",
            lastName: "Токтогулова",
            middleName: "Эсеновна",
            dateOfBirth: new Date("1990-04-15"),
            gender: "female",
            address: "г. Бишкек, ул. Абдрахманова 55",
            phone: "+996700123456",
            email: "aizhan@example.com",
            insuranceNumber: "INS123456",
            bloodType: "A+",
            allergies: "Пыльца",
            chronicDiseases: "Гипертония",
        },
        {
            firstName: "Нурсултан",
            lastName: "Исмаилов",
            middleName: "Канатович",
            dateOfBirth: new Date("1985-09-30"),
            gender: "male",
            address: "г. Ош, ул. Ленина 12",
            phone: "+996555654321",
            email: "nursultan@example.com",
            insuranceNumber: "INS654321",
            bloodType: "B-",
            allergies: "Нет",
            chronicDiseases: "Астма",
        },
        {
            firstName: "Жылдыз",
            lastName: "Садыкова",
            middleName: "Мирлановна",
            dateOfBirth: new Date("2000-01-05"),
            gender: "female",
            address: "г. Кара-Балта, ул. Молодежная 7",
            phone: "+996770789012",
            email: "jyldyz@example.com",
            insuranceNumber: "INS789012",
            bloodType: "O+",
            allergies: "Лактоза",
            chronicDiseases: "Нет",
        }
    );

    const [record1, record2, record3, record4] = await MedicalRecord.create(
        {
            patient: patient1._id,
            doctor: doc_1._id,
            visitDate: new Date("2024-10-01T10:00:00Z"),
            symptoms: "Боль в груди, головокружение",
            diagnosis: "Гипертонический криз",
            notes: "Назначены препараты для снижения давления, повторный приём через неделю",
            createdBy: doc_1._id,
            updatedBy: doc_1._id,
        },
        {
            patient: patient2._id,
            doctor: doc_2._id,
            visitDate: new Date("2024-11-15T14:30:00Z"),
            symptoms: "Боль в правом колене после травмы",
            diagnosis: "Растяжение связок",
            notes: "Назначено МРТ, временно ограничить нагрузку",
            createdBy: doc_2._id,
            updatedBy: doc_2._id,
        },
        {
            patient: patient3._id,
            doctor: doc_2._id,
            visitDate: new Date("2025-01-20T09:00:00Z"),
            symptoms: "Одышка, быстрая утомляемость",
            diagnosis: "Анемия",
            notes: "Назначены анализы крови, препараты железа",
            createdBy: doc_2._id,
            updatedBy: doc_2._id,
        },
        {
            patient: patient1._id,
            doctor: doc_1._id,
            visitDate: new Date("2025-03-05T16:00:00Z"),
            symptoms: "Ушиб локтя",
            diagnosis: "Без повреждений кости, легкая гематома",
            notes: "Назначен холод и покой на 2-3 дня",
            createdBy: doc_1._id,
            updatedBy: doc_1._id,
        }
    );

    await Treatment.create(
        {
            medicalRecord: record1._id,
            patient: patient1._id,
            type: 'medication',
            name: 'Эналаприл',
            description: 'Препарат для снижения давления',
            dosage: '10мг',
            frequency: '2 раза в день',
            duration: '7 дней',
            startDate: new Date("2024-10-02"),
            endDate: new Date("2024-10-09"),
            status: 'completed',
            assignedBy: doc_1._id,
            updatedBy: doc_1._id,
        },
        {
            medicalRecord: record2._id,
            patient: patient2._id,
            type: 'procedure',
            name: 'МРТ колена',
            description: 'Магнитно-резонансная томография правого колена',
            startDate: new Date("2024-11-17"),
            status: 'scheduled',
            assignedBy: doc_2._id,
            updatedBy: doc_2._id,
        },
        {
            medicalRecord: record3._id,
            patient: patient3._id,
            type: 'medication',
            name: 'Феррум Лек',
            description: 'Препарат железа при анемии',
            dosage: '1 таблетка',
            frequency: '1 раз в день',
            duration: '1 месяц',
            startDate: new Date("2025-01-22"),
            endDate: new Date("2025-02-22"),
            status: 'in-progress',
            assignedBy: doc_2._id,
            updatedBy: doc_2._id,
        },
        {
            medicalRecord: record4._id,
            patient: patient1._id,
            type: 'recommendation',
            name: 'Покой и холод',
            description: 'Прикладывать лёд, избегать нагрузки',
            startDate: new Date("2025-03-06"),
            status: 'completed',
            assignedBy: doc_1._id,
            updatedBy: doc_1._id,
        }
    );
    await db.close();
};

run().catch(console.error);