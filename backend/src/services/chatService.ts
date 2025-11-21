import { Chat } from '../models/chaModel';

export class ChatService {
    public async sendMessage(userId: string, message: string) {
        const chat = new Chat({ userId, message });
        return await chat.save();
    }

    public async getMessages() {
        return await Chat.find().sort({ createdAt: -1 });
    }
}
