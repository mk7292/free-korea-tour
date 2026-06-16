interface Spot {
  name: string;
  description: string;
  isFree: boolean;
  googleMapUrl: string;
  officialUrl: string | null;
}

export default function ResultCard({ spot, index }: { spot: Spot; index: number }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-md overflow-hidden">
      <div className="bg-[#1B3FAB] px-5 py-3 flex items-center gap-3">
        <span className="text-white font-bold text-lg">#{index + 1}</span>
        <h3 className="text-white font-bold text-lg flex-1">{spot.name}</h3>
        {spot.isFree && (
          <span className="bg-[#C8102E] text-white text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap">
            무료 입장
          </span>
        )}
      </div>
      <div className="p-5">
        <p className="text-[#0D0D0D] text-sm leading-relaxed mb-4">{spot.description}</p>
        <div className="flex flex-wrap gap-2">
          <a
            href={spot.googleMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full border-2 border-[#1B3FAB] text-[#1B3FAB] text-sm font-medium hover:bg-[#1B3FAB] hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            구글 맵
          </a>
          {spot.officialUrl && (
            <a
              href={spot.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full border-2 border-[#C8102E] text-[#C8102E] text-sm font-medium hover:bg-[#C8102E] hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              공식 홈페이지
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
