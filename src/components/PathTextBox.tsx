import React, { useState } from 'react';
import { Copy, Check, Terminal, Sparkles, ShieldCheck } from 'lucide-react';
import { PathSeparator, BuildVariant } from '../types/tree';

interface PathTextBoxProps {
  currentPathSegments?: string[];
  variant?: BuildVariant;
  onInspectApk?: (variant: BuildVariant) => void;
  onSelectVariant?: (variant: BuildVariant) => void;
}

export const PathTextBox: React.FC<PathTextBoxProps> = ({
  variant = 'debug',
  onInspectApk,
  onSelectVariant,
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [separator, setSeparator] = useState<PathSeparator>(' / ');
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  const debugSegments = ['app', 'build', 'outputs', 'apk', 'debug', 'app-debug.apk'];
  const releaseSegments = ['app', 'build', 'outputs', 'apk', 'release', 'app-release.apk'];

  const debugPath = debugSegments.join(separator);
  const releasePath = releaseSegments.join(separator);

  const handleCopyPath = async (pathText: string, key: string) => {
    try {
      await navigator.clipboard.writeText(pathText);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2200);
    } catch {
      // Fallback
    }
  };

  const handleCopyAll = async () => {
    try {
      const combined = `${debugPath}\n${releasePath}`;
      await navigator.clipboard.writeText(combined);
      setCopiedKey('all');
      setTimeout(() => setCopiedKey(null), 2200);
    } catch {
      // Fallback
    }
  };

  const handleCopyCommand = async (cmd: string, label: string) => {
    try {
      await navigator.clipboard.writeText(cmd);
      setCopiedCommand(label);
      setTimeout(() => setCopiedCommand(null), 2000);
    } catch {
      // Fallback
    }
  };

  const posixReleasePath = releaseSegments.join('/');
  const posixDebugPath = debugSegments.join('/');

  return (
    <div className="w-full max-w-3xl flex flex-col items-center">
      {/* Visual isolation spacer / divider label */}
      <div className="flex items-center gap-3 w-full mb-3 px-4">
        <div className="h-px bg-zinc-700/60 flex-1" />
        <span className="text-[11px] font-mono tracking-wider uppercase text-zinc-400 font-medium">
          Resolved Build Artifact Locations (Debug & Release)
        </span>
        <div className="h-px bg-zinc-700/60 flex-1" />
      </div>

      {/* The Requested Plain Text Box with Light Grey Background */}
      <div className="w-full relative group">
        <div className="bg-[#e5e7eb] text-[#111827] rounded-xl border border-slate-300 shadow-xl p-4 sm:p-5 flex flex-col gap-3.5 transition-all hover:bg-[#edeef2]">
          
          {/* Row 1: Debug APK Path */}
          <div 
            className={`p-3 rounded-lg border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
              variant === 'debug'
                ? 'bg-white/95 border-purple-400/80 shadow-sm ring-1 ring-purple-300/60'
                : 'bg-white/75 hover:bg-white border-slate-300/80'
            }`}
          >
            <div className="flex items-center gap-2.5 overflow-x-auto py-0.5 min-w-0">
              <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-900 border border-purple-300 shrink-0">
                debug
              </span>
              <span className="text-zinc-500 font-mono text-sm select-none shrink-0 font-medium">
                $
              </span>
              <code
                className="font-mono text-[13.5px] sm:text-[14.5px] font-semibold tracking-tight text-[#111827] whitespace-nowrap cursor-pointer selection:bg-purple-200 selection:text-black hover:text-purple-950 transition-colors"
                title="Click to copy debug path"
                onClick={() => {
                  handleCopyPath(debugPath, 'debug');
                  onSelectVariant && onSelectVariant('debug');
                }}
              >
                {debugPath}
              </code>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
              <button
                type="button"
                onClick={() => {
                  handleCopyPath(debugPath, 'debug');
                  onSelectVariant && onSelectVariant('debug');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all shadow-sm ${
                  copiedKey === 'debug'
                    ? 'bg-purple-700 text-white font-semibold'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 active:scale-95'
                }`}
                title="Copy debug APK path"
              >
                {copiedKey === 'debug' ? (
                  <>
                    <Check size={13} className="stroke-[2.5]" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} className="text-slate-600" />
                    <span>Copy Path</span>
                  </>
                )}
              </button>

              {onInspectApk && (
                <button
                  type="button"
                  onClick={() => {
                    onSelectVariant && onSelectVariant('debug');
                    onInspectApk('debug');
                  }}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium bg-purple-50 text-purple-900 hover:bg-purple-100 border border-purple-300 transition-all active:scale-95"
                  title="Inspect debug APK"
                >
                  <Sparkles size={12} className="text-purple-700" />
                  <span className="hidden sm:inline">Inspect</span>
                </button>
              )}
            </div>
          </div>

          {/* Row 2: Release APK Path (Explicitly Requested) */}
          <div 
            className={`p-3 rounded-lg border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
              variant === 'release'
                ? 'bg-white/95 border-amber-500/80 shadow-sm ring-1 ring-amber-400/60'
                : 'bg-white/75 hover:bg-white border-slate-300/80'
            }`}
          >
            <div className="flex items-center gap-2.5 overflow-x-auto py-0.5 min-w-0">
              <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300 shrink-0 flex items-center gap-1">
                <ShieldCheck size={12} className="text-amber-700" />
                <span>release</span>
              </span>
              <span className="text-zinc-500 font-mono text-sm select-none shrink-0 font-medium">
                $
              </span>
              <code
                className="font-mono text-[13.5px] sm:text-[14.5px] font-semibold tracking-tight text-[#111827] whitespace-nowrap cursor-pointer selection:bg-amber-200 selection:text-black hover:text-amber-950 transition-colors"
                title="Click to copy release path"
                onClick={() => {
                  handleCopyPath(releasePath, 'release');
                  onSelectVariant && onSelectVariant('release');
                }}
              >
                {releasePath}
              </code>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
              <button
                type="button"
                onClick={() => {
                  handleCopyPath(releasePath, 'release');
                  onSelectVariant && onSelectVariant('release');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all shadow-sm ${
                  copiedKey === 'release'
                    ? 'bg-amber-600 text-white font-semibold'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 active:scale-95'
                }`}
                title="Copy release APK path"
              >
                {copiedKey === 'release' ? (
                  <>
                    <Check size={13} className="stroke-[2.5]" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} className="text-slate-600" />
                    <span>Copy Path</span>
                  </>
                )}
              </button>

              {onInspectApk && (
                <button
                  type="button"
                  onClick={() => {
                    onSelectVariant && onSelectVariant('release');
                    onInspectApk('release');
                  }}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-300 transition-all active:scale-95"
                  title="Inspect release APK"
                >
                  <Sparkles size={12} className="text-amber-700" />
                  <span className="hidden sm:inline">Inspect</span>
                </button>
              )}
            </div>
          </div>

          {/* Quick Copy Both Paths Button */}
          <div className="flex items-center justify-between pt-1 border-t border-slate-300/60 text-xs">
            <span className="text-[11px] font-sans text-slate-600">
              Both output artifacts generated by <code className="font-mono text-slate-800 bg-white/70 px-1 py-0.5 rounded border border-slate-300">./gradlew assemble</code>
            </span>
            <button
              type="button"
              onClick={handleCopyAll}
              className="text-[11px] font-sans text-slate-700 hover:text-slate-900 font-medium flex items-center gap-1 bg-white hover:bg-slate-50 border border-slate-300 px-2.5 py-1 rounded transition-colors"
            >
              {copiedKey === 'all' ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
              <span>{copiedKey === 'all' ? 'Copied Both Paths!' : 'Copy Both Paths'}</span>
            </button>
          </div>

        </div>

        {/* Format Selector and Quick Commands */}
        <div className="flex flex-wrap items-center justify-between gap-2 mt-2 px-1 text-xs">
          <div className="flex items-center gap-2 text-zinc-400">
            <span className="text-[11px] text-zinc-400">Format:</span>
            <button
              type="button"
              onClick={() => setSeparator(' / ')}
              className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                separator === ' / '
                  ? 'bg-zinc-700 text-emerald-400 font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
              }`}
            >
              app / build / ...
            </button>
            <button
              type="button"
              onClick={() => setSeparator('/')}
              className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                separator === '/'
                  ? 'bg-zinc-700 text-emerald-400 font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
              }`}
            >
              POSIX (app/build/...)
            </button>
            <button
              type="button"
              onClick={() => setSeparator('\\')}
              className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                separator === '\\'
                  ? 'bg-zinc-700 text-emerald-400 font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
              }`}
            >
              Windows (\)
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleCopyCommand(`adb install -r ${posixReleasePath}`, 'adb-release')}
              className="flex items-center gap-1 text-[11px] text-zinc-400 hover:text-amber-300 hover:bg-zinc-800/80 px-2 py-0.5 rounded transition-colors font-mono"
              title="Copy ADB install command for release APK"
            >
              <Terminal size={12} />
              <span>{copiedCommand === 'adb-release' ? 'Copied Release ADB!' : 'adb install release'}</span>
            </button>
            <button
              type="button"
              onClick={() => handleCopyCommand(`adb install -r ${posixDebugPath}`, 'adb-debug')}
              className="flex items-center gap-1 text-[11px] text-zinc-400 hover:text-purple-300 hover:bg-zinc-800/80 px-2 py-0.5 rounded transition-colors font-mono"
              title="Copy ADB install command for debug APK"
            >
              <Terminal size={12} />
              <span>{copiedCommand === 'adb-debug' ? 'Copied Debug ADB!' : 'adb install debug'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
