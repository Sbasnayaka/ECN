import React from 'react';

const AdRenderer = ({ ad, className = '' }) => {
  if (!ad) return null;
  if (ad.type === 'image') {
    return (
      <a href={ad.link_url} target="_blank" rel="noopener noreferrer" className={className}>
        <img src={ad.image_url} alt={ad.name} className="w-full h-auto object-contain" />
      </a>
    );
  }
  if (ad.type === 'code') {
    return <div className={className} dangerouslySetInnerHTML={{ __html: ad.ad_code }} />;
  }
  return null;
};

export default AdRenderer;