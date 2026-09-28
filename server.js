import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Cargar variables de entorno seguras
dotenv.config();

const app = express();
// Habilitar CORS para que tu interfaz web (Vite) pueda comunicarse con el backend
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// ==========================================
// 1. TRADUCCIÓN DE TEXTO (DeepSeek / Qwen)
// ==========================================
app.post('/api/translate/text', async (req, res) => {
    const { text, targetLang } = req.body;

    if (!text || !targetLang) {
        return res.status(400).json({ error: 'Faltan parámetros requeridos: text o targetLang' });
    }

    try {
        // Conexión directa a la API de la IA China DeepSeek (Evita bloqueos)
        const response = await fetch("https://deepseek.com", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.DEEPSEEK_API_KEY}`
            },
            body: JSON.stringify({
                model: "deepseek-chat",
                messages: [
                    { 
                        role: "system", 
                        content: `Eres el motor central de JCV CHAT FĀNYÌ. Traduce el texto al idioma ${targetLang} de forma natural, fluida y exacta. Devuelve ÚNICAMENTE la traducción directa sin explicaciones.` 
                    },
                    { role: "user", content: text }
                ],
                temperature: 0.3
            })
        });

        const data = await response.json();
        const translatedText = data.choices[0].message.content.trim();
        
        // Respuesta efímera: enviamos y no guardamos nada en logs por privacidad mundial
        res.json({ success: true, translatedText });

    } catch (error) {
        console.error("Error en traducción de texto:", error);
        res.status(500).json({ error: 'Error interno en el puente de traducción de la IA.' });
    }
});

// ==========================================
// 2. LLAMADAS Y VIDEOLLAMADAS (SeamlessM4T v2)
// ==========================================
app.post('/api/translate/stream', async (req, res) => {
    const { audioBlob, targetLang, mode } = req.body; 
    // mode puede ser: "voice" (clonación real de voz) o "text" (subtítulos en videollamada)

    try {
        // Redirección híbrida: Envía el audio al nodo de procesamiento SeamlessM4T v2 en Hugging Face
        const response = await fetch(`${process.env.SEAMLESS_NODE_URL}/api/predict`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                audio: audioBlob, // Audio capturado del micrófono del celular
                task: mode === "voice" ? "speech-to-speech" : "speech-to-text",
                target_language: targetLang
            })
        });

        const result = await response.json();
        
        // Retornamos el resultado en milisegundos
        res.json({
            success: true,
            audioOutput: result.audio || null, // Voz clonada traducida
            textOutput: result.text || null     // Subtítulo traducido
        });

    } catch (error) {
        console.error("Error en procesamiento SeamlessM4T:", error);
        res.status(500).json({ error: 'El nodo de procesamiento de voz no responde.' });
    }
});

// Inicio del servidor en el puerto local
app.listen(PORT, () => {
    console.log(`JCV CHAT FĀNYÌ Backend corriendo de forma segura en puerto ${PORT}`);
});
