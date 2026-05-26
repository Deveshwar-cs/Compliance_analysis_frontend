import {useAuth} from "../context/AuthContext";
import {
  Bell,
  BarChart2,
  Clock,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  FileCheck,
  Building2,
  ShieldCheck,
} from "lucide-react";

const MONO = {fontFamily: "'JetBrains Mono', monospace"};
const SANS = {fontFamily: "'Plus Jakarta Sans', sans-serif"};

const METRICS = [
  {
    label: "Organizations",
    value: "124",
    delta: "+6 this month",
    trend: "up",
    color: "#1e293b",
  },
  {
    label: "Compliance Score",
    value: "87%",
    delta: "+3.2% vs last qtr",
    trend: "up",
    color: "#7c3aed",
  },
  {
    label: "Open Alerts",
    value: "4",
    delta: "2 high priority",
    trend: "down",
    color: "#dc2626",
  },
  {
    label: "Licenses Tracked",
    value: "312",
    delta: "8 expiring in 30d",
    trend: "neutral",
    color: "#1e293b",
  },
];

const ALERTS = [
  {
    text: "GSTIN mismatch detected for Pharma Ltd.",
    meta: "Regulatory · 2 hours ago",
    dot: "#ef4444",
  },
  {
    text: "FDA FEI renewal due in 14 days",
    meta: "License · 5 hours ago",
    dot: "#f59e0b",
  },
  {
    text: "Missing CDSCO registration — Acme Biotech",
    meta: "Identifier · Yesterday",
    dot: "#f59e0b",
  },
  {
    text: "New organization pending review",
    meta: "Admin · 2 days ago",
    dot: "#7c3aed",
  },
];

const SCORES = [
  {label: "Regulatory IDs", pct: 94, color: "#7c3aed"},
  {label: "License Status", pct: 81, color: "#8b5cf6"},
  {label: "Contact Info", pct: 89, color: "#7c3aed"},
  {label: "Address Verified", pct: 76, color: "#f59e0b"},
  {label: "CDSCO / FDA", pct: 68, color: "#ef4444"},
];

const ACTIVITY = [
  {
    icon: <Building2 size={14} />,
    bg: "#ede9fe",
    fg: "#7c3aed",
    title: "Acme Corporation LLC registered",
    sub: "admin / organizations / new",
    time: "10m ago",
  },
  {
    icon: <CheckCircle size={14} />,
    bg: "#dcfce7",
    fg: "#16a34a",
    title: "PAN verified for MedTech Solutions",
    sub: "regulatory / identifiers",
    time: "1h ago",
  },
  {
    icon: <AlertTriangle size={14} />,
    bg: "#fef3c7",
    fg: "#b45309",
    title: "DUNS number flagged — format mismatch",
    sub: "compliance / alert raised",
    time: "3h ago",
  },
  {
    icon: <FileCheck size={14} />,
    bg: "#dbeafe",
    fg: "#1d4ed8",
    title: "FDA FEI license record updated",
    sub: "admin / licenses",
    time: "Yesterday",
  },
];

function MetricCard({label, value, delta, trend, color}) {
  return (
    <div
      className="rounded-2xl p-4"
      style={{background: "#f8fafc", border: "1px solid #e2e8f0"}}
    >
      <p className="text-[11px] mb-1.5 text-slate-500" style={MONO}>
        {label}
      </p>
      <p
        className="text-2xl font-semibold leading-none"
        style={{color, ...SANS}}
      >
        {value}
      </p>
      <p
        className={`text-[10px] mt-1.5 flex items-center gap-1 ${
          trend === "up"
            ? "text-emerald-600"
            : trend === "down"
              ? "text-rose-600"
              : "text-slate-400"
        }`}
        style={MONO}
      >
        {trend === "up" && <TrendingUp size={10} />}
        {trend === "down" && <TrendingDown size={10} />}
        {delta}
      </p>
    </div>
  );
}

function AlertItem({dot, text, meta}) {
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-slate-100 last:border-0 last:pb-0">
      <span
        className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-[5px]"
        style={{background: dot}}
      />
      <div>
        <p className="text-[11px] text-slate-800 leading-snug" style={SANS}>
          {text}
        </p>
        <p className="text-[10px] text-slate-400 mt-0.5" style={MONO}>
          {meta}
        </p>
      </div>
    </div>
  );
}

