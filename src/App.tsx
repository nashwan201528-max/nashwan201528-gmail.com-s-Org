import React, { useState } from 'react';
import { DirectoryTree } from './components/DirectoryTree';
import { HorizontalPipeline } from './components/HorizontalPipeline';
import { PathTextBox } from './components/PathTextBox';
import { HeaderBar } from './components/HeaderBar';
import { ApkInspectorModal } from './components/ApkInspectorModal';
import { GradleSimulatorModal } from './components/GradleSimulatorModal';
import { SourceCodeViewerModal } from './components/SourceCodeViewerModal';
import { ExportModal } from './components/ExportModal';
import { SciCalcPreview } from './components/SciCalcPreview';
import { BuildVariant } from './types/tree';
import { AndroidIcon } from './components/AndroidIcon';
import { X, Smartphone, Sparkles, Terminal, FileCode, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [variant, setVariant] = useState<BuildVariant>('debug');
  const [viewMode, setViewMode] = useState<'tree' | 'horizontal'>('tree');
  const [showFullProject, setShowFullProject] = useState(false);

  // Modals
  const [isApkInspectorOpen, setIsApkInspectorOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isSourceModalOpen, setIsSourceModalOpen] = useState(false);
  const [isGuideMode, setIsGuideMode] = useState(false);
  const [isPhonePreviewOpen, setIsPhonePreviewOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [selectedSourceFile, setSelectedSourceFile] = useState<string>('MainActivity.kt');

  const currentPathSegments = [
    'app',
    'build',
    'outputs',
    'apk',
    variant,
    variant === 'debug' ? 'app-debug.apk' : 'app-release.apk',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1c1d24] via-[#16171d] to-[#111216] text-zinc-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      
      {/* Top Navigation & Controls */}
      <HeaderBar
        variant={variant}
        setVariant={setVariant}
        viewMode={viewMode}
        setViewMode={setViewMode}
        showFullProject={showFullProject}
        setShowFullProject={setShowFullProject}
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onOpenPhonePreview={() => setIsPhonePreviewOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
        onOpenGuide={() => {
          setIsGuideMode(true);
          setIsSourceModalOpen(true);
        }}
        onOpenSourceModal={() => {
          setIsGuideMode(false);
          setSelectedSourceFile('MainActivity.kt');
          setIsSourceModalOpen(true);
        }}
      />

      {/* Main Visual Canvas Area */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 sm:py-12 relative overflow-hidden">
        
        {/* Subtle editor grid background effect for code-editor authenticity */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
            backgroundSize: '24px 24px',
          }}
        />

        {/* Ambient neutral even lighting / glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/[0.03] rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-4xl flex flex-col items-center z-10 space-y-8 sm:space-y-10">

          {/* Section Subtitle / Context Badge */}
          <div className="flex flex-col items-center text-center space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800/80 border border-zinc-700/80 text-[11px] font-mono text-zinc-300 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Android Build Output Hierarchy</span>
              <span className="text-zinc-500">|</span>
              <span className="text-emerald-400 font-semibold">{variant}</span>
            </div>
          </div>

          {/* Graphical Representation of the File Hierarchy Tree (Center of the frame) */}
          <div className="w-full flex justify-center">
            {viewMode === 'tree' ? (
              <DirectoryTree
                variant={variant}
                showFullProject={showFullProject}
                onSelectApk={(selectedVariant) => {
                  setVariant(selectedVariant);
                  setIsApkInspectorOpen(true);
                }}
                onSelectSourceFile={(fileName) => {
                  setSelectedSourceFile(fileName);
                  setIsSourceModalOpen(true);
                }}
              />
            ) : (
              <HorizontalPipeline
                variant={variant}
                onSelectApk={(selectedVariant) => {
                  setVariant(selectedVariant);
                  setIsApkInspectorOpen(true);
                }}
              />
            )}
          </div>

          {/* The Requested Plain Text Box with Light Grey Background, Isolated Below Tree */}
          <PathTextBox
            variant={variant}
            onSelectVariant={(selectedVariant) => setVariant(selectedVariant)}
            onInspectApk={(selectedVariant) => {
              setVariant(selectedVariant);
              setIsApkInspectorOpen(true);
            }}
          />

          {/* Quick Context helper cards */}
          <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-4">
            {/* Quick Card 1: Package */}
            <div 
              onClick={() => {
                setIsGuideMode(false);
                setSelectedSourceFile('MainActivity.kt');
                setIsSourceModalOpen(true);
              }}
              className="p-3.5 rounded-xl bg-zinc-900/50 hover:bg-zinc-850/70 border border-zinc-800/80 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                <span className="font-sans">Project Package</span>
                <FileCode size={14} className="text-purple-400 group-hover:scale-110 transition-transform" />
              </div>
              <div className="font-mono text-xs font-semibold text-zinc-200 truncate">
                com.example.scicalc
              </div>
              <p className="text-[11px] text-zinc-500 font-sans mt-0.5">
                MainActivity.kt WebView
              </p>
            </div>

            {/* Quick Card 2: Build Command */}
            <div 
              onClick={() => setIsTerminalOpen(true)}
              className="p-3.5 rounded-xl bg-zinc-900/50 hover:bg-zinc-850/70 border border-zinc-800/80 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                <span className="font-sans">Gradle Task</span>
                <Terminal size={14} className="text-emerald-400 group-hover:scale-110 transition-transform" />
              </div>
              <div className="font-mono text-xs font-semibold text-emerald-400 truncate">
                :app:assemble{variant === 'debug' ? 'Debug' : 'Release'}
              </div>
              <p className="text-[11px] text-zinc-500 font-sans mt-0.5">
                Simulate build process
              </p>
            </div>

            {/* Quick Card 3: Live App Preview */}
            <div 
              onClick={() => setIsPhonePreviewOpen(true)}
              className="p-3.5 rounded-xl bg-zinc-900/50 hover:bg-zinc-850/70 border border-zinc-800/80 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                <span className="font-sans">Bundled Asset</span>
                <Smartphone size={14} className="text-amber-400 group-hover:scale-110 transition-transform" />
              </div>
              <div className="font-mono text-xs font-semibold text-amber-300 truncate">
                assets/www/index.html
              </div>
              <p className="text-[11px] text-zinc-500 font-sans mt-0.5">
                Scientific Calculator UI
              </p>
            </div>

            {/* Quick Card 4: Android Studio Build Guide */}
            <div 
              onClick={() => {
                setIsGuideMode(true);
                setIsSourceModalOpen(true);
              }}
              className="p-3.5 rounded-xl bg-emerald-950/20 hover:bg-emerald-950/40 border border-emerald-800/40 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between text-xs text-emerald-400 mb-1">
                <span className="font-sans font-medium">خطوات البناء</span>
                <Sparkles size={14} className="text-emerald-400 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-xs font-semibold text-emerald-300 truncate">
                Android Studio Guide
              </div>
              <p className="text-[11px] text-emerald-500/80 font-sans mt-0.5">
                5 خطوات لبناء الـ APK
              </p>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-zinc-800/60 py-3 px-6 bg-zinc-950/60 text-center text-xs text-zinc-500 font-mono">
        <span>Standard Android Gradle Plugin (AGP) Output Paths • </span>
        <code className="text-purple-300 font-semibold">app/build/outputs/apk/debug/app-debug.apk</code>
        <span className="text-zinc-600 mx-2">•</span>
        <code className="text-amber-300 font-semibold">app/build/outputs/apk/release/app-release.apk</code>
      </footer>

      {/* Modals & Drawers */}
      <ApkInspectorModal
        isOpen={isApkInspectorOpen}
        onClose={() => setIsApkInspectorOpen(false)}
        variant={variant}
        onOpenPhonePreview={() => setIsPhonePreviewOpen(true)}
      />

      <GradleSimulatorModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        variant={variant}
      />

      <SourceCodeViewerModal
        fileName={selectedSourceFile}
        isOpen={isSourceModalOpen}
        onClose={() => setIsSourceModalOpen(false)}
        initialShowGuide={isGuideMode}
      />

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        variant={variant}
      />

      {/* Phone Mockup Modal for Scientific Calculator */}
      {isPhonePreviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-5 max-w-md w-full relative shadow-2xl flex flex-col items-center max-h-[92vh] overflow-y-auto">
            <button
              onClick={() => setIsPhonePreviewOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors z-10"
            >
              <X size={18} />
            </button>

            <div className="text-center mb-3">
              <h3 className="font-semibold text-zinc-100 text-sm flex items-center justify-center gap-2">
                <AndroidIcon size={18} color="#3DDC84" />
                <span>Simulated Android Runtime</span>
              </h3>
              <p className="text-xs text-zinc-400 font-mono mt-0.5">
                com.example.scicalc.MainActivity
              </p>
            </div>

            <SciCalcPreview />
          </div>
        </div>
      )}

    </div>
  );
}
