import express from 'express';
import cors from 'cors';
import userRoute from './routes/userRoute.js';
import FileUpload from 'express-fileupload';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(FileUpload());
app.use(express.static('public'));
app.use(userRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
