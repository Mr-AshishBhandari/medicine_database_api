
import express  from 'express';
import mongoose  from "mongoose";
import medicineRoute from './routes/medicine.js';
import dotenv from 'dotenv';


const app = express()
app.use(express.json());
dotenv.config()

app.get('/',(req,res)=>{
    res.send({'message':'Api running successsfully.......'})
})

const MONGO_URI=process.env.MONGO_URI;
const PORT=process.env.PORT

await mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Connection error:', err.message);
  });

app.use("/api/medicine", medicineRoute);

export default app;
