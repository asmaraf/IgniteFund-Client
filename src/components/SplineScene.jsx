import React, { useEffect, useRef, useState } from 'react';
import { Application } from '@splinetool/runtime';
import { Sparkles, Compass } from 'lucide-react';

export const SplineScene = ({
  sceneUrl = 'https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode',
  height = '420px',
  title = 'Interactive 3D Hardware Prototype',
}) => {
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let app = null;
    let isMounted = true;

    const loadSpline = async () => {
      if (!canvasRef.current) return;
      try {
        app = new Application(canvasRef.current);
        await app.load(sceneUrl);
        if (isMounted) {
          setLoading(false);
        }
      } catch (err) {
        console.warn('Spline load fallback:', err);
        if (isMounted) {
          setError(true);
          setLoading(false);
        }
      }
    };

    loadSpline();

    return () => {
      isMounted = false;
      if (app && typeof app.dispose === 'function') {
        try {
          app.dispose();
        } catch (e) {
          // ignore cleanup errors
        }
      }
    };
  }, [sceneUrl]);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: height,
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.15), rgba(15, 23, 42, 0.95))',
        border: '1px solid rgba(99, 102, 241, 0.25)',
        boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.5), inset 0 0 30px rgba(99, 102, 241, 0.1)',
      }}
    >
      {/* 3D Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          outline: 'none',
          cursor: 'grab',
        }}
      />

      {/* Loading Skeleton */}
      {loading && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(15, 23, 42, 0.85)',
            backdropFilter: 'blur(8px)',
            gap: '1rem',
          }}
        >
          <div
            style={{
              width: '46px',
              height: '46px',
              border: '3px solid rgba(99, 102, 241, 0.2)',
              borderTopColor: 'var(--primary)',
              borderRadius: '50%',
              animation: 'spin 0.9s linear infinite',
            }}
          />
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', letterSpacing: '0.5px' }}>
            Loading 3D Hardware Simulation...
          </span>
        </div>
      )}

      {/* Fallback if WebGL/Network offline */}
      {error && !loading && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.95))',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(99, 102, 241, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem',
            }}
          >
            <Compass size={32} color="var(--primary)" />
          </div>
          <h4 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>{title}</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', maxWidth: '320px' }}>
            Real-time telemetry and 3D sensor simulation rendering active.
          </p>
        </div>
      )}

      {/* Interactive Badge / Controller Hint */}
      {!loading && !error && (
        <div
          style={{
            position: 'absolute',
            bottom: '16px',
            right: '16px',
            padding: '6px 14px',
            borderRadius: '20px',
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            fontSize: '0.75rem',
            color: '#a5b4fc',
            pointerEvents: 'none',
          }}
        >
          <Sparkles size={12} color="#fbbf24" />
          <span>Interactive 3D • Drag to Orbit</span>
        </div>
      )}
    </div>
  );
};
