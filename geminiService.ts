
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateBoltResponseStream = async (prompt: string, currentFiles: any[]) => {
  try {
    const responseStream = await ai.models.generateContentStream({
      model: "gemini-3-flash-preview", // أسرع موديل متاح حالياً
      contents: `المستخدم يطلب بناء/تعديل تطبيق.
      الملفات الحالية: ${JSON.stringify(currentFiles.map(f => ({ path: f.path, type: f.type })))}
      الطلب: ${prompt}
      
      يجب أن ترد بتنسيق JSON حصراً.`,
      config: {
        systemInstruction: `أنت "بولت العربي" (Bolt Arabic). نظام ذكي وسريع جداً لبناء التطبيقات.
        أهم قاعدة: يجب أن تكون استجابتك JSON دقيق وصحيح دائماً.
        لا تكتب أي نص خارج الـ JSON.
        استخدم React و Tailwind CSS و Lucide Icons للبرمجة.
        
        نمط الرد المطلوب:
        {
          "explanation": "شرح سريع ومختصر بالعربية لما ستقوم به",
          "steps": [
            { "id": "1", "title": "تثبيت الأدوات", "description": "تثبيت المكتبات اللازمة", "type": "shell", "content": "npm install lucide-react" },
            { "id": "2", "title": "تحديث الواجهة", "description": "بناء الهيكل المطلوب", "type": "file", "path": "App.tsx", "content": "كود react كامل هنا" }
          ]
        }`,
        responseMimeType: "application/json"
      }
    });

    return responseStream;
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};
