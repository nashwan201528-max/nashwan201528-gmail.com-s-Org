import React, { useState, useRef } from 'react';
import { Smartphone, RefreshCw, Wifi, Battery, Sparkles, ExternalLink, Code } from 'lucide-react';
import { RAW_INDEX_HTML } from '../data/rawIndexHtml';

export const SciCalcPreview: React.FC = () => {
  const [key, setKey] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleReload = () => {
    setKey((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Android Device Mockup Frame */}
      <div className="w-[360px] sm:w-[410px] bg-zinc-950 rounded-[40px] p-3.5 shadow-2xl border-4 border-zinc-700/80 relative">
        
        {/* Top Speaker & Camera notch */}
        <div className="w-28 h-4 bg-zinc-900 rounded-full mx-auto mb-2 flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
        </div>

        {/* Android Status Bar */}
        <div className="flex items-center justify-between px-3 text-[10.5px] text-zinc-400 font-sans mb-2">
          <span>12:00</span>
          <div className="flex items-center gap-1.5">
            <Wifi size={11} />
            <Battery size={12} />
          </div>
        </div>

        {/* Android WebView Frame */}
        <div className="bg-[#0b1220] rounded-2xl overflow-hidden border border-zinc-800 flex flex-col h-[520px] shadow-inner relative">
          
          {/* WebView URL Bar Header (showing exact asset URI) */}
          <div className="bg-zinc-950/95 px-3 py-2 border-b border-zinc-800 flex items-center justify-between text-[10.5px] text-zinc-400 font-mono">
            <span className="truncate text-emerald-400/90 font-medium">
              file:///android_asset/www/index.html
            </span>
            <button
              onClick={handleReload}
              className="hover:text-white transition-colors ml-2 p-0.5 rounded hover:bg-zinc-800"
              title="إعادة تحميل الصفحة"
            >
              <RefreshCw size={11} />
            </button>
          </div>

          {/* Actual Embedded HTML Web App (Running User's Scientific Calculator) */}
          <div className="flex-1 w-full h-full bg-[#0b1220]">
            <iframe
              key={key}
              ref={iframeRef}
              srcDoc={RAW_INDEX_HTML}
              title="Scientific Calculator WebView"
              className="w-full h-full border-none"
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
        </div>

        {/* Android Bottom Navigation Pill */}
        <div className="w-28 h-1 bg-zinc-600 rounded-full mx-auto mt-3" />
      </div>

      {/* Info subtitle */}
      <div className="mt-3 text-center space-y-1">
        <p className="text-xs text-zinc-300 font-sans">
          يعمل عبر محرك <code className="text-emerald-400 font-mono">WebView</code> في <code className="text-purple-300 font-mono">MainActivity.kt</code>
        </p>
        <p className="text-[11px] text-zinc-500 font-mono">
          يدعم: الأزرار العلمية، التقييم الآمن RPN، تبديل الوضع الفاتح/الداكن، ولوحة المفاتيح
        </p>
      </div>
    </div>
  );
};
