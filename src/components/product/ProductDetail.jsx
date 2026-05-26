import {
  ArrowLeft,
  BarChart2,
  ShieldCheck,
  ClipboardList,
  Tag,
  Layers3,
  Globe,
  CheckCircle2,
} from "lucide-react";

import {RISK_META, MONO, SANS, getTypeMeta} from "../../utils/productMeta";

function ScoreRing({score}) {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const pct = Math.min(100, Math.max(0, score || 0));
  const dash = (pct / 100) * circ;
  const color = pct >= 75 ? "#16a34a" : pct >= 40 ? "#f59e0b" : "#ef4444";

  return (
    <svg width="68" height="68" viewBox="0 0 68 68">
      <circle
        cx="34"
        cy="34"
        r={r}
        fill="none"
        stroke="#e2e8f0"
        strokeWidth="5"
      />
      <circle
        cx="34"
        cy="34"
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray={`${dash} ${circ}`}
        strokeDashoffset={circ / 4}
      />
      <text
        x="34"
        y="38"
        textAnchor="middle"
        fill={color}
        fontSize="13"
        fontWeight="600"
        style={MONO}
      >
        {Math.round(pct)}
      </text>
    </svg>
  );
}

function InfoRow({label, value}) {
  return (
    <div className="flex justify-between py-2 border-b border-slate-100">
      <p className="text-[11px] text-slate-400" style={MONO}>
        {label}
      </p>
      <p className="text-[12px] text-slate-700">{value || "N/A"}</p>
    </div>
  );
}

function DetailField({label, value}) {
  return (
    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
      <p className="text-[10px] text-slate-400 mb-1" style={MONO}>
        {label}
      </p>
      <p className="text-[13px] text-slate-800">{value || "N/A"}</p>
    </div>
  );
}

export default function ProductDetail({product, onBack}) {
  const reg = product.regulatory || {};
  const typeMeta = getTypeMeta(product.productType);
  const riskMeta = RISK_META[reg.riskCategory];

  // ✅ Fix: assign to capitalized var so React treats it as a component
  const TypeIcon = typeMeta.icon;

  return (
    <div className="bg-slate-50 min-h-screen p-6" style={SANS}>
      <button
        onClick={onBack}
        className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white mb-5"
      >
        <ArrowLeft size={15} />
        Back
      </button>

      {/* Hero */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 mb-6">
        <div className="flex justify-between gap-5">
          <div className="flex gap-5">
            <div
              className="w-20 h-20 rounded-3xl flex items-center justify-center"
              style={{background: typeMeta.bg, color: typeMeta.fg}}
            >
              {/* ✅ Rendered as a proper JSX component */}
              <TypeIcon size={32} />
            </div>

            <div>
              <h1 className="text-2xl font-bold">{product.productName}</h1>
              <p className="text-[11px] text-slate-400 mt-1" style={MONO}>
                {product.productCode}
              </p>

              <div className="flex flex-wrap gap-2 mt-4">
                <span
                  className="px-2 py-1 rounded-full text-[11px]"
                  style={{background: typeMeta.bg, color: typeMeta.fg, ...MONO}}
                >
                  {typeMeta.label}
                </span>

                {riskMeta && (
                  <span
                    className="px-2 py-1 rounded-full text-[11px]"
                    style={{
                      background: riskMeta.bg,
                      color: riskMeta.color,
                      ...MONO,
                    }}
                  >
                    {riskMeta.label} Risk
                  </span>
                )}

                {(reg.market || []).map((m) => (
                  <span
                    key={m}
                    className="px-2 py-1 rounded-full text-[11px] bg-slate-100 flex items-center gap-1"
                    style={MONO}
                  >
                    <Globe size={10} />
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <ScoreRing score={product.complianceScore} />
        </div>

        {product.description && (
          <p className="text-sm text-slate-500 mt-5">{product.description}</p>
        )}
      </div>

      <div className="grid xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          {/* Compliance */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-5">
              <BarChart2 size={17} className="text-violet-600" />
              <h2 className="font-semibold">Compliance Overview</h2>
            </div>
            <div className="flex items-center gap-5">
              <ScoreRing score={product.complianceScore} />
              <div className="flex-1">
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${product.complianceScore || 0}%`,
                      background:
                        product.complianceScore >= 75
                          ? "#16a34a"
                          : product.complianceScore >= 40
                            ? "#f59e0b"
                            : "#ef4444",
                    }}
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-2" style={MONO}>
                  Compliance Score: {product.complianceScore || 0}/100
                </p>
              </div>
            </div>
          </div>

          {/* Regulatory */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-5">
              <ShieldCheck size={17} className="text-violet-600" />
              <h2 className="font-semibold">Regulatory Information</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <DetailField label="Device Class" value={reg.deviceClass} />
              <DetailField label="Risk Category" value={riskMeta?.label} />
              <div className="md:col-span-2">
                <DetailField label="Intended Use" value={reg.intendedUse} />
              </div>
            </div>
          </div>

          {/* Approvals */}
          {(reg.approvals || []).length > 0 && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6">
              <div className="flex items-center gap-2 mb-5">
                <ClipboardList size={17} className="text-violet-600" />
                <h2 className="font-semibold">Approvals</h2>
              </div>
              <div className="space-y-3">
                {reg.approvals.map((ap, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-4 rounded-2xl border border-slate-200"
                  >
                    <CheckCircle2 size={18} className="text-emerald-600" />
                    <div>
                      <p className="text-sm font-semibold">{ap.authority}</p>
                      <p className="text-[10px] text-slate-400" style={MONO}>
                        {ap.approvalNumber}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Tag size={16} className="text-violet-600" />
              <h2 className="font-semibold">Product Info</h2>
            </div>
            <InfoRow label="Type" value={typeMeta.label} />
            <InfoRow label="Code" value={product.productCode} />
            <InfoRow
              label="Status"
              value={product.isActive ? "Active" : "Inactive"}
            />
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Layers3 size={16} className="text-violet-600" />
              <h2 className="font-semibold">Metadata</h2>
            </div>
            <InfoRow label="UUID" value={product.uuid} />
            <InfoRow
              label="Created"
              value={
                product.createdAt
                  ? new Date(product.createdAt).toLocaleDateString()
                  : "N/A"
              }
            />
          </div>

          {(product.images || []).length > 0 && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6">
              <h2 className="font-semibold mb-4">Images</h2>
              <div className="grid grid-cols-2 gap-2">
                {product.images.map((img, i) => (
                  <img
                    key={i}
                    src={img.url}
                    alt=""
                    className="rounded-xl border border-slate-200 aspect-square object-cover"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
