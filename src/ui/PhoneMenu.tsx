import React, { useState } from 'react';
import { useGameStore } from './store';
import { Smartphone, Car, Shield, MessageSquare, PhoneCall, Save, RotateCcw, X } from 'lucide-react';
import { soundEngine } from '../core/audio';
import { CANONICAL_VEHICLES } from '../data/vehicles';

export const PhoneMenu: React.FC<{
  onSpawnVehicle: (defId: string) => void;
  onRestartCheckpoint: () => void;
  onSaveGame: () => Promise<boolean>;
}> = ({ onSpawnVehicle, onRestartCheckpoint, onSaveGame }) => {
  const { isPhoneOpen, setPhoneOpen, timeFormatted, cash } = useGameStore();
  const [activeTab, setActiveTab] = useState<'home' | 'garage' | 'messages' | 'contacts'>('home');
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  if (!isPhoneOpen) return null;

  const handleSave = async () => {
    setSaveStatus('Saving game state...');
    soundEngine.playUIClick();
    const ok = await onSaveGame();
    if (ok) {
      setSaveStatus('Game successfully saved!');
    } else {
      setSaveStatus('Save operation failed!');
    }
    setTimeout(() => setSaveStatus(null), 2500);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9500,
        background: 'rgba(9, 13, 22, 0.65)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none'
      }}
      onClick={() => setPhoneOpen(false)}
    >
      {/* Smartphone Chassis */}
      <div
        style={{
          width: 330,
          height: 620,
          background: '#020617',
          borderRadius: 36,
          border: '4px solid #334155',
          boxShadow: '0 25px 60px rgba(0,0,0,0.9), inset 0 0 4px rgba(255,255,255,0.2)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Speaker Notch */}
        <div style={{ position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)', width: 70, height: 5, background: '#1e293b', borderRadius: 4, zIndex: 10 }} />

        {/* Status Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px 8px', fontSize: 11, fontWeight: 700, color: '#94a3b8' }}>
          <span>{timeFormatted}</span>
          <span style={{ color: '#22c55e' }}>5G VESPER</span>
          <span>100%</span>
        </div>

        {/* Main Phone Screen View */}
        <div style={{ flex: 1, padding: 18, overflowY: 'auto' }}>
          {activeTab === 'home' && (
            <div>
              <div style={{ textAlign: 'center', margin: '14px 0 24px' }}>
                <div style={{ fontSize: 26, fontWeight: 900, color: '#f8fafc' }}>AURELIO OS</div>
                <div style={{ fontSize: 13, color: '#22c55e', fontWeight: 700 }}>₳ {cash.toLocaleString()}</div>
              </div>

              {/* App Icon Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                {/* Garage / Delivery */}
                <div
                  onClick={() => {
                    setActiveTab('garage');
                    soundEngine.playUIClick();
                  }}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'pointer' }}
                >
                  <div style={{ width: 56, height: 56, borderRadius: 16, background: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Car size={26} color="#fff" />
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#f8fafc' }}>Garage</span>
                </div>

                {/* Messages */}
                <div
                  onClick={() => {
                    setActiveTab('messages');
                    soundEngine.playUIClick();
                  }}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'pointer' }}
                >
                  <div style={{ width: 56, height: 56, borderRadius: 16, background: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <MessageSquare size={26} color="#fff" />
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#f8fafc' }}>Burner</span>
                </div>

                {/* Contacts */}
                <div
                  onClick={() => {
                    setActiveTab('contacts');
                    soundEngine.playUIClick();
                  }}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'pointer' }}
                >
                  <div style={{ width: 56, height: 56, borderRadius: 16, background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <PhoneCall size={26} color="#fff" />
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#f8fafc' }}>Contacts</span>
                </div>

                {/* Quick Save */}
                <div
                  onClick={handleSave}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'pointer' }}
                >
                  <div style={{ width: 56, height: 56, borderRadius: 16, background: '#a855f7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Save size={26} color="#fff" />
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#f8fafc' }}>Save</span>
                </div>

                {/* Restart Checkpoint */}
                <div
                  onClick={() => {
                    onRestartCheckpoint();
                    soundEngine.playUIClick();
                    setPhoneOpen(false);
                  }}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'pointer' }}
                >
                  <div style={{ width: 56, height: 56, borderRadius: 16, background: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <RotateCcw size={26} color="#fff" />
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#f8fafc' }}>Restart</span>
                </div>
              </div>

              {saveStatus && (
                <div style={{ marginTop: 20, textAlign: 'center', fontSize: 12, fontWeight: 700, color: '#22c55e', background: 'rgba(34, 197, 94, 0.1)', padding: 8, borderRadius: 6 }}>
                  {saveStatus}
                </div>
              )}
            </div>
          )}

          {activeTab === 'garage' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <h3 style={{ fontSize: 16, fontWeight: 900, color: '#f8fafc', margin: 0 }}>VEHICLE FLEET</h3>
                <button onClick={() => setActiveTab('home')} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 12 }}>Back</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {CANONICAL_VEHICLES.map(v => (
                  <div
                    key={v.id}
                    onClick={() => {
                      onSpawnVehicle(v.id);
                      soundEngine.playUIClick();
                      setPhoneOpen(false);
                    }}
                    style={{ background: '#0f172a', padding: '10px 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 800, color: '#f8fafc' }}>{v.name}</div>
                      <div style={{ fontSize: 11, color: '#94a3b8', textTransform: 'capitalize' }}>{v.class.replace('_', ' ')}</div>
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 800, color: '#38bdf8' }}>SPAWN</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'messages' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <h3 style={{ fontSize: 16, fontWeight: 900, color: '#f8fafc', margin: 0 }}>ENCRYPTED MESSAGES</h3>
                <button onClick={() => setActiveTab('home')} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 12 }}>Back</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ background: '#0f172a', padding: 12, borderRadius: 8, borderLeft: '3px solid #f59e0b' }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: '#f59e0b' }}>Syndicate Broker</div>
                  <div style={{ fontSize: 12, color: '#cbd5e1', marginTop: 4 }}>
                    "Kestrel prototype is staged near Meridian Financial plaza. Secure it before AMPS patrol shifts change."
                  </div>
                </div>
                <div style={{ background: '#0f172a', padding: 12, borderRadius: 8, borderLeft: '3px solid #38bdf8' }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: '#38bdf8' }}>Kestrel Transport</div>
                  <div style={{ fontSize: 12, color: '#cbd5e1', marginTop: 4 }}>
                    "Speedboat ready at Harborview marina berths when you need a sea getaway."
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'contacts' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <h3 style={{ fontSize: 16, fontWeight: 900, color: '#f8fafc', margin: 0 }}>CONTACTS</h3>
                <button onClick={() => setActiveTab('home')} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 12 }}>Back</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {['Aurelio Syndicate Broker', 'Kestrel Heavy Logistics', 'Safehouse Concierge', 'Ironworks Mechanic', 'AMPS Dispatch Monitor'].map(c => (
                  <div key={c} style={{ background: '#0f172a', padding: 10, borderRadius: 8, fontSize: 13, fontWeight: 700, color: '#f8fafc' }}>
                    {c}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Home Bar */}
        <div
          onClick={() => {
            if (activeTab !== 'home') setActiveTab('home');
            else setPhoneOpen(false);
          }}
          style={{ height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
        >
          <div style={{ width: 100, height: 4, background: '#475569', borderRadius: 2 }} />
        </div>
      </div>
    </div>
  );
};