function ScoreBar({label, pct, color}) {
  return (
    <div className="mb-3 last:mb-0">
      <div className="flex justify-between items-center mb-1">
        <span className="text-[11px] text-slate-500" style={MONO}>
          {label}
        </span>
        <span className="text-[11px] font-medium text-slate-800" style={MONO}>
          {pct}%
        </span>
      </div>
      <div className="h-1 rounded-full bg-slate-100 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{width: `${pct}%`, background: color}}
        />
      </div>
    </div>
  );
}

function ActivityRow({icon, bg, fg, title, sub, time}) {
  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-slate-100 last:border-0 last:pb-0">
      <div
        className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{background: bg, color: fg}}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[11px] text-slate-800 truncate" style={SANS}>
          {title}
        </p>
        <p className="text-[10px] text-slate-400 mt-0.5" style={MONO}>
          {sub}
        </p>
      </div>
      <span className="text-[10px] text-slate-400 flex-shrink-0" style={MONO}>
        {time}
      </span>
    </div>
  );
}

export default function Dashboard() {
  const {user} = useAuth();

  return (
    <div className="flex flex-col gap-5 p-6" style={SANS}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900" style={SANS}>
            Welcome back{user?.name ? `, ${user.name}` : ""}
          </h1>
          <p className="text-[11px] text-slate-400 mt-0.5" style={MONO}>
            compliance / overview · Q2 2026
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="text-[10px] px-2.5 py-1 rounded-full flex items-center gap-1.5"
            style={{
              background: "#fef3c7",
              color: "#b45309",
              border: "1px solid #fcd34d",
              ...MONO,
            }}
          >
            <AlertTriangle size={10} />2 expiring soon
          </span>
          <span
            className="text-[10px] px-2.5 py-1 rounded-full flex items-center gap-1.5"
            style={{
              background: "#ede9fe",
              color: "#7c3aed",
              border: "1px solid #ddd6fe",
              ...MONO,
            }}
          >
            <ShieldCheck size={10} />
            87% compliant
          </span>
        </div>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-4 gap-4">
        {METRICS.map((m) => (
          <MetricCard key={m.label} {...m} />
        ))}
      </div>

      {/* Alerts + Score */}
      <div className="grid grid-cols-2 gap-4">
        {/* Active Alerts */}
        <div
          className="rounded-2xl p-4 bg-white"
          style={{border: "1px solid #e2e8f0"}}
        >
          <div className="flex items-center justify-between mb-3">
            <p
              className="text-[12px] font-medium text-slate-900 flex items-center gap-1.5"
              style={SANS}
            >
              <Bell size={13} className="text-slate-400" />
              Active Alerts
            </p>
            <button
              className="text-[10px] text-violet-600 hover:underline"
              style={MONO}
            >
              view all →
            </button>
          </div>
          {ALERTS.map((a, i) => (
            <AlertItem key={i} {...a} />
          ))}
        </div>

        {/* Compliance by Category */}
        <div
          className="rounded-2xl p-4 bg-white"
          style={{border: "1px solid #e2e8f0"}}
        >
          <div className="flex items-center justify-between mb-4">
            <p
              className="text-[12px] font-medium text-slate-900 flex items-center gap-1.5"
              style={SANS}
            >
              <BarChart2 size={13} className="text-slate-400" />
              Compliance by Category
            </p>
          </div>
          {SCORES.map((s) => (
            <ScoreBar key={s.label} {...s} />
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div
        className="rounded-2xl p-4 bg-white"
        style={{border: "1px solid #e2e8f0"}}
      >
        <div className="flex items-center justify-between mb-3">
          <p
            className="text-[12px] font-medium text-slate-900 flex items-center gap-1.5"
            style={SANS}
          >
            <Clock size={13} className="text-slate-400" />
            Recent Activity
          </p>
          <button
            className="text-[10px] text-violet-600 hover:underline"
            style={MONO}
          >
            full log →
          </button>
        </div>
        {ACTIVITY.map((a, i) => (
          <ActivityRow key={i} {...a} />
        ))}
      </div>
    </div>
  );
}
