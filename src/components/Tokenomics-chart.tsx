// 'use client';

// import React, { useState } from 'react';
// import {
//   PieChart,
//   Pie,
//   Cell,
//   ResponsiveContainer,
// } from 'recharts';
// import data from "../data/tokenData.json"// Adjust path if necessary

// export default function Chart() {
//   const [activeIndex, setActiveIndex] = useState<number | null>(null);

//   const RADIAN = Math.PI / 180;

//   const renderCustomLabel = ({
//     cx,
//     cy,
//     midAngle,
//     innerRadius,
//     outerRadius,
//     percent,
//     index,
//   }: any) => {
//     const outerConnectorLength = 70; // make connector longer
//     const radius = outerRadius + outerConnectorLength;
//     const x = cx + radius * Math.cos(-midAngle * RADIAN);
//     const y = cy + radius * Math.sin(-midAngle * RADIAN);

//     const label = data[index];
//     const textAnchor = x > cx ? 'start' : 'end';

//     // Point on the outer edge of the slice
//     const lineX = cx + outerRadius * Math.cos(-midAngle * RADIAN);
//     const lineY = cy + outerRadius * Math.sin(-midAngle * RADIAN);

//     // Point inside the slice for %
//     const centerRadius = innerRadius + (outerRadius - innerRadius) / 2;
//     const percentX = cx + centerRadius * Math.cos(-midAngle * RADIAN);
//     const percentY = cy + centerRadius * Math.sin(-midAngle * RADIAN);

//     return (
//       <g>
//         {/* Line from slice to text */}
//         <line
//           x1={lineX}
//           y1={lineY}
//           x2={x}
//           y2={y}
//           stroke={label.color}
//           strokeWidth={2}
//         />

//         {/* Circle at end */}
//         <circle cx={x} cy={y} r={3} fill={label.color} />

//         {/* Title label (only title, in black) */}
//         <text
//           x={x + (textAnchor === 'start' ? 6 : -6)}
//           y={y}
//           textAnchor={textAnchor}
//           dominantBaseline="central"
//           fill="#000"
//           fontSize={16}
//           fontWeight={500}
//         >
//           {label.title}
//         </text>

//         {/* % inside slice */}
//         {percent > 0.015 && (
//           <text
//             x={percentX}
//             y={percentY}
//             textAnchor="middle"
//             dominantBaseline="central"
//             fill="#fff"
//             fontSize={16}
//             fontWeight="bold"
//           >
//             {`${Math.round(percent * 100)}%`}
//           </text>
//         )}
//       </g>
//     );
//   };

//   return (
//     <div
//       style={{
//         width: '100%',
//         height: '800px',
//         background: 'transparent',
//         padding: '2rem 0',
//       }}
//     >
//       <ResponsiveContainer width="100%" height="100%">
//         <PieChart>
//           <Pie
//             data={data}
//             cx="50%"
//             cy="50%"
//             innerRadius={100}
//             outerRadius={220}
//             dataKey="value"
//             paddingAngle={2}
//             isAnimationActive={false}
//             label={renderCustomLabel}
//             onMouseEnter={(_, index) => setActiveIndex(index)}
//             onMouseLeave={() => setActiveIndex(null)}
//           >
//             {data.map((entry, index) => (
//               <Cell
//                 key={`cell-${index}`}
//                 fill={entry.color}
//                 stroke="#fff"
//                 strokeWidth={1.5}
//               />
//             ))}
//           </Pie>
//         </PieChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }


'use client';

import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  PieLabelRenderProps,
} from 'recharts';
import data from '../data/tokenData.json';

const RADIAN = Math.PI / 180;

const renderCustomLabel = ({
  cx = 0,
  cy = 0,
  midAngle = 0,
  innerRadius = 0,
  outerRadius = 0,
  percent = 0,
  index = 0,
}: PieLabelRenderProps) => {
  const cxNum = Number(cx);
  const cyNum = Number(cy);
  const midAngleRad = -Number(midAngle) * RADIAN;
  const inner = Number(innerRadius);
  const outer = Number(outerRadius);

  const connectorRadius = outer + 70;
  const connectorX = cxNum + connectorRadius * Math.cos(midAngleRad);
  const connectorY = cyNum + connectorRadius * Math.sin(midAngleRad);
  const lineX = cxNum + outer * Math.cos(midAngleRad);
  const lineY = cyNum + outer * Math.sin(midAngleRad);

  const centerRadius = inner + (outer - inner) / 2;
  const percentX = cxNum + centerRadius * Math.cos(midAngleRad);
  const percentY = cyNum + centerRadius * Math.sin(midAngleRad);

  const label = data[index];
  const textAnchor = connectorX > cxNum ? 'start' : 'end';

  return (
    <g>
      <line
        x1={lineX}
        y1={lineY}
        x2={connectorX}
        y2={connectorY}
        stroke={label.color}
        strokeWidth={2}
      />
      <circle cx={connectorX} cy={connectorY} r={3} fill={label.color} />
      <text
        x={connectorX + (textAnchor === 'start' ? 6 : -6)}
        y={connectorY}
        textAnchor={textAnchor}
        dominantBaseline="central"
        fill="#000"
        fontSize={16}
        fontWeight={500}
      >
        {label.title}
      </text>
      {percent > 0.015 && (
        <text
          x={percentX}
          y={percentY}
          textAnchor="middle"
          dominantBaseline="central"
          fill="#fff"
          fontSize={16}
          fontWeight="bold"
        >
          {`${Math.round(percent * 100)}%`}
        </text>
      )}
    </g>
  );
};

export default function Chart() {
  return (
    <div style={{ width: '100%', height: 800, padding: '2rem 0' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={100}
            outerRadius={220}
            dataKey="value"
            paddingAngle={2}
            isAnimationActive={false}
            label={renderCustomLabel}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                stroke="#fff"
                strokeWidth={1.5}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
