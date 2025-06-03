import React from 'react';

export default function EditThisPage({ editUrl }) {
  const issueUrl = `https://github.com/BLOKCapital/documentation/issues/new?template=docs-suggestion.yml&labels=docs&title=[Docs Suggestion]&body=${encodeURIComponent(
    `📄 **Page:** ${editUrl}\n\n✏️ **Suggestion:** \n\n(please describe your suggestion here)`
  )}`;

  return (
    <div style={{ marginTop: '2rem' }}>
      <a
        href={issueUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{ fontWeight: 'bold', color: '#2962ff' }}
      >
        🛠️ Suggest a change to this page
      </a>
    </div>
  );
}
