import { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Minimize2, Maximize2, Loader } from 'lucide-react';

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
      content:
        "Hello! I'm your AgriAssist AI. I can help you with farming questions, crop management, pest control, weather insights, and more. How can I assist you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = async (userMessage: string): Promise<string> => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('weather') || lowerMessage.includes('rain')) {
      return "Weather is crucial for farming! I recommend checking the Weather widget on your dashboard for real-time updates. For rain predictions, monitor the forecast regularly and plan your irrigation accordingly. Would you like tips on rain-dependent crops?";
    }

    if (lowerMessage.includes('pest') || lowerMessage.includes('insect')) {
      return "Pest management is vital! Here are some tips:\n\n1. Regular monitoring and early detection\n2. Use integrated pest management (IPM) strategies\n3. Rotate crops to break pest cycles\n4. Maintain healthy soil to strengthen plants\n5. Use natural predators when possible\n\nWhat specific pest are you dealing with?";
    }

    if (lowerMessage.includes('soil') || lowerMessage.includes('fertilizer')) {
      return "Soil health is the foundation of good farming! Consider:\n\n1. Test soil pH regularly (ideal: 6.0-7.0 for most crops)\n2. Add organic matter like compost\n3. Use crop rotation to maintain nutrients\n4. Apply fertilizers based on soil test results\n5. Consider cover crops in off-season\n\nWould you like specific fertilizer recommendations?";
    }

    if (lowerMessage.includes('water') || lowerMessage.includes('irrigation')) {
      return "Efficient water management saves resources! Tips:\n\n1. Use drip irrigation for water efficiency\n2. Water early morning or evening\n3. Monitor soil moisture levels\n4. Mulch to retain moisture\n5. Collect rainwater when possible\n\nTrack your water usage in the Inventory section!";
    }

    if (lowerMessage.includes('crop') || lowerMessage.includes('plant')) {
      return "Crop selection depends on several factors:\n\n1. Local climate and season\n2. Soil type (check your Land Management section)\n3. Water availability\n4. Market demand\n5. Your experience level\n\nUse the Crops Management module to track planting dates and expected harvests. What crop are you interested in?";
    }

    if (lowerMessage.includes('disease') || lowerMessage.includes('fungus')) {
      return "Plant diseases need quick action! General advice:\n\n1. Remove infected plants immediately\n2. Improve air circulation\n3. Avoid overhead watering\n4. Use disease-resistant varieties\n5. Apply appropriate fungicides if needed\n\nEarly detection is key. Describe the symptoms you're seeing?";
    }

    if (lowerMessage.includes('harvest') || lowerMessage.includes('yield')) {
      return "Maximize your harvest with these tips:\n\n1. Harvest at the right maturity stage\n2. Use proper harvesting techniques\n3. Handle crops carefully to avoid damage\n4. Store in appropriate conditions\n5. Track yields in your Crops Management section\n\nYour dashboard shows upcoming harvests. What crop are you harvesting?";
    }

    if (lowerMessage.includes('organic') || lowerMessage.includes('chemical-free')) {
      return "Organic farming is wonderful! Key practices:\n\n1. Use compost and natural fertilizers\n2. Implement crop rotation\n3. Use biological pest control\n4. Avoid synthetic chemicals\n5. Maintain soil health naturally\n\nTrack your organic inputs in the Inventory section. Need specific organic solutions?";
    }

    if (lowerMessage.includes('profit') || lowerMessage.includes('money') || lowerMessage.includes('finance')) {
      return "Financial management is crucial! Use your Financial Tracking module to:\n\n1. Record all expenses and revenue\n2. Track profit margins per crop\n3. Identify cost-saving opportunities\n4. Plan budgets for next season\n5. Monitor ROI on equipment\n\nWould you like tips on reducing costs or increasing revenue?";
    }

    if (lowerMessage.includes('equipment') || lowerMessage.includes('machinery') || lowerMessage.includes('tool')) {
      return "Proper equipment maintenance saves money! Remember to:\n\n1. Follow regular maintenance schedules\n2. Store equipment properly\n3. Clean after each use\n4. Check for wear and damage\n5. Track maintenance in Tools Management\n\nYour dashboard alerts you when maintenance is due. What equipment do you need help with?";
    }

    return "That's a great question! As your farming assistant, I can help with:\n\n• Crop selection and planning\n• Pest and disease management\n• Soil health and fertilization\n• Irrigation and water management\n• Weather-related advice\n• Organic farming practices\n• Financial planning\n• Equipment maintenance\n\nPlease ask me anything specific about your farm operations!";
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

    setTimeout(async () => {
      const responseText = await generateResponse(userMessage.content);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseText,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setLoading(false);
    }, 800);
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
    <div
      className={`fixed right-6 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50 transition-all ${
        isMinimized
          ? 'bottom-6 w-80'
          : 'bottom-6 w-96 h-[600px]'
      }`}
    >
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
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="hover:bg-white hover:bg-opacity-20 p-1 rounded transition"
          >
            {isMinimized ? (
              <Maximize2 className="w-4 h-4" />
            ) : (
              <Minimize2 className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="hover:bg-white hover:bg-opacity-20 p-1 rounded transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.content}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.role === 'user' ? 'text-green-100' : 'text-gray-500'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
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
