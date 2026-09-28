import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// ========================================================
// 1. TRADUCCIÓN DE TEXTO (Qwen-Chat / DeepSeek)
// ========================================================
app.post('/api/translate/text', async (req, res) => {
    const { text, targetLang } = req.body;

    try {
        // Conexión con la API de Qwen a través de DashScope o proveedores libres de censura
        const response = await fetch("https://aliyuncs.com", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.QWEN_API_KEY}`
            },
            body: JSON.stringify({
                model: "qwen-max", // El modelo de texto más potente de Alibaba
                messages: [
                    { role: "system", content: `Eres JCV CHAT FĀNYÌ. Traduce el texto al idioma ${targetLang} de forma fluida. Entrega solo la traducción.` },
                    { role: "user", content: text }
                ]
            })
        });

        const data = await response.json();
        res.json({ success: true, translatedText: data.choices[0].message.content.trim() });
    } catch (error) {
        console.error("Error en texto con Qwen:", error);
        res.status(500).json({ error: 'Fallo en el puente de texto Qwen.' });
    }
});

// ========================================================
// 2. LLAMADAS Y VIDEOLLAMADAS EN TIEMPO REAL (Qwen-Audio / Omni)
// ========================================================
app.post('/api/translate/stream', async (req, res) => {
    const { audioBlob, targetLang, mode } = req.body; 
    // mode puede ser: "voice" (Traducción de voz simultánea) o "text" (Subtítulos en pantalla)

    try {
        // Petición al nodo multimodal Qwen2.5-Omni / Qwen3-Audio
        const response = await fetch("https://aliyuncs.com", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.QWEN_API_KEY}`
            },
            body: JSON.stringify({
                model: "qwen2.5-audio-7b-instruct", // El motor de audio en tiempo real de Qwen
                messages: [
                    {
                        role: "system",
                        content: `Traduce este flujo de audio directamente al idioma ${targetLang}. Si el modo es voice, devuelve la respuesta estructurada para clonación de voz. Si es text, genera subtítulos textuales.`
                    },
                    {
                        role: "user",
                        content: [
                            { audio_url: audioBlob }, // El audio capturado desde el celular en WeChat/WhatsApp
                            { text: "Traduce e interpreta de forma simultánea." }
                        ]
                    }
                ]
            })
        });

        const data = await response.json();
        
        res.json({
            success: true,
            // Qwen procesa el audio y genera la respuesta efímera de inmediato
            audioOutput: data.choices[0].message.audio || null, 
            textOutput: data.choices[0].message.content || null
        });
    } catch (error) {
        console.error("Error en audio con Qwen-Omni:", error);
        res.status(500).json({ error: 'El nodo multimodal de Qwen no responde.' });
    }
});

app.listen(PORT, () => {
    console.log(`Backend de JCV CHAT FĀNYÌ con Qwen corriendo en puerto ${PORT}`);
});
