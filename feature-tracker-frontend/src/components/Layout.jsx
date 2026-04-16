import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 via-indigo-50 to-blue-200">

      {/* NAVBAR */}
      <Navbar />

      {/* FULL SCREEN CONTENT AREA */}
      <main className="w-full min-h-[calc(100vh-64px)] px-4 py-6">

        <div className="w-full max-w-7xl mx-auto">

          {/* CONTENT CARD */}
<div className="
  w-full
  bg-white/70
  backdrop-blur-xl
  border border-white/40
  rounded-3xl
  shadow-lg
  shadow-blue-100/40
  p-6
  transition-all
">
  {children}
</div>

        </div>

      </main>

    </div>
  );
}