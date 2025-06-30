import React from 'react';

import auditData from "../data/AuditData.json" // Adjust as needed
import { ShieldCheckIcon } from 'lucide-react';

const findingOrder = ['critical', 'high', 'major', 'minor', 'informational', 'medium', 'low', 'tips'];

const getFindingLabel = (key: string) => {
  const map: Record<string, string> = {
    critical: 'Critical',
    high: 'High',
    major: 'Major',
    minor: 'Minor',
    informational: 'Informational',
    medium: 'Medium',
    low: 'Low',
    tips: 'Tips',
  };
  return map[key] || key;
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
}: any) => (
  <div
    style={{
      backgroundColor: 'white',
      padding: '1.5rem',
      borderRadius: '1rem',
      boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
      fontFamily: 'sans-serif',
      position: 'relative',
      width: '100%',
      maxWidth: '480px',
      margin: '1rem auto',
    }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
      <h3 style={{ margin: 0, color: '#1D4ED8' }}>
        <strong>{name}</strong>
      </h3>
      {showStatus && (
        <span
          style={{
            backgroundColor: status === 'Passed' ? '#D1FAE5' : '#E0F2FE',
            color: status === 'Passed' ? '#065F46' : '#0369A1',
            padding: '0.25rem 0.75rem',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: '600',
          }}
        >
          {status}
        </span>
      )}
    </div>

    <p style={{ margin: '0.25rem 0' }}>
      <strong>Auditor:</strong>{' '}
      {auditorlink ? (
        <a href={auditorlink} target="_blank" rel="noopener noreferrer" style={{ color: '#3B82F6' }}>
          {auditor}
        </a>
      ) : (
        auditor
      )}
    </p>
    <p style={{ margin: '0.25rem 0 1rem 0', color: '#4B5563' }}>
      <strong>Date:</strong> {date}
    </p>

   <ul style={{ listStyle: 'none', paddingLeft: 0, marginBottom: '1rem' }}>
  {findingOrder
    .filter((key) => findings?.[key] !== undefined)
    .map((key) => (
      <li
        key={key}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          color: '#000',
          marginBottom: '0.4rem',
        }}
      >
        <strong>{getFindingLabel(key)}</strong>
        <span style={{ color: '#0F172A' }}>
          {(findings[key] === '-' || findings[key] === 0) ? '-' : findings[key]} Fixed ✅
        </span>
      </li>
    ))}
</ul>


    {link && (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: '#3B82F6', fontWeight: 500 }}
      >
        View Audit Report
      </a>
    )}
  </div>
);

export default function Audit() {
  const { BLOKCaudits, zerodevAudits } = auditData;

  return (
    <div style={{ padding: '2rem 1rem' }}>
      {/* ✅ Security Audit Intro Section */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        
        <p style={{ maxWidth: '600px', margin: '0.5rem auto' }}>
           <h1 style={{ fontSize: '4rem', fontWeight: 700, marginBottom : '1rem'}}>Security Audits</h1>
          Our protocol undergoes regular security audits by leading blockchain security firms to ensure the highest level of safety for our users.
        </p>
        <p style={{ fontWeight: '600', fontSize: '1rem', color: '#2563EB', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginTop: '1rem' }}>
          <span role="img" aria-label="shield"> <ShieldCheckIcon /></span> 100% Audit Pass Rate
        </p>
      </div>

      {/* ✅ BLOK Audits */}
      <h1 style={{ textAlign: 'center', margin: '4rem 0 2rem', fontSize :'2rem' }}>BLOK Capital DAO Audits</h1>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '1.5rem',
          marginBottom: '3rem',
        }}
      >
        {BLOKCaudits.map((audit, i) => (
          <AuditCard key={`blok-${i}`} {...audit} showStatus />
        ))}
      </div>

      {/* ✅ Zerodev Audits */}
      <h1 style={{ textAlign: 'center', margin: '4rem 0 2rem', fontSize : '2rem' }}>Zerodev Smart Wallet Audits</h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '1.5rem',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {zerodevAudits.flatMap((auditSet, i) =>
          auditSet.reports.map((report, j) => (
            <AuditCard
              key={`zerodev-${i}-${j}`}
              name={report.name}
              auditor={report.auditor}
              auditorlink={report.auditorlink}
              date={report.date}
              findings={report.findings}
              link={report.link}
              showStatus={false}
            />
          ))
        )}
      </div>
    </div>
  );
}
