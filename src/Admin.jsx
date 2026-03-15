import { useState, useEffect } from "react";

const API_URL = process.env.REACT_APP_API_URL || "https://smartpisowifi-backend.onrender.com";

const packages = [
  { id: 1, name: "Basic", price: 5, duration_hours: 2, label: "2 Hours", color: "#FF6B6B", bg: "#FFF0F0", icon: "⚡" },
  { id: 2, name: "Standard", price: 10, duration_hours: 4, label: "4 Hours", color: "#FF9F43", bg: "#FFF5E6", icon: "🔥" },
  { id: 3, name: "Premium", price: 20, duration_hours: 10, label: "10 Hours", color: "#54A0FF", bg: "#EDF4FF", icon: "💎" },
  { id: 4, name: "Daily", price: 30, duration_hours: 24, label: "1 Day", color: "#5F27CD", bg: "#F0EBFF", icon: "☀️" },
  { id: 5, name: "Extended", price: 50, duration_hours: 72, label: "3 Days", color: "#00D2D3", bg: "#E6FAFA", icon: "🌟" },
];

// ─────────────────────────────────────────────
// LOGIN PAGE
// ─────────────────────────────────────────────
function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");

  const isLocked = attempts >= 3;

  async function handleLogin() {
    if (!username.trim() || !password.trim() || isLocked || status === "loading") return;
    setStatus("loading");

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        const next = attempts + 1;
        setAttempts(next);
        setStatus(next >= 3 ? "locked" : "error");
        setErrorMsg(data.error || "Invalid credentials");
      } else {
        localStorage.setItem("admin_token", data.token);
        setStatus("success");
        setTimeout(() => onLogin(data.token), 700);
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg("Cannot connect to server. Please try again.");
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

      <div style={{ position:"absolute", width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle, rgba(102,126,234,0.12) 0%, transparent 65%)", top:-150, left:-150, pointerEvents:"none" }} />
      <div style={{ position:"absolute", width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 65%)", bottom:-100, right:-100, pointerEvents:"none" }} />

      {[...Array(5)].map((_, i) => (
        <div key={i} style={{ position:"absolute", width:[4,6,3,5,4][i], height:[4,6,3,5,4][i], borderRadius:"50%", background:["#667eea","#a78bfa","#00D2D3","#FF6B6B","#FF9F43"][i], opacity:0.3, top:`${[20,70,40,85,15][i]}%`, left:`${[15,80,90,10,75][i]}%`, animation:`float ${3+i*0.5}s ease-in-out infinite`, animationDelay:`${i*0.6}s` }} />
      ))}

      <div className="fadeUp" style={{ width:"100%", maxWidth:400, position:"relative", zIndex:1 }}>
        <div style={{ textAlign:"center", marginBottom:32 }}>
          <div style={{ fontSize:52, marginBottom:10, animation:"float 3s ease-in-out infinite", display:"inline-block" }}>🔐</div>
          <div className="shimmer-text" style={{ fontSize:26, fontWeight:900, letterSpacing:-0.5 }}>Admin Access</div>
          <div style={{ color:"#4A5568", fontSize:13, fontWeight:600, marginTop:6 }}>📡 SmartPisoWiFi Control Panel</div>
        </div>

        <div style={{ background:"rgba(255,255,255,0.04)", backdropFilter:"blur(24px)", border:`1.5px solid ${isLocked ? "rgba(255,107,107,0.3)" : "rgba(255,255,255,0.08)"}`, borderRadius:24, padding:"28px 24px" }}>
          {isLocked ? (
            <div style={{ textAlign:"center", padding:"20px 0" }}>
              <div className="lock-pulse" style={{ fontSize:48, marginBottom:16 }}>🔒</div>
              <div style={{ color:"#FF6B6B", fontWeight:900, fontSize:18, marginBottom:8 }}>Account Locked</div>
              <div style={{ color:"#718096", fontSize:13, lineHeight:1.6 }}>Too many failed attempts.<br/>Please contact system support.</div>
            </div>
          ) : (
            <>
              <div style={{ marginBottom:16 }}>
                <label style={{ color:"#A0AEC0", fontSize:12, fontWeight:700, letterSpacing:0.5, display:"block", marginBottom:8 }}>USERNAME</label>
                <div style={{ position:"relative" }}>
                  <span style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", fontSize:16 }}>👤</span>
                  <input className="input-f" type="text" value={username} onChange={e => { setUsername(e.target.value); setStatus(null); }} onKeyDown={e => e.key==="Enter" && handleLogin()} placeholder="Enter username"
                    style={{ width:"100%", padding:"14px 14px 14px 42px", borderRadius:12, color:"white", fontFamily:"'Nunito',sans-serif", fontWeight:700, fontSize:15 }} />
                </div>
              </div>

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

              {status === "error" && (
                <div style={{ background:"rgba(255,107,107,0.08)", border:"1px solid rgba(255,107,107,0.25)", borderRadius:12, padding:"11px 14px", marginBottom:16, color:"#FF6B6B", fontSize:13, fontWeight:600, display:"flex", alignItems:"center", gap:8 }}>
                  ❌ {errorMsg}
                  <span style={{ marginLeft:"auto", fontSize:12, opacity:0.7 }}>{3 - attempts} left</span>
                </div>
              )}

              <button className="login-btn" onClick={handleLogin} disabled={!username.trim() || !password.trim() || status==="loading"}
                style={{ width:"100%", padding:"15px", background: username && password ? "linear-gradient(135deg,#667eea,#764ba2)" : "rgba(255,255,255,0.05)", border:"none", borderRadius:14, cursor: username && password ? "pointer" : "not-allowed", color: username && password ? "white" : "#4A5568", fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:16, boxShadow: username && password ? "0 8px 24px rgba(102,126,234,0.35)" : "none", display:"flex", alignItems:"center", justifyContent:"center", gap:10, marginBottom:20 }}>
                {status === "loading" ? <><div className="loader" /> Verifying...</> : status === "success" ? <>✅ Access Granted!</> : <>🔓 Login to Admin Panel</>}
              </button>

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
        <div style={{ textAlign:"center", marginTop:20, color:"#2D3748", fontSize:12, fontWeight:600 }}>🛡️ Authorized personnel only</div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// ADMIN PANEL
// ─────────────────────────────────────────────
function AdminPanel({ token, onLogout }) {
  const [tab, setTab] = useState("generate");
  const [selectedPkg, setSelectedPkg] = useState(null);
  const [generatedCode, setGeneratedCode] = useState(null);
  const [vouchers, setVouchers] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [earnings, setEarnings] = useState({ total: 0, today: 0, by_package: [] });
  const [showReceipt, setShowReceipt] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const headers = { "Content-Type": "application/json", Authorization: `Bearer ${token}` };

 useEffect(() => { fetchVouchers(); fetchSessions(); fetchEarnings(); }, []);

useEffect(() => {
  if (tab === "sessions") fetchSessions();
  if (tab === "vouchers") fetchVouchers();
  if (tab === "earnings") fetchEarnings();
}, [tab]);

  async function fetchVouchers() {
    try {
      const res = await fetch(`${API_URL}/api/vouchers`, { headers });
      const data = await res.json();
      if (Array.isArray(data)) setVouchers(data);
    } catch (err) { console.error("Fetch vouchers error:", err); }
  }

  async function fetchSessions() {
    try {
      const res = await fetch(`${API_URL}/api/sessions`, { headers });
      const data = await res.json();
      if (Array.isArray(data)) setSessions(data);
    } catch (err) { console.error("Fetch sessions error:", err); }
  }

  async function fetchEarnings() {
    try {
      const res = await fetch(`${API_URL}/api/sessions/earnings`, { headers });
      const data = await res.json();
      setEarnings(data);
    } catch (err) { console.error("Fetch earnings error:", err); }
  }

  async function handleGenerate() {
    if (!selectedPkg || loading) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/vouchers/generate`, {
        method: "POST",
        headers,
        body: JSON.stringify({ package_name: selectedPkg.name, duration_hours: selectedPkg.duration_hours, price: selectedPkg.price }),
      });
      const data = await res.json();
      if (res.ok) {
        setGeneratedCode({ ...data.voucher, pkg: selectedPkg });
        setShowReceipt(true);
        fetchVouchers();
        fetchEarnings();
      }
    } catch (err) { console.error("Generate error:", err); }
    setLoading(false);
  }

  const tabs = [
    { id:"generate", label:"Generate", icon:"✦" },
    { id:"vouchers", label:"Vouchers", icon:"🎫" },
    { id:"sessions", label:"Sessions", icon:"📶" },
    { id:"earnings", label:"Earnings", icon:"💰" },
  ];

  const usedVouchers = vouchers.filter(v => v.is_used).length;

  return (
    <div style={{ minHeight:"100vh", background:"#F7F8FC", fontFamily:"'Nunito',sans-serif" }}>
      <style>{`
        @keyframes popIn { from{transform:scale(0.85);opacity:0} to{transform:scale(1);opacity:1} }
        .pop-in { animation: popIn 0.3s cubic-bezier(0.34,1.56,0.64,1); }
        .pkg-card { transition:all 0.2s ease; cursor:pointer; }
        .pkg-card:hover { transform:translateY(-3px); box-shadow:0 8px 24px rgba(0,0,0,0.12) !important; }
        .tab-btn { transition:all 0.2s; }
        .voucher-row:hover { background:#F0F4FF !important; }
        @media print { .no-print{display:none !important;} .print-only{display:block !important;} }
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
            { label:"Earnings", value:`₱${earnings.total || 0}`, color:"#FF9F43" },
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
            <button onClick={handleGenerate} disabled={!selectedPkg || loading} style={{ width:"100%", padding:"16px", borderRadius:14, border:"none", cursor: selectedPkg ? "pointer" : "not-allowed", background: selectedPkg ? "linear-gradient(135deg,#667eea,#764ba2)" : "#DDD", color:"white", fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:16, boxShadow: selectedPkg ? "0 8px 20px rgba(102,126,234,0.4)" : "none" }}>
              {loading ? "Generating..." : selectedPkg ? `✦ Generate ${selectedPkg.name} Voucher — ₱${selectedPkg.price}` : "Select a package first"}
            </button>
          </div>
        )}

        {tab === "vouchers" && (
          <div>
            <div style={{ fontSize:18, fontWeight:800, color:"#2D3436", marginBottom:16 }}>All Vouchers</div>
            <div style={{ background:"white", borderRadius:16, overflow:"hidden", border:"1px solid #EAECF0" }}>
              {vouchers.length === 0 ? (
                <div style={{ padding:40, textAlign:"center", color:"#AAA", fontWeight:600 }}>No vouchers yet. Generate one! 😊</div>
              ) : vouchers.map((v,i) => {
                const pkg = packages.find(p => p.name===v.package);
                return (
                  <div key={v.id} className="voucher-row" style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 18px", borderBottom: i<vouchers.length-1 ? "1px solid #F0F0F0" : "none", transition:"all 0.15s" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                      <div style={{ background:pkg?.bg||"#F0F0F0", color:pkg?.color||"#888", borderRadius:10, padding:"6px 10px", fontFamily:"'Space Mono',monospace", fontWeight:700, fontSize:13 }}>{v.code}</div>
                      <div>
                        <div style={{ fontWeight:700, fontSize:14, color:"#2D3436" }}>{v.package}</div>
                        <div style={{ fontSize:11, color:"#AAA", marginTop:1 }}>{new Date(v.created_at).toLocaleString("en-PH")}</div>
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

        {tab === "sessions" && (
          <div>
            <div style={{ fontSize:18, fontWeight:800, color:"#2D3436", marginBottom:16 }}>
              Active Sessions <span style={{ fontSize:14, color:"#1DD1A1", fontWeight:700 }}>● {sessions.length} online</span>
            </div>
            {sessions.length === 0 ? (
              <div style={{ background:"white", borderRadius:16, padding:40, textAlign:"center", color:"#AAA", fontWeight:600 }}>No active sessions right now 😊</div>
            ) : sessions.map(s => (
              <div key={s.id} style={{ background:"white", border:"1px solid #EAECF0", borderRadius:16, padding:"18px", marginBottom:12 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                  <div>
                    <div style={{ fontWeight:800, fontSize:15, color:"#2D3436" }}>📱 {s.mac_address || "Unknown Device"}</div>
                    <div style={{ fontSize:12, color:"#AAA", marginTop:4 }}>IP: {s.ip_address || "N/A"}</div>
                    <div style={{ fontSize:12, color:"#AAA" }}>Code: <span style={{ fontFamily:"'Space Mono'", fontWeight:700, color:"#667eea" }}>{s.code}</span></div>
                  </div>
                  <div style={{ textAlign:"right" }}>
                    <div style={{ background:"#EFFFEF", color:"#1DD1A1", padding:"4px 12px", borderRadius:20, fontSize:12, fontWeight:700 }}>● Active</div>
                    <div style={{ fontSize:11, color:"#AAA", marginTop:6 }}>Expires: {new Date(s.expires_at).toLocaleString("en-PH")}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "earnings" && (
          <div>
            <div style={{ fontSize:18, fontWeight:800, color:"#2D3436", marginBottom:16 }}>Sales & Earnings</div>
            <div style={{ background:"linear-gradient(135deg,#FF9F43,#FF6B6B)", borderRadius:20, padding:"28px", color:"white", marginBottom:20, textAlign:"center" }}>
              <div style={{ fontSize:13, fontWeight:700, opacity:0.85, marginBottom:6 }}>TOTAL EARNINGS</div>
              <div style={{ fontSize:48, fontWeight:900 }}>₱{earnings.total || 0}</div>
              <div style={{ fontSize:13, opacity:0.8, marginTop:4 }}>Today: ₱{earnings.today || 0}</div>
            </div>
            <div style={{ background:"white", borderRadius:16, overflow:"hidden", border:"1px solid #EAECF0" }}>
              {packages.map((pkg,i) => {
                const pkgData = earnings.by_package?.find(p => p.package === pkg.name);
                const count = pkgData?.count || 0;
                const earned = pkgData?.earned || 0;
                return (
                  <div key={pkg.id} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 18px", borderBottom: i<packages.length-1 ? "1px solid #F0F0F0" : "none" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                      <div style={{ width:10, height:10, borderRadius:"50%", background:pkg.color }} />
                      <div>
                        <div style={{ fontWeight:700, color:"#2D3436" }}>{pkg.name}</div>
                        <div style={{ fontSize:12, color:"#AAA" }}>₱{pkg.price} × {count} sold</div>
                      </div>
                    </div>
                    <div style={{ fontWeight:900, fontSize:16, color:pkg.color }}>₱{earned}</div>
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
              {[["Package", generatedCode.package], ["Duration", generatedCode.pkg.label], ["Amount Paid", `₱${generatedCode.price}`], ["Date", new Date(generatedCode.created_at).toLocaleString("en-PH")]].map(([k,v]) => (
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
              <button onClick={() => { localStorage.removeItem("admin_token"); onLogout(); }} style={{ flex:1, padding:"12px", borderRadius:12, border:"none", cursor:"pointer", background:"linear-gradient(135deg,#FF6B6B,#FF4757)", color:"white", fontFamily:"'Nunito',sans-serif", fontWeight:800, fontSize:14 }}>Yes, Logout</button>
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
          <div style={{ fontSize:13, marginBottom:20 }}>Date: {new Date(generatedCode.created_at).toLocaleString("en-PH")}</div>
          <div style={{ fontSize:11 }}>Connect to WiFi & enter your code.</div>
          <div style={{ fontSize:11 }}>Thank you!</div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// ROOT
// ─────────────────────────────────────────────
export default function App() {
  const [token, setToken] = useState(() => localStorage.getItem("admin_token") || null);

  return token
    ? <AdminPanel token={token} onLogout={() => setToken(null)} />
    : <LoginPage onLogin={(t) => setToken(t)} />;
}
