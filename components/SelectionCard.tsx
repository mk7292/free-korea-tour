"use client";

interface SelectionCardProps {
  label: string;
  emoji: string;
  selected: boolean;
  onClick: () => void;
}

export default function SelectionCard({ label, emoji, selected, onClick }: SelectionCardProps) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border-2 transition-all duration-200 w-full min-h-[90px] font-medium text-sm
        ${selected
          ? "border-[#C8102E] bg-[#C8102E] text-white shadow-lg scale-105"
          : "border-gray-200 bg-white text-[#0D0D0D] hover:border-[#1B3FAB] hover:shadow-md"
        }`}
    >
      <span className="text-2xl">{emoji}</span>
      <span>{label}</span>
    </button>
  );
}
