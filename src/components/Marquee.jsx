import React from 'react';

const words = ['AI AGENTS', 'CRM SYSTEMS', 'WORKFLOW AUTOMATION', 'CUSTOM SOFTWARE', 'API INTEGRATIONS'];

export default function Marquee() {
  return <div className="marquee" aria-label="BaigBots capabilities"><div className="marquee-track">
    {[0, 1].map(copy => <div className="marquee-group" key={copy} aria-hidden={copy === 1}>
      {words.map(word => <span key={word}>{word}<b>✳</b></span>)}
    </div>)}
  </div></div>;
}
