import { motion, AnimatePresence } from 'framer-motion';
import { X, ChatCircleDots, Bell, GearSix, Headset, Shield, Check, ArrowRight, MapPin, Star, Phone, SealCheck, Storefront } from '@phosphor-icons/react';
import { Farmer, Notification, ChatMessage, UserProfile } from '../types';
import { formatNaira } from './BuyerFlow/data';

/* ──────────── Chat Panel ──────────── */
function ChatPanel({ show, setShow, messages, partner, onSend, onClose }: {
  show: boolean; setShow: (b: boolean) => void; messages: ChatMessage[];
  partner: Farmer | null; onSend: (t: string) => void; onClose: () => void;
}) {
  const [text, setText] = useState('');
  const chatMsgs = messages.filter(m => m.senderId === 'u1' || (partner && m.senderId === partner.id));
  return (
    <AnimatePresence>
      {show && (
        <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 300 }} className="absolute inset-0 bg-white z-50 flex flex-col">
          <div className="flex items-center gap-3 p-4 border-b border-gray-100">
            <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100"><X size={20} className="text-gray-600" /></button>
            <div className="w-9 h-9 rounded-full bg-green-100 overflow-hidden">
              {partner && <img src={partner.avatar} alt="" className="w-full h-full object-cover" />}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">{partner?.farmName || 'Chat'}</p>
              <p className="text-xs text-green-600">Online</p>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {chatMsgs.map(msg => (
              <div key={msg.id} className={`flex ${msg.senderId === 'u1' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.senderId === 'u1' ? 'bg-green-600 text-white rounded-br-md' : 'bg-gray-100 text-gray-900 rounded-bl-md'}`}>
                  <p>{msg.text}</p>
                  <p className={`text-[10px] mt-1 ${msg.senderId === 'u1' ? 'text-green-200' : 'text-gray-400'}`}>
                    {new Date(msg.timestamp).toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-gray-100 flex items-center gap-3">
            <input value={text} onChange={e => setText(e.target.value)} placeholder="Type a message..." className="flex-1 bg-gray-100 rounded-xl px-4 py-3 text-sm outline-none text-gray-900 placeholder:text-gray-400"
              onKeyDown={e => { if (e.key === 'Enter' && text.trim()) { onSend(text.trim()); setText(''); } }} />
            <button onClick={() => { if (text.trim()) { onSend(text.trim()); setText(''); } }} className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center">
              <ArrowRight size={18} className="text-white" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ──────────── Notifications Panel ──────────── */
function NotificationsPanel({ show, setShow, notifications, onMarkRead, onMarkAllRead, onClose }: {
  show: boolean; setShow: (b: boolean) => void; notifications: Notification[];
  onMarkRead: (id: string) => void; onMarkAllRead: () => void; onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="absolute inset-0 bg-white z-50 flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Notifications</h3>
            <div className="flex items-center gap-2">
              <button onClick={onMarkAllRead} className="text-xs text-green-600 font-medium">Mark all read</button>
              <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100"><X size={20} className="text-gray-600" /></button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="mt-20 text-center text-gray-400 text-sm">No notifications</div>
            ) : (
              <div className="divide-y divide-gray-50">
                {notifications.map(notif => (
                  <button key={notif.id} onClick={() => onMarkRead(notif.id)} className={`w-full text-left p-4 transition-colors ${notif.read ? 'bg-white' : 'bg-green-50'}`}>
                    <div className="flex items-start gap-3">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${notif.type === 'order' ? 'bg-blue-100' : 'bg-amber-100'}`}>
                        {notif.type === 'order' ? <Package size={16} className="text-blue-600" /> : <Bell size={16} className="text-amber-600" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{notif.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{notif.message}</p>
                        <p className="text-[10px] text-gray-400 mt-1">{new Date(notif.timestamp).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</p>
                      </div>
                      {!notif.read && <div className="w-2 h-2 rounded-full bg-green-600 shrink-0 mt-2" />}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Package(props: any) { return <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 16} height={props.size || 16} viewBox="0 0 24 24" fill="none" stroke={props.color || 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16.5 9.4 7.55 4.24"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" y1="22" x2="12" y2="12"/></svg>; }

/* ──────────── Settings Panel ──────────── */
function SettingsPanel({ show, setShow, highContrast, setHighContrast, onClose, onLogout }: {
  show: boolean; setShow: (b: boolean) => void; highContrast: boolean; setHighContrast: (b: boolean) => void; onClose: () => void; onLogout: () => void;
}) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 300 }} className="absolute inset-0 bg-white z-50 flex flex-col">
          <div className="flex items-center gap-3 p-4 border-b border-gray-100">
            <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100"><X size={20} className="text-gray-600" /></button>
            <h3 className="text-lg font-bold text-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Settings</h3>
          </div>
          <div className="flex-1 p-4 space-y-4">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Accessibility</h4>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">High Contrast Mode</span>
                <button onClick={() => setHighContrast(!highContrast)} className={`w-11 h-6 rounded-full transition-colors ${highContrast ? 'bg-green-600' : 'bg-gray-200'}`}>
                  <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${highContrast ? 'translate-x-5.5' : 'translate-x-0.5'}`} />
                </button>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Account</h4>
              <button onClick={onLogout} className="w-full text-left text-sm text-red-500 font-medium py-2">Logout</button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ──────────── Support Panel ──────────── */
function SupportPanel({ show, setShow, onClose }: {
  show: boolean; setShow: (b: boolean) => void; onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 300 }} className="absolute inset-0 bg-white z-50 flex flex-col">
          <div className="flex items-center gap-3 p-4 border-b border-gray-100">
            <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100"><X size={20} className="text-gray-600" /></button>
            <h3 className="text-lg font-bold text-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Help &amp; Support</h3>
          </div>
          <div className="flex-1 p-4 space-y-3">
            {[
              { icon: ChatCircleDots, label: 'Live Chat', desc: 'Chat with our support team' },
              { icon: Phone, label: 'Call Us', desc: '+234 800 FARMLINK' },
              { icon: Shield, label: 'Escrow Protection', desc: 'Learn how your money is safe' },
              { icon: Headset, label: 'FAQs', desc: 'Common questions & answers' },
            ].map(item => (
              <button key={item.label} className="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-left flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                  <item.icon size={20} className="text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{item.label}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
                <ArrowRight size={16} className="text-gray-300" />
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}



/* ──────────── InteractiveExtras (main export) ──────────── */
import { useState } from 'react';

interface InteractiveExtrasProps {
  showNotifications: boolean; setShowNotifications: (b: boolean) => void;
  notifications: Notification[]; markNotifRead: (id: string) => void; markAllNotifsRead: () => void;
  showChatList: boolean; setShowChatList: (b: boolean) => void;
  chatMessages: ChatMessage[]; markChatRead: (id: string) => void; sendMessage: (t: string, r: string) => void;
  chatPartner: Farmer | null; setChatPartner: (f: Farmer | null) => void;
  showSettings: boolean; setShowSettings: (b: boolean) => void;
  highContrast: boolean; setHighContrast: (b: boolean) => void;
  handleLogout: () => void;
  showSupport: boolean; setShowSupport: (b: boolean) => void;
}

export default function InteractiveExtras(props: InteractiveExtrasProps) {
  const { showNotifications, setShowNotifications, notifications, markNotifRead, markAllNotifsRead,
    showChatList, setShowChatList, chatMessages, markChatRead, sendMessage,
    chatPartner, setChatPartner, showSettings, setShowSettings, highContrast, setHighContrast,
    handleLogout, showSupport, setShowSupport } = props;

  const handleSendChat = (text: string) => {
    if (chatPartner) sendMessage(text, chatPartner.id);
  };

  return (
    <>
      <ChatPanel
        show={showChatList}
        setShow={setShowChatList}
        messages={chatMessages}
        partner={chatPartner}
        onSend={handleSendChat}
        onClose={() => { setShowChatList(false); setChatPartner(null); }}
      />
      <NotificationsPanel
        show={showNotifications}
        setShow={setShowNotifications}
        notifications={notifications}
        onMarkRead={markNotifRead}
        onMarkAllRead={markAllNotifsRead}
        onClose={() => setShowNotifications(false)}
      />
      <SettingsPanel
        show={showSettings}
        setShow={setShowSettings}
        highContrast={highContrast}
        setHighContrast={setHighContrast}
        onClose={() => setShowSettings(false)}
        onLogout={handleLogout}
      />
      <SupportPanel
        show={showSupport}
        setShow={setShowSupport}
        onClose={() => setShowSupport(false)}
      />
    </>
  );
}