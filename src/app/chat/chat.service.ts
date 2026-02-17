import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ChatMessage } from './chat.types';

export interface ChatResponse {
  reply: string;
}

@Injectable({ providedIn: 'root' })
export class ChatService {
  // Local dev: Flask running on :5000
  // Production: point this to your deployed backend
  apiUrl = 'https://my-portfolio-backend-n1iv.onrender.com/api/chat';

  constructor(private http: HttpClient) {}

  async send(messages: ChatMessage[]): Promise<string> {
    const res = await firstValueFrom(
      this.http.post<ChatResponse>(this.apiUrl, { messages })
    );
    return res?.reply || '';
  }
}
