import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Play,
  RotateCcw,
  CheckCircle2,
  Terminal,
  Cpu,
  ArrowDown,
  Copy,
  Check,
  Trash2,
  Package,
  Layers,
  Activity,
  Code2
} from 'lucide-react';
import { BuildVariant } from '../types/tree';

interface GradleSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  variant: BuildVariant;
}

interface LogEntry {
  id: string;
  timestamp: string;
  progress: number;
  type: 'cmd' | 'daemon' | 'task' | 'compile' | 'dex' | 'package' | 'success' | 'artifact' | 'info';
  text: string;
  commandSnippet?: string;
}

export const GradleSimulatorModal: React.FC<GradleSimulatorModalProps> = ({
  isOpen,
  onClose,
  variant: initialVariant,
}) => {
  const [selectedVariant, setSelectedVariant] = useState<BuildVariant>(initialVariant);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState<string>('Ready to build');
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [autoScroll, setAutoScroll] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const [filter, setFilter] = useState<'all' | 'commands' | 'tasks'>('all');
  
  // Timer tracking for cleanup
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const logsEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Sync selected variant with prop when prop changes
  useEffect(() => {
    setSelectedVariant(initialVariant);
  }, [initialVariant]);

  // Clean up all timeouts when unmounting or stopping
  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach((t) => clearTimeout(t));
    timeoutsRef.current = [];
  };

  useEffect(() => {
    return () => {
      clearAllTimeouts();
    };
  }, []);

  // Auto-scroll when logs update
  useEffect(() => {
    if (autoScroll && logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs, autoScroll]);

  const targetApk = `app/build/outputs/apk/${selectedVariant}/app-${selectedVariant}.apk`;
  const variantTitle = selectedVariant === 'debug' ? 'Debug' : 'Release';

  const handleRunBuild = () => {
    clearAllTimeouts();
    setIsRunning(true);
    setIsCompleted(false);
    setProgress(0);
    setCurrentStage('Initializing build pipeline...');

    // Initial starting log entries
    const initialLogs: LogEntry[] = [
      {
        id: 'log-0',
        timestamp: '00:00.0',
        progress: 0,
        type: 'cmd',
        text: `$ ./gradlew assemble${variantTitle} --console=rich --info`,
        commandSnippet: `./gradlew assemble${variantTitle}`,
      },
      {
        id: 'log-1',
        timestamp: '00:00.2',
        progress: 4,
        type: 'daemon',
        text: 'Starting Gradle Daemon 8.7 (daemon registry: ~/.gradle/daemon)...',
      },
    ];
    setLogs(initialLogs);

    // Mock build progression steps with command executions and progress percentages
    const steps: Array<{
      delay: number;
      progress: number;
      stage: string;
      type: LogEntry['type'];
      text: string;
      commandSnippet?: string;
    }> = [
      {
        delay: 450,
        progress: 10,
        stage: 'Resolving dependencies & plugins',
        type: 'daemon',
        text: 'Configuring project \':app\' (AGP 8.3.0, Kotlin 2.0.0, SDK 34)',
      },
      {
        delay: 850,
        progress: 18,
        stage: 'Pre-build configuration',
        type: 'task',
        text: '> Task :app:preBuild UP-TO-DATE',
      },
      {
        delay: 1250,
        progress: 25,
        stage: 'Generating build config',
        type: 'task',
        text: `> Task :app:generate${variantTitle}BuildConfig [wrote BuildConfig.java]`,
      },
      {
        delay: 1700,
        progress: 34,
        stage: 'Compiling Android resources',
        type: 'cmd',
        text: '[CMD] aapt2 compile --dir res/ -o app/build/intermediates/res/merged/',
        commandSnippet: 'aapt2 compile res/ -o build/intermediates/res/',
      },
      {
        delay: 2150,
        progress: 42,
        stage: 'Merging assets & Web app',
        type: 'task',
        text: `> Task :app:merge${variantTitle}Assets [bundled assets/www/index.html & scripts]`,
      },
      {
        delay: 2650,
        progress: 55,
        stage: 'Compiling Kotlin source files',
        type: 'compile',
        text: '[CMD] kotlinc -jvm-target 17 src/main/java/com/example/scicalc/MainActivity.kt',
        commandSnippet: 'kotlinc -jvm-target 17 MainActivity.kt',
      },
      {
        delay: 3100,
        progress: 64,
        stage: 'Compiling Kotlin bytecode',
        type: 'task',
        text: `> Task :app:compile${variantTitle}Kotlin [1 Kotlin source compiled to JVM class files]`,
      },
      {
        delay: 3600,
        progress: 74,
        stage: 'Translating bytecode to DEX (D8)',
        type: 'dex',
        text: '[CMD] d8 --min-api 26 --output app/build/intermediates/dex/ build/classes/',
        commandSnippet: 'd8 --min-api 26 --output dex/ classes/',
      },
      {
        delay: 4050,
        progress: 82,
        stage: 'Merging project DEX files',
        type: 'task',
        text: `> Task :app:mergeProjectDex${variantTitle} [1 classes.dex generated, 3,842 methods]`,
      },
      {
        delay: 4500,
        progress: 89,
        stage: 'Packaging APK archive & zipalign',
        type: 'package',
        text: '[CMD] zipalign -p -f -v 4 app-unaligned.apk app-aligned.apk',
        commandSnippet: 'zipalign -p -f -v 4 unaligned.apk aligned.apk',
      },
      {
        delay: 4950,
        progress: 94,
        stage: 'Signing APK artifact',
        type: 'cmd',
        text: `[CMD] apksigner sign --ks ${selectedVariant === 'debug' ? 'debug.keystore' : 'release.jks'} ${targetApk}`,
        commandSnippet: `apksigner sign ${targetApk}`,
      },
      {
        delay: 5350,
        progress: 98,
        stage: 'Finalizing assemble task',
        type: 'task',
        text: `> Task :app:assemble${variantTitle}`,
      },
      {
        delay: 5650,
        progress: 100,
        stage: 'Build Succeeded',
        type: 'success',
        text: 'BUILD SUCCESSFUL in 5.6s (16 actionable tasks: 13 executed, 3 up-to-date)',
      },
      {
        delay: 5900,
        progress: 100,
        stage: 'Artifact Ready',
        type: 'artifact',
        text: `✔ Generated Artifact: ${targetApk} [4.1 MB, Ready for device deployment]`,
      },
    ];

    steps.forEach(({ delay, progress: stepProgress, stage, type, text, commandSnippet }, idx) => {
      const timer = setTimeout(() => {
        setProgress(stepProgress);
        setCurrentStage(stage);

        setLogs((prev) => [
          ...prev,
          {
            id: `step-${idx}-${Date.now()}`,
            timestamp: `00:0${(delay / 1000).toFixed(1)}`,
            progress: stepProgress,
            type,
            text,
            commandSnippet,
          },
        ]);

        if (type === 'artifact') {
          setIsRunning(false);
          setIsCompleted(true);
        }
      }, delay);

      timeoutsRef.current.push(timer);
    });
  };

  const handleClearLogs = () => {
    clearAllTimeouts();
    setIsRunning(false);
    setIsCompleted(false);
    setProgress(0);
    setCurrentStage('Ready to build');
    setLogs([]);
  };

  const handleCopyLogs = async () => {
    const textToCopy = logs
      .map((l) => `[${l.timestamp}] [${String(l.progress).padStart(3, ' ')}%] ${l.text}`)
      .join('\n');
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const filteredLogs = logs.filter((log) => {
    if (filter === 'commands') return log.type === 'cmd';
    if (filter === 'tasks') return log.type === 'task' || log.type === 'compile' || log.type === 'dex' || log.type === 'package';
    return true;
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-zinc-900 border border-zinc-700/80 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col h-[600px] max-h-[92vh]">
        
        {/* Terminal Header Bar */}
        <div className="px-4 py-3 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            {/* Window Dots */}
            <div className="flex items-center gap-1.5 shrink-0">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>

            <div className="flex items-center gap-2 truncate">
              <Terminal size={15} className="text-emerald-400 shrink-0" />
              <span className="font-mono text-xs text-zinc-200 font-semibold truncate">
                Gradle Console & Terminal Simulator
              </span>
            </div>
          </div>

          {/* Top Controls: Variant Toggle, 'Run Build' Button, and Close */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Variant Switcher */}
            <div className="flex items-center bg-zinc-900 rounded-lg p-0.5 border border-zinc-800 text-[11px]">
              <button
                type="button"
                onClick={() => !isRunning && setSelectedVariant('debug')}
                disabled={isRunning}
                className={`px-2 py-0.5 rounded font-mono transition-colors ${
                  selectedVariant === 'debug'
                    ? 'bg-purple-900/60 text-purple-300 font-bold border border-purple-700/50'
                    : 'text-zinc-400 hover:text-zinc-200 disabled:opacity-50'
                }`}
              >
                debug
              </button>
              <button
                type="button"
                onClick={() => !isRunning && setSelectedVariant('release')}
                disabled={isRunning}
                className={`px-2 py-0.5 rounded font-mono transition-colors ${
                  selectedVariant === 'release'
                    ? 'bg-amber-900/60 text-amber-300 font-bold border border-amber-700/50'
                    : 'text-zinc-400 hover:text-zinc-200 disabled:opacity-50'
                }`}
              >
                release
              </button>
            </div>

            {/* Prominent 'Run Build' Button */}
            <button
              type="button"
              onClick={handleRunBuild}
              disabled={isRunning}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all shadow-md ${
                isRunning
                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-700/40 cursor-not-allowed opacity-90'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-500 active:scale-95 shadow-emerald-900/40'
              }`}
            >
              {isRunning ? (
                <>
                  <RotateCcw size={13} className="animate-spin text-emerald-400" />
                  <span>Building ({progress}%)</span>
                </>
              ) : isCompleted ? (
                <>
                  <RotateCcw size={13} />
                  <span>Re-run Build</span>
                </>
              ) : (
                <>
                  <Play size={13} className="fill-current" />
                  <span>Run Build</span>
                </>
              )}
            </button>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors ml-1"
              title="Close Terminal"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Dynamic Status Log & Progress Section */}
        <div className="bg-zinc-950/90 border-b border-zinc-800 px-4 py-3 shrink-0 flex flex-col gap-2.5">
          {/* Top Status Row */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2.5">
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-mono text-[11px] font-semibold uppercase tracking-wider ${
                  isRunning
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 animate-pulse'
                    : isCompleted
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/60'
                    : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    isRunning ? 'bg-emerald-400 animate-ping' : isCompleted ? 'bg-emerald-400' : 'bg-zinc-500'
                  }`}
                />
                {isRunning ? 'Building' : isCompleted ? 'Completed' : 'Idle'}
              </span>

              {/* Current build stage text */}
              <span className="font-mono text-zinc-300 text-xs truncate max-w-[280px] sm:max-w-md">
                {currentStage}
              </span>
            </div>

            {/* Percentage Display & Step count */}
            <div className="flex items-center gap-3 font-mono">
              <span className="text-zinc-500 text-[11px] hidden sm:inline">
                {logs.length > 0 ? `${logs.length} logs captured` : 'No logs yet'}
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-[11px] text-zinc-400">Progress:</span>
                <span className={`text-sm font-bold ${progress === 100 ? 'text-emerald-400' : 'text-zinc-200'}`}>
                  {progress}%
                </span>
              </div>
            </div>
          </div>

          {/* Real-time Progress Bar */}
          <div className="w-full bg-zinc-900 rounded-full h-2 overflow-hidden border border-zinc-800/80 relative">
            <div
              className={`h-full transition-all duration-300 rounded-full ${
                progress === 100
                  ? 'bg-emerald-500 shadow-lg shadow-emerald-500/50'
                  : 'bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400'
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Sub-toolbar: Filters, Auto-scroll toggle, Copy & Clear */}
          <div className="flex items-center justify-between gap-2 text-xs pt-1">
            <div className="flex items-center gap-1.5 font-mono text-[11px]">
              <span className="text-zinc-500 mr-1 hidden sm:inline">Filter:</span>
              <button
                type="button"
                onClick={() => setFilter('all')}
                className={`px-2 py-0.5 rounded transition-colors ${
                  filter === 'all'
                    ? 'bg-zinc-800 text-zinc-200 font-semibold'
                    : 'text-zinc-400 hover:text-zinc-300'
                }`}
              >
                All ({logs.length})
              </button>
              <button
                type="button"
                onClick={() => setFilter('commands')}
                className={`px-2 py-0.5 rounded transition-colors ${
                  filter === 'commands'
                    ? 'bg-zinc-800 text-purple-300 font-semibold'
                    : 'text-zinc-400 hover:text-zinc-300'
                }`}
              >
                Commands ({logs.filter((l) => l.type === 'cmd').length})
              </button>
              <button
                type="button"
                onClick={() => setFilter('tasks')}
                className={`px-2 py-0.5 rounded transition-colors ${
                  filter === 'tasks'
                    ? 'bg-zinc-800 text-emerald-300 font-semibold'
                    : 'text-zinc-400 hover:text-zinc-300'
                }`}
              >
                Tasks ({logs.filter((l) => l.type === 'task' || l.type === 'compile' || l.type === 'dex' || l.type === 'package').length})
              </button>
            </div>

            <div className="flex items-center gap-2 text-[11px] font-mono">
              <button
                type="button"
                onClick={() => setAutoScroll(!autoScroll)}
                className={`flex items-center gap-1 px-2 py-0.5 rounded transition-colors ${
                  autoScroll ? 'text-emerald-400 bg-emerald-950/40' : 'text-zinc-500 hover:text-zinc-400'
                }`}
                title="Toggle automatic downward scroll"
              >
                <ArrowDown size={11} className={autoScroll ? 'animate-bounce' : ''} />
                <span>Auto-scroll: {autoScroll ? 'ON' : 'OFF'}</span>
              </button>

              <button
                type="button"
                onClick={handleCopyLogs}
                disabled={logs.length === 0}
                className="flex items-center gap-1 px-2 py-0.5 rounded text-zinc-400 hover:text-zinc-200 disabled:opacity-40 transition-colors"
                title="Copy all logs to clipboard"
              >
                {isCopied ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                <span>{isCopied ? 'Copied' : 'Copy'}</span>
              </button>

              <button
                type="button"
                onClick={handleClearLogs}
                disabled={logs.length === 0 || isRunning}
                className="flex items-center gap-1 px-2 py-0.5 rounded text-zinc-400 hover:text-rose-400 disabled:opacity-40 transition-colors"
                title="Clear current log output"
              >
                <Trash2 size={11} />
                <span>Clear</span>
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Scrolling List of Mock Terminal Commands & Outputs */}
        <div
          ref={scrollContainerRef}
          className="flex-1 p-4 bg-zinc-950 overflow-y-auto font-mono text-xs leading-relaxed space-y-2 select-text"
        >
          {logs.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-zinc-500 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400">
                <Terminal size={24} />
              </div>
              <div className="max-w-sm space-y-1">
                <p className="text-zinc-300 font-medium">Ready to Simulate Build</p>
                <p className="text-[11px] text-zinc-400">
                  Click the <span className="text-emerald-400 font-semibold">Run Build</span> button above to trigger the simulated Gradle pipeline and stream live terminal commands with build progress percentages.
                </p>
              </div>
              <button
                type="button"
                onClick={handleRunBuild}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs transition-colors shadow-lg shadow-emerald-950/40"
              >
                <Play size={13} className="fill-current" />
                <span>Run Build ({selectedVariant})</span>
              </button>
            </div>
          ) : (
            <>
              {filteredLogs.map((log) => {
                const isCmd = log.type === 'cmd';
                const isSuccess = log.type === 'success';
                const isArtifact = log.type === 'artifact';
                const isCompile = log.type === 'compile';
                const isDex = log.type === 'dex';
                const isPackage = log.type === 'package';

                return (
                  <div
                    key={log.id}
                    className={`flex items-start gap-2.5 rounded px-2.5 py-1.5 transition-colors ${
                      isSuccess
                        ? 'bg-emerald-950/50 border border-emerald-700/60 text-emerald-300 font-semibold shadow-sm'
                        : isArtifact
                        ? 'bg-emerald-900/30 border border-emerald-500/50 text-white shadow-md'
                        : isCmd
                        ? 'bg-purple-950/20 border border-purple-900/40 text-purple-200'
                        : isCompile || isDex || isPackage
                        ? 'bg-zinc-900/50 text-cyan-200'
                        : 'text-zinc-300 hover:bg-zinc-900/30'
                    }`}
                  >
                    {/* Timestamp */}
                    <span className="text-[10px] text-zinc-400 select-none shrink-0 w-11 mt-0.5">
                      [{log.timestamp}]
                    </span>

                    {/* Progress Percentage Badge */}
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded font-mono select-none shrink-0 font-semibold ${
                        log.progress === 100
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : log.progress > 50
                          ? 'bg-teal-950 text-teal-300 border border-teal-800/40'
                          : 'bg-zinc-800 text-zinc-400 border border-zinc-700/60'
                      }`}
                    >
                      {String(log.progress).padStart(3, ' ')}%
                    </span>

                    {/* Type indicator icon or tag */}
                    <span className="shrink-0 mt-0.5">
                      {isCmd && <Code2 size={13} className="text-purple-400" />}
                      {isCompile && <Cpu size={13} className="text-cyan-400" />}
                      {isDex && <Layers size={13} className="text-amber-400" />}
                      {isPackage && <Package size={13} className="text-blue-400" />}
                      {isSuccess && <CheckCircle2 size={13} className="text-emerald-400" />}
                      {isArtifact && <CheckCircle2 size={13} className="text-emerald-300" />}
                    </span>

                    {/* Log text content */}
                    <div className="flex-1 break-all">
                      <span className={isCmd ? 'font-semibold text-purple-300' : ''}>
                        {log.text}
                      </span>
                      {log.commandSnippet && (
                        <div className="mt-1 text-[10px] text-zinc-400 bg-black/40 px-2 py-0.5 rounded border border-zinc-800 font-mono inline-block">
                          Executed: <span className="text-zinc-200">{log.commandSnippet}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Pulsing executing indicator if running */}
              {isRunning && (
                <div className="flex items-center gap-2 text-emerald-400 animate-pulse pt-2 px-2.5">
                  <span className="inline-block w-2 h-4 bg-emerald-400" />
                  <span className="text-xs font-mono">
                    Executing Gradle tasks... [{progress}%] {currentStage}
                  </span>
                </div>
              )}

              {/* Auto-scroll target ref */}
              <div ref={logsEndRef} />
            </>
          )}
        </div>

        {/* Bottom Banner when finished */}
        {isCompleted && (
          <div className="px-4 py-3 bg-emerald-950/90 border-t border-emerald-800/80 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
            <div className="flex items-center gap-2.5 text-emerald-300">
              <CheckCircle2 size={18} className="shrink-0 text-emerald-400" />
              <div>
                <span className="font-semibold text-white">Build Successful (100%):</span>{' '}
                <span className="text-emerald-200">Generated artifact at </span>
                <code className="font-mono bg-emerald-900/60 px-2 py-0.5 rounded text-white font-semibold">
                  {targetApk}
                </code>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleRunBuild}
                className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-600 rounded font-medium text-xs transition-colors"
              >
                Re-run
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-medium text-xs shadow transition-colors"
              >
                Inspect in Tree
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
