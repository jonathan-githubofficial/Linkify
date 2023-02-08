import express , {Request , Response} from "express";
import mongoose from 'mongoose';
const app = express();

const db = await mongoose.connect('mongodb+srv://SheikhEllendraIII:qrL9V14HEQvRulyA@cluster0.hkm14qd.mongodb.net/?retryWrites=true&w=majority');

app.get("/",(req: Request, res: Response) => {
    res.send ('hello abo mohamed')
});

app.listen(5000);

