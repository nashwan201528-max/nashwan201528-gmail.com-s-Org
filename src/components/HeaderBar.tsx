import React from 'react';
import { Play, Sparkles, Terminal, Smartphone, Share2, Layers, GitBranch, Code, BookOpen } from 'lucide-react';
import { AndroidIcon } from './AndroidIcon';
import { BuildVariant } from '../types/tree';

interface HeaderBarProps {
  variant: BuildVariant;
  setVariant: (variant: BuildVariant) => void;
  viewMode: 'tree' | 'horizontal';
  setViewMode: (mode: 'tree' | 'horizontal') => void;
  showFullProject: boolean;
  setShowFullProject: (val: boolean) => void;
  onOpenTerminal: () => void;
  onOpenPhonePreview: () => void;
  onOpenExport: () => void;
  onOpenSourceModal: () => void;
  onOpenGuide: () => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  variant,
  setVariant,
  viewMode,
  setViewMode,
  showFullProject,
  setShowFullProject,
  onOpenTerminal,
  onOpenPhonePreview,
  onOpenExport,
  onOpenSourceModal,
  onOpenGuide,
}) => {
  return (
    <header className="w-full border-b border-zinc-800/80 bg-zinc-950/70 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        
        {/* Brand / Title */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-700/80 flex items-center justify-center shadow-md">
            <AndroidIcon size={22} color="#3DDC84" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm sm:text-base font-semibold text-zinc-100 tracking-tight">
                Android Directory Tree
              </h1>
              <span className="text-[10px] font-mono bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded border border-zinc-700">
                APK Visualizer
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 font-sans hidden sm:block">
              Targets: <span className="font-mono text-purple-300">app-debug.apk</span> & <span className="font-mono text-amber-300">app-release.apk</span> for <span className="font-mono text-zinc-300">com.example.scicalc</span>
            </p>
          </div>
        </div>

        {/* Center / Variant & View toggles */}
        <div className="flex items-center gap-2 text-xs">
          {/* Variant Selector */}
          <div className="flex items-center bg-zinc-900 rounded-lg p-0.5 border border-zinc-800">
            <button
              onClick={() => setVariant('debug')}
              className={`px-2.5 py-1 rounded-md font-mono text-xs transition-all ${
                variant === 'debug'
                  ? 'bg-purple-950 text-purple-300 font-semibold border border-purple-700/50 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              debug
            </button>
            <button
              onClick={() => setVariant('release')}
              className={`px-2.5 py-1 rounded-md font-mono text-xs transition-all ${
                variant === 'release'
                  ? 'bg-amber-950 text-amber-300 font-semibold border border-amber-700/50 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              release
            </button>
          </div>

          {/* View mode toggle */}
          <div className="flex items-center bg-zinc-900 rounded-lg p-0.5 border border-zinc-800">
            <button
              onClick={() => setViewMode('tree')}
              className={`px-2.5 py-1 rounded-md text-xs font-sans transition-all flex items-center gap-1.5 ${
                viewMode === 'tree'
                  ? 'bg-zinc-800 text-zinc-100 font-medium shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
              title="Tree view"
            >
              <GitBranch size={13} />
              <span>Tree</span>
            </button>
            <button
              onClick={() => setViewMode('horizontal')}
              className={`px-2.5 py-1 rounded-md text-xs font-sans transition-all flex items-center gap-1.5 ${
                viewMode === 'horizontal'
                  ? 'bg-zinc-800 text-zinc-100 font-medium shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
              title="Horizontal pipeline view"
            >
              <Layers size={13} />
              <span>Pipeline</span>
            </button>
          </div>

          {/* Full project context toggle */}
          <button
            onClick={() => setShowFullProject(!showFullProject)}
            className={`px-2.5 py-1 rounded-lg text-xs border transition-colors flex items-center gap-1 ${
              showFullProject
                ? 'bg-zinc-800 border-zinc-600 text-white font-medium'
                : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-zinc-200'
            }`}
            title="Toggle source files in tree"
          >
            <span>+ Source files</span>
          </button>
        </div>

        {/* Right Action buttons */}
        <div className="flex items-center gap-2">
          {/* Guide button */}
          <button
            onClick={onOpenGuide}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-sans bg-emerald-950/60 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/50 transition-colors shadow-sm"
            title="دليل تشغيل Android Studio"
          >
            <BookOpen size={13} />
            <span className="hidden lg:inline">دليل البناء</span>
          </button>

          {/* View MainActivity.kt button */}
          <button
            onClick={onOpenSourceModal}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono bg-zinc-900 hover:bg-zinc-850 text-purple-300 border border-purple-800/40 transition-colors"
            title="Inspect MainActivity.kt"
          >
            <Code size={13} />
            <span className="hidden md:inline">MainActivity.kt</span>
          </button>

          {/* Build Terminal Simulator */}
          <button
            onClick={onOpenTerminal}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-zinc-900 hover:bg-zinc-850 text-emerald-300 border border-emerald-800/40 transition-colors"
            title="Simulate ./gradlew assembleDebug"
          >
            <Terminal size={13} />
            <span className="hidden sm:inline">./gradlew</span>
          </button>

          {/* Phone preview */}
          <button
            onClick={onOpenPhonePreview}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-emerald-950/70 hover:bg-emerald-900 text-emerald-300 border border-emerald-700/60 transition-colors shadow-sm"
            title="Test WebView Calculator"
          >
            <Smartphone size={13} />
            <span className="hidden sm:inline">Preview App</span>
          </button>

          {/* Export */}
          <button
            onClick={onOpenExport}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800 transition-colors"
            title="Export / Share"
          >
            <Share2 size={15} />
          </button>
        </div>

      </div>
    </header>
  );
};
