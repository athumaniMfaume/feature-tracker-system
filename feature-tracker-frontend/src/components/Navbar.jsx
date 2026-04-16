export default function Navbar({ onAddClick }) {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">

      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">

        {/* BRAND */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">FT</span>
          </div>

          <h1 className="text-white text-lg font-bold tracking-wide">
            Feature Tracker
          </h1>
        </div>


      </div>
    </div>
  );
}