import React from 'react';

interface ModuleContentProps {
  module: {
    title: string;
    videoUrl: string;
  };
}

export default function ModuleContent({ module }: ModuleContentProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">{module.title}</h2>
      <div className="aspect-w-16 aspect-h-9">
        <iframe
          src={module.videoUrl}
          title={module.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-[500px] rounded-xl"
        ></iframe>
      </div>
    </div>
  );
}