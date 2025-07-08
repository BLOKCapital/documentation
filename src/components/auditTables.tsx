import React from 'react';
import auditData from '../data/AuditData.json';
import { ShieldCheckIcon } from 'lucide-react';
import { useColorMode } from '@docusaurus/theme-common';

// Order in which findings are displayed
const findingOrder = [
  'critical', 'high', 'major', 'medium', 'minor',
  'low', 'informational', 'tips'
];

const findingLabels: Record<string, string> = {
  critical: 'Critical',
  high: 'High',
  major: 'Major',
  medium: 'Medium',
  minor: 'Minor',
  low: 'Low',
  informational: 'Informational',
  tips: 'Tips'
};

const statusStyles: Record<string, { bg: string; color: string }> = {
  Passed: { bg: '#D1FAE5', color: '#065F46' },
  Failed: { bg: '#FEE2E2', color: '#991B1B' },
  Default: { bg: '#E0F2FE', color: '#0369A1' },
};

type AuditCardProps = {
  name: string;
  auditor: string;
  auditorlink?: string;
  date: string;
  findings: Record<string, number | string>;
  link?: string;
  showStatus?: boolean;
  status?: string;
};

const AuditCard = ({
  name,
  auditor,
  auditorlink,
  date,
  findings,
  link,
  showStatus = false,
  status = 'Passed',
}: AuditCardProps) => {
 const { colorMode } = useColorMode();
 const headingColor = colorMode === 'dark' ? '#3399ff' : '#004eba';

const { bg, color } = statusStyles[status] || statusStyles.Default;

const cardBg = colorMode === 'dark' ? '#1f2937' : '#ffffff'; // Tailwind's gray-800
const textPrimary = colorMode === 'dark' ? '#e5e7eb' : '#0f172a'; // Tailwind's slate-100 or slate-900
const textSecondary = colorMode === 'dark' ? '#9ca3af' : '#4b5563'; // soft readable gray
const shadow = colorMode === 'dark'
  ? '0 4px 20px rgba(0,0,0,0.4)'
  : '0 4px 16px rgba(0,0,0,0.1)';
  return (
    <div style={{
  backgroundColor: cardBg,
  padding: '1.5rem',
  borderRadius: '1rem',
  boxShadow: shadow,
  width: '100%',
  maxWidth: '480px',
  margin: '1rem auto',
  fontFamily: 'sans-serif',
  border: colorMode === 'dark' ? '1px solid #374151' : 'none'
}}>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
        <h3 style={{ margin: 0, color: headingColor }}>{name}</h3>
        {showStatus && (
          <span style={{
            backgroundColor: bg,
            color,
            padding: '0.25rem 0.75rem',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: 600
          }}>
            {status}
          </span>
        )}
      </div>

   <p style={{ margin: '0.25rem 0', color: textPrimary }}>

        <strong>Auditor:</strong>{' '}
        {auditorlink ? (
          <a href={auditorlink} target="_blank" rel="noopener noreferrer" style={{ color: '#60a5fa' }}>
            {auditor}
          </a>
        ) : auditor}
      </p>

      <p style={{ margin: '0.25rem 0 1rem', color: textSecondary }}>
        <strong>Date:</strong> {date}
      </p>

      <ul style={{ listStyle: 'none', paddingLeft: 0, marginBottom: '1rem' }}>
        {findingOrder
          .filter(key => findings?.[key] !== undefined)
          .map(key => (
            <li key={key} style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '0.4rem',
              color: textPrimary
            }}>
              <strong>{findingLabels[key] || key}</strong>
              <span>
                {(findings[key] === '-' || findings[key] === 0) ? '-' : findings[key]} Fixed ✅
              </span>
            </li>
          ))}
      </ul>

      {link && (
        <a href={link} target="_blank" rel="noopener noreferrer" style={{ color: '#3B82F6', fontWeight: 500 }}>
          View Audit Report
        </a>
      )}
    </div>
  );
};

export default function Audit() {
  const { BLOKCaudits, zerodevAudits } = auditData;

  return (
    <div style={{ padding: '2rem 1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '1rem' }}>Security Audits</h1>
        <p style={{ maxWidth: '600px', margin: '0 auto' }}>
          Our protocol undergoes regular security audits by leading blockchain security firms to ensure the highest level of safety for our users.
        </p>
        <p style={{
          fontWeight: 600,
          fontSize: '1rem',
          color: '#2563EB',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          marginTop: '1rem'
        }}>
          <ShieldCheckIcon /> 100% Audit Pass Rate
        </p>
      </div>

      {/* BLOK Capital Audits */}
      <h2 style={{ textAlign: 'center', margin: '4rem 0 2rem', fontSize: '2rem' }}>BLOK Capital DAO Audits</h2>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '1.5rem',
        marginBottom: '3rem'
      }}>
        {BLOKCaudits.map((audit: AuditCardProps, i: number) => (
          <AuditCard key={`blok-${i}`} {...audit} showStatus />
        ))}
      </div>

      {/* Zerodev Audits */}
      <h2 style={{ textAlign: 'center', margin: '4rem 0 2rem', fontSize: '2rem' }}>Zerodev Smart Wallet Audits</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '1.5rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {zerodevAudits.flatMap((auditSet: any, i: number) =>
          auditSet.reports.map((report: AuditCardProps, j: number) => (
            <AuditCard key={`zerodev-${i}-${j}`} {...report} />
          ))
        )}
      </div>
    </div>
  );
}