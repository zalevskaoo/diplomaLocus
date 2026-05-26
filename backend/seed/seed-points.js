const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const MONGO_URI = 'mongodb://localhost:27017/kyiv-access';

const PointSchema = new mongoose.Schema(
  {
    title: String,
    category: String,
    address: String,
    description: String,
    latitude: Number,
    longitude: Number,
    createdBy: String,
    imageUrls: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true },
);

const Point = mongoose.model('Point', PointSchema);

async function seedPoints() {
  await mongoose.connect(MONGO_URI);

  const filePath = path.join(__dirname, 'points.json');
  const points = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  await Point.insertMany(points);

  console.log(`Inserted ${points.length} points`);

  await mongoose.disconnect();
}

seedPoints().catch((error) => {
  console.error(error);
  process.exit(1);
});