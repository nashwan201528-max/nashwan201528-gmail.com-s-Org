import React, { useState, useEffect } from 'react';
import { X, Copy, Check, Terminal, ExternalLink, ShieldCheck, Smartphone, Package } from 'lucide-react';
import { AndroidIcon } from './AndroidIcon';
import { BuildVariant } from '../types/tree';

interface ApkInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  variant: BuildVariant;
  onOpenPhonePreview: () => void;
}

export const ApkInspectorModal: React.FC<ApkInspectorModalProps> = ({
  isOpen,
  onClose,
  variant: initialVariant,
  onOpenPhonePreview,
}) => {
  const [activeVariant, setActiveVariant] = useState<BuildVariant>(initialVariant);
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  useEffect(() => {
    setActiveVariant(initialVariant);
  }, [initialVariant]);

  if (!isOpen) return null;

  const isRelease = activeVariant === 'release';
  const fileName = isRelease ? 'app-release.apk' : 'app-debug.apk';
  const fullPath = `app/build/outputs/apk/${activeVariant}/${fileName}`;
  const adbCommand = `adb install -r ${fullPath}`;
  const gradleTask = isRelease ? ':app:assembleRelease' : ':app:assembleDebug';

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCmd(label);
      setTimeout(() => setCopiedCmd(null), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-zinc-900 border border-zinc-700 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header with Android Badge and Variant Toggle */}
        <div className={`p-6 border-b border-zinc-800 flex items-center justify-between ${
          isRelease 
            ? 'bg-gradient-to-r from-amber-950/60 via-zinc-900 to-zinc-900' 
            : 'bg-gradient-to-r from-emerald-950/60 via-zinc-900 to-zinc-900'
        }`}>
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${
              isRelease 
                ? 'bg-amber-950 border border-amber-500/50 shadow-amber-950/50' 
                : 'bg-emerald-950 border border-emerald-500/50 shadow-emerald-950/50'
            }`}>
              <AndroidIcon size={30} color={isRelease ? '#F59E0B' : '#3DDC84'} />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h3 className={`font-mono font-bold text-lg ${isRelease ? 'text-amber-300' : 'text-emerald-300'}`}>
                  {fileName}
                </h3>
                <span className={`text-[11px] font-sans font-semibold px-2 py-0.5 rounded uppercase border ${
                  isRelease
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                }`}>
                  {activeVariant}
                </span>
              </div>
              <p className="text-xs font-mono text-zinc-400 mt-0.5">
                {fullPath}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Variant Switcher within Modal */}
            <div className="flex items-center bg-zinc-950 rounded-lg p-0.5 border border-zinc-800 text-xs">
              <button
                type="button"
                onClick={() => setActiveVariant('debug')}
                className={`px-2.5 py-1 rounded-md font-mono text-xs transition-colors ${
                  activeVariant === 'debug'
                    ? 'bg-purple-900/60 text-purple-300 font-bold border border-purple-700/50'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                debug
              </button>
              <button
                type="button"
                onClick={() => setActiveVariant('release')}
                className={`px-2.5 py-1 rounded-md font-mono text-xs transition-colors ${
                  activeVariant === 'release'
                    ? 'bg-amber-900/60 text-amber-300 font-bold border border-amber-700/50'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                release
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors ml-1"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          
          {/* Key Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-zinc-950/60 border border-zinc-800 p-3 rounded-xl">
              <span className="text-[11px] text-zinc-400 font-sans block mb-1">Package</span>
              <span className="font-mono text-xs font-bold text-zinc-200 block truncate" title="com.example.scicalc">
                com.example.scicalc
              </span>
            </div>
            <div className="bg-zinc-950/60 border border-zinc-800 p-3 rounded-xl">
              <span className="text-[11px] text-zinc-400 font-sans block mb-1">APK Size</span>
              <span className={`font-mono text-xs font-bold block ${isRelease ? 'text-amber-400' : 'text-emerald-400'}`}>
                {isRelease ? '2.18 MB (R8)' : '3.42 MB'}
              </span>
            </div>
            <div className="bg-zinc-950/60 border border-zinc-800 p-3 rounded-xl">
              <span className="text-[11px] text-zinc-400 font-sans block mb-1">Min / Target SDK</span>
              <span className="font-mono text-xs font-bold text-zinc-200 block">
                24 / 34 (Android 14)
              </span>
            </div>
            <div className="bg-zinc-950/60 border border-zinc-800 p-3 rounded-xl">
              <span className="text-[11px] text-zinc-400 font-sans block mb-1">Signature</span>
              <span className={`font-mono text-xs font-bold block ${isRelease ? 'text-amber-300' : 'text-purple-300'}`}>
                {isRelease ? 'V1, V2, V3 (Release Key)' : 'V1, V2, V3 (Debug)'}
              </span>
            </div>
          </div>

          {/* Quick Action: Test in Phone Simulator */}
          <div className={`p-4 rounded-xl flex items-center justify-between border ${
            isRelease 
              ? 'bg-gradient-to-r from-amber-950/30 via-zinc-950 to-zinc-950 border-amber-800/40'
              : 'bg-gradient-to-r from-emerald-950/40 via-zinc-950 to-zinc-950 border-emerald-800/40'
          }`}>
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-lg border ${
                isRelease
                  ? 'bg-amber-900/40 text-amber-400 border-amber-700/50'
                  : 'bg-emerald-900/50 text-emerald-400 border-emerald-700/50'
              }`}>
                <Smartphone size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-zinc-100 text-sm">
                  Scientific Calculator WebView App
                </h4>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Bundled web application loaded from <code className="text-amber-300 font-mono">assets/www/index.html</code>.
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenPhonePreview();
              }}
              className={`px-3.5 py-2 rounded-lg text-white font-medium text-xs shadow-md transition-colors flex items-center gap-1.5 shrink-0 ${
                isRelease
                  ? 'bg-amber-600 hover:bg-amber-500'
                  : 'bg-emerald-600 hover:bg-emerald-500'
              }`}
            >
              <span>Test App</span>
              <ExternalLink size={14} />
            </button>
          </div>

          {/* Inside the APK: Contents breakdown */}
          <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-950/50">
            <div className="px-4 py-2.5 bg-zinc-900/80 border-b border-zinc-800 flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-300 font-sans flex items-center gap-2">
                <Package size={14} className="text-zinc-400" />
                Package Artifact Contents (Inside {fileName})
              </span>
              <span className="text-[11px] text-zinc-400 font-mono">ZIP archive structure</span>
            </div>
            <div className="p-4 space-y-2 font-mono text-xs text-zinc-300">
              <div className="flex items-center justify-between py-1 border-b border-zinc-850">
                <span className="text-zinc-200">classes.dex</span>
                <span className="text-zinc-400">
                  {isRelease ? '9,840 DEX methods (R8 shrunk & obfuscated)' : '14,290 DEX methods (Kotlin runtime + AndroidX)'}
                </span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-zinc-850">
                <span className="text-emerald-300">assets/www/index.html</span>
                <span className="text-zinc-400">Scientific Calculator UI (loaded by WebView)</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-zinc-850">
                <span className="text-purple-300">AndroidManifest.xml</span>
                <span className="text-zinc-400">Binary XML (MainActivity registered)</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-zinc-850">
                <span className="text-zinc-200">resources.arsc</span>
                <span className="text-zinc-400">Compiled string and drawable resources</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-amber-300">META-INF/{isRelease ? 'RELEASE.RSA & RELEASE.SF' : 'CERT.RSA & CERT.SF'}</span>
                <span className="text-zinc-400">
                  {isRelease ? 'Production Keystore Signature (v2/v3)' : 'Debug Keystore Signature'}
                </span>
              </div>
            </div>
          </div>

          {/* ADB Terminal Install Command */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs text-zinc-400 font-sans font-medium flex items-center gap-1.5">
                <Terminal size={14} className="text-zinc-400" />
                <span>Deploy {fileName} to connected Android device</span>
              </label>
              <button
                onClick={() => copyToClipboard(adbCommand, 'adb')}
                className={`text-xs hover:underline flex items-center gap-1 font-mono ${
                  isRelease ? 'text-amber-400 hover:text-amber-300' : 'text-emerald-400 hover:text-emerald-300'
                }`}
              >
                {copiedCmd === 'adb' ? <Check size={13} /> : <Copy size={13} />}
                <span>{copiedCmd === 'adb' ? 'Copied command!' : 'Copy command'}</span>
              </button>
            </div>
            <div className="bg-zinc-950 rounded-xl p-3 border border-zinc-800 font-mono text-xs flex items-center justify-between">
              <span className={`truncate ${isRelease ? 'text-amber-400' : 'text-emerald-400'}`}>$ {adbCommand}</span>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
          <span>Gradle Task: <code className="text-zinc-300">{gradleTask}</code></span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg text-xs font-medium transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
