import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "2mb" }));

const PORT = process.env.PORT || 3000;

const SILICONFLOW_API_KEY = process.env.SILICONFLOW_API_KEY;
const TEXT_MODEL =
    process.env.TEXT_MODEL || "deepseek-ai/DeepSeek-V4-Flash";

const TRANSLATION_MODE =
    process.env.TRANSLATION_MODE || "accurate";

const SEAMLESS_NODE_URL =
    process.env.SEAMLESS_NODE_URL || "http://localhost:8000";

const VOICE_ENGINE_ENABLED =
    process.env.VOICE_ENGINE_ENABLED === "true";

// ========================================================
// CONFIGURACIÓN
// ========================================================

const SILICONFLOW_URL =
    "https://api.siliconflow.cn/v1/chat/completions";


// ========================================================
// VALIDACIÓN DE CONFIGURACIÓN
// ========================================================

function checkSiliconFlowKey() {
    if (!SILICONFLOW_API_KEY) {
        throw new Error(
            "Falta SILICONFLOW_API_KEY en el archivo .env"
        );
    }
}


// ========================================================
// LLAMADA CENTRAL A SILICONFLOW
// ========================================================

async function callSiliconFlow(messages, options = {}) {

    checkSiliconFlowKey();

    const response = await fetch(SILICONFLOW_URL, {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${SILICONFLOW_API_KEY}`
        },

        body: JSON.stringify({
            model: TEXT_MODEL,
            messages,
            temperature:
                options.temperature ?? 0.15
        })
    });

    const data = await response.json();

    if (!response.ok) {

        console.error(
            "SiliconFlow respondió con error:",
            data
        );

        throw new Error(
            data?.message ||
            data?.error?.message ||
            `Error HTTP ${response.status}`
        );
    }

    const result =
        data?.choices?.[0]?.message?.content;

    if (!result) {
        throw new Error(
            "SiliconFlow no devolvió contenido."
        );
    }

    return result.trim();
}


// ========================================================
// PROMPT PRINCIPAL DE TRADUCCIÓN
// ========================================================

function buildTranslationPrompt({
    sourceLang,
    targetLang,
    context,
    mode
}) {

    return `
Eres el motor lingüístico principal de JCV CHAT FĀNYÌ.

OBJETIVO:
Realiza una traducción de máxima fidelidad entre idiomas.

REGLAS FUNDAMENTALES:

1. Conserva el significado exacto del texto original.
2. NO traduzcas palabra por palabra cuando eso destruya el significado.
3. Conserva la intención del hablante.
4. Conserva el contexto de la conversación.
5. Conserva el tono:
   - formal
   - informal
   - técnico
   - profesional
   - coloquial
   - humorístico
   - emocional
6. Conserva nombres propios.
7. No inventes información.
8. No agregues explicaciones.
9. No elimines información.
10. Conserva fechas, números, cantidades y unidades.
11. Conserva términos técnicos cuando corresponda.
12. Respeta modismos y expresiones idiomáticas.
13. Si existe una expresión equivalente natural en el idioma destino,
    utiliza esa expresión sin cambiar el significado.
14. Si una frase es ambigua, utiliza el contexto disponible.
15. Nunca inventes una interpretación cuando el contexto no la permite.
16. La traducción debe sonar natural para un hablante nativo.
17. La fidelidad al significado tiene prioridad sobre la literalidad.
18. NO incluyas comentarios sobre la traducción.

IDIOMA ORIGINAL:
${sourceLang || "detectar automáticamente"}

IDIOMA DESTINO:
${targetLang}

MODO:
${mode}

CONTEXTO DISPONIBLE:
${context || "No existe contexto adicional."}

DEVUELVE ÚNICAMENTE LA TRADUCCIÓN.
`;
}


// ========================================================
// REVISOR DE CALIDAD
// ========================================================

function buildReviewPrompt({
    original,
    translation,
    sourceLang,
    targetLang,
    context
}) {

    return `
Eres el revisor lingüístico de máxima precisión de JCV CHAT FĀNYÌ.

Debes revisar una traducción existente.

IDIOMA ORIGINAL:
${sourceLang || "desconocido"}

IDIOMA DESTINO:
${targetLang}

CONTEXTO:
${context || "Sin contexto adicional."}

TEXTO ORIGINAL:
${original}

TRADUCCIÓN PROPUESTA:
${translation}

REVISA ESPECIALMENTE:

- significado
- omisiones
- información inventada
- nombres propios
- números
- fechas
- unidades
- tiempos verbales
- género y número
- pronombres
- negaciones
- términos técnicos
- modismos
- tono
- intención
- contexto
- naturalidad para un hablante nativo

Si la traducción ya es correcta, CONSÉRVALA.

Si encuentras un error, corrígelo.

NO expliques los cambios.

DEVUELVE ÚNICAMENTE LA TRADUCCIÓN FINAL.
`;
}


// ========================================================
// 1. TRADUCCIÓN DE TEXTO
// ========================================================

app.post("/api/translate/text", async (req, res) => {

    const {
        text,
        targetLang,
        sourceLang,
        context,
        mode
    } = req.body;

    if (!text || typeof text !== "string") {

        return res.status(400).json({
            success: false,
            error: "Falta el texto que se desea traducir."
        });
    }

    if (!targetLang) {

        return res.status(400).json({
            success: false,
            error: "Falta el idioma de destino."
        });
    }

    try {

        const translationMode =
            mode || TRANSLATION_MODE;

        // ------------------------------------------------
        // PASO 1: TRADUCCIÓN
        // ------------------------------------------------

        const initialTranslation =
            await callSiliconFlow(
                [
                    {
                        role: "system",
                        content: buildTranslationPrompt({
                            sourceLang,
                            targetLang,
                            context,
                            mode: translationMode
                        })
                    },
                    {
                        role: "user",
                        content: text
                    }
                ],
                {
                    temperature: 0.15
                }
            );


        // ------------------------------------------------
        // PASO 2: REVISIÓN DE PRECISIÓN
        // ------------------------------------------------

        let finalTranslation =
            initialTranslation;

        let reviewed = false;

        if (translationMode === "accurate") {

            finalTranslation =
                await callSiliconFlow(
                    [
                        {
                            role: "system",
                            content: buildReviewPrompt({
                                original: text,
                                translation:
                                    initialTranslation,
                                sourceLang,
                                targetLang,
                                context
                            })
                        },
                        {
                            role: "user",
                            content:
                                "Revisa la traducción y devuelve únicamente la versión final."
                        }
                    ],
                    {
                        temperature: 0.05
                    }
                );

            reviewed = true;
        }


        // ------------------------------------------------
        // RESPUESTA
        // ------------------------------------------------

        return res.json({

            success: true,

            sourceLang:
                sourceLang || "auto",

            targetLang,

            originalText: text,

            translatedText:
                finalTranslation,

            qualityMode:
                translationMode,

            reviewed,

            model:
                TEXT_MODEL
        });

    } catch (error) {

        console.error(
            "Error de traducción:",
            error
        );

        return res.status(500).json({

            success: false,

            error:
                "No fue posible completar la traducción.",

            details:
                error.message
        });
    }
});


// ========================================================
// 2. ESTADO DEL BACKEND
// ========================================================

app.get("/api/health", (req, res) => {

    res.json({

        success: true,

        service:
            "JCV CHAT FĀNYÌ",

        status:
            "online",

        translation: {

            enabled:
                Boolean(SILICONFLOW_API_KEY),

            model:
                TEXT_MODEL,

            mode:
                TRANSLATION_MODE
        },

        voice: {

            enabled:
                VOICE_ENGINE_ENABLED,

            seamlessNode:
                SEAMLESS_NODE_URL
        }
    });
});


// ========================================================
// 3. NODO DE VOZ - PREPARADO PARA SEAMLESSM4T v2
// ========================================================

app.post("/api/translate/voice", async (req, res) => {

    if (!VOICE_ENGINE_ENABLED) {

        return res.status(503).json({

            success: false,

            error:
                "El motor de voz todavía no está activado.",

            nextStep:
                "Configurar el nodo SeamlessM4T v2."
        });
    }

    try {

        const response = await fetch(
            `${SEAMLESS_NODE_URL}/translate`,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify(
                    req.body
                )
            }
        );

        const data =
            await response.json();

        if (!response.ok) {

            return res.status(
                response.status
            ).json({

                success: false,

                error:
                    data?.error ||
                    "El nodo SeamlessM4T no respondió correctamente."
            });
        }

        return res.json({

            success: true,

            engine:
                "SeamlessM4T v2",

            result:
                data
        });

    } catch (error) {

        console.error(
            "Error del nodo SeamlessM4T:",
            error
        );

        return res.status(502).json({

            success: false,

            error:
                "No se pudo conectar con el nodo de voz SeamlessM4T."
        });
    }
});


// ========================================================
// SERVIDOR
// ========================================================

app.listen(PORT, () => {

    console.log("");
    console.log(
        "=============================================="
    );

    console.log(
        "JCV CHAT FĀNYÌ - BACKEND"
    );

    console.log(
        "=============================================="
    );

    console.log(
        `Servidor: http://localhost:${PORT}`
    );

    console.log(
        `Modelo: ${TEXT_MODEL}`
    );

    console.log(
        `Modo de traducción: ${TRANSLATION_MODE}`
    );

    console.log(
        `Motor de voz: ${
            VOICE_ENGINE_ENABLED
                ? "ACTIVO"
                : "PREPARADO"
        }`
    );

    console.log(
        "=============================================="
    );

});
