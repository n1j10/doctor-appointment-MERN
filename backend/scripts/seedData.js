import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import Doctor from "../models/DoctorSchema.js";
import Departments from "../models/Departments.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const uploadsDir = path.join(rootDir, "uploads");

const ensureImageInUploads = (sourceRelativePath, targetFileName) => {
  const sourcePath = path.join(rootDir, sourceRelativePath);
  const targetPath = path.join(uploadsDir, targetFileName);

  if (!fs.existsSync(sourcePath)) {
    throw new Error(`Missing image source file: ${sourceRelativePath}`);
  }

  if (!fs.existsSync(targetPath)) {
    fs.copyFileSync(sourcePath, targetPath);
  }

  return targetFileName;
};

const prepareImages = () => {
  const images = {
    departments: {
      cardiology: ensureImageInUploads("frontend/src/img/departments-1.jpg", "seed-department-cardiology.jpg"),
      neurology: ensureImageInUploads("frontend/src/img/departments-2.jpg", "seed-department-neurology.jpg"),
      pediatrics: ensureImageInUploads("frontend/src/img/departments-3.jpg", "seed-department-pediatrics.jpg"),
      orthopedics: ensureImageInUploads("frontend/src/img/departments-4.jpg", "seed-department-orthopedics.jpg"),
      dermatology: ensureImageInUploads("frontend/src/img/departments-5.jpg", "seed-department-dermatology.jpg"),
    },
    doctors: {
      sarah: ensureImageInUploads("frontend/src/img/doctors/doctors-1.jpg", "seed-doctor-sarah.jpg"),
      omar: ensureImageInUploads("frontend/src/img/doctors/doctors-2.jpg", "seed-doctor-omar.jpg"),
      lina: ensureImageInUploads("frontend/src/img/doctors/doctors-3.jpg", "seed-doctor-lina.jpg"),
      ahmed: ensureImageInUploads("frontend/src/img/doctors/doctors-4.jpg", "seed-doctor-ahmed.jpg"),
      yusuf: ensureImageInUploads("frontend/src/img/doctors/doctor-8.jpg", "seed-doctor-yusuf.jpg"),
      noor: ensureImageInUploads("frontend/src/img/doctors/doctor-9.jpg", "seed-doctor-noor.jpg"),
    },
  };

  return images;
};

const buildDepartments = (images) => [
  {
    name: "Cardiology",
    description: "Diagnosis and treatment of heart and blood vessel conditions.",
    image: images.departments.cardiology,
  },
  {
    name: "Neurology",
    description: "Specialized care for disorders of the brain, spine, and nervous system.",
    image: images.departments.neurology,
  },
  {
    name: "Pediatrics",
    description: "Comprehensive healthcare for infants, children, and adolescents.",
    image: images.departments.pediatrics,
  },
  {
    name: "Orthopedics",
    description: "Treatment for bone, joint, and musculoskeletal injuries and conditions.",
    image: images.departments.orthopedics,
  },
  {
    name: "Dermatology",
    description: "Medical and cosmetic care for skin, hair, and nail conditions.",
    image: images.departments.dermatology,
  },
];

const buildDoctors = (images) => [
  {
    name: "Dr. Sarah Ahmed",
    specialty: "Cardiology",
    description: "Heart specialist focused on preventive care, ECG analysis, and hypertension management.",
    experienceYears: 11,
    image: images.doctors.sarah,
  },
  {
    name: "Dr. Omar Khalid",
    specialty: "Neurology",
    description: "Neurologist experienced in migraine care, seizure disorders, and stroke follow-up.",
    experienceYears: 9,
    image: images.doctors.omar,
  },
  {
    name: "Dr. Lina Mahmoud",
    specialty: "Pediatrics",
    description: "Pediatric consultant for child wellness, growth monitoring, and vaccination plans.",
    experienceYears: 8,
    image: images.doctors.lina,
  },
  {
    name: "Dr. Ahmed Kareem",
    specialty: "Orthopedics",
    description: "Orthopedic surgeon treating fractures, sports injuries, and chronic joint pain.",
    experienceYears: 12,
    image: images.doctors.ahmed,
  },
  {
    name: "Dr. Yusuf Hasan",
    specialty: "Dermatology",
    description: "Dermatologist for acne, eczema, pigmentation issues, and skin health counseling.",
    experienceYears: 7,
    image: images.doctors.yusuf,
  },
  {
    name: "Dr. Noor Ali",
    specialty: "Cardiology",
    description: "Cardiac care specialist for arrhythmia evaluation and long-term risk reduction.",
    experienceYears: 10,
    image: images.doctors.noor,
  },
];

const upsertDepartments = async (departments) => {
  const operations = departments.map((department) => ({
    updateOne: {
      filter: { name: department.name },
      update: { $set: department },
      upsert: true,
    },
  }));

  const result = await Departments.bulkWrite(operations);
  return result;
};

const upsertDoctors = async (doctors) => {
  const operations = doctors.map((doctor) => ({
    updateOne: {
      filter: { name: doctor.name, specialty: doctor.specialty },
      update: { $set: doctor },
      upsert: true,
    },
  }));

  const result = await Doctor.bulkWrite(operations);
  return result;
};

const seed = async () => {
  try {
    await connectDB();
    const images = prepareImages();
    const departments = buildDepartments(images);
    const doctors = buildDoctors(images);

    const [departmentResult, doctorResult] = await Promise.all([
      upsertDepartments(departments),
      upsertDoctors(doctors),
    ]);

    const [departmentsCount, doctorsCount] = await Promise.all([
      Departments.countDocuments(),
      Doctor.countDocuments(),
    ]);

    console.log("Seed completed successfully.");
    console.log(
      `Departments -> upserted: ${departmentResult.upsertedCount}, modified: ${departmentResult.modifiedCount}, total: ${departmentsCount}`
    );
    console.log(
      `Doctors -> upserted: ${doctorResult.upsertedCount}, modified: ${doctorResult.modifiedCount}, total: ${doctorsCount}`
    );
  } catch (error) {
    console.error(`Seed failed: ${error.message}`);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
};

seed();
