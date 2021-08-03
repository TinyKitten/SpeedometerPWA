import React, { useCallback } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import styles from './styles.module.css';

type Props = {
  speed: number;
};

const Gauge: React.FC<Props> = ({ speed }: Props) => {
  const [redPathD, setRedPathD] = useState(
    'M 234.86762205972212 234.8380028402848 A 120 120 0 1 0 65.14718625761428 234.8528137423857'
  );

  const angleInRadians = (angleInDegrees: number) =>
    (angleInDegrees - 90) * (Math.PI / 180.0);

  const polarToCartesian = useCallback(
    (cx: number, cy: number, radius: number, angleInDegrees: number) => {
      const a = angleInRadians(angleInDegrees);
      return {
        x: cx + radius * Math.cos(a),
        y: cy + radius * Math.sin(a),
      };
    },
    []
  );

  const arc = useCallback(
    (
      x: number,
      y: number,
      radius: number,
      startAngle: number,
      endAngle: number
    ) => {
      const fullCircle = endAngle - startAngle === 360;
      const start = polarToCartesian(x, y, radius, endAngle - 0.01);
      const end = polarToCartesian(x, y, radius, startAngle);
      const arcSweep = endAngle - startAngle <= 180 ? '0' : '1';

      const d = [
        'M',
        start.x,
        start.y,
        'A',
        radius,
        radius,
        0,
        arcSweep,
        0,
        end.x,
        end.y,
      ].join(' ');

      if (fullCircle) `${d}z`;
      return d;
    },
    [polarToCartesian]
  );

  useEffect(() => {
    if (speed >= 135) {
      setRedPathD(arc(150, 150, 120, -135, 135));
      return;
    }
    if (speed >= 67.5) {
      setRedPathD(arc(150, 150, 120, -135, speed - 67.5));
    } else {
      setRedPathD(arc(150, 150, 120, -135, speed - 135));
    }
  }, [arc, speed]);

  return (
    <div className={styles.container}>
      <svg className={styles.gauge}>
        <path
          style={{ filter: 'drop-shadow(0 0 8px rgba(0, 0, 0, 0.16))' }}
          d="M 256.0845275746526 256.04750355035594 A 140 140 0 1 0 43.93398282201785 256.06601717798213"
          fill="#252525"
          strokeWidth="6"
        />
        <path
          d="M 234.86762205972212 234.8380028402848 A 120 120 0 1 0 65.14718625761428 234.8528137423857"
          fill="none"
          stroke="#fff"
          strokeWidth="6"
        />
        <path
          style={{ transition: 'd 0.5s ease' }}
          d={redPathD}
          fill="none"
          stroke="#E94560"
          strokeWidth="8"
        />

        <text
          x="50%"
          textAnchor="middle"
          y="167.5"
          fontFamily="Arial, Helvetica Neue, sans-serif"
          fontWeight="bold"
          fill="white"
          fontSize="48"
        >
          {speed}
        </text>
        <text
          x="50%"
          textAnchor="middle"
          y="225"
          fontFamily="Arial, Helvetica Neue, sans-serif"
          fontWeight="bold"
          fill="#E94560"
          fontSize="24"
        >
          km/h
        </text>
      </svg>
    </div>
  );
};

export default Gauge;
