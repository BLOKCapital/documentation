import React from 'react';
import auditData from '../data/AuditData.json';
import { ShieldCheckIcon } from 'lucide-react';
import { useColorMode } from '@docusaurus/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import translations from '../data/translations.json';

// Order in which findings are displayed
const findingOrder = [
  'critical', 'high', 'major', 'medium', 'minor',
  'low', 'informational', 'tips'
];

export default function Audit() {
  const { BLOKCaudits, zerodevAudits } = auditData;
  const { i18n } = useDocusaurusContext();
  const t = translations[i18n.currentLocale]?.auditTables || translations.en.auditTables;

  const findingLabels: Record<string, string> = {
    critical: t.critical,
    high: t.high,
    major: t.major,
    medium: t.medium,
    minor: t.minor,
    low: t.low,
    informational: t.informational,
    tips: t.tips
  };

  const statusStyles: Record<string, { bg: string; color: string }> = {
    [t.passed]: { bg: '#D1FAE5', color: '#065F46' },
    [t.failed]: { bg: '#FEE2E2', color: '#991B1B' },
    [t.default]: { bg: '#E0F2FE', color: '#0369A1' },
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
    status = t.passed,
  }: AuditCardProps) => {
    const { colorMode } = useColorMode();
    const headingColor = colorMode === 'dark' ? '#3399ff' : '#004eba';
    const { bg, color } = statusStyles[status] || statusStyles[t.default];
    const cardBg = colorMode === 'dark' ? '#1f2937' : '#ffffff';
    const textPrimary = colorMode === 'dark' ? '#e5e7eb' : '#0f172a';
    const textSecondary = colorMode === 'dark' ? '#9ca3af' : '#4b5563';
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
          <strong>{t.auditor}:</strong>{' '}
          {auditorlink ? (
            <a href={auditorlink} target="_blank" rel="noopener noreferrer" style={{ color: '#60a5fa' }}>
              {auditor}
            </a>
          ) : auditor}
        </p>
        <p style={{ margin: '0.25rem 0 1rem', color: textSecondary }}>
          <strong>{t.date}:</strong> {date}
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
                  {(findings[key] === '-' || findings[key] === 0) ? '-' : findings[key]} {t.fixed} ✅
                </span>
              </li>
            ))}
        </ul>
        {link && (
          <a href={link} target="_blank" rel="noopener noreferrer" style={{ color: '#3B82F6', fontWeight: 500 }}>
            {t.viewAuditReport}
          </a>
        )}
      </div>
    );
  };

  return (
    <div style={{ padding: '2rem 1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '1rem' }}>{t.securityAudits}</h1>
        <p style={{ maxWidth: '600px', margin: '0 auto' }}>
          {t.securityAuditsDesc}
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
          <ShieldCheckIcon /> {t.auditPassRate}
        </p>
      </div>
      {/* BLOK Capital Audits */}
      <h2 style={{ textAlign: 'center', margin: '4rem 0 2rem', fontSize: '2rem' }}>{t.blokAudits}</h2>
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
      <h2 style={{ textAlign: 'center', margin: '4rem 0 2rem', fontSize: '2rem' }}>{t.zerodevAudits}</h2>
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