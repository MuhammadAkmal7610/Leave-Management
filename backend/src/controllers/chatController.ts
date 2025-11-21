import { Request, Response } from 'express';
import { ChatService } from '../services/chatService';

class ChatController {
    private chatService: ChatService;

    constructor() {
        this.chatService = new ChatService();
    }

    public async sendMessage(req: Request, res: Response): Promise<Response> {
        try {
            const { userId, message } = req.body;
            const newMessage = await this.chatService.sendMessage(userId, message);
            return res.status(201).json(newMessage);
        } catch (error) {
            return res.status(500).json({ error: (error as Error).message });
        }
    }

    public async getMessages(req: Request, res: Response): Promise<Response> {
        try {
            const messages = await this.chatService.getMessages();
            return res.status(200).json(messages);
        } catch (error) {
            return res.status(500).json({ error: (error as Error).message });
        }
    }
}

export default ChatController;
