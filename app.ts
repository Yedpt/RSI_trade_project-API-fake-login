import { Sequelize } from "sequelize";
import connectionDB from "./database/connectionDB";
import UserModel from "./models/userLoginModel";
import { PORT } from "./config";
import express from "express";
import cors from "cors";
import authRouter from "./routes/authRoutes";


export const app = express();

app.use (cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.use("/api/users", authRouter);

const initDB = async (sequelize: Sequelize) => {
    try {
        await sequelize.authenticate();
        console.log("Conexión exitosa a la base de datos.");

        await UserModel.sync({ force: false });
        console.log("Tabla de usuarios sincronizada.");

        
    } catch (error) {
        console.error("Error al conectar la base de datos:", error);
    }
};

initDB(connectionDB);


// Iniciar servidor
export const server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});