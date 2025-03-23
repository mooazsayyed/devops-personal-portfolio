import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import '../styles/TestWorkDisplay.css';

const TestWorkDisplay: React.FC = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollSpeed, setScrollSpeed] = useState(0);
  const lastScrollTop = useRef(0);
  const lastScrollTime = useRef(Date.now());

  useEffect(() => {
    const handleScroll = () => {
      const currentTime = Date.now();
      const currentScrollTop = window.scrollY;
      const timeDelta = currentTime - lastScrollTime.current;

      if (timeDelta > 0) {
        const rawSpeed = Math.abs(currentScrollTop - lastScrollTop.current) / timeDelta;
        setScrollSpeed(prevSpeed => prevSpeed * 0.8 + rawSpeed * 30);
      }

      setScrollPosition(-currentScrollTop);
      lastScrollTop.current = currentScrollTop;
      lastScrollTime.current = currentTime;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const blurAmount = Math.min(scrollSpeed * 0.5, 5);

  return (
    <HighwayContainer style={{ filter: `blur(${blurAmount}px)` }}>
      <SkyBackground>
        <HolographicGrid />
        <FloatingParticles />
      </SkyBackground>
      <Highway>
        <RoadSurface 
          style={{ 
            transform: `perspective(1000px) rotateX(60deg) translateY(${scrollPosition * 0.2}px)`,
            borderRadius: '0',
          }}
        >
          <div className="lane-marker left" />
          <div className="lane-marker center" />
          <div className="lane-marker right" />
          <div className="floating-elements">
            {[...Array(10)].map((_, i) => (
              <div 
                key={i}
                className={`traffic-signal ${i % 2 === 0 ? 'left' : 'right'}`}
                style={{transform: `translateY(${i * 20}px)`}}
              />
            ))}
          </div>
          <GlowingBarriers>
            <Barrier side="left" />
            <Barrier side="right" />
          </GlowingBarriers>
        </RoadSurface>
      </Highway>
      <SpeedIndicator active={scrollSpeed > 1}>
        <SpeedValue>{Math.floor(scrollSpeed * 10)}</SpeedValue>
        <span>KM/H</span>
      </SpeedIndicator>
    </HighwayContainer>
  );
};

// Styled Components
const HighwayContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: #0a0a12;
  transition: filter 0.2s ease-out;
`;

const SkyBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('https://example.com/path/to/cyberpunk-cityscape.jpg') no-repeat center center fixed, #0a0a12;
  background-size: cover;
  z-index: 1;
`;

const HolographicGrid = styled.div`
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background-image: 
    linear-gradient(rgba(12, 255, 225, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(12, 255, 225, 0.1) 1px, transparent 1px);
  background-size: 40px 40px;
  transform: perspective(500px) rotateX(60deg);
  opacity: 0.5;
  animation: gridMove 20s linear infinite;

  @keyframes gridMove {
    0% { background-position: 0px 0px; }
    100% { background-position: 40px 40px; }
  }
`;

const FloatingParticles = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  /* Add particle effects here */
`;

const FloatingElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

interface TrafficSignalProps {
  position: 'left' | 'right';
  offset: number;
}

const TrafficSignal = styled.div<TrafficSignalProps>`
  position: absolute;
  top: ${props => 10 + props.offset}vh;
  ${props => props.position === 'left' ? 'left: 5%;' : 'right: 5%;'}
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.7);
  border: 2px solid #0cffe1;
  box-shadow: 0 0 15px rgba(12, 255, 225, 0.8);
  animation: pulseSignal 2s infinite alternate ${props => props.offset / 10}s;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #0cffe1;
    opacity: 0.8;
  }

  &::after {
    content: '';
    position: absolute;
    top: -30px;
    ${props => props.position === 'left' ? 'left: 50%;' : 'right: 50%;'}
    width: 2px;
    height: 30px;
    background: #0cffe1;
    box-shadow: 0 0 10px rgba(12, 255, 225, 0.8);
  }

  @keyframes pulseSignal {
    0% { opacity: 0.5; transform: scale(0.9); }
    100% { opacity: 1; transform: scale(1.1); }
  }
`;

interface BarrierProps {
  side: 'left' | 'right';
}

const GlowingBarriers = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const Barrier = styled.div<BarrierProps>`
  position: absolute;
  top: 0;
  ${props => props.side === 'left' ? 'left: 0;' : 'right: 0;'}
  width: 10px;
  height: 100%;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    ${props => props.side === 'left' ? 'left: 0;' : 'right: 0;'}
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(
      to bottom,
      ${props => props.side === 'left' ? '#ff2b6d' : '#0cffe1'} 0%,
      ${props => props.side === 'left' ? '#ff2b6d' : '#0cffe1'} 30%,
      transparent 30%,
      transparent 50%
    );
    background-size: 100% 80px;
    box-shadow: 0 0 20px ${props => props.side === 'left' ? 'rgba(255, 43, 109, 0.8)' : 'rgba(12, 255, 225, 0.8)'};
    animation: moveBarriers 2s linear infinite;
    opacity: 0.8;
  }

  @keyframes moveBarriers {
    0% { background-position: 0 0; }
    100% { background-position: 0 80px; }
  }
`;

const SpeedIndicator = styled.div<{ active: boolean }>`
  position: fixed;
  bottom: 30px;
  right: 30px;
  color: #0cffe1;
  font-family: 'Orbitron', sans-serif;
  background: rgba(0, 0, 0, 0.7);
  border: 2px solid #0cffe1;
  border-radius: 10px;
  padding: 10px 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 20px rgba(12, 255, 225, ${props => props.active ? 0.8 : 0.3});
  opacity: ${props => props.active ? 1 : 0.5};
  transition: all 0.3s ease;
  z-index: 100;
`;

const SpeedValue = styled.div`
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 2px;
`;

const RoadSurface = styled.div`
  position: relative;
  width: 60%;
  height: 100%;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0;
  overflow: hidden;
  margin: 0 auto;
`;

const Highway = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 2;
`;

export default TestWorkDisplay;
