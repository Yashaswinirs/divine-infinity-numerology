import React from 'react';

interface VideoPlayerProps {
  url?: string;
  title: string;
  onEnded?: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, title, onEnded }) => {
  if (!url) {
    return (
      <div className="aspect-video w-full rounded-2xl bg-black/40 border border-[#ffd8a2]/20 flex items-center justify-center p-6 text-center">
        <p className="text-sm text-[#ffd8a2]/60">No video stream linked for this lesson.</p>
      </div>
    );
  }

  // Support embed links
  return (
    <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black border border-[#ffd8a2]/20 shadow-2xl relative">
      <iframe
        src={url}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="size-full border-0"
      />
      {onEnded && (
        <div className="absolute bottom-3 right-3">
          <button
            onClick={onEnded}
            className="px-4 py-1.5 bg-[#ffd8a2] text-[#0e081e] text-xs font-semibold rounded-lg shadow-lg hover:bg-[#c99e64] transition-colors"
          >
            Mark as Watched
          </button>
        </div>
      )}
    </div>
  );
};
