import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Minimize2, Maximize2, Loader } from 'lucide-react';

const FormattedMessage = ({ content, isUser }: { content: string; isUser: boolean }) => {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;

  const renderInline = (text: string, key: string) => {
    // Replace **bold** with <strong>
    const parts = text.split(/\*\*(.+?)\*\*/g);
    return (
      <span key={key}>
        {parts.map((part, idx) =>
          idx % 2 === 1 ? <strong key={idx}>{part}</strong> : part
        )}
      </span>
    );
  };

  while (i < lines.length) {
    const line = lines[i].trim();

    if (!line) {
      i++;
      continue;
    }

    // Numbered list item
    const numberedMatch = line.match(/^(\d+)\.\s+(.*)$/);
    if (numberedMatch) {
      const listItems: React.ReactNode[] = [];
      while (i < lines.length) {
        const l = lines[i].trim();
        const m = l.match(/^(\d+)\.\s+(.*)$/);
        if (m) {
          listItems.push(<li key={i} className="mb-1">{renderInline(m[2], `li-${i}`)}</li>);
          i++;
        } else if (!l) {
          i++;
          break;
        } else {
          break;
        }
      }
      elements.push(
        <ol key={`ol-${i}`} className={`list-decimal list-inside space-y-1 my-2 ${isUser ? '' : 'text-gray-800'}`}>
          {listItems}
        </ol>
      );
      continue;
    }

    // Bullet list item
    const bulletMatch = line.match(/^[-•*]\s+(.*)$/);
    if (bulletMatch) {
      const listItems: React.ReactNode[] = [];
      while (i < lines.length) {
        const l = lines[i].trim();
        const m = l.match(/^[-•*]\s+(.*)$/);
        if (m) {
          listItems.push(<li key={i} className="mb-1">{renderInline(m[1], `li-${i}`)}</li>);
          i++;
        } else if (!l) {
          i++;
          break;
        } else {
          break;
        }
      }
      elements.push(
        <ul key={`ul-${i}`} className={`list-disc list-inside space-y-1 my-2 ${isUser ? '' : 'text-gray-800'}`}>
          {listItems}
        </ul>
      );
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={i} className="mb-2 leading-relaxed">
        {renderInline(line, `p-${i}`)}
      </p>
    );
    i++;
  }

  return <div className="space-y-0">{elements}</div>;
};

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your AgriAssist AI. I can help you with farming questions, crop management, pest control, weather insights, and more. How can I assist you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const generateResponse = async (userMessage: string): Promise<string> => {
    const apiKey = import.meta.env.VITE_GROQ_API_KEY;
    try {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            {
              role: 'system',
              content: 'You are AgriAssist, an expert AI farming assistant built into FarmGrid. Help farmers with crop management, pest control, soil health, irrigation, weather advice, financial planning, and equipment maintenance. Keep answers practical, concise, and relevant to agriculture. When referencing app features, mention the relevant section (Crops Management, Inventory, Financial Tracking, Tools, Weather, etc.).',
            },
            { role: 'user', content: userMessage },
          ],
          max_tokens: 500,
          temperature: 0.7,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        const errMsg = data?.error?.message || 'Unknown error';
        throw new Error(errMsg);
      }
      return data.choices?.[0]?.message?.content ?? "Sorry, I couldn't get a response. Please try again.";
    } catch (err: any) {
      throw err;
    }
  };

  const getFallbackResponse = (userMessage: string): string => {
    const msg = userMessage.toLowerCase();
    if (msg.includes('weather') || msg.includes('rain'))
      return "Weather is crucial for farming! Check the Weather section on your dashboard for real-time updates and forecasts.";
    if (msg.includes('pest') || msg.includes('insect'))
      return "For pest management:\n\n1. Inspect crops regularly for early detection\n2. Use integrated pest management (IPM)\n3. Rotate crops to break pest cycles\n4. Introduce natural predators when possible";
    if (msg.includes('soil') || msg.includes('fertilizer'))
      return "For healthy soil:\n\n1. Test pH regularly (ideal: 6.0–7.0)\n2. Add compost and organic matter\n3. Rotate crops to replenish nutrients\n4. Apply fertilizers based on soil test results";
    if (msg.includes('water') || msg.includes('irrigation'))
      return "Water management tips:\n\n1. Use drip irrigation for efficiency\n2. Water early morning or late evening\n3. Monitor soil moisture before watering\n4. Mulch to retain moisture";
    if (msg.includes('crop') || msg.includes('plant') || msg.includes('harvest'))
      return "Track all your crops in the Crops Management section. Log planting dates, expected harvest dates, and growth status.";
    if (msg.includes('financ') || msg.includes('profit') || msg.includes('money') || msg.includes('expense'))
      return "Use the Financial Tracking section to record income and expenses, view your net profit/loss, and plan budgets.";
    if (msg.includes('equipment') || msg.includes('tool') || msg.includes('machine'))
      return "Manage all equipment in the Tools section — track condition, schedule maintenance, and get alerts when service is due.";
    if (msg.includes('inventory') || msg.includes('stock') || msg.includes('seed'))
      return "The Inventory section helps you track seeds, fertilizers, and supplies. Set alert levels so you get notified before running out.";
    return "I can help you with:\n\n• Crop planning and management\n• Pest and disease control\n• Soil health and fertilization\n• Irrigation and water management\n• Financial tracking\n• Equipment maintenance\n• Weather-based advice\n\nWhat would you like to know?";
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const responseText = await generateResponse(userMessage.content);
      setMessages((prev) => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseText,
        timestamp: new Date(),
      }]);
    } catch {
      // Silently fall back to keyword responses
      setMessages((prev) => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: getFallbackResponse(userMessage.content),
        timestamp: new Date(),
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg transition z-50"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className={`fixed right-6 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50 transition-all ${
      isMinimized ? 'bottom-6 w-80' : 'bottom-6 w-96 h-[600px]'
    }`}>
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-white bg-opacity-20 p-2 rounded-full">
            <MessageCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold">AgriAssist AI</h3>
            <p className="text-xs opacity-90">Your farming advisor</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setIsMinimized(!isMinimized)} className="hover:bg-white hover:bg-opacity-20 p-1 rounded transition">
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </button>
          <button onClick={() => setIsOpen(false)} className="hover:bg-white hover:bg-opacity-20 p-1 rounded transition">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.role === 'user' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-800'
                }`}>
                  <div className="text-sm">
                    <FormattedMessage content={message.content} isUser={message.role === 'user'} />
                  </div>
                  <p className={`text-xs mt-1 ${message.role === 'user' ? 'text-green-100' : 'text-gray-500'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl px-4 py-3">
                  <Loader className="w-5 h-5 text-gray-600 animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about farming..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                disabled={loading}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || loading}
                className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
