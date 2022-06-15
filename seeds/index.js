if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");
const axios = require("axios");
const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/yelp-camp";

mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

// call unsplash and return small image
async function seedImg() {
  try {
    const api = "https://api.unsplash.com/";
    const res = await axios.get(api + "photos/random", {
      params: {
        client_id: "a2dTIMkrrP21IMz7KT19hoWXUl-25g0jcpwdc9TJLrM",
        collections: 1114848,
      },
    });
    return res.data.urls.small;
  } catch (e) {
    console.log(e);
  }
}

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const rand1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      // author: "624b2f54035a01795e4a0854", //for local MonogoDB
      author: "6256fe09146de7d59b0afbf9", //for online MongoDB Atlas
      location: `${cities[rand1000].city}, ${cities[rand1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      // image: "https://source.unsplash.com/collection/483251",
      // image: await seedImg(),
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste nisi suscipit eaque pariatur magnam qui laboriosam, id maiores recusandae unde quod saepe velit ipsa cum, voluptatem sed maxime deserunt! Doloremque!",
      price,
      geometry: {
        type: "Point",
        coordinates: [cities[rand1000].longitude, cities[rand1000].latitude],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dy5qpeauf/image/upload/v1649740865/YelpCamp/star_night_kzsnvp.webp",
          filename: "YelpCamp/star_night_kzsnvp",
        },
        {
          url: "https://res.cloudinary.com/dy5qpeauf/image/upload/v1649579628/YelpCamp/river_sl8uiq.webp",
          filename: "YelpCamp/river_sl8uiq.webp",
        },
        {
          url: "https://res.cloudinary.com/dy5qpeauf/image/upload/v1649579645/YelpCamp/start_night2_bcddkn.webp",
          filename: "YelpCamp/start_night2_bcddkn.webp",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
  console.log("Database connection closed");
});
