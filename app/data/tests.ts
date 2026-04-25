// ✅ Centralized Test Data (Used across app)

export const tests = [
  // 🔥 FULL BODY CHECKUPS
  {
    id: "full-body-essential",
    category: "Full Body Checkups",
    name: "Full Body Checkup - Essential",
    price: 1599,
    original: 5243,
    parameters: "91 parameters",
    reportTime: "Reports in 6 hrs",
    rating: 4.8,
    reviews: 1200,
    description:
      "A comprehensive health screening covering essential blood tests to assess overall health and detect early issues.",
    includes: [
      "Hemoglobin",
      "RBC Count",
      "WBC Count",
      "Platelets",
      "Blood Sugar",
      "Cholesterol",
    ],
  },
  {
    id: "cbc-checkup",
    category: "Full Body Checkups",
    name: "CBC Checkup",
    price: 1299,
    original: 7708,
    parameters: "100 parameters",
    reportTime: "Reports in 6 hrs",
    rating: 4.9,
    reviews: 950,
    description:
      "Advanced full body checkup with additional parameters for deeper health insights and early detection.",
    includes: [
      "Liver Function",
      "Kidney Function",
      "Thyroid Profile",
      "Vitamin B12",
      "Vitamin D",
    ],
  },
  {
    id: "full-body-ultra",
    category: "Full Body Checkups",
    name: "Full Body Checkup - Ultra",
    price: 3499,
    original: 9999,
    parameters: "120 parameters",
    reportTime: "Reports in 12 hrs",
    rating: 4.9,
    reviews: 700,
    description:
      "Premium package with extensive parameters covering all major health markers.",
    includes: [
      "Cardiac Risk Markers",
      "Hormone Panel",
      "Diabetes Panel",
      "Complete Blood Panel",
    ],
  },

  // 🔥 WOMEN HEALTH
  {
    id: "women-essential",
    category: "Women Health",
    name: "Women Health Checkup - Essential",
    price: 1599,
    original: 5563,
    parameters: "71 parameters",
    reportTime: "Reports in 12 hrs",
    rating: 4.7,
    reviews: 800,
    description:
      "Specially designed for women's health covering hormonal and nutritional parameters.",
    includes: [
      "Thyroid Profile",
      "Iron Studies",
      "Calcium",
      "Vitamin D",
    ],
  },
  {
    id: "women-advanced",
    category: "Women Health",
    name: "Women Health Checkup - Advanced",
    price: 2699,
    original: 11013,
    parameters: "97 parameters",
    reportTime: "Reports in 12 hrs",
    rating: 4.8,
    reviews: 650,
    description:
      "Advanced screening for women's health including hormone and metabolic checks.",
    includes: [
      "Hormone Panel",
      "Vitamin Panel",
      "Diabetes Check",
      "Liver Function",
    ],
  },

  // 🔥 DIABETES
  {
    id: "diabetes-care",
    category: "Diabetes Care",
    name: "Diabetes Care Package",
    price: 499,
    original: 899,
    parameters: "25 parameters",
    reportTime: "Reports in 6 hrs",
    rating: 4.6,
    reviews: 500,
    description:
      "Comprehensive diabetes monitoring package including blood sugar and HbA1c.",
    includes: [
      "Fasting Blood Sugar",
      "Postprandial Sugar",
      "HbA1c",
    ],
  },

  // 🔥 HEART HEALTH
  {
    id: "heart-health",
    category: "Heart Health",
    name: "Heart Health Package",
    price: 799,
    original: 1499,
    parameters: "30 parameters",
    reportTime: "Reports in 8 hrs",
    rating: 4.7,
    reviews: 450,
    description:
      "Check cholesterol levels and assess heart disease risk.",
    includes: [
      "Lipid Profile",
      "Triglycerides",
      "HDL",
      "LDL",
    ],
  },

  // 🔥 VITAMIN
  {
    id: "vitamin-test",
    category: "Vitamin Tests",
    name: "Vitamin Deficiency Test",
    price: 599,
    original: 999,
    parameters: "10 parameters",
    reportTime: "Reports in 6 hrs",
    rating: 4.5,
    reviews: 300,
    description:
      "Detect deficiencies in essential vitamins like Vitamin D and B12.",
    includes: [
      "Vitamin D",
      "Vitamin B12",
    ],
  },
];