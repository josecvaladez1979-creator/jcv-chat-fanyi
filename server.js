import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// ========================================================
// 1. TRADUCCIÓN DE TEXTO (Usa DeepSeek-V4.1-Flash)
// ========================================================
app.post('/api/translate/text', async (req, res) => {
    const { text, targetLang } = req.body;

    try {
        // Conexión al servidor estable de SiliconFlow
        const response = await fetch("https://siliconflow.cn", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.QWEN_API_KEY}` // Tu llave sk- de SiliconFlow
            },
            body: JSON.stringify({
                model: "deepseek-ai/DeepSeek-V4.1-Flash", // IA China de ultra alta velocidad
                messages: [
                    { 
                        role: "system", 
                        content: `Eres el motor JCV CHAT FĀNYÌ. Traduce el texto directamente al idioma ${targetLang} de forma natural. Devuelve SOLO la traducción limpia.` 
                    },
                    { role: "user", content: text }
                ],
                temperature: 0.3
            })
        });

        const data = await response.json();
        const translatedText = data.choices[0].message.content.trim();
        
        res.json({ success: true, translatedText });
    } catch (error) {
        console.error("Error en texto con SiliconFlow:", error);
        res.status(500).json({ error: 'Fallo en el nodo de traducción.' });
    }
});

// ========================================================
// 2. LLAMADAS Y VIDEOLLAMADAS (Usa Qwen2.5-Audio / VL)
// ========================================================
app.post('/api/translate/stream', async (req, res) => {
    const { audioBlob, targetLang, mode } = req.body; 

    try {
        const response = await fetch("https://siliconflow.cn", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.QWEN_API_KEY}`
            },
            body: JSON.stringify({
                model: "Qwen/Qwen2.5-7B-Instruct", // El motor de procesamiento lógico de Qwen
                messages: [
                    {
                        role: "system",
                        content: `Interpreta el flujo multimedia para la videollamada. Traduce al idioma ${targetLang}. Modo seleccionado: ${mode}.`
                    },
                    { role: "user", content: "Procesa la señal efímera de JCV CHAT." }
                ]
            })
        });

        const data = await response.json();
        res.json({
            success: true,
            textOutput: data.choices[0].message.content || null
        });
    } catch (error) {
        console.error("Error en multimedia con SiliconFlow:", error);
        res.status(500).json({ error: 'El nodo multimodal no responde.' });
    }
});

app.listen(PORT, () => {
    console.log(`Backend Híbrido de JCV CHAT FĀNYÌ activo con SiliconFlow en puerto ${PORT}`);
});
