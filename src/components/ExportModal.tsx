import React, { useState } from 'react';
import { X, Copy, Check, Download, FileText, Share2, FolderArchive, Sparkles } from 'lucide-react';
import { BuildVariant } from '../types/tree';
import { PROJECT_FILES } from '../data/projectFiles';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  variant: BuildVariant;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  variant,
}) => {
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'tree' | 'files'>('tree');
  const [downloadedFile, setDownloadedFile] = useState<string | null>(null);

  if (!isOpen) return null;

  const fileName = variant === 'debug' ? 'app-debug.apk' : 'app-release.apk';

  const asciiTree = `app
└── build
    └── outputs
        └── apk
            ├── debug
            │   └── app-debug.apk    <-- [Debug APK]
            └── release
                └── app-release.apk  <-- [Release Signed APK]`;

  const markdownSnippet = `### Android Build Artifact Locations

\`\`\`
app / build / outputs / apk / debug / app-debug.apk
app / build / outputs / apk / release / app-release.apk
\`\`\`

#### Directory Hierarchy
\`\`\`text
app/
├── build/
│   └── outputs/
│       └── apk/
│           ├── debug/
│           │   └── app-debug.apk
│           └── release/
│               └── app-release.apk
\`\`\`

**Package**: \`com.example.scicalc\`
**Debug Artifact**: \`app/build/outputs/apk/debug/app-debug.apk\`
**Release Artifact**: \`app/build/outputs/apk/release/app-release.apk\`
`;

  const copyText = async (text: string, format: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedFormat(format);
      setTimeout(() => setCopiedFormat(null), 2000);
    } catch {
      // Fallback
    }
  };

  const handleDownloadFile = (fileName: string, content: string) => {
    try {
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName.split('/').pop() || fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setDownloadedFile(fileName);
      setTimeout(() => setDownloadedFile(null), 2000);
    } catch {
      // Fallback
    }
  };

  const handleDownloadAll = () => {
    Object.entries(PROJECT_FILES).forEach(([key, file], idx) => {
      setTimeout(() => {
        handleDownloadFile(file.name, file.content);
      }, idx * 250);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-zinc-900 border border-zinc-700 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-5 py-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/60">
          <div className="flex items-center gap-2.5">
            <Share2 size={18} className="text-emerald-400" />
            <h3 className="font-semibold text-zinc-100 text-sm">
              تصدير ومشاركة المشروع (Export & Share)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-2 px-5 pt-3 bg-zinc-950/40 border-b border-zinc-800 text-xs">
          <button
            onClick={() => setActiveTab('tree')}
            className={`px-3 py-1.5 border-b-2 font-medium transition-colors ${
              activeTab === 'tree'
                ? 'border-emerald-400 text-emerald-300'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            مخطط المجلدات (Tree Snippet)
          </button>
          <button
            onClick={() => setActiveTab('files')}
            className={`px-3 py-1.5 border-b-2 font-medium transition-colors ${
              activeTab === 'files'
                ? 'border-emerald-400 text-emerald-300'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            تنزيل ملفات المشروع (Project Files)
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-5">
          {activeTab === 'tree' ? (
            <>
              {/* ASCII Format */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-zinc-300">
                    ASCII Tree (للتوثيق و README)
                  </label>
                  <button
                    onClick={() => copyText(asciiTree, 'ascii')}
                    className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-mono"
                  >
                    {copiedFormat === 'ascii' ? <Check size={13} /> : <Copy size={13} />}
                    <span>{copiedFormat === 'ascii' ? 'تم النسخ' : 'نسخ ASCII'}</span>
                  </button>
                </div>
                <pre className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 font-mono text-xs text-emerald-300 overflow-x-auto">
                  <code>{asciiTree}</code>
                </pre>
              </div>

              {/* Markdown Format */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-zinc-300">
                    Markdown Snippet
                  </label>
                  <button
                    onClick={() => copyText(markdownSnippet, 'markdown')}
                    className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-mono"
                  >
                    {copiedFormat === 'markdown' ? <Check size={13} /> : <Copy size={13} />}
                    <span>{copiedFormat === 'markdown' ? 'تم النسخ' : 'نسخ Markdown'}</span>
                  </button>
                </div>
                <pre className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 font-mono text-xs text-zinc-300 overflow-x-auto max-h-36">
                  <code>{markdownSnippet}</code>
                </pre>
              </div>
            </>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs text-zinc-400">
                  يمكنك تنزيل أي ملف لبدء المشروع في Android Studio فوراً:
                </p>
                <button
                  onClick={handleDownloadAll}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <Download size={13} />
                  <span>تنزيل جميع الملفات</span>
                </button>
              </div>

              <div className="space-y-2">
                {Object.entries(PROJECT_FILES).map(([key, file]) => (
                  <div
                    key={key}
                    className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-mono font-semibold text-zinc-200 block">
                        {file.name}
                      </span>
                      <span className="text-[11px] text-zinc-500 font-mono block">
                        {file.path}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => copyText(file.content, key)}
                        className="p-1.5 rounded bg-zinc-850 hover:bg-zinc-800 text-zinc-300 border border-zinc-750 transition-colors"
                        title="نسخ المحتوى"
                      >
                        {copiedFormat === key ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                      </button>
                      <button
                        onClick={() => handleDownloadFile(key, file.content)}
                        className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-emerald-400 border border-zinc-700 transition-colors flex items-center gap-1 font-mono text-[11px]"
                      >
                        <Download size={12} />
                        <span>{downloadedFile === key ? 'تم التنزيل' : 'تنزيل'}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-zinc-950 border-t border-zinc-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg text-xs font-medium transition-colors"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
