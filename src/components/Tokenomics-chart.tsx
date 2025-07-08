"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  PieLabelRenderProps,
} from "recharts";
import data from "../data/tokenData.json";
import { useColorMode } from "@docusaurus/theme-common";

const RADIAN = Math.PI / 180;

export default function Chart() {
  const { colorMode } = useColorMode();
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
    const textAnchor = connectorX > cxNum ? "start" : "end";

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
          x={connectorX + (textAnchor === "start" ? 6 : -6)}
          y={connectorY}
          textAnchor={textAnchor}
          dominantBaseline="central"
          fill={colorMode === "dark" ? "#fff" : "#000"}
          fontSize={16}
          fontWeight="bold"
        >
          {data[index].title}
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
  return (
    <div style={{ width: "100%", height: 800, padding: "2rem 0" }}>
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
                stroke={colorMode === "dark" ? "#222" : "#fff"}
                strokeWidth={1.5}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
