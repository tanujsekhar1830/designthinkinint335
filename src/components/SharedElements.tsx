import { ShieldCheck } from 'lucide-react';

export function ExampleBadge({ text = 'Example only' }: { text?: string }) {
  return (
    <span className="inline-flex shrink-0 items-center rounded-md border border-[#FDE68A] bg-[#FEF3C7] px-2 py-0.5 text-[11px] font-semibold text-[#92400E]">
      {text}
    </span>
  );
}

export function SafetyReminder({
  text = 'Wait in the designated area and board safely.',
}: {
  text?: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-[#BBF7D0] bg-[#F0FDF4] px-3.5 py-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#DCFCE7] text-[#16A34A]">
        <ShieldCheck className="h-5 w-5" strokeWidth={2.2} />
      </div>
      <p className="text-[13px] font-medium leading-snug text-[#14532D]">
        {text}
      </p>
    </div>
  );
}

export function CampusBuildingIllustration({ stopName }: { stopName: string }) {
  return (
    <div
      className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-[#F8FBFF] px-4 py-4"
      aria-label={`Illustration of campus pickup stop near ${stopName}`}
    >
      <svg
        viewBox="0 0 260 120"
        className="h-28 w-full max-w-[240px]"
        role="img"
        aria-hidden="true"
      >
        {/* Ground & Roadway */}
        <rect x="10" y="96" width="240" height="12" rx="6" fill="#DBEAFE" />
        <line
          x1="28"
          y1="102"
          x2="232"
          y2="102"
          stroke="#93C5FD"
          strokeWidth="2"
          strokeDasharray="6 6"
        />

        {/* Campus Building */}
        <rect
          x="36"
          y="34"
          width="112"
          height="62"
          rx="4"
          fill="#FFFFFF"
          stroke="#12376B"
          strokeWidth="2"
        />
        {/* Roof pediment */}
        <polygon
          points="30,34 92,14 154,34"
          fill="#EAF2FD"
          stroke="#12376B"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* Windows */}
        <rect x="48" y="46" width="16" height="14" rx="2" fill="#BFDBFE" />
        <rect x="72" y="46" width="16" height="14" rx="2" fill="#BFDBFE" />
        <rect x="96" y="46" width="16" height="14" rx="2" fill="#BFDBFE" />
        <rect x="120" y="46" width="16" height="14" rx="2" fill="#BFDBFE" />
        {/* Entrance Door */}
        <rect x="82" y="70" width="20" height="26" rx="2" fill="#12376B" />

        {/* Designated Stop Sign Post */}
        <line
          x1="172"
          y1="52"
          x2="172"
          y2="96"
          stroke="#12376B"
          strokeWidth="2.5"
        />
        <rect
          x="161"
          y="42"
          width="22"
          height="16"
          rx="3"
          fill="#1D4ED8"
        />
        <rect x="166" y="47" width="12" height="5" rx="1" fill="#FFFFFF" />

        {/* Blue Location Marker Pin */}
        <path
          d="M210 24 C198 24 190 33 190 44 C190 59 210 78 210 78 C210 78 230 59 230 44 C230 33 222 24 210 24 Z"
          fill="#1D4ED8"
          stroke="#12376B"
          strokeWidth="2"
        />
        <circle cx="210" cy="44" r="7" fill="#FFFFFF" />
      </svg>
      <span className="mt-1 text-xs font-medium text-slate-600">
        {stopName} · Designated Pickup Bay
      </span>
    </div>
  );
}
