import express from "express";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
import path from "path";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import ConnectDB from "./lib/connect.js";
import AuthRoutes from "./routes/auth.routes.js";
import AdminRoutes from "./routes/admin.route.js";
import AlbumRoutes from "./routes/album.routes.js";
import SongRoutes from "./routes/song.routes.js";
import StatsRoutes from "./routes/stats.route.js";
import UserRoutes from "./routes/user.routes.js";

dotenv.config();

const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT || 9001;

// Middleware
app.use(express.json());
app.use(clerkMiddleware());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "temp"),
    createParentPath: true,
    limits: {
      fileSize: 10 * 1024 * 1024, // 10mb max filesize (fix: 10 * 1024 * 1024)
    },
  })
);

// Register routes BEFORE starting the server
app.use("/api/auth", AuthRoutes);
app.use("/api/admin", AdminRoutes);
app.use("/api/users", UserRoutes);
app.use("/api/songs", SongRoutes);
app.use("/api/albums", AlbumRoutes);
app.use("/api/stats", StatsRoutes);

const Start = async () => {
  try {
    await ConnectDB();
    app.listen(PORT, () => console.log(`Server Started on PORT:${PORT}`));
  } catch (error) {
    console.log("Start Error", error);
  }
};

Start();
