import express from 'express';
import connectDb from "./db";
import feedbackRoutes from "./routes/feedback.routes";
import cors from 'cors';

const app = express();
const PORT = process.env.PORT;

app.use(cors({
    origin: 'http://localhost:3001'
}));

app.use(express.json())
app.use('/api', feedbackRoutes)

connectDb().then( () => {
    app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`)
    })
});

