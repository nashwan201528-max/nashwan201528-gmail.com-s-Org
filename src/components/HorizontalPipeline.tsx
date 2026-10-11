import React from 'react';
import { ChevronRight, Sparkles, ShieldCheck } from 'lucide-react';
import { FolderIcon } from './FolderIcon';
import { AndroidIcon } from './AndroidIcon';
import { BuildVariant } from '../types/tree';

interface HorizontalPipelineProps {
  variant: BuildVariant;
  onSelectApk: (variant: BuildVariant) => void;
}

export const HorizontalPipeline: React.FC<HorizontalPipelineProps> = ({
  variant,
  onSelectApk,
}) => {
  const commonSteps = [
    { name: 'app', label: 'Root Module', variant: 'root' as const },
    { name: 'build', label: 'Gradle Output', variant: 'build' as const },
    { name: 'outputs', label: 'Artifacts Dir', variant: 'outputs' as const },
    { name: 'apk', label: 'Packages (APK)', variant: 'apk' as const },
  ];

  return (
    <div className="w-full flex flex-col items-center py-6 px-2 overflow-x-auto">
      <div className="flex items-center gap-2 sm:gap-3 p-4 bg-zinc-900/60 border border-zinc-800 rounded-2xl shadow-xl min-w-max">
        {/* Common ancestor folders */}
        {commonSteps.map((step) => (
          <React.Fragment key={step.name}>
            <div className="flex flex-col items-center p-3 rounded-xl bg-zinc-800/50 border border-zinc-700/60 min-w-[85px]">
              <FolderIcon variant={step.variant} size={24} isOpen={true} />
              <span className="font-mono font-semibold text-zinc-100 text-sm mt-1.5">
                {step.name}
              </span>
              <span className="text-[10px] text-zinc-400 font-sans mt-0.5">
                {step.label}
              </span>
            </div>

            {/* Arrow connector */}
            <ChevronRight size={18} className="text-zinc-600 shrink-0" />
          </React.Fragment>
        ))}

        {/* Branching container for Debug & Release variants */}
        <div className="flex flex-col gap-2.5 pl-1">
          {/* Debug Branch */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-purple-950/30 border border-purple-800/40 min-w-[100px]">
              <FolderIcon variant="debug" size={20} isOpen={true} />
              <div>
                <div className="font-mono font-semibold text-purple-200 text-xs">debug</div>
                <div className="text-[9px] text-purple-400 font-sans">Debug folder</div>
              </div>
            </div>

            <ChevronRight size={15} className="text-purple-500/70 shrink-0" />

            <div
              onClick={() => onSelectApk('debug')}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl cursor-pointer transition-all ${
                variant === 'debug'
                  ? 'bg-gradient-to-r from-emerald-950 to-zinc-900 border-2 border-emerald-500 shadow-[0_0_18px_rgba(61,220,132,0.25)]'
                  : 'bg-zinc-800/60 hover:bg-zinc-800 border border-zinc-700'
              }`}
            >
              <div className="relative p-0.5">
                <AndroidIcon size={22} color="#3DDC84" />
              </div>
              <div>
                <div className="font-mono font-bold text-emerald-300 text-xs">app-debug.apk</div>
                <div className="text-[9.5px] text-zinc-400 font-sans flex items-center gap-1">
                  <Sparkles size={9} className="text-emerald-400" />
                  <span>3.42 MB • Debug</span>
                </div>
              </div>
            </div>
          </div>

          {/* Release Branch (Explicitly Included) */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-950/30 border border-amber-800/40 min-w-[100px]">
              <FolderIcon variant="release" size={20} isOpen={true} />
              <div>
                <div className="font-mono font-semibold text-amber-200 text-xs">release</div>
                <div className="text-[9px] text-amber-400 font-sans">Release folder</div>
              </div>
            </div>

            <ChevronRight size={15} className="text-amber-500/70 shrink-0" />

            <div
              onClick={() => onSelectApk('release')}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl cursor-pointer transition-all ${
                variant === 'release'
                  ? 'bg-gradient-to-r from-amber-950 to-zinc-900 border-2 border-amber-500 shadow-[0_0_18px_rgba(245,158,11,0.25)]'
                  : 'bg-zinc-800/60 hover:bg-zinc-800 border border-zinc-700'
              }`}
            >
              <div className="relative p-0.5">
                <AndroidIcon size={22} color="#F59E0B" />
              </div>
              <div>
                <div className="font-mono font-bold text-amber-300 text-xs">app-release.apk</div>
                <div className="text-[9.5px] text-zinc-400 font-sans flex items-center gap-1">
                  <ShieldCheck size={9} className="text-amber-400" />
                  <span>2.18 MB • Signed Release</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
