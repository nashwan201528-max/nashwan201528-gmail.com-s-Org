import React, { useState } from 'react';
import { X, Copy, Check, FileCode, Sparkles, Terminal, BookOpen, CheckCircle2, Download } from 'lucide-react';
import { PROJECT_FILES, BUILD_STEPS_AR, IMPORTANT_NOTES_AR } from '../data/projectFiles';

interface SourceCodeViewerModalProps {
  fileName: string;
  isOpen: boolean;
  onClose: () => void;
  initialShowGuide?: boolean;
}

export const SourceCodeViewerModal: React.FC<SourceCodeViewerModalProps> = ({
  fileName,
  isOpen,
  onClose,
  initialShowGuide = false,
}) => {
  const [activeTab, setActiveTab] = useState<string>(
    fileName && PROJECT_FILES[fileName] ? fileName : 'MainActivity.kt'
  );
  const [copied, setCopied] = useState(false);
  const [showGuide, setShowGuide] = useState(initialShowGuide);

  React.useEffect(() => {
    setShowGuide(initialShowGuide);
    if (fileName && PROJECT_FILES[fileName]) {
      setActiveTab(fileName);
    }
  }, [isOpen, initialShowGuide, fileName]);

  if (!isOpen) return null;

  const currentFile = PROJECT_FILES[activeTab] || PROJECT_FILES['MainActivity.kt'];

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const fileKeys = Object.keys(PROJECT_FILES);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="bg-zinc-900 border border-zinc-700 rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Modal Top Header */}
        <div className="px-5 py-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/80">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-purple-950/80 border border-purple-700/60 rounded-xl text-purple-400">
              <FileCode size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-zinc-100 text-sm sm:text-base">
                  {showGuide ? 'دليل تشغيل وبناء المشروع (Android Studio Guide)' : currentFile.name}
                </span>
                <span className="text-[10px] bg-purple-900/60 text-purple-300 border border-purple-700/50 px-2 py-0.5 rounded font-mono">
                  {showGuide ? 'Docs' : currentFile.language}
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-sans mt-0.5">
                {showGuide
                  ? 'خطوات البناء خطوة بخطوة من فتح المشروع حتى توليد ملف APK'
                  : currentFile.path}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!showGuide && (
              <button
                onClick={() => handleCopy(currentFile.content)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 transition-colors shadow-sm"
              >
                {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                <span>{copied ? 'تم النسخ!' : 'نسخ الملف'}</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 px-4 py-2 bg-zinc-950/50 border-b border-zinc-800 overflow-x-auto text-xs font-mono scrollbar-none">
          {fileKeys.map((key) => {
            const file = PROJECT_FILES[key];
            const isActive = !showGuide && activeTab === key;
            return (
              <button
                key={key}
                onClick={() => {
                  setShowGuide(false);
                  setActiveTab(key);
                }}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-purple-950 text-purple-200 font-semibold border border-purple-700/60 shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-850'
                }`}
              >
                <FileCode size={13} className={isActive ? 'text-purple-400' : 'text-zinc-500'} />
                <span>{key}</span>
              </button>
            );
          })}

          {/* Guide Tab */}
          <button
            onClick={() => setShowGuide(true)}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all flex items-center gap-1.5 ml-auto ${
              showGuide
                ? 'bg-emerald-950 text-emerald-200 font-semibold border border-emerald-700/60 shadow-sm'
                : 'text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/30'
            }`}
          >
            <BookOpen size={13} />
            <span>📖 خطوات البناء (Guide)</span>
          </button>
        </div>

        {/* Modal Main Content */}
        <div className="flex-1 overflow-y-auto p-4 bg-zinc-950/95 font-sans">
          {showGuide ? (
            /* Android Studio Build Guide in Arabic & English */
            <div className="max-w-3xl mx-auto space-y-6 py-2" dir="rtl">
              <div className="bg-emerald-950/30 border border-emerald-800/40 p-4 rounded-xl flex items-center gap-3">
                <Sparkles size={22} className="text-emerald-400 shrink-0" />
                <div>
                  <h4 className="font-bold text-emerald-300 text-sm">
                    دليل تشغيل وبناء تطبيق الآلة الحاسبة العلمية في Android Studio
                  </h4>
                  <p className="text-xs text-zinc-300 mt-0.5">
                    المشروع جاهز ومُهيأ بالكامل مع حزمة <code className="text-purple-300 font-mono">com.example.scicalc</code> ومسار الـ APK المحدد.
                  </p>
                </div>
              </div>

              {/* Steps List */}
              <div className="space-y-3">
                {BUILD_STEPS_AR.map((item) => (
                  <div
                    key={item.step}
                    className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex items-start gap-4 hover:border-zinc-700 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-emerald-900/60 border border-emerald-600/60 flex items-center justify-center font-bold font-mono text-emerald-300 text-sm shrink-0">
                      {item.step}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h5 className="font-semibold text-zinc-100 text-sm">
                          {item.title}
                        </h5>
                        <span className="text-[10px] font-mono bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded border border-zinc-700">
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-300 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Target Artifact Highlight Box */}
              <div className="p-4 bg-zinc-900/80 rounded-xl border border-emerald-500/30">
                <div className="text-xs text-emerald-400 font-bold mb-1 flex items-center gap-1.5">
                  <CheckCircle2 size={15} />
                  <span>مكان حفظ ملف الـ APK بعد الانتهاء من الخطوة 4:</span>
                </div>
                <div className="bg-zinc-950 p-3 rounded-lg font-mono text-xs text-zinc-200 border border-zinc-800 mt-2 select-all text-left" dir="ltr">
                  app / build / outputs / apk / debug / app-debug.apk
                </div>
              </div>

              {/* Notes List */}
              <div className="p-4 bg-amber-950/20 rounded-xl border border-amber-800/40">
                <h5 className="font-bold text-amber-300 text-xs mb-2">
                  تنبيهات وملاحظات هامة:
                </h5>
                <ul className="list-disc list-inside space-y-1.5 text-xs text-zinc-300">
                  {IMPORTANT_NOTES_AR.map((note, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            /* Code View */
            <div className="font-mono text-xs leading-relaxed text-zinc-200 select-text">
              <pre className="p-2 selection:bg-purple-900 selection:text-white overflow-x-auto">
                <code>{currentFile.content}</code>
              </pre>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 bg-zinc-950 border-t border-zinc-800 text-xs text-zinc-400 flex items-center justify-between">
          <span className="truncate">
            المشروع: <strong className="text-zinc-200">ScientificCalculator</strong> • التطبيق: <strong className="text-emerald-400 font-mono">com.example.scicalc</strong>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg text-xs font-medium transition-colors shrink-0"
          >
            إغلاق
          </button>
        </div>

      </div>
    </div>
  );
};
