const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const MONGO_URI = 'mongodb://localhost:27017/kyiv-access';

const PointSchema = new mongoose.Schema(
  {
    title: String,
    type: {
      type: String,
      default: 'point',
    },
    category: String,
    address: String,
    description: String,
    latitude: Number,
    longitude: Number,
    path: [
      {
        latitude: Number,
        longitude: Number,
      },
    ],
    status: {
      type: String,
      default: 'approved',
    },
    createdBy: String,
    imageUrls: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true },
);

const Point = mongoose.model('Point', PointSchema, 'points');

async function seedPoints() {
  await mongoose.connect(MONGO_URI);

  const filePath = path.join(__dirname, 'points.json');
  const points = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  const normalizedPoints = points.map((point) => ({
    ...point,
    status: point.status ?? 'approved',
    imageUrls: point.imageUrls ?? [],
  }));

  await Point.insertMany(normalizedPoints);

  console.log(`Inserted ${normalizedPoints.length} points`);

  await mongoose.disconnect();
}

seedPoints().catch((error) => {
  console.error(error);
  process.exit(1);
});