// import { BLOKCaudits, zerodevAudits } from "../data/AuditData";
// import { motion } from "framer-motion";
// import { Shield, CheckCircle } from "lucide-react";

// export default function AuditPage() {
//   return (
//     <div className="min-h-screen bg-white text-gray-800">
//       {/* Hero Section */}
//       <section className="pt-32 pb-16 bg-gradient-to-b from-white to-blue-50">
//         <div className="max-w-4xl mx-auto px-4 text-center">
//           <motion.h1
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="text-5xl font-extrabold mb-6"
//           >
//             Security Audits
//           </motion.h1>
//           <p className="text-xl text-gray-600 mb-8">
//             Our protocol undergoes regular security audits by leading blockchain security firms to ensure the highest level of safety for our users.
//           </p>
//           <div className="flex justify-center items-center space-x-3">
//             <Shield className="w-10 h-10 text-blue-600" />
//             <span className="text-2xl font-semibold text-blue-600">100% Audit Pass Rate</span>
//           </div>
//         </div>
//       </section>

//       <AuditSection title="BLOK Capital DAO Audits" audits={BLOKCaudits} />
//       <AuditSection title="Zerodev Smart Wallet Audits" audits={zerodevAudits[0].reports} />

//       {/* Security Measures */}
//       <section className="py-24 bg-white border-t">
//         <div className="max-w-4xl mx-auto px-4">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="text-center mb-16"
//           >
//             <h2 className="text-4xl font-bold mb-4">Our Security Measures</h2>
//             <p className="text-lg text-gray-600">
//               We implement multiple layers of security to protect our users and their assets.
//             </p>
//           </motion.div>
//         </div>
//       </section>
//     </div>
//   );
// }

// function AuditSection({ title, audits }) {
//   return (
//     <section className="py-24 bg-gray-50 border-t">
//       <div className="max-w-7xl mx-auto px-4">
//         <motion.h2
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-4xl font-bold text-center mb-16"
//         >
//           {title}
//         </motion.h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//           {audits.map((audit, index) => (
//             <motion.div
//               key={audit.name || index}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: index * 0.15 }}
//               className="bg-white rounded-xl shadow border p-6 hover:shadow-md transition-all"
//             >
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-lg font-semibold text-gray-900">{audit.name}</h3>
//                 {audit.status && (
//                   <span className="bg-green-100 text-green-800 px-3 py-0.5 rounded-full text-sm">
//                     {audit.status}
//                   </span>
//                 )}
//               </div>

//               <div className="text-sm text-gray-700 mb-3 space-y-1">
//                 <p>
//                   Auditor:{" "}
//                   {audit.auditorlink ? (
//                     <a
//                       href={audit.auditorlink}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-blue-600 hover:underline"
//                     >
//                       {audit.auditor}
//                     </a>
//                   ) : (
//                     audit.auditor
//                   )}
//                 </p>
//                 <p>Date: {audit.date}</p>
//               </div>

//               <table className="w-full text-sm text-left text-gray-700 border border-gray-200 rounded mb-4">
//                 <tbody>
//                   {Object.entries(audit.findings).map(([key, value]) => (
//                     <tr key={key} className="border-t">
//                       <td className="py-2 px-3 capitalize font-medium">{key}</td>
//                       <td className="py-2 px-3 text-green-600 flex items-center justify-between">
//                         {String(value)} Fixed <CheckCircle className="w-4 h-4 ml-2" />
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>

//               <a
//                 href={audit.link}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-block text-blue-600 hover:text-blue-800 text-sm font-medium"
//               >
//                 View Full Report →
//               </a>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }











// // import React from "react";
// // import { BLOKCaudits, zerodevAudits } from "../data/AuditData";
// // import { motion } from "framer-motion";
// // import { Shield, CheckCircle } from "lucide-react";

// // export default function Audit(): JSX.Element {
// //   return (
// //     <div className="min-h-screen bg-white text-gray-800">
// //       {/* Header */}
// //       <section className="pt-32 pb-16 bg-gradient-to-b from-blue-100 via-white to-white">
// //         <div className="container mx-auto px-4 text-center max-w-3xl">
// //           <motion.h1
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.8 }}
// //             className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-transparent bg-clip-text mb-6"
// //           >
// //             Security Audits
// //           </motion.h1>
// //           <p className="text-lg md:text-xl text-gray-600 mb-8">
// //             Our protocol undergoes rigorous security assessments by the best in
// //             blockchain security to guarantee the integrity of your assets.
// //           </p>
// //           <div className="flex justify-center items-center gap-3">
// //             <Shield className="w-10 h-10 text-blue-600" />
// //             <span className="text-2xl font-semibold text-blue-700">
// //               100% Audit Pass Rate
// //             </span>
// //           </div>
// //         </div>
// //       </section>

// //       {/* BLOK Capital Audits */}
// //       <section className="py-20 bg-gradient-to-b from-white to-blue-50">
// //         <div className="container mx-auto px-4">
// //           <motion.h2
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.8 }}
// //             className="text-4xl font-bold text-center mb-12 text-gray-800"
// //           >
// //             BLOK Capital DAO Audits
// //           </motion.h2>

// //           <div className="grid md:grid-cols-3 gap-8">
// //             {BLOKCaudits.map((audit, index) => (
// //               <motion.div
// //                 key={audit.name}
// //                 initial={{ opacity: 0, y: 20 }}
// //                 whileInView={{ opacity: 1, y: 0 }}
// //                 transition={{ duration: 0.5, delay: index * 0.15 }}
// //                 className="bg-white bg-opacity-60 backdrop-blur-xl border border-blue-100 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300"
// //               >
// //                 <div className="flex justify-between items-center mb-4">
// //                   <h3 className="text-lg font-semibold">{audit.name}</h3>
// //                   <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
// //                     {audit.status}
// //                   </span>
// //                 </div>
// //                 <div className="text-sm text-gray-600 mb-4 space-y-1">
// //                   <p>
// //                     Auditor:{" "}
// //                     {audit.auditorlink ? (
// //                       <a
// //                         href={audit.auditorlink}
// //                         target="_blank"
// //                         rel="noopener noreferrer"
// //                         className="text-blue-600 hover:underline"
// //                       >
// //                         {audit.auditor}
// //                       </a>
// //                     ) : (
// //                       audit.auditor
// //                     )}
// //                   </p>
// //                   <p>Date: {audit.date}</p>
// //                 </div>

// //                 <div className="space-y-2 text-sm mb-6">
// //                   {Object.entries(audit.findings).map(([key, value]) => (
// //                     <div key={key} className="flex justify-between">
// //                       <span className="capitalize text-gray-700">{key}</span>
// //                       <span className="flex items-center text-green-600 font-medium">
// //                         {String(value)} Fixed{" "}
// //                         <CheckCircle className="w-4 h-4 ml-1" />
// //                       </span>
// //                     </div>
// //                   ))}
// //                 </div>

// //                 <a
// //                   href={audit.link}
// //                   target="_blank"
// //                   rel="noopener noreferrer"
// //                   className="inline-flex text-sm font-medium text-blue-600 hover:underline items-center"
// //                 >
// //                   View Contract Report →
// //                 </a>
// //               </motion.div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* Zerodev Audits */}
// //       <section className="py-20 bg-gray-100">
// //         <div className="container mx-auto px-4">
// //           <motion.h2
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.8 }}
// //             className="text-4xl font-bold text-center mb-12 text-gray-800"
// //           >
// //             Zerodev Smart Wallet Audits
// //           </motion.h2>

// //           <div className="grid md:grid-cols-3 gap-8">
// //             {zerodevAudits[0].reports.map((report, index) => (
// //               <motion.div
// //                 key={index}
// //                 initial={{ opacity: 0, y: 20 }}
// //                 whileInView={{ opacity: 1, y: 0 }}
// //                 transition={{ duration: 0.5, delay: index * 0.15 }}
// //                 className="bg-white bg-opacity-60 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300"
// //               >
// //                 <div className="flex justify-between items-center mb-4">
// //                   <h3 className="text-lg font-semibold">{report.name}</h3>
// //                 </div>
// //                 <div className="text-sm text-gray-600 mb-4 space-y-1">
// //                   <p>
// //                     Auditor:{" "}
// //                     {report.auditorlink ? (
// //                       <a
// //                         href={report.auditorlink}
// //                         target="_blank"
// //                         rel="noopener noreferrer"
// //                         className="text-blue-600 hover:underline"
// //                       >
// //                         {report.auditor}
// //                       </a>
// //                     ) : (
// //                       report.auditor
// //                     )}
// //                   </p>
// //                   <p>Date: {report.date}</p>
// //                 </div>

