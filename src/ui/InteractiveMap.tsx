import React, { useState, useRef } from 'react';
import { useGameStore } from './store';
import { CANONICAL_DISTRICTS } from '../data/districts';
import { CANONICAL_POIS } from '../data/pois';
import { DistrictData, MapPOI, POICategory } from '../core/types';
import { worldToMapPercent, mapPercentToWorld } from '../core/math';
import { X, Navigation, Search, Filter, ShieldAlert, Compass, MapPin } from 'lucide-react';
import { soundEngine } from '../core/audio';

export const InteractiveMap: React.FC<{ playerPos: [number, number, number] }> = ({ playerPos }) => {
  const { isMapOpen, setMapOpen, activeWaypoint, setWaypoint } = useGameStore();

  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictData | null>(null);
  const [selectedPOI, setSelectedPOI] = useState<MapPOI | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<POICategory | 'all'>('all');

  const containerRef = useRef<HTMLDivElement>(null);

  if (!isMapOpen) return null;

  const playerMapPercent = worldToMapPercent(playerPos[0], playerPos[2]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button === 0) {
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {}
      setIsDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {}
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.15 : 0.85;
    setZoom(prev => Math.min(3.5, Math.max(0.65, prev * factor)));
  };

  const handleMapRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const localX = e.clientX - rect.left;
    const localY = e.clientY - rect.top;

    // The map is a 900x900 world projection transformed by pan + zoom.
    const unscaledX = (localX - rect.width * 0.5 - pan.x) / zoom + 450;
    const unscaledY = (localY - rect.height * 0.5 - pan.y) / zoom + 450;

    const percentX = Math.max(0, Math.min(100, (unscaledX / 900) * 100));
    const percentY = Math.max(0, Math.min(100, (unscaledY / 900) * 100));

    setWaypoint(mapPercentToWorld(percentX, percentY));
    soundEngine.playUIClick();
  };

  // Filtered POIs
  const filteredPOIs = CANONICAL_POIS.filter(poi => {
    const matchesFilter = activeFilter === 'all' || poi.category === activeFilter;
    const matchesSearch = searchQuery === '' || poi.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(9, 13, 22, 0.95)',
        backdropFilter: 'blur(16px)',
        display: 'flex',
        flexDirection: 'column',
        userSelect: 'none'
      }}
    >
      {/* Top Header Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 28px',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          background: 'rgba(15, 23, 42, 0.8)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <Compass size={28} color="#38bdf8" />
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 900, letterSpacing: '0.08em', color: '#f8fafc', margin: 0 }}>
              SAN AURELIO SATELLITE CARTOGRAPHY
            </h1>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#94a3b8' }}>
              AURELIO PROVINCE | 26 CANONICAL ZONES
            </span>
          </div>
        </div>

        {/* Search and Filters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', background: '#1e293b', borderRadius: 6, padding: '6px 12px', gap: 8 }}>
            <Search size={16} color="#94a3b8" />
            <input
              type="text"
              placeholder="Search landmark or POI..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ background: 'transparent', border: 'none', color: '#f8fafc', outline: 'none', fontSize: 13, width: 180 }}
            />
          </div>

          <div style={{ display: 'flex', gap: 6 }}>
            {(['all', 'landmark', 'safehouse', 'garage', 'shop', 'mission'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => {
                  setActiveFilter(cat);
                  soundEngine.playUIClick();
                }}
                style={{
                  background: activeFilter === cat ? '#0284c7' : '#1e293b',
                  color: activeFilter === cat ? '#ffffff' : '#94a3b8',
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  cursor: 'pointer'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Close button */}
          <button
            onClick={() => {
              setMapOpen(false);
              soundEngine.playUIClick();
            }}
            style={{
              background: '#ef4444',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              padding: '6px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontWeight: 800,
              fontSize: 13,
              cursor: 'pointer'
            }}
          >
            <X size={16} /> CLOSE [M]
          </button>
        </div>
      </div>

      {/* Main Map Canvas Area */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onWheel={handleWheel}
        onContextMenu={handleMapRightClick}
        style={{
          flex: 1,
          position: 'relative',
          overflow: 'hidden',
          cursor: isDragging ? 'grabbing' : 'grab',
          background: 'radial-gradient(circle at center, #0f172a 0%, #020617 100%)'
        }}
      >
        {/* Pannable / Zoomable Map Container */}
        <div
          style={{
            position: 'absolute',
            width: 900,
            height: 900,
            left: '50%',
            top: '50%',
            marginLeft: -450,
            marginTop: -450,
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: 'center center',
            transition: isDragging ? 'none' : 'transform 0.05s ease-out'
          }}
        >
          {/* Canonical 26 Districts Vector Blueprint */}
          {CANONICAL_DISTRICTS.map(dist => {
            const minNorm = worldToMapPercent(dist.bounds.minX, dist.bounds.minZ);
            const maxNorm = worldToMapPercent(dist.bounds.maxX, dist.bounds.maxZ);
            const left = minNorm.xPercent * 9;
            const top = minNorm.yPercent * 9;
            const w = (maxNorm.xPercent - minNorm.xPercent) * 9;
            const h = (maxNorm.yPercent - minNorm.yPercent) * 9;

            const isSelected = selectedDistrict?.id === dist.id;

            return (
              <div
                key={dist.id}
                onClick={e => {
                  e.stopPropagation();
                  setSelectedDistrict(dist);
                  setSelectedPOI(null);
                  soundEngine.playUIClick();
                }}
                style={{
                  position: 'absolute',
                  left,
                  top,
                  width: w,
                  height: h,
                  background: isSelected ? 'rgba(56, 189, 248, 0.25)' : 'rgba(30, 41, 59, 0.45)',
                  border: isSelected ? '2px solid #38bdf8' : '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 6,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 4,
                  cursor: 'pointer',
                  transition: 'background 0.2s, border 0.2s'
                }}
              >
                <span style={{ fontSize: 11, fontWeight: 800, color: dist.color, letterSpacing: '0.05em', textAlign: 'center', textTransform: 'uppercase' }}>
                  {dist.name}
                </span>
                <span style={{ fontSize: 9, fontWeight: 600, color: '#94a3b8' }}>
                  {dist.archetype}
                </span>
              </div>
            );
          })}

          {/* POI Markers */}
          {filteredPOIs.map(poi => {
            const p = worldToMapPercent(poi.worldPosition[0], poi.worldPosition[2]);
            const isSelected = selectedPOI?.id === poi.id;
            return (
              <div
                key={poi.id}
                onClick={e => {
                  e.stopPropagation();
                  setSelectedPOI(poi);
                  soundEngine.playUIClick();
                }}
                style={{
                  position: 'absolute',
                  left: `${p.xPercent}%`,
                  top: `${p.yPercent}%`,
                  transform: 'translate(-50%, -50%)',
                  cursor: 'pointer',
                  zIndex: 20
                }}
              >
                <div
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: '50%',
                    background: isSelected ? '#ffffff' : poi.category === 'mission' ? '#eab308' : poi.category === 'safehouse' ? '#22c55e' : '#38bdf8',
                    border: '2px solid #0f172a',
                    boxShadow: isSelected ? '0 0 10px #38bdf8' : '0 2px 6px rgba(0,0,0,0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <MapPin size={10} color="#0f172a" />
                </div>
              </div>
            );
          })}

          {/* Custom Player Waypoint Marker */}
          {activeWaypoint && (
            (() => {
              const wp = worldToMapPercent(activeWaypoint[0], activeWaypoint[2]);
              return (
                <div
                  style={{
                    position: 'absolute',
                    left: `${wp.xPercent}%`,
                    top: `${wp.yPercent}%`,
                    transform: 'translate(-50%, -100%)',
                    zIndex: 25,
                    pointerEvents: 'none'
                  }}
                >
                  <div style={{ color: '#ec4899', filter: 'drop-shadow(0 0 8px #ec4899)' }}>
                    <Navigation size={22} fill="#ec4899" />
                  </div>
                </div>
              );
            })()
          )}

          {/* Player Live Marker */}
          <div
            style={{
              position: 'absolute',
              left: `${playerMapPercent.xPercent}%`,
              top: `${playerMapPercent.yPercent}%`,
              transform: 'translate(-50%, -50%)',
              zIndex: 30,
              pointerEvents: 'none'
            }}
          >
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: '50%',
                background: '#38bdf8',
                border: '3px solid #ffffff',
                boxShadow: '0 0 12px #38bdf8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <div style={{ width: 6, height: 6, background: '#0284c7', borderRadius: '50%' }} />
            </div>
          </div>
        </div>

        {/* Selected District Card Overlay */}
        {selectedDistrict && (
          <div
            style={{
              position: 'absolute',
              bottom: 24,
              left: 24,
              width: 320,
              background: 'rgba(15, 23, 42, 0.95)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(56, 189, 248, 0.4)',
              borderRadius: 8,
              padding: 18,
              boxShadow: '0 12px 32px rgba(0,0,0,0.8)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 900, color: '#f8fafc', margin: 0 }}>
                  {selectedDistrict.name}
                </h3>
                <span style={{ fontSize: 12, fontWeight: 600, color: selectedDistrict.color, textTransform: 'uppercase' }}>
                  {selectedDistrict.archetype}
                </span>
              </div>
              <button
                onClick={() => setSelectedDistrict(null)}
                style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
              >
                <X size={16} />
              </button>
            </div>

            <p style={{ fontSize: 13, color: '#cbd5e1', marginTop: 10, lineHeight: 1.4 }}>
              {selectedDistrict.description}
            </p>

            <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#f59e0b' }}>
                <ShieldAlert size={14} /> Threat Level: {selectedDistrict.dangerLevel} / 5
              </div>
              <div style={{ color: '#94a3b8' }}>
                Anchor Landmark: <strong style={{ color: '#f8fafc' }}>{selectedDistrict.keyLandmark}</strong>
              </div>
            </div>

            <button
              onClick={() => {
                setWaypoint(selectedDistrict.center);
                soundEngine.playUIClick();
              }}
              style={{
                marginTop: 14,
                width: '100%',
                background: '#0284c7',
                color: '#fff',
                border: 'none',
                padding: '8px',
                borderRadius: 6,
                fontWeight: 800,
                fontSize: 12,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6
              }}
            >
              <Navigation size={14} /> ROUTE GPS TO DISTRICT CENTER
            </button>
          </div>
        )}

        {/* Selected POI Card Overlay */}
        {selectedPOI && (
          <div
            style={{
              position: 'absolute',
              bottom: 24,
              right: 24,
              width: 320,
              background: 'rgba(15, 23, 42, 0.95)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(245, 158, 11, 0.4)',
              borderRadius: 8,
              padding: 18,
              boxShadow: '0 12px 32px rgba(0,0,0,0.8)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h3 style={{ fontSize: 17, fontWeight: 800, color: '#f8fafc', margin: 0 }}>
                  {selectedPOI.name}
                </h3>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#f59e0b', textTransform: 'uppercase' }}>
                  {selectedPOI.category}
                </span>
              </div>
              <button
                onClick={() => setSelectedPOI(null)}
                style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
              >
                <X size={16} />
              </button>
            </div>

            <p style={{ fontSize: 13, color: '#cbd5e1', marginTop: 10, lineHeight: 1.4 }}>
              {selectedPOI.description}
            </p>

            <button
              onClick={() => {
                setWaypoint(selectedPOI.worldPosition);
                soundEngine.playUIClick();
              }}
              style={{
                marginTop: 14,
                width: '100%',
                background: '#f59e0b',
                color: '#0f172a',
                border: 'none',
                padding: '8px',
                borderRadius: 6,
                fontWeight: 900,
                fontSize: 12,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6
              }}
            >
              <Navigation size={14} /> SET GPS WAYPOINT
            </button>
          </div>
        )}

        {/* Legend / Instructions */}
        <div style={{ position: 'absolute', top: 20, left: 24, background: 'rgba(15, 23, 42, 0.8)', padding: '8px 14px', borderRadius: 6, fontSize: 12, color: '#94a3b8', pointerEvents: 'none' }}>
          Left Drag: Pan | Wheel: Zoom | Right Click: Set GPS Waypoint
        </div>
      </div>
    </div>
  );
};
