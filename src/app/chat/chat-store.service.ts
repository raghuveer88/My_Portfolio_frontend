import { Injectable } from '@angular/core';
import { ChatMessage } from './chat.types';

@Injectable({ providedIn: 'root' })
export class ChatStoreService {
  private readonly key = 'portfolio_chat_history_v1';

  load(): ChatMessage[] {
    try {
      return JSON.parse(sessionStorage.getItem(this.key) || '[]') as ChatMessage[];
    } catch {
      return [];
    }
  }

  save(history: ChatMessage[]): void {
    sessionStorage.setItem(this.key, JSON.stringify(history));
  }

  clear(): void {
    sessionStorage.removeItem(this.key);
  }
}