// //                 <div className="space-y-2 text-sm mb-6">
// //                   {Object.entries(report.findings).map(([key, value]) => (
// //                     <div key={key} className="flex justify-between">
// //                       <span className="capitalize text-gray-700">{key}</span>
// //                       <span className="flex items-center text-green-600 font-medium">
// //                         {String(value)} Fixed{" "}
// //                         <CheckCircle className="w-4 h-4 ml-1" />
// //                       </span>
// //                     </div>
// //                   ))}
// //                 </div>

// //                 <a
// //                   href={report.link}
// //                   target="_blank"
// //                   rel="noopener noreferrer"
// //                   className="inline-flex text-sm font-medium text-blue-600 hover:underline items-center"
// //                 >
// //                   View Audit Report →
// //                 </a>
// //               </motion.div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* Security Measures */}
// //       <section className="py-20 bg-white">
// //         <div className="container mx-auto px-4">
// //           <motion.div
// //             initial={{ opacity: 0, y: 20 }}
// //             whileInView={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.8 }}
// //             className="text-center max-w-3xl mx-auto mb-16"
// //           >
// //             <h2 className="text-4xl font-bold mb-4 text-gray-900">
// //               Our Security Measures
// //             </h2>
// //             <p className="text-lg text-gray-600">
// //               Our architecture is reinforced by multi-layered security
// //               mechanisms to ensure robust protection at all times.
// //             </p>
// //           </motion.div>

// //           <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
// //             {[
// //               {
// //                 title: "Multi-Signature Wallets",
// //                 description:
// //                   "All protocol upgrades require multiple signatures for approval.",
// //               },
// //               {
// //                 title: "Time-Locks",
// //                 description:
// //                   "Changes to critical protocol parameters are subject to time-locks.",
// //               },
// //               {
// //                 title: "Continuous Monitoring",
// //                 description:
// //                   "24/7 automated and manual monitoring of protocol activities.",
// //               },
// //               {
// //                 title: "Bug Bounty Program",
// //                 description:
// //                   "Rewards for responsible disclosure of security vulnerabilities.",
// //                 link: "/bug_bounty",
// //               },
// //             ].map((measure, index) => (
// //               <motion.div
// //                 key={measure.title}
// //                 initial={{ opacity: 0, y: 20 }}
// //                 whileInView={{ opacity: 1, y: 0 }}
// //                 transition={{ duration: 0.5, delay: index * 0.15 }}
// //                 className="bg-gradient-to-br from-white to-blue-50 border border-blue-100 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
// //               >
// //                 <h3 className="text-lg font-semibold mb-2 text-gray-800">
// //                   {measure.link ? (
// //                     <a
// //                       href={measure.link}
// //                       className="text-blue-600 hover:underline"
// //                     >
// //                       {measure.title}
// //                     </a>
// //                   ) : (
// //                     measure.title
// //                   )}
// //                 </h3>
// //                 <p className="text-gray-600 text-sm">{measure.description}</p>
// //               </motion.div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>
// //     </div>
// //   );
// // }



import React from 'react';
import auditData from '@site/src/data/AuditData.json'; // Adjust as needed
import { ShieldCheckIcon } from 'lucide-react';

const findingOrder = ['critical', 'high', 'major', 'minor', 'informational', 'midium', 'low', 'tips'];

const getFindingLabel = (key: string) => {
  const map: Record<string, string> = {
    critical: 'Critical',
    high: 'High',
    major: 'Major',
    minor: 'Minor',
    informational: 'Informational',
    midium: 'Medium',
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
