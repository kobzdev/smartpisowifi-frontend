import { useState } from "react";

const API_URL = process.env.REACT_APP_API_URL || "https://smartpisowifi-backend.onrender.com";

const packages = [
  { name: "Basic", price: 5, label: "2 Hours", color: "#FF6B6B", icon: "⚡" },
  { name: "Standard", price: 10, label: "4 Hours", color: "#FF9F43", icon: "🔥" },
  { name: "Premium", price: 20, label: "10 Hours", color: "#54A0FF", icon: "💎" },
  { name: "Daily", price: 30, label: "1 Day", color: "#5F27CD", icon: "☀️" },
  { name: "Extended", price: 50, label: "3 Days", color: "#00D2D3", icon: "🌟" },
];

export default function CustomerLogin() {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState(null);
  const [voucherInfo, setVoucherInfo] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  function handleInput(e) {
    let val = e.target.value.toUpperCase().replace(/[^A-Z0-9-]/g, "");
    setCode(val);
    setStatus(null);
  }

  async function handleConnect() {
    if (!code.trim()) return;
    setStatus("loading");

    try {
      const response = await fetch(`${API_URL}/api/vouchers/validate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.trim(), mac_address: null, ip_address: null }),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong. Please try again.");
      } else {
        setVoucherInfo(data.voucher);
        setStatus("success");
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg("Cannot connect to server. Please try again.");
    }
  }

  const pkg = voucherInfo ? packages.find(p => p.name === voucherInfo.package) : null;

  return (
    <div style={{ minHeight: "100vh", background: "#0A0E1A", fontFamily: "'Nunito', sans-serif", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px", position: "relative", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Space+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        @keyframes successPop { 0% { transform: scale(0.8); opacity: 0; } 60% { transform: scale(1.05); } 100% { transform: scale(1); opacity: 1; } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        .card { animation: fadeSlideUp 0.6s cubic-bezier(0.22,1,0.36,1) both; position: relative; z-index: 1; }
        .wifi-icon { animation: float 3s ease-in-out infinite; display: inline-block; }
        .connect-btn { transition: all 0.2s ease; }
        .connect-btn:not(:disabled):hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(102,126,234,0.5) !important; }
        .code-input { transition: all 0.2s ease; }
        .code-input:focus { border-color: #667eea !important; box-shadow: 0 0 0 4px rgba(102,126,234,0.15) !important; outline: none; }
        .pkg-chip { transition: all 0.15s ease; }
        .pkg-chip:hover { transform: translateY(-1px); }
        .success-card { animation: successPop 0.5s cubic-bezier(0.34,1.56,0.64,1) both; }
        .loader { width: 20px; height: 20px; border: 2px solid rgba(255,255,255,0.3); border-top-color: white; border-radius: 50%; animation: spin 0.7s linear infinite; display: inline-block; }
        .shimmer-text { background: linear-gradient(90deg, #667eea, #00D2D3, #FF6B6B, #667eea); background-size: 200% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent; animation: shimmer 3s linear infinite; }
        .dot { display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: #1DD1A1; margin-right: 6px; animation: pulse 1.5s ease-in-out infinite; }
      `}</style>

      <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(102,126,234,0.15) 0%, transparent 70%)", top: -100, left: -100, pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,210,211,0.1) 0%, transparent 70%)", bottom: -80, right: -80, pointerEvents: "none" }} />

      {[...Array(6)].map((_, i) => (
        <div key={i} style={{ position: "absolute", width: 4, height: 4, borderRadius: "50%", background: ["#667eea","#FF6B6B","#00D2D3","#FF9F43","#5F27CD","#1DD1A1"][i], opacity: 0.4, top: `${[15,25,70,80,45,60][i]}%`, left: `${[10,85,5,90,92,8][i]}%`, animation: `float ${2.5+i*0.3}s ease-in-out infinite`, animationDelay: `${i*0.4}s` }} />
      ))}

      <div className="card" style={{ width: "100%", maxWidth: 400 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div className="wifi-icon" style={{ fontSize: 56, marginBottom: 12 }}>📡</div>
          <div className="shimmer-text" style={{ fontSize: 28, fontWeight: 900, letterSpacing: -0.5 }}>SmartPisoWiFi</div>
          <div style={{ color: "#4A5568", fontSize: 13, fontWeight: 600, marginTop: 4 }}>
            <span className="dot" />Fast & Affordable Internet
          </div>
        </div>

        {status !== "success" ? (
          <div style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 24, padding: "28px 24px" }}>
            <div style={{ color: "white", fontWeight: 800, fontSize: 17, marginBottom: 6 }}>Enter your voucher code</div>
            <div style={{ color: "#718096", fontSize: 13, marginBottom: 20 }}>Buy a voucher from the owner to get started</div>

            <input className="code-input" value={code} onChange={handleInput} placeholder="e.g. WIFI-3847" maxLength={9}
              style={{ width: "100%", padding: "16px 18px", fontFamily: "'Space Mono', monospace", fontSize: 22, fontWeight: 700, letterSpacing: 3, textAlign: "center", background: "rgba(255,255,255,0.07)", border: "2px solid rgba(255,255,255,0.1)", borderRadius: 14, color: "white", marginBottom: 16 }} />

            {status === "error" && (
              <div style={{ background: "rgba(255,107,107,0.1)", border: "1px solid rgba(255,107,107,0.3)", borderRadius: 12, padding: "12px 16px", marginBottom: 16, color: "#FF6B6B", fontSize: 13, fontWeight: 600, textAlign: "center" }}>
                ❌ {errorMsg}
              </div>
            )}

            <button className="connect-btn" onClick={handleConnect} disabled={!code.trim() || status === "loading"}
              style={{ width: "100%", padding: "16px", borderRadius: 14, border: "none", cursor: code.trim() ? "pointer" : "not-allowed", background: code.trim() ? "linear-gradient(135deg, #667eea, #764ba2)" : "rgba(255,255,255,0.05)", color: code.trim() ? "white" : "#4A5568", fontFamily: "'Nunito', sans-serif", fontWeight: 900, fontSize: 16, boxShadow: code.trim() ? "0 8px 24px rgba(102,126,234,0.35)" : "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
              {status === "loading" ? <><div className="loader" /> Connecting...</> : <>🔌 Connect to WiFi</>}
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "20px 0" }}>
              <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
              <div style={{ color: "#4A5568", fontSize: 12, fontWeight: 600 }}>AVAILABLE PACKAGES</div>
              <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
              {packages.map(pkg => (
                <div key={pkg.name} className="pkg-chip" style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${pkg.color}33`, borderRadius: 20, padding: "6px 12px", display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 13 }}>{pkg.icon}</span>
                  <span style={{ color: pkg.color, fontWeight: 800, fontSize: 12 }}>₱{pkg.price}</span>
                  <span style={{ color: "#718096", fontSize: 11 }}>{pkg.label}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="success-card" style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(20px)", border: "1px solid rgba(29,209,161,0.3)", borderRadius: 24, padding: "32px 24px", textAlign: "center" }}>
            <div style={{ fontSize: 56, marginBottom: 12 }}>🎉</div>
            <div style={{ color: "#1DD1A1", fontWeight: 900, fontSize: 22, marginBottom: 4 }}>You're Connected!</div>
            <div style={{ color: "#718096", fontSize: 13, marginBottom: 24 }}>Enjoy your internet session</div>
            <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 16, padding: "20px", marginBottom: 20 }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{pkg?.icon}</div>
              <div style={{ color: "white", fontWeight: 900, fontSize: 20 }}>{voucherInfo?.package} Package</div>
              <div style={{ color: pkg?.color, fontWeight: 800, fontSize: 28, margin: "8px 0" }}>{pkg?.label}</div>
              <div style={{ fontFamily: "'Space Mono', monospace", color: "#4A5568", fontSize: 13, marginTop: 8 }}>Code: {code}</div>
            </div>
            <div style={{ background: "rgba(255,159,67,0.1)", border: "1px solid rgba(255,159,67,0.2)", borderRadius: 12, padding: "12px 16px", color: "#FF9F43", fontSize: 13, fontWeight: 600 }}>
              ⏱️ Your time starts now. You'll be disconnected when it expires.
            </div>
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: 20, color: "#2D3748", fontSize: 12, fontWeight: 600 }}>
          Need a voucher? Ask the WiFi owner 😊
        </div>
      </div>
    </div>
  );
}
