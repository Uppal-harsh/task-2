import { useState, useRef, useEffect } from 'react';

/**
 * Web Audio API based ambient deep-sea synthesizer
 * Creates subtle oceanic sub-bass drone and realistic sonar pings on user trigger.
 */
export function useAudioAmbience() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const droneNodesRef = useRef([]);
  const sonarIntervalRef = useRef(null);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtxRef.current = new AudioContext();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  const playSonarPing = () => {
    if (!audioCtxRef.current || audioCtxRef.current.state !== 'running') return;
    const ctx = audioCtxRef.current;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(840, now);
    osc.frequency.exponentialRampToValueAtTime(820, now + 1.2);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.04, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.5);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 1.6);
  };

  const startAmbience = () => {
    initAudio();
    const ctx = audioCtxRef.current;
    const now = ctx.currentTime;

    // Sub-bass ocean drone
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(55, now); // A1 note

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(55.5, now); // Gentle binaural beating

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(140, now);

    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.08, now + 2);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc1.start();
    osc2.start();

    droneNodesRef.current = [osc1, osc2, gainNode];

    // Trigger sonar ping every 9 seconds
    playSonarPing();
    sonarIntervalRef.current = setInterval(() => {
      playSonarPing();
    }, 9000);

    setIsPlaying(true);
  };

  const stopAmbience = () => {
    if (sonarIntervalRef.current) {
      clearInterval(sonarIntervalRef.current);
      sonarIntervalRef.current = null;
    }

    if (droneNodesRef.current.length > 0) {
      const [osc1, osc2, gainNode] = droneNodesRef.current;
      if (audioCtxRef.current) {
        gainNode.gain.linearRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.8);
        setTimeout(() => {
          try {
            osc1.stop();
            osc2.stop();
          } catch (e) {
            // ignore if already stopped
          }
        }, 900);
      }
      droneNodesRef.current = [];
    }

    setIsPlaying(false);
  };

  const toggleAmbience = () => {
    if (isPlaying) {
      stopAmbience();
    } else {
      startAmbience();
    }
  };

  useEffect(() => {
    return () => {
      stopAmbience();
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return { isPlaying, toggleAmbience, playSonarPing };
}
