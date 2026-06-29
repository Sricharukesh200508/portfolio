import React, { useState, useEffect, useRef } from 'react';

const ROLES = [
  'AI Systems Engineer',
  'LLM Pipeline Builder',
  'ML Researcher',
  'Explainable AI Specialist',
  'Computer Vision Engineer',
  'Cloud-Native AI Developer',
];

const TYPING_SPEED = 60;
const DELETE_SPEED = 30;
const PAUSE_AFTER = 2200;
const PAUSE_DELETE = 400;

export default function RoleCycler() {
  const [text, setText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const role = ROLES[roleIndex];
    const currentLen = text.length;

    if (isPaused) {
      timeoutRef.current = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, PAUSE_AFTER);
      return;
    }

    if (isDeleting) {
      if (currentLen === 0) {
        timeoutRef.current = setTimeout(() => {
          setIsDeleting(false);
          setRoleIndex(prev => (prev + 1) % ROLES.length);
        }, PAUSE_DELETE);
      } else {
        timeoutRef.current = setTimeout(() => {
          setText(role.slice(0, currentLen - 1));
        }, DELETE_SPEED);
      }
    } else {
      if (currentLen === role.length) {
        setIsPaused(true);
      } else {
        timeoutRef.current = setTimeout(() => {
          setText(role.slice(0, currentLen + 1));
        }, TYPING_SPEED);
      }
    }

    return () => clearTimeout(timeoutRef.current);
  }, [text, roleIndex, isDeleting, isPaused]);

  return (
    <div style={{
      fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
      fontFamily: "'JetBrains Mono', monospace",
      fontWeight: 500,
      letterSpacing: '0.03em',
      minHeight: '2rem',
      display: 'flex',
      alignItems: 'center',
      gap: '2px'
    }}>
      <span style={{
        background: 'linear-gradient(90deg, #00F5FF, #7B2FFF)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}>
        {text}
      </span>
      <span className="typewriter-cursor">▋</span>
    </div>
  );
}
