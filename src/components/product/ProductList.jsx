import {
  Search,
  SlidersHorizontal,
  X,
  ChevronRight,
  Plus,
  Loader2,
  Package,
} from "lucide-react";

import {
  RISK_META,
  MONO,
  SANS,
  getTypeMeta,
  getComplianceMeta,
} from "../../utils/productMeta";

function ComplianceBadge({status}) {
  const m = getComplianceMeta(status);
  // ✅ Fix: assign icon to capitalized var before rendering
  const Icon = m.icon;

  return (
    <span
      className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px]"
      style={{background: m.bg, color: m.fg, ...MONO}}
    >
      <Icon size={10} />
      {m.label}
    </span>
  );
}

function TypeBadge({type}) {
  const m = getTypeMeta(type);
  // ✅ Fix: assign icon to capitalized var before rendering
  const Icon = m.icon;

  return (
    <span
      className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px]"
      style={{background: m.bg, color: m.fg, ...MONO}}
    >
      <Icon size={10} />
      {m.label}
    </span>
  );
}

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

function ProductCard({product, onSelect}) {
  return (
    <div
      onClick={() => onSelect(product)}
      className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer"
    >
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <div className="flex justify-between">
            <div>
              <h3
                className="text-[15px] font-semibold text-slate-900"
                style={SANS}
              >
                {product.productName}
              </h3>
              <p className="text-[10px] text-slate-400 mt-1" style={MONO}>
                {product.productCode}
              </p>
            </div>
            <ChevronRight size={16} className="text-slate-300" />
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            <TypeBadge type={product.productType} />
            <ComplianceBadge status={product.complianceStatus} />

            {product.regulatory?.riskCategory && (
              <span
                className="text-[10px] px-2 py-0.5 rounded-full"
                style={{
                  background: RISK_META[product.regulatory.riskCategory]?.bg,
                  color: RISK_META[product.regulatory.riskCategory]?.color,
                  ...MONO,
                }}
              >
                {RISK_META[product.regulatory.riskCategory]?.label}
              </span>
            )}
          </div>
        </div>

        <ScoreRing score={product.complianceScore} />
      </div>
    </div>
  );
}

export default function ProductList({
  products,
  loading,
  search,
  setSearch,
  filterStatus,
  setFilterStatus,
  onCreate,
  onSelect,
}) {
  return (
    <div className="flex flex-col gap-5 p-6" style={SANS}>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold">Products</h1>
          <p className="text-[11px] text-slate-400" style={MONO}>
            {products.length} products
          </p>
        </div>

        <button
          onClick={onCreate}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-white"
          style={{background: "linear-gradient(135deg, #7c3aed, #6d28d9)"}}
        >
          <Plus size={14} />
          New Product
        </button>
      </div>

      <div className="flex gap-3">
        <div className="flex items-center gap-2 flex-1 px-3 py-2 rounded-xl border border-slate-200">
          <Search size={14} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="flex-1 outline-none text-sm"
          />
          {search && (
            <button onClick={() => setSearch("")}>
              <X size={14} />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 px-3 border border-slate-200 rounded-xl">
          <SlidersHorizontal size={14} />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="outline-none bg-transparent text-sm"
          >
            <option value="all">All</option>
            <option value="draft">Draft</option>
            <option value="under_review">Under Review</option>
            <option value="compliant">Compliant</option>
            <option value="non_compliant">Non-Compliant</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin" />
        </div>
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center py-20 gap-3">
          <Package size={30} />
          <p>No products found</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}
