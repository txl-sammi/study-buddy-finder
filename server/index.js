import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import flash from "express-flash";
import postRoutes from './routes/posts.js';
import authRouter from './routes/authRouter.js';

const app = express();
dotenv.config();

// Controls the size of images
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended:true}));
app.use(cors());
app.use(flash());
app.use('/posts', postRoutes);
app.use('/login', authRouter);

app.get("/", (req, res) => {
    res.send("StudyBuddyFinder API");
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL, {
    useNewURLParser: true,
    useUnifiedTopology: true,
    dbName: "StudyBuddyFinder",
})
.then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
.catch((error) => console.log(error.message));

