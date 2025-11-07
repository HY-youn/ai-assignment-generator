import express from 'express';
import dotenv from 'dotenv';
import { corsMiddleware } from './middleware/cors.js';
import { errorHandler } from './middleware/errorHandler.js';
import assignmentRouter from './routes/assignment.js';
import { generateAssignmentTemplate } from './services/openai.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(corsMiddleware);


// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Routes
app.use('/api', assignmentRouter);
app.post('/api/generate', async (req, res) => {
  try {
    const output = await generateAssignmentTemplate(req.body); // 프론트에서 보낸 9개 필드
    res.json({ output });
  } catch (e: any) {
    console.error(e);
    res.status(500).json({ error: e?.message || 'Server Error' });
  }
});


// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});