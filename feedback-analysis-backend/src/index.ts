import express from 'express';
import connectDb from "./db";
import feedbackRoutes from "./routes/feedback.routes";

const app = express();
const PORT = process.env.PORT;

app.use(express.json())
app.use('/api', feedbackRoutes)

connectDb().then( () => {
    app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`)
    })
});

