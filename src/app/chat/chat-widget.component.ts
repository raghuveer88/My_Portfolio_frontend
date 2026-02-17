import { Component, ElementRef, ViewChild, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from './chat.service';
import { ChatStoreService } from './chat-store.service';

type Role = 'user' | 'assistant';
type ChatMessage = { role: Role; content: string };

@Component({
  selector: 'app-chat-widget',
  templateUrl: './chat-widget.component.html',
  styleUrls: ['./chat-widget.component.css'],
})
export class ChatWidgetComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('messagesEl') messagesEl!: ElementRef<HTMLDivElement>;

  isOpen = false;
  draft = '';
  messages: ChatMessage[] = [];

  private typingPlaceholder: ChatMessage = { role: 'assistant', content: 'Typing…' };

  // ✅ store handler reference so we can remove it on destroy (prevents duplicates)
  private openChatHandler = () => {
    this.toggleChat();
  };

  constructor(
    private chat: ChatService,
    private store: ChatStoreService
  ) {
    this.messages = this.store.load();
  }

  ngOnInit(): void {
    // ✅ attach once
    window.addEventListener('open-portfolio-chat', this.openChatHandler);
  }

  ngAfterViewInit(): void {
    // If chat opens with existing history, ensure it's at bottom
    this.scrollToBottomSoon();
  }

  ngOnDestroy(): void {
    // ✅ cleanup (prevents multiple listeners + double toggles)
    window.removeEventListener('open-portfolio-chat', this.openChatHandler);
  }

  toggleChat(): void {
    this.isOpen = !this.isOpen;

    if (this.isOpen) {
      // Ensure messages are rendered then scroll
      this.scrollToBottomSoon();
    }
  }

  openChat(): void {
    this.isOpen = true;
    this.scrollToBottomSoon();
  }

  closeChat(): void {
    this.isOpen = false;
  }

  onSubmit(e: Event): void {
    e.preventDefault();
    const text = (this.draft || '').trim();
    if (!text) return;

    this.draft = '';
    this.send(text);
  }

  quickSend(text: string): void {
    this.send(text);
  }

  private async send(userText: string): Promise<void> {
    // Add user message
    this.messages.push({ role: 'user', content: userText });
    this.persist();
    this.scrollToBottomSoon(); // scroll after user message renders

    // Add typing placeholder
    this.messages.push(this.typingPlaceholder);
    this.scrollToBottomSoon();

    try {
      const reply = await this.chat.send(this.messages.filter(m => m !== this.typingPlaceholder));

      // Remove typing placeholder
      if (this.messages.length && this.messages[this.messages.length - 1] === this.typingPlaceholder) {
        this.messages.pop();
      } else {
        this.messages = this.messages.filter(m => m !== this.typingPlaceholder);
      }

      // Add assistant reply
      this.messages.push({ role: 'assistant', content: reply });
      this.persist();
      this.scrollToBottomSoon();
    } catch {
      // Remove typing placeholder
      this.messages = this.messages.filter(m => m !== this.typingPlaceholder);

      // Add error message
      this.messages.push({
        role: 'assistant',
        content: 'Sorry — chat is unavailable right now.',
      });
      this.persist();
      this.scrollToBottomSoon();
    }
  }

  private persist(): void {
    this.store.save(this.messages);
  }

  private scrollToBottomSoon(): void {
    setTimeout(() => {
      const el = this.messagesEl?.nativeElement;
      if (!el) return;
      el.scrollTop = el.scrollHeight;
    }, 0);
  }
}
