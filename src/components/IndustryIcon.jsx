import React from 'react';

const shapes = {
  healthcare: <>
    <path d="M12 4h8v8h8v8h-8v8h-8v-8H4v-8h8z" />
    <path d="M9 16h4l2-3 2 6 2-3h4" />
  </>,
  'real-estate': <>
    <path d="M4 28h24M7 28V9l9-5 9 5v19M12 28v-8h8v8" />
    <path d="M11 12h3m4 0h3m-10 4h3m4 0h3" />
  </>,
  'sales-crm': <>
    <circle cx="8" cy="10" r="3" /><circle cx="24" cy="10" r="3" /><circle cx="16" cy="24" r="3" />
    <path d="M11 10h10M9.8 12.5l4.5 8.8m7.9-8.8-4.5 8.8" />
  </>,
  finance: <>
    <path d="M4 27h24M7 23v-5h4v5m4 0v-9h4v9m4 0V9h4v14" />
    <path d="m6 12 7-4 5 2 8-6m-4 0h4v4" />
  </>,
  commerce: <>
    <path d="m16 3 12 6v14l-12 6L4 23V9zM4 9l12 6 12-6M16 15v14M10 6l12 6" />
  </>,
  operations: <>
    <circle cx="16" cy="16" r="4" /><circle cx="6" cy="6" r="2" /><circle cx="26" cy="6" r="2" />
    <circle cx="6" cy="26" r="2" /><circle cx="26" cy="26" r="2" />
    <path d="m8 8 5 5m6 0 5-5M8 24l5-5m6 0 5 5" />
  </>,
};

export default function IndustryIcon({ industry }) {
  return <svg className="industry-icon" width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {shapes[industry] || shapes.operations}
  </svg>;
}
