import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import Patient from "./models/Patient";
import {randomUUID} from "crypto";

const run= async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection("users");
    await db.dropCollection("patients");
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
    await Patient.create(
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

  await db.close();
};

run().catch(console.error);