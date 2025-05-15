import React from 'react';

const cloudflareToken = process.env.NEXT_PUBLIC_CLOUDFLARE_TOKEN;

export const CloudflareWebAnalytics: React.FC = () => {
  if (!cloudflareToken) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('Cloudflare Web Analytics token is not set.');
    }
    return null;
  }
  return (
    <script
      defer
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon={JSON.stringify({ token: cloudflareToken })}
    />
  );
};
