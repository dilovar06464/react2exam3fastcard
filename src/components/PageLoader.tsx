import logo from '../assets/Images/Group 1000004658.png'

export default function PageLoader() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-10">
      
      {/* Logo + Brand */}
      <div className="flex items-center gap-3 animate-pulse">
        <img src={logo} alt="logo" className="w-10 h-10 object-contain" />
        <span className="text-2xl font-extrabold text-black tracking-tight">fastcart</span>
      </div>

      {/* Main loader ring */}
      <div className="relative w-20 h-20">
        {/* Outer ring */}
        <svg className="absolute inset-0 animate-spin" style={{ animationDuration: '1.2s' }} viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="34" fill="none" stroke="#f5f5f5" strokeWidth="6" />
          <circle
            cx="40" cy="40" r="34"
            fill="none"
            stroke="#db4444"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray="60 154"
          />
        </svg>
        {/* Inner ring */}
        <svg className="absolute inset-0 animate-spin" style={{ animationDuration: '0.8s', animationDirection: 'reverse' }} viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="22" fill="none" stroke="#fce8e8" strokeWidth="5" />
          <circle
            cx="40" cy="40" r="22"
            fill="none"
            stroke="#f87171"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="30 108"
          />
        </svg>
        {/* Center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-[#db4444] animate-ping opacity-75" />
        </div>
      </div>

      {/* Animated dots */}
      <div className="flex items-center gap-2">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-[#db4444]"
            style={{
              animation: 'bounce 1.2s ease-in-out infinite',
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>

      {/* Loading text */}
      <p className="text-sm text-gray-400 tracking-widest uppercase font-medium animate-pulse">
        Loading...
      </p>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40% { transform: scale(1.2); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
