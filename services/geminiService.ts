import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const getCareerAdvice = async (jobTitle: string, userQuery: string): Promise<string> => {
  if (!apiKey) return "Chave de API não configurada.";

  try {
    const model = "gemini-2.5-flash";
    const prompt = `
      Você é um consultor sênior de Recrutamento & Seleção da 'Bem Estar Psicologia & Saúde'.
      
      CONTEXTO:
      A clínica atua também como consultoria de RH, recrutando talentos para diversas empresas parceiras e para a própria clínica.
      O candidato está interessado na vaga de: ${jobTitle}.
      A pergunta do candidato é: "${userQuery}".
      
      DIRETRIZES:
      1. Responda de forma profissional, objetiva e encorajadora.
      2. Mantenha a resposta abaixo de 100 palavras.
      3. Dê dicas práticas sobre como o candidato pode se destacar no processo seletivo para essa função específica.
      4. Se a pergunta for sobre salário e não estiver na descrição, diga que é negociável/confidencial.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "Desculpe, não consegui gerar uma resposta no momento.";
  } catch (error) {
    console.error("Erro ao consultar Gemini:", error);
    return "Ocorreu um erro ao processar sua solicitação. Tente novamente mais tarde.";
  }
};