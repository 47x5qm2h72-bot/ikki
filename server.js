import express from 'express';
import cors from 'cors';
import Groq from 'groq-sdk';
import 'dotenv/config';

const app = express();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ status: 'ok' });
});

app.post('/api/chat', async (req, res) => {
    try {
        const { messages } = req.body;
        const response = await groq.chat.completions.create({
            model: 'llama-3.3-70b-versatile',
            messages: [
                { role: 'system', content: 'Du er en hjelpsom AI-coach for Borke Coaching.' },
                ...messages
            ]
        });
        res.json({ reply: response.choices[0].message.content });
    } catch (error) {
        console.error('Feil:', error.message);
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => {
    console.log('API kjører!');
});
