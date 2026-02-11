
import { GoogleGenAI, GenerateContentResponse, Chat } from "@google/genai";
import { SYSTEM_PROMPT } from "../constants";

export class GeminiService {
  private ai: GoogleGenAI;
  private chat: Chat;

  constructor() {
    // 严格遵循 SDK 初始化规范，从 process.env.API_KEY 获取密钥
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    this.chat = this.ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
        topP: 0.95,
      }
    });
  }

  async sendMessage(userInput: string): Promise<string> {
    if (!process.env.API_KEY) {
      return "ERROR: 未检测到 API_KEY。请确保环境配置正确。";
    }

    try {
      const response: GenerateContentResponse = await this.chat.sendMessage({ message: userInput });
      // 根据规范使用 .text 属性而非方法
      const text = response.text;
      return text || "Miao... 信号中断，请重试。";
    } catch (error) {
      console.error("Gemini Service Error:", error);
      return "Critical Error: 神经链路断开。原因: 无法访问大模型核心。";
    }
  }
}

export const geminiService = new GeminiService();
