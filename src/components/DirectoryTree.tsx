import React, { useState } from 'react';
import { FolderIcon } from './FolderIcon';
import { AndroidIcon } from './AndroidIcon';
import { Sparkles, ChevronRight, FileCode, ShieldCheck, ChevronDown } from 'lucide-react';
import { BuildVariant } from '../types/tree';

interface DirectoryTreeProps {
  variant: BuildVariant;
  showFullProject: boolean;
  onSelectApk: (variant: BuildVariant) => void;
  onSelectSourceFile?: (fileName: string) => void;
}

export const DirectoryTree: React.FC<DirectoryTreeProps> = ({
  variant,
  showFullProject,
  onSelectApk,
  onSelectSourceFile,
}) => {
  const [isDebugOpen, setIsDebugOpen] = useState(true);
  const [isReleaseOpen, setIsReleaseOpen] = useState(true);

  return (
    <div className="w-full flex justify-center py-4 select-none">
      <div className="relative inline-block min-w-[340px] sm:min-w-[500px] md:min-w-[620px] px-2 py-4">
        {/* Tree Container with authentic IDE guide styling */}
        <div className="flex flex-col space-y-1 font-mono text-[13.5px] sm:text-[14.5px]">
          
          {/* Level 0: app */}
          <div className="relative group">
            <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-zinc-800/40 hover:bg-zinc-800/70 border border-zinc-700/50 transition-all duration-150">
              <FolderIcon variant="root" size={24} isOpen={true} />
              <span className="font-semibold text-zinc-100 tracking-tight text-[15px]">
                app
              </span>
              <span className="text-[11px] text-zinc-400 font-sans ml-auto bg-zinc-800 px-2 py-0.5 rounded border border-zinc-700">
                Root Module
              </span>
            </div>
          </div>

          {/* Level 1: build (nested under app) */}
          <div className="relative pl-6 sm:pl-8 group">
            {/* Guide line down from 'app' */}
            <div className="absolute left-3 sm:left-4 top-0 bottom-4 w-px bg-zinc-600/60" />
            {/* Horizontal branch elbow to 'build' */}
            <div className="absolute left-3 sm:left-4 top-5 w-3.5 sm:w-4 h-px bg-zinc-600/60" />

            <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-zinc-800/40 hover:bg-zinc-800/70 border border-amber-500/20 transition-all duration-150">
              <FolderIcon variant="build" size={22} isOpen={true} />
              <span className="font-medium text-amber-200 tracking-tight">
                build
              </span>
              <span className="text-[11px] text-amber-400/80 font-sans ml-auto bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/40">
                Gradle Output
              </span>
            </div>

            {/* Level 2: outputs (nested under build) */}
            <div className="relative pl-6 sm:pl-8 mt-1 group">
              {/* Vertical line from 'build' */}
              <div className="absolute left-3 sm:left-4 top-0 bottom-4 w-px bg-zinc-600/60" />
              {/* Horizontal branch elbow to 'outputs' */}
              <div className="absolute left-3 sm:left-4 top-5 w-3.5 sm:w-4 h-px bg-zinc-600/60" />

              <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-zinc-800/40 hover:bg-zinc-800/70 border border-cyan-500/20 transition-all duration-150">
                <FolderIcon variant="outputs" size={22} isOpen={true} />
                <span className="font-medium text-cyan-200 tracking-tight">
                  outputs
                </span>
                <span className="text-[11px] text-cyan-400/80 font-sans ml-auto bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/40">
                  Target Artifacts
                </span>
              </div>

              {/* Level 3: apk (nested under outputs) */}
              <div className="relative pl-6 sm:pl-8 mt-1 group">
                {/* Vertical line from 'outputs' */}
                <div className="absolute left-3 sm:left-4 top-0 bottom-4 w-px bg-zinc-600/60" />
                {/* Horizontal branch elbow to 'apk' */}
                <div className="absolute left-3 sm:left-4 top-5 w-3.5 sm:w-4 h-px bg-zinc-600/60" />

                <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-zinc-800/40 hover:bg-zinc-800/70 border border-emerald-500/20 transition-all duration-150">
                  <FolderIcon variant="apk" size={22} isOpen={true} />
                  <span className="font-medium text-emerald-200 tracking-tight">
                    apk
                  </span>
                  <span className="text-[11px] text-emerald-400/80 font-sans ml-auto bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40">
                    Application Packages (2 variants)
                  </span>
                </div>

                {/* Container for apk subfolders: debug and release */}
                <div className="relative pl-6 sm:pl-8 mt-1.5 space-y-3">
                  {/* Vertical guide line down through all folders in 'apk' */}
                  <div className="absolute left-3 sm:left-4 top-0 bottom-6 w-px bg-zinc-600/60" />

                  {/* ========================================================= */}
                  {/* Level 4A: DEBUG FOLDER */}
                  {/* ========================================================= */}
                  <div className="relative group">
                    {/* Horizontal branch elbow to 'debug' */}
                    <div className="absolute -left-3 sm:-left-4 top-4 w-3 sm:w-4 h-px bg-zinc-600/60" />

                    <div 
                      onClick={() => setIsDebugOpen(!isDebugOpen)}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all duration-150 cursor-pointer ${
                        variant === 'debug'
                          ? 'bg-purple-950/40 border border-purple-500/40 shadow-sm'
                          : 'bg-zinc-800/35 hover:bg-zinc-800/60 border border-zinc-700/40'
                      }`}
                    >
                      <FolderIcon variant="debug" size={20} isOpen={isDebugOpen} />
                      <span className="font-medium text-purple-200 tracking-tight">
                        debug
                      </span>
                      <ChevronDown 
                        size={14} 
                        className={`text-zinc-500 transition-transform ${isDebugOpen ? '' : '-rotate-90'}`} 
                      />
                      <span className="text-[11px] text-purple-400/80 font-sans ml-auto bg-purple-950/40 px-2 py-0.5 rounded border border-purple-800/40">
                        Debug Variant
                      </span>
                    </div>

                    {/* Level 5A: app-debug.apk nested inside debug */}
                    {isDebugOpen && (
                      <div className="relative pl-6 sm:pl-8 mt-2">
                        {/* Guide line down to debug APK */}
                        <div className="absolute left-3 sm:left-4 top-0 h-6 w-px bg-purple-500/60" />
                        <div className="absolute left-3 sm:left-4 top-6 w-3 sm:w-4 h-px bg-purple-500/60" />

                        {/* Highlighted Debug APK card with Android logo overlay */}
                        <div
                          onClick={() => onSelectApk('debug')}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              onSelectApk('debug');
                            }
                          }}
                          className={`cursor-pointer group/apk relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 sm:px-4 sm:py-3 rounded-xl transition-all duration-200 transform hover:-translate-y-0.5 ${
                            variant === 'debug'
                              ? 'bg-gradient-to-r from-emerald-950/70 via-zinc-900 to-zinc-900/95 border-2 border-emerald-500 shadow-[0_0_25px_rgba(61,220,132,0.18)] hover:shadow-[0_0_35px_rgba(61,220,132,0.3)] hover:border-emerald-400'
                              : 'bg-zinc-900/80 hover:bg-zinc-900 border border-zinc-700/80 hover:border-zinc-500 shadow-md'
                          }`}
                        >
                          {/* Left side: Android icon + File Name */}
                          <div className="flex items-center gap-3">
                            <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-950/90 border border-emerald-400/60 shrink-0 shadow-inner">
                              <AndroidIcon size={26} color="#3DDC84" />
                              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping opacity-75" />
                              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400" />
                            </div>

                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-emerald-300 tracking-tight text-[14.5px] sm:text-[15.5px] group-hover/apk:text-emerald-200">
                                  app-debug.apk
                                </span>
                                <span className="bg-purple-500/20 text-purple-300 border border-purple-500/40 text-[10px] font-sans font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
                                  Debug APK
                                </span>
                              </div>
                              <p className="text-[11.5px] text-zinc-400 font-sans flex items-center gap-2 mt-0.5">
                                <span>Package: <strong className="text-zinc-300 font-mono">com.example.scicalc</strong></span>
                                <span>•</span>
                                <span>3.42 MB</span>
                              </p>
                            </div>
                          </div>

                          {/* Right side: Action indicator */}
                          <div className="flex items-center gap-2 self-end sm:self-center">
                            <span className="text-[11px] font-sans text-emerald-400/90 bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-1 rounded-md flex items-center gap-1 group-hover/apk:bg-emerald-900/60 transition-colors">
                              <Sparkles size={12} className="text-emerald-400" />
                              <span>Inspect Artifact</span>
                              <ChevronRight size={13} className="text-emerald-400" />
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* ========================================================= */}
                  {/* Level 4B: RELEASE FOLDER (Within apk directory) */}
                  {/* ========================================================= */}
                  <div className="relative group pt-1">
                    {/* Horizontal branch elbow to 'release' */}
                    <div className="absolute -left-3 sm:-left-4 top-5 w-3 sm:w-4 h-px bg-zinc-600/60" />

                    <div 
                      onClick={() => setIsReleaseOpen(!isReleaseOpen)}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all duration-150 cursor-pointer ${
                        variant === 'release'
                          ? 'bg-amber-950/40 border border-amber-500/40 shadow-sm'
                          : 'bg-zinc-800/35 hover:bg-zinc-800/60 border border-zinc-700/40'
                      }`}
                    >
                      <FolderIcon variant="release" size={20} isOpen={isReleaseOpen} />
                      <span className="font-medium text-amber-200 tracking-tight">
                        release
                      </span>
                      <ChevronDown 
                        size={14} 
                        className={`text-zinc-500 transition-transform ${isReleaseOpen ? '' : '-rotate-90'}`} 
                      />
                      <span className="text-[11px] text-amber-400/90 font-sans ml-auto bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/40 flex items-center gap-1">
                        <ShieldCheck size={12} className="text-amber-400" />
                        <span>Release Variant (Signed)</span>
                      </span>
                    </div>

                    {/* Level 5B: app-release.apk nested inside release folder */}
                    {isReleaseOpen && (
                      <div className="relative pl-6 sm:pl-8 mt-2">
                        {/* Guide line down to release APK */}
                        <div className="absolute left-3 sm:left-4 top-0 h-6 w-px bg-amber-500/60" />
                        <div className="absolute left-3 sm:left-4 top-6 w-3 sm:w-4 h-px bg-amber-500/60" />

                        {/* Highlighted Release APK card with Android logo overlay */}
                        <div
                          onClick={() => onSelectApk('release')}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              onSelectApk('release');
                            }
                          }}
                          className={`cursor-pointer group/apk relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 sm:px-4 sm:py-3 rounded-xl transition-all duration-200 transform hover:-translate-y-0.5 ${
                            variant === 'release'
                              ? 'bg-gradient-to-r from-amber-950/60 via-zinc-900 to-zinc-900/95 border-2 border-amber-500 shadow-[0_0_25px_rgba(245,158,11,0.2)] hover:shadow-[0_0_35px_rgba(245,158,11,0.3)] hover:border-amber-400'
                              : 'bg-zinc-900/80 hover:bg-zinc-900 border border-zinc-700/80 hover:border-amber-500/60 shadow-md'
                          }`}
                        >
                          {/* Left side: Android icon + File Name */}
                          <div className="flex items-center gap-3">
                            {/* Android logo badge with gold/amber release styling */}
                            <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-amber-950/90 border border-amber-400/60 shrink-0 shadow-inner">
                              <AndroidIcon size={26} color="#F59E0B" />
                              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping opacity-75" />
                              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400" />
                            </div>

                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-amber-200 tracking-tight text-[14.5px] sm:text-[15.5px] group-hover/apk:text-amber-100">
                                  app-release.apk
                                </span>
                                <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-sans font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
                                  Release APK
                                </span>
                                <span className="hidden sm:inline-block bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-[10px] font-sans px-1.5 py-0.2 rounded">
                                  R8 Optimized
                                </span>
                              </div>
                              <p className="text-[11.5px] text-zinc-400 font-sans flex items-center gap-2 mt-0.5">
                                <span>Package: <strong className="text-zinc-300 font-mono">com.example.scicalc</strong></span>
                                <span>•</span>
                                <span>2.18 MB</span>
                                <span>•</span>
                                <span className="text-amber-300/80 font-mono text-[11px]">v1/v2/v3 signed</span>
                              </p>
                            </div>
                          </div>

                          {/* Right side: Action indicator */}
                          <div className="flex items-center gap-2 self-end sm:self-center">
                            <span className="text-[11px] font-sans text-amber-300/90 bg-amber-950/60 border border-amber-800/60 px-2.5 py-1 rounded-md flex items-center gap-1 group-hover/apk:bg-amber-900/60 transition-colors">
                              <ShieldCheck size={12} className="text-amber-400" />
                              <span>Inspect Artifact</span>
                              <ChevronRight size={13} className="text-amber-400" />
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* Optional: Full Project Sibling Folders (when enabled, shows src/main and gradle files) */}
          {showFullProject && (
            <div className="relative pl-6 sm:pl-8 mt-3 pt-3 border-t border-zinc-800/80">
              <div className="text-[11px] font-sans uppercase tracking-wider text-zinc-400 font-semibold mb-2">
                Project Source Context (Scientific Calculator)
              </div>

              {/* src / main folder */}
              <div className="space-y-1.5 text-zinc-400 text-xs font-mono">
                {/* MainActivity.kt */}
                <div
                  onClick={() => onSelectSourceFile && onSelectSourceFile('MainActivity.kt')}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded bg-zinc-800/30 hover:bg-zinc-800/60 border border-zinc-800 cursor-pointer text-zinc-300 hover:text-white transition-colors"
                >
                  <FileCode size={16} className="text-purple-400" />
                  <span className="text-zinc-200">src/main/java/com/example/scicalc/</span>
                  <span className="font-semibold text-purple-300">MainActivity.kt</span>
                  <span className="text-[10px] text-zinc-400 ml-auto font-sans bg-zinc-800 px-1.5 py-0.5 rounded">
                    WebView Host
                  </span>
                </div>

                {/* AndroidManifest.xml */}
                <div
                  onClick={() => onSelectSourceFile && onSelectSourceFile('AndroidManifest.xml')}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded bg-zinc-800/30 hover:bg-zinc-800/60 border border-zinc-800 cursor-pointer text-zinc-300 hover:text-white transition-colors"
                >
                  <FileCode size={16} className="text-emerald-400" />
                  <span className="text-zinc-200">src/main/</span>
                  <span className="font-semibold text-emerald-300">AndroidManifest.xml</span>
                  <span className="text-[10px] text-zinc-400 ml-auto font-sans bg-zinc-800 px-1.5 py-0.5 rounded">
                    INTERNET Permission
                  </span>
                </div>

                {/* WebView Assets index.html */}
                <div
                  onClick={() => onSelectSourceFile && onSelectSourceFile('index.html')}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded bg-zinc-800/30 hover:bg-zinc-800/60 border border-zinc-800 cursor-pointer text-zinc-300 hover:text-white transition-colors"
                >
                  <FileCode size={16} className="text-amber-400" />
                  <span className="text-zinc-200">src/main/assets/</span>
                  <span className="font-semibold text-amber-300">www/index.html</span>
                  <span className="text-[10px] text-zinc-400 ml-auto font-sans bg-zinc-800 px-1.5 py-0.5 rounded">
                    Scientific Calc UI
                  </span>
                </div>

                {/* build.gradle (Module: app) */}
                <div
                  onClick={() => onSelectSourceFile && onSelectSourceFile('app/build.gradle')}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded bg-zinc-800/30 hover:bg-zinc-800/60 border border-zinc-800 cursor-pointer text-zinc-300 hover:text-white transition-colors"
                >
                  <FileCode size={16} className="text-blue-400" />
                  <span>app/build.gradle</span>
                  <span className="text-[10px] text-zinc-400 ml-auto font-sans bg-zinc-800 px-1.5 py-0.5 rounded">
                    SDK 33 Config
                  </span>
                </div>

                {/* settings.gradle & root build.gradle */}
                <div
                  onClick={() => onSelectSourceFile && onSelectSourceFile('settings.gradle')}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded bg-zinc-800/30 hover:bg-zinc-800/60 border border-zinc-800 cursor-pointer text-zinc-400 hover:text-zinc-200 transition-colors"
                >
                  <FileCode size={16} className="text-zinc-500" />
                  <span>settings.gradle (ScientificCalculator)</span>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
