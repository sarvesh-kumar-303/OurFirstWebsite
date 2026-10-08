import { Code2 } from 'lucide-react';

const DEVELOPERS = [
  { name: 'VIDIYA KUMARI', order: 1 },
  { name: 'SARVESH KUMAR', order: 2 },
  { name: 'PRIYANSHU PRAKASH', order: 3 },
];

export default function DeveloperFooter() {
  return (
    <footer className="w-full py-2 px-4 flex flex-col items-center gap-1">
      <div className="flex items-center gap-1.5 text-slate-600">
        <Code2 className="w-3 h-3" />
        <span className="text-[10px] font-medium uppercase tracking-wider">Developed By</span>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5">
        {DEVELOPERS.map((dev, idx) => (
          <div key={dev.name} className="flex items-center gap-2">
            {idx > 0 && <span className="text-slate-700 text-[10px]">•</span>}
            <span className="text-[11px] font-medium text-slate-500">
              {dev.order}. {dev.name}
            </span>
          </div>
        ))}
      </div>
    </footer>
  );
}
