import { useState } from "react";

// ⚠️ Demo credentials — move to backend in production
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "pisoWiFi2026";

const packages = [
  { id: 1, name: "Basic", price: 5, duration_hours: 2, label: "2 Hours", color: "#FF6B6B", bg: "#FFF0F0", icon: "⚡" },
  { id: 2, name: "Standard", price: 10, duration_hours: 4, label: "4 Hours", color: "#FF9F43", bg: "#FFF5E6", icon: "🔥" },
  { id: 3, name: "Premium", price: 20, duration_hours: 10, label: "10 Hours", color: "#54A0FF", bg: "#EDF4FF", icon: "💎" },
  { id: 4, name: "Daily", price: 30, duration_hours: 24, label: "1 Day", color: "#5F27CD", bg: "#F0EBFF", icon: "☀️" },
  { id: 5, name: "Extended", price: 50, duration_hours: 72, label: "3 Days", color: "#00D2D3", bg: "#E6FAFA", icon: "🌟" },
];

const mockVouchers = [
  { id: 1, code: "WIFI-3847", package: "Basic", price: 5, is_used: false, created_at: "2026-03-15 08:00" },
  { id: 2, code: "WIFI-2931", package: "Standard", price: 10, is_used: true, created_at: "2026-03-15 09:30" },
  { id: 3, code: "WIFI-5512", package: "Daily", price: 30, is_used: false, created_at: "2026-03-15 10:00" },
  { id: 4, code: "WIFI-7743", package: "Premium", price: 20, is_used: true, created_at: "2026-03-15 11:00" },
];

const mockSessions = [
  { id: 1, code: "WIFI-2931", device: "iPhone 13", ip: "192.168.1.10", package: "Standard", expires_at: "2026-03-15 13:30" },
  { id: 2, code: "WIFI-7743", device: "Android Phone", ip: "192.168.1.11", package: "Premium", expires_at: "2026-03-15 21:00" },
];

function generateCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "WIFI-";
  for (let i = 0; i < 4; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

// ─────────────────────────────────────────────
// LOGIN PAGE
// ─────────────────────────────────────────────
function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState(null);
  const [attempts, setAttempts] = useState(0);

  const isLocked = attempts >= 3;

  async function handleLogin() {
    if (!username.trim() || !password.trim() || isLocked || status === "loading") return;
    setStatus("loading");
    await new Promise(r => setTimeout(r, 1200));

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setStatus("success");
      setTimeout(() => onLogin(), 700);
    } else {
      const next = attempts + 1;
      setAttempts(next);
      setStatus(next >= 3 ? "locked" : "error");
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0A0E1A", fontFamily: "'Nunito', sans-serif", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, position: "relative", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Space+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-10px); } }
        @keyframes shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-8px)} 40%{transform:translateX(8px)} 60%{transform:translateX(-5px)} 80%{transform:translateX(5px)} }
        @keyframes spin { to { transform:rotate(360deg); } }
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        .fadeUp { animation: fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both; }
        .shake { animation: shake 0.4s ease; }
        .input-f { transition: all 0.2s; background: rgba(255,255,255,0.05) !important; border: 1.5px solid rgba(255,255,255,0.08) !important; }
        .input-f:focus { border-color: #667eea !important; box-shadow: 0 0 0 4px rgba(102,126,234,0.12) !important; outline: none; }
        .login-btn { transition: all 0.2s; }
        .login-btn:not(:disabled):hover { transform: translateY(-2px); box-shadow: 0 14px 36px rgba(102,126,234,0.5) !important; }
        .shimmer-text { background: linear-gradient(90deg,#667eea,#a78bfa,#667eea); background-size:200% auto; -webkit-background-clip:text; -webkit-text-fill-color:transparent; animation: shimmer 2.5s linear infinite; }
        .loader { width:18px; height:18px; border:2px solid rgba(255,255,255,0.25); border-top-color:white; border-radius:50%; animation:spin 0.7s linear infinite; display:inline-block; }
        .lock-pulse { animation: pulse 1.5s ease-in-out infinite; }
        .dot-indicator { width:10px; height:10px; border-radius:50%; transition: all 0.3s; }
      `}</style>

      {/* Glow blobs */}
      <div style={{ position:"absolute", width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle, rgba(102,126,234,0.12) 0%, transparent 65%)", top:-150, left:-150, pointerEvents:"none" }} />
      <div style={{ position:"absolute", width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 65%)", bottom:-100, right:-100, pointerEvents:"none" }} />

      {/* Floating particles */}
      {[...Array(5)].map((_, i) => (
        <div key={i} style={{ position:"absolute", width:[4,6,3,5,4][i], height:[4,6,3,5,4][i], borderRadius:"50%", background:["#667eea","#a78bfa","#00D2D3","#FF6B6B","#FF9F43"][i], opacity:0.3, top:`${[20,70,40,85,15][i]}%`, left:`${[15,80,90,10,75][i]}%`, animation:`float ${3+i*0.5}s ease-in-out infinite`, animationDelay:`${i*0.6}s` }} />
      ))}

      <div className="fadeUp" style={{ width:"100%", maxWidth:400, position:"relative", zIndex:1 }}>
        {/* Header */}
        <div style={{ textAlign:"center", marginBottom:32 }}>
          <div style={{ fontSize:52, marginBottom:10, animation:"float 3s ease-in-out infinite", display:"inline-block" }}>🔐</div>
          <div className="shimmer-text" style={{ fontSize:26, fontWeight:900, letterSpacing:-0.5 }}>Admin Access</div>
          <div style={{ color:"#4A5568", fontSize:13, fontWeight:600, marginTop:6 }}>📡 SmartPisoWiFi Control Panel</div>
        </div>

        {/* Card */}
        <div style={{ background:"rgba(255,255,255,0.04)", backdropFilter:"blur(24px)", border:`1.5px solid ${isLocked ? "rgba(255,107,107,0.3)" : "rgba(255,255,255,0.08)"}`, borderRadius:24, padding:"28px 24px" }}>

          {isLocked ? (
            <div style={{ textAlign:"center", padding:"20px 0" }}>
              <div className="lock-pulse" style={{ fontSize:48, marginBottom:16 }}>🔒</div>
              <div style={{ color:"#FF6B6B", fontWeight:900, fontSize:18, marginBottom:8 }}>Account Locked</div>
              <div style={{ color:"#718096", fontSize:13, lineHeight:1.6 }}>Too many failed attempts.<br/>Please contact system support.</div>
              <div style={{ marginTop:20, background:"rgba(255,107,107,0.08)", border:"1px solid rgba(255,107,107,0.2)", borderRadius:12, padding:"12px 16px", color:"#FF6B6B", fontSize:12, fontWeight:600 }}>
                🛡️ Security lockout after 3 failed attempts
              </div>
            </div>
          ) : (
            <>
              {/* Username */}
              <div style={{ marginBottom:16 }}>
                <label style={{ color:"#A0AEC0", fontSize:12, fontWeight:700, letterSpacing:0.5, display:"block", marginBottom:8 }}>USERNAME</label>
                <div style={{ position:"relative" }}>
                  <span style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", fontSize:16 }}>👤</span>
                  <input className="input-f" type="text" value={username} onChange={e => { setUsername(e.target.value); setStatus(null); }} onKeyDown={e => e.key==="Enter" && handleLogin()} placeholder="Enter username"
                    style={{ width:"100%", padding:"14px 14px 14px 42px", borderRadius:12, color:"white", fontFamily:"'Nunito',sans-serif", fontWeight:700, fontSize:15 }} />
                </div>
              </div>

              {/* Password */}
              <div style={{ marginBottom:20 }}>
                <label style={{ color:"#A0AEC0", fontSize:12, fontWeight:700, letterSpacing:0.5, display:"block", marginBottom:8 }}>PASSWORD</label>
                <div style={{ position:"relative" }}>
                  <span style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", fontSize:16 }}>🔑</span>
                  <input className={`input-f ${status==="error" ? "shake" : ""}`} type={showPassword ? "text" : "password"} value={password} onChange={e => { setPassword(e.target.value); setStatus(null); }} onKeyDown={e => e.key==="Enter" && handleLogin()} placeholder="Enter password"
                    style={{ width:"100%", padding:"14px 44px 14px 42px", borderRadius:12, color:"white", fontFamily:"'Nunito',sans-serif", fontWeight:700, fontSize:15 }} />
                  <button onClick={() => setShowPassword(!showPassword)} style={{ position:"absolute", right:14, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", fontSize:16 }}>
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              {/* Error */}
              {status === "error" && (
                <div style={{ background:"rgba(255,107,107,0.08)", border:"1px solid rgba(255,107,107,0.25)", borderRadius:12, padding:"11px 14px", marginBottom:16, color:"#FF6B6B", fontSize:13, fontWeight:600, display:"flex", alignItems:"center", gap:8 }}>
                  ❌ Incorrect username or password
                  <span style={{ marginLeft:"auto", fontSize:12, opacity:0.7 }}>{3 - attempts} left</span>
                </div>
              )}

              {/* Button */}
              <button className="login-btn" onClick={handleLogin} disabled={!username.trim() || !password.trim() || status==="loading"}
                style={{ width:"100%", padding:"15px", background: username && password ? "linear-gradient(135deg,#667eea,#764ba2)" : "rgba(255,255,255,0.05)", border:"none", borderRadius:14, cursor: username && password ? "pointer" : "not-allowed", color: username && password ? "white" : "#4A5568", fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:16, boxShadow: username && password ? "0 8px 24px rgba(102,126,234,0.35)" : "none", display:"flex", alignItems:"center", justifyContent:"center", gap:10, marginBottom:20 }}>
                {status === "loading" ? <><div className="loader" /> Verifying...</> : status === "success" ? <>✅ Access Granted!</> : <>🔓 Login to Admin Panel</>}
              </button>

              {/* Attempt dots */}
              <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:10 }}>
                <span style={{ color:"#4A5568", fontSize:11, fontWeight:600 }}>Failed attempts:</span>
                <div style={{ display:"flex", gap:6 }}>
                  {[0,1,2].map(i => (
                    <div key={i} className="dot-indicator" style={{ background: i < attempts ? "#FF6B6B" : "rgba(255,255,255,0.1)", boxShadow: i < attempts ? "0 0 8px rgba(255,107,107,0.5)" : "none" }} />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        <div style={{ textAlign:"center", marginTop:20, color:"#2D3748", fontSize:12, fontWeight:600 }}>
          🛡️ This page is for authorized personnel only
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// ADMIN PANEL
// ─────────────────────────────────────────────
function AdminPanel({ onLogout }) {
  const [tab, setTab] = useState("generate");
  const [selectedPkg, setSelectedPkg] = useState(null);
  const [generatedCode, setGeneratedCode] = useState(null);
  const [vouchers, setVouchers] = useState(mockVouchers);
  const [showReceipt, setShowReceipt] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const totalEarnings = vouchers.filter(v => v.is_used).reduce((sum, v) => sum + v.price, 0);
  const usedVouchers = vouchers.filter(v => v.is_used).length;

  function handleGenerate() {
    if (!selectedPkg) return;
    const code = generateCode();
    const now = new Date().toLocaleString("en-PH");
    const newVoucher = { id: vouchers.length + 1, code, package: selectedPkg.name, price: selectedPkg.price, is_used: false, created_at: now };
    setVouchers([newVoucher, ...vouchers]);
    setGeneratedCode({ ...newVoucher, pkg: selectedPkg, created_at: now });
    setShowReceipt(true);
  }

  const tabs = [
    { id:"generate", label:"Generate", icon:"✦" },
    { id:"vouchers", label:"Vouchers", icon:"🎫" },
    { id:"sessions", label:"Sessions", icon:"📶" },
    { id:"earnings", label:"Earnings", icon:"💰" },
  ];

  return (
    <div style={{ minHeight:"100vh", background:"#F7F8FC", fontFamily:"'Nunito',sans-serif" }}>
      <style>{`
        @keyframes popIn { from{transform:scale(0.85);opacity:0} to{transform:scale(1);opacity:1} }
        .pop-in { animation: popIn 0.3s cubic-bezier(0.34,1.56,0.64,1); }
        .pkg-card { transition:all 0.2s ease; cursor:pointer; }
        .pkg-card:hover { transform:translateY(-3px); box-shadow:0 8px 24px rgba(0,0,0,0.12) !important; }
        .tab-btn { transition:all 0.2s; }
        .tab-btn:hover { opacity:0.85; }
        .voucher-row:hover { background:#F0F4FF !important; }
        @media print {
          .no-print { display:none !important; }
          .print-only { display:block !important; }
        }
        .print-only { display:none; }
      `}</style>

      {/* Header */}
      <div className="no-print" style={{ background:"linear-gradient(135deg,#667eea 0%,#764ba2 100%)", padding:"20px 24px", color:"white" }}>
        <div style={{ maxWidth:700, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div>
            <div style={{ fontSize:22, fontWeight:900, letterSpacing:-0.5 }}>📡 SmartPisoWiFi</div>
            <div style={{ fontSize:12, opacity:0.8, fontWeight:600, marginTop:2 }}>ADMIN PANEL</div>
          </div>
          <button onClick={() => setShowLogoutConfirm(true)} style={{ background:"rgba(255,255,255,0.15)", border:"1px solid rgba(255,255,255,0.2)", borderRadius:12, padding:"8px 16px", color:"white", fontFamily:"'Nunito',sans-serif", fontWeight:700, fontSize:13, cursor:"pointer" }}>
            🚪 Logout
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="no-print" style={{ background:"white", borderBottom:"1px solid #EAECF0", padding:"14px 24px" }}>
        <div style={{ maxWidth:700, margin:"0 auto", display:"flex", gap:24, justifyContent:"center" }}>
          {[
            { label:"Total Vouchers", value:vouchers.length, color:"#54A0FF" },
            { label:"Used", value:usedVouchers, color:"#FF6B6B" },
            { label:"Available", value:vouchers.length - usedVouchers, color:"#1DD1A1" },
            { label:"Earnings", value:`₱${totalEarnings}`, color:"#FF9F43" },
          ].map((s,i) => (
            <div key={i} style={{ textAlign:"center" }}>
              <div style={{ fontSize:20, fontWeight:900, color:s.color }}>{s.value}</div>
              <div style={{ fontSize:11, color:"#888", fontWeight:600 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="no-print" style={{ background:"white", borderBottom:"2px solid #EAECF0", padding:"0 24px" }}>
        <div style={{ maxWidth:700, margin:"0 auto", display:"flex", gap:4 }}>
          {tabs.map(t => (
            <button key={t.id} className="tab-btn" onClick={() => setTab(t.id)} style={{ padding:"14px 20px", border:"none", background:"none", cursor:"pointer", fontFamily:"'Nunito',sans-serif", fontWeight:700, fontSize:14, color: tab===t.id ? "#667eea" : "#888", borderBottom: tab===t.id ? "3px solid #667eea" : "3px solid transparent" }}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="no-print" style={{ maxWidth:700, margin:"24px auto", padding:"0 24px" }}>

        {/* GENERATE */}
        {tab === "generate" && (
          <div>
            <div style={{ fontSize:18, fontWeight:800, color:"#2D3436", marginBottom:16 }}>Select a Package</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))", gap:14, marginBottom:24 }}>
              {packages.map(pkg => (
                <div key={pkg.id} className="pkg-card" onClick={() => setSelectedPkg(pkg)} style={{ background: selectedPkg?.id===pkg.id ? pkg.color : "white", border:`2px solid ${selectedPkg?.id===pkg.id ? pkg.color : "#EAECF0"}`, borderRadius:16, padding:"18px 16px", textAlign:"center", boxShadow: selectedPkg?.id===pkg.id ? `0 8px 24px ${pkg.color}44` : "0 2px 8px rgba(0,0,0,0.06)" }}>
                  <div style={{ fontSize:26, marginBottom:6 }}>{pkg.icon}</div>
                  <div style={{ fontWeight:900, fontSize:16, color: selectedPkg?.id===pkg.id ? "white" : "#2D3436" }}>{pkg.name}</div>
                  <div style={{ fontWeight:700, fontSize:13, color: selectedPkg?.id===pkg.id ? "rgba(255,255,255,0.85)" : "#888", marginTop:2 }}>{pkg.label}</div>
                  <div style={{ fontWeight:900, fontSize:22, color: selectedPkg?.id===pkg.id ? "white" : pkg.color, marginTop:8 }}>₱{pkg.price}</div>
                </div>
              ))}
            </div>
            <button onClick={handleGenerate} disabled={!selectedPkg} style={{ width:"100%", padding:"16px", borderRadius:14, border:"none", cursor: selectedPkg ? "pointer" : "not-allowed", background: selectedPkg ? "linear-gradient(135deg,#667eea,#764ba2)" : "#DDD", color:"white", fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:16, boxShadow: selectedPkg ? "0 8px 20px rgba(102,126,234,0.4)" : "none" }}>
              {selectedPkg ? `✦ Generate ${selectedPkg.name} Voucher — ₱${selectedPkg.price}` : "Select a package first"}
            </button>
          </div>
        )}

        {/* VOUCHERS */}
        {tab === "vouchers" && (
          <div>
            <div style={{ fontSize:18, fontWeight:800, color:"#2D3436", marginBottom:16 }}>All Vouchers</div>
            <div style={{ background:"white", borderRadius:16, overflow:"hidden", border:"1px solid #EAECF0" }}>
              {vouchers.map((v,i) => {
                const pkg = packages.find(p => p.name===v.package);
                return (
                  <div key={v.id} className="voucher-row" style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 18px", borderBottom: i<vouchers.length-1 ? "1px solid #F0F0F0" : "none", transition:"all 0.15s" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                      <div style={{ background:pkg?.bg||"#F0F0F0", color:pkg?.color||"#888", borderRadius:10, padding:"6px 10px", fontFamily:"'Space Mono',monospace", fontWeight:700, fontSize:13 }}>{v.code}</div>
                      <div>
                        <div style={{ fontWeight:700, fontSize:14, color:"#2D3436" }}>{v.package}</div>
                        <div style={{ fontSize:11, color:"#AAA", marginTop:1 }}>{v.created_at}</div>
                      </div>
                    </div>
                    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                      <div style={{ fontWeight:800, color:"#2D3436" }}>₱{v.price}</div>
                      <div style={{ padding:"4px 10px", borderRadius:20, fontSize:11, fontWeight:700, background: v.is_used ? "#FFF0F0" : "#EFFFEF", color: v.is_used ? "#FF6B6B" : "#1DD1A1" }}>
                        {v.is_used ? "Used" : "Active"}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* SESSIONS */}
        {tab === "sessions" && (
          <div>
            <div style={{ fontSize:18, fontWeight:800, color:"#2D3436", marginBottom:16 }}>
              Active Sessions <span style={{ fontSize:14, color:"#1DD1A1", fontWeight:700 }}>● {mockSessions.length} online</span>
            </div>
            {mockSessions.map(s => (
              <div key={s.id} style={{ background:"white", border:"1px solid #EAECF0", borderRadius:16, padding:"18px", marginBottom:12 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                  <div>
                    <div style={{ fontWeight:800, fontSize:15, color:"#2D3436" }}>📱 {s.device}</div>
                    <div style={{ fontSize:12, color:"#AAA", marginTop:4 }}>IP: {s.ip}</div>
                    <div style={{ fontSize:12, color:"#AAA" }}>Code: <span style={{ fontFamily:"'Space Mono'", fontWeight:700, color:"#667eea" }}>{s.code}</span></div>
                  </div>
                  <div style={{ textAlign:"right" }}>
                    <div style={{ background:"#EFFFEF", color:"#1DD1A1", padding:"4px 12px", borderRadius:20, fontSize:12, fontWeight:700 }}>● Active</div>
                    <div style={{ fontSize:11, color:"#AAA", marginTop:6 }}>Expires: {s.expires_at}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* EARNINGS */}
        {tab === "earnings" && (
          <div>
            <div style={{ fontSize:18, fontWeight:800, color:"#2D3436", marginBottom:16 }}>Sales & Earnings</div>
            <div style={{ background:"linear-gradient(135deg,#FF9F43,#FF6B6B)", borderRadius:20, padding:"28px", color:"white", marginBottom:20, textAlign:"center" }}>
              <div style={{ fontSize:13, fontWeight:700, opacity:0.85, marginBottom:6 }}>TOTAL EARNINGS TODAY</div>
              <div style={{ fontSize:48, fontWeight:900 }}>₱{totalEarnings}</div>
              <div style={{ fontSize:13, opacity:0.8, marginTop:4 }}>{usedVouchers} vouchers redeemed</div>
            </div>
            <div style={{ background:"white", borderRadius:16, overflow:"hidden", border:"1px solid #EAECF0" }}>
              {packages.map((pkg,i) => {
                const count = vouchers.filter(v => v.package===pkg.name && v.is_used).length;
                return (
                  <div key={pkg.id} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 18px", borderBottom: i<packages.length-1 ? "1px solid #F0F0F0" : "none" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                      <div style={{ width:10, height:10, borderRadius:"50%", background:pkg.color }} />
                      <div>
                        <div style={{ fontWeight:700, color:"#2D3436" }}>{pkg.name}</div>
                        <div style={{ fontSize:12, color:"#AAA" }}>₱{pkg.price} × {count} sold</div>
                      </div>
                    </div>
                    <div style={{ fontWeight:900, fontSize:16, color:pkg.color }}>₱{count * pkg.price}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Receipt Modal */}
      {showReceipt && generatedCode && (
        <div className="no-print" style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000, padding:24 }}>
          <div className="pop-in" style={{ background:"white", borderRadius:24, padding:"32px 28px", maxWidth:340, width:"100%", textAlign:"center", boxShadow:"0 24px 60px rgba(0,0,0,0.2)" }}>
            <div style={{ fontSize:40, marginBottom:8 }}>🎉</div>
            <div style={{ fontWeight:900, fontSize:20, color:"#2D3436", marginBottom:4 }}>Voucher Generated!</div>
            <div style={{ color:"#AAA", fontSize:13, marginBottom:24 }}>Give this code to your customer</div>
            <div style={{ background:"#F7F8FC", borderRadius:16, padding:"20px", marginBottom:20, border:"2px dashed #DDD" }}>
              <div style={{ fontSize:12, fontWeight:700, color:"#AAA", marginBottom:8, letterSpacing:1 }}>SMARTPISOWIFI RECEIPT</div>
              <div style={{ fontFamily:"'Space Mono',monospace", fontSize:32, fontWeight:700, color:generatedCode.pkg.color, letterSpacing:2, marginBottom:12 }}>{generatedCode.code}</div>
              {[["Package", generatedCode.package], ["Duration", generatedCode.pkg.label], ["Amount Paid", `₱${generatedCode.price}`], ["Date", generatedCode.created_at]].map(([k,v]) => (
                <div key={k} style={{ display:"flex", justifyContent:"space-between", fontSize:13, marginBottom:4 }}>
                  <span style={{ color:"#888" }}>{k}</span>
                  <span style={{ fontWeight: k==="Amount Paid" ? 900 : 700, color: k==="Amount Paid" ? "#FF9F43" : "#2D3436" }}>{v}</span>
                </div>
              ))}
              <div style={{ marginTop:14, fontSize:11, color:"#BBB" }}>Thank you! Connect to WiFi and enter your code.</div>
            </div>
            <div style={{ display:"flex", gap:10 }}>
              <button onClick={() => window.print()} style={{ flex:1, padding:"12px", borderRadius:12, border:"none", cursor:"pointer", background:"linear-gradient(135deg,#667eea,#764ba2)", color:"white", fontFamily:"'Nunito',sans-serif", fontWeight:800, fontSize:14 }}>🖨️ Print</button>
              <button onClick={() => { setShowReceipt(false); setSelectedPkg(null); }} style={{ flex:1, padding:"12px", borderRadius:12, border:"2px solid #EAECF0", cursor:"pointer", background:"white", color:"#666", fontFamily:"'Nunito',sans-serif", fontWeight:800, fontSize:14 }}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Logout Confirm */}
      {showLogoutConfirm && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000, padding:24 }}>
          <div className="pop-in" style={{ background:"white", borderRadius:24, padding:"32px 28px", maxWidth:320, width:"100%", textAlign:"center" }}>
            <div style={{ fontSize:40, marginBottom:12 }}>🚪</div>
            <div style={{ fontWeight:900, fontSize:18, color:"#2D3436", marginBottom:8 }}>Logout?</div>
            <div style={{ color:"#AAA", fontSize:13, marginBottom:24 }}>You will be returned to the login page.</div>
            <div style={{ display:"flex", gap:10 }}>
              <button onClick={onLogout} style={{ flex:1, padding:"12px", borderRadius:12, border:"none", cursor:"pointer", background:"linear-gradient(135deg,#FF6B6B,#FF4757)", color:"white", fontFamily:"'Nunito',sans-serif", fontWeight:800, fontSize:14 }}>Yes, Logout</button>
              <button onClick={() => setShowLogoutConfirm(false)} style={{ flex:1, padding:"12px", borderRadius:12, border:"2px solid #EAECF0", cursor:"pointer", background:"white", color:"#666", fontFamily:"'Nunito',sans-serif", fontWeight:800, fontSize:14 }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Print receipt */}
      {generatedCode && (
        <div className="print-only" style={{ padding:"40px 30px", fontFamily:"'Space Mono',monospace", textAlign:"center" }}>
          <div style={{ fontSize:18, fontWeight:700, marginBottom:4 }}>📡 SmartPisoWiFi</div>
          <div style={{ fontSize:12, marginBottom:20 }}>--- OFFICIAL RECEIPT ---</div>
          <div style={{ fontSize:36, fontWeight:700, letterSpacing:3, marginBottom:16 }}>{generatedCode.code}</div>
          <div style={{ fontSize:13, marginBottom:4 }}>Package: {generatedCode.package}</div>
          <div style={{ fontSize:13, marginBottom:4 }}>Duration: {generatedCode.pkg?.label}</div>
          <div style={{ fontSize:13, marginBottom:4 }}>Amount: ₱{generatedCode.price}</div>
          <div style={{ fontSize:13, marginBottom:20 }}>Date: {generatedCode.created_at}</div>
          <div style={{ fontSize:11 }}>Connect to WiFi & enter your code.</div>
          <div style={{ fontSize:11 }}>Thank you!</div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// ROOT — Controls which page to show
// ─────────────────────────────────────────────
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return isLoggedIn
    ? <AdminPanel onLogout={() => setIsLoggedIn(false)} />
    : <LoginPage onLogin={() => setIsLoggedIn(true)} />;
}
