import {useState, useRef, useEffect} from "react";
import api from "../api/api";

import {
  Building2,
  BadgeInfo,
  UserRound,
  Mail,
  Phone,
  Globe,
  MapPinned,
  Building,
  Map,
  Flag,
  ShieldCheck,
  Fingerprint,
  FileBadge,
  ReceiptText,
  CreditCard,
  FileText,
  ClipboardCheck,
  Hash,
} from "lucide-react";

const FIELDS_CONFIG = [
  {
    key: "legalName",
    label: "Legal Name",
    type: "text",
    icon: <Building2 size={18} />,
    required: true,
    placeholder: "Acme Corporation LLC",
    hint: "Official registered company name",
  },
  {
    key: "dbaName",
    label: "DBA Name",
    type: "text",
    icon: <BadgeInfo size={18} />,
    required: true,
    placeholder: "Acme",
    hint: "Trade name or 'doing business as'",
  },
  {
    key: "contactName",
    label: "Contact Name",
    type: "text",
    icon: <UserRound size={18} />,
    required: false,
    placeholder: "Jane Doe",
    hint: "Main point of contact",
  },
  {
    key: "contactEmail",
    label: "Contact Email",
    type: "email",
    icon: <Mail size={18} />,
    required: false,
    placeholder: "jane@example.com",
    hint: "Primary contact email",
  },
  {
    key: "phoneNumber",
    label: "Phone",
    type: "tel",
    icon: <Phone size={18} />,
    required: false,
    placeholder: "+91 9876543210",
    hint: "Include country code",
  },
  {
    key: "website",
    label: "Website",
    type: "url",
    icon: <Globe size={18} />,
    required: false,
    placeholder: "https://acme.com",
    hint: "Company public URL",
  },
  {
    key: "street",
    label: "Street",
    type: "text",
    icon: <MapPinned size={18} />,
    required: false,
    placeholder: "123 Main Street",
    hint: "Street address",
  },
  {
    key: "city",
    label: "City",
    type: "text",
    icon: <Building size={18} />,
    required: false,
    placeholder: "Chandigarh",
    hint: "City name",
  },
  {
    key: "state",
    label: "State",
    type: "text",
    icon: <Map size={18} />,
    required: false,
    placeholder: "Punjab",
    hint: "State or province",
  },
  {
    key: "country",
    label: "Country",
    type: "text",
    icon: <Flag size={18} />,
    required: false,
    placeholder: "India",
    hint: "Country name",
  },

  // REGULATORY IDENTIFIERS

  {
    key: "fdafei",
    label: "FDA FEI",
    type: "text",
    icon: <ShieldCheck size={18} />,
    required: false,
    placeholder: "FDA Facility Establishment Identifier",
    hint: "US FDA FEI Number",
  },
  {
    key: "labellerCode",
    label: "Labeller Code",
    type: "text",
    icon: <Fingerprint size={18} />,
    required: false,
    placeholder: "Labeller Code",
    hint: "FDA/NDC labeller code",
  },
  {
    key: "dunsNumber",
    label: "DUNS Number",
    type: "text",
    icon: <Hash size={18} />,
    required: false,
    placeholder: "123456789",
    hint: "Global business identifier",
  },
  {
    key: "cin",
    label: "CIN",
    type: "text",
    icon: <FileBadge size={18} />,
    required: false,
    placeholder: "L12345PB2026PLC000001",
    hint: "Corporate Identification Number",
  },
  {
    key: "gstin",
    label: "GSTIN",
    type: "text",
    icon: <ReceiptText size={18} />,
    required: false,
    placeholder: "03ABCDE1234F1Z5",
    hint: "Goods and Services Tax ID",
  },
  {
    key: "pan",
    label: "PAN",
    type: "text",
    icon: <CreditCard size={18} />,
    required: false,
    placeholder: "ABCDE1234F",
    hint: "Permanent Account Number",
  },
  {
    key: "cdsco",
    label: "CDSCO",
    type: "text",
    icon: <ClipboardCheck size={18} />,
    required: false,
    placeholder: "CDSCO Registration",
    hint: "Indian drug regulatory registration",
  },
  {
    key: "others",
    label: "Others",
    type: "text",
    icon: <FileText size={18} />,
    required: false,
    placeholder: "Other identifiers",
    hint: "Additional regulatory IDs",
  },
];

const MONO = {
  fontFamily: "'JetBrains Mono', monospace",
};

const SANS = {
  fontFamily: "'Plus Jakarta Sans', sans-serif",
};

function FieldRow({config, value, onChange, isActive, onFocus, index}) {
  const inputRef = useRef(null);

  const filled = value?.length > 0;

  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isActive]);

  return (
    <div
      onClick={() => onFocus(index)}
      className={`group flex items-start gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-200 border shadow-sm ${
        isActive
          ? "border-violet-300 bg-violet-50"
          : filled
            ? "border-slate-200 bg-white hover:bg-slate-50"
            : "border-transparent hover:border-slate-200 hover:bg-slate-50"
      }`}
    >
      <div className="flex flex-col items-center pt-1 gap-1 flex-shrink-0">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm transition-all duration-200 ${
            isActive ? "bg-violet-100" : filled ? "bg-slate-100" : "bg-slate-50"
          }`}
        >
          {config.icon}
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5">
          <label
            className={`text-xs font-medium tracking-widest uppercase transition-colors cursor-pointer ${
              isActive ? "text-violet-600" : "text-slate-500"
            }`}
            style={MONO}
          >
            {config.label}
          </label>

          {config.required && (
            <span
              className="text-[10px] px-1.5 py-0.5 rounded-md bg-violet-100 text-violet-600 border border-violet-200"
              style={MONO}
            >
              req
            </span>
          )}

          {filled && !isActive && (
            <span className="ml-auto text-[10px] text-emerald-500" style={MONO}>
              ✓
            </span>
          )}
        </div>

        {isActive ? (
          <>
            <input
              ref={inputRef}
              type={config.type}
              value={value}
              onChange={(e) => onChange(config.key, e.target.value)}
              placeholder={config.placeholder}
              className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 border-b border-violet-400 pb-1.5 transition-colors"
              style={SANS}
            />

            <p className="mt-2 text-[11px] text-slate-400" style={MONO}>
              {config.hint}
            </p>
          </>
        ) : (
          <p
            className={`text-sm truncate ${
              filled ? "text-slate-700" : "text-slate-400"
            }`}
            style={SANS}
          >
            {filled ? value : config.placeholder}
          </p>
        )}
      </div>
    </div>
  );
}

function CompletionRing({pct}) {
  const r = 20;

  const circ = 2 * Math.PI * r;

  const dash = (pct / 100) * circ;

  return (
    <svg width="52" height="52" viewBox="0 0 52 52">
      <circle
        cx="26"
        cy="26"
        r={r}
        fill="none"
        stroke="#e2e8f0"
        strokeWidth="4"
      />

      <circle
        cx="26"
        cy="26"
        r={r}
        fill="none"
        stroke={pct === 100 ? "#10b981" : "#7c3aed"}
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={`${dash} ${circ}`}
        strokeDashoffset={circ / 4}
        style={{transition: "stroke-dasharray 0.5s ease"}}
      />

      <text
        x="26"
        y="30"
        textAnchor="middle"
        fill={pct === 100 ? "#10b981" : "#7c3aed"}
        fontSize="11"
        fontWeight="600"
        style={MONO}
      >
        {Math.round(pct)}%
      </text>
    </svg>
  );
}

export default function CreateOrganization() {
  const [form, setForm] = useState({
    legalName: "",
    dbaName: "",
    contactName: "",
    contactEmail: "",
    phoneNumber: "",
    website: "",
    street: "",
    city: "",
    state: "",
    country: "",

    fdafei: "",
    labellerCode: "",
    dunsNumber: "",
    cin: "",
    gstin: "",
    pan: "",
    cdsco: "",
    others: "",
  });

  const [activeField, setActiveField] = useState(0);

  const [status, setStatus] = useState(null);

  const [error, setError] = useState("");

  const handleChange = (key, val) => {
    setForm((f) => ({
      ...f,
      [key]: val,
    }));
  };

  const filledCount = FIELDS_CONFIG.filter(
    (f) => form[f.key]?.length > 0,
  ).length;

  const completionPct = (filledCount / FIELDS_CONFIG.length) * 100;

  const requiredFilled = form.legalName && form.dbaName;

  const handleSubmit = async () => {
    if (!requiredFilled) {
      setError("Legal Name and DBA Name are required.");
      return;
    }

    setStatus("loading");

    setError("");

    const payload = {
      legalName: form.legalName,
      dbaName: form.dbaName,

      address: {
        street: form.street,
        city: form.city,
        state: form.state,
        country: form.country,
      },

      primaryContact: {
        name: form.contactName,
        email: form.contactEmail,
      },

      phoneNumber: form.phoneNumber,

      website: form.website,

      identifiers: {
        fdafei: form.fdafei,
        labellerCode: form.labellerCode,
        dunsNumber: form.dunsNumber,
        cin: form.cin,
        gstin: form.gstin,
        pan: form.pan,
        cdsco: form.cdsco,
        others: form.others,
      },
    };

    try {
      const res = await api.post("/organization/create", payload);

      console.log(res.data);

      setStatus("success");
    } catch (err) {
      setError(err.response?.data?.message || err.message);

      setStatus(null);
    }
  };

  if (status === "success") {
    return (
      <div className="h-[80vh] flex items-center justify-center bg-white rounded-3xl border border-slate-200 shadow-sm">
        <div className="text-center px-6">
          <div className="w-20 h-20 rounded-3xl bg-emerald-100 border border-emerald-200 flex items-center justify-center mx-auto mb-5">
            <span className="text-3xl">✓</span>
          </div>

          <h2
            className="text-2xl font-semibold text-slate-900 mb-2"
            style={SANS}
          >
            {form.dbaName || form.legalName}
          </h2>

          <p className="text-sm text-slate-500 mb-6" style={MONO}>
            Organization registered successfully
          </p>

          <button
            onClick={() => {
              setStatus(null);

              setForm({
                legalName: "",
                dbaName: "",
                contactName: "",
                contactEmail: "",
                phoneNumber: "",
                website: "",
                street: "",
                city: "",
                state: "",
                country: "",

                fdafei: "",
                labellerCode: "",
                dunsNumber: "",
                cin: "",
                gstin: "",
                pan: "",
                cdsco: "",
                others: "",
              });

              setActiveField(0);
            }}
            className="text-xs text-violet-600 border border-violet-200 rounded-xl px-4 py-2 hover:bg-violet-50 transition-colors"
            style={MONO}
          >
            + register another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[280px_1fr] gap-6">
      {/* LEFT SIDEBAR */}
      <div className="flex flex-col gap-4">
        <div className="rounded-3xl border border-slate-200 p-5 bg-white shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center text-sm font-bold text-white"
              style={MONO}
            >
              O
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-900" style={SANS}>
                Organizations
              </p>

              <p className="text-[10px] text-slate-400" style={MONO}>
                registry
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <CompletionRing pct={completionPct} />

            <div>
              <p className="text-[11px] text-slate-500 mb-0.5" style={MONO}>
                Profile complete
              </p>

              <p className="text-sm font-medium text-slate-900" style={SANS}>
                {filledCount} of {FIELDS_CONFIG.length} fields
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 overflow-hidden bg-white shadow-sm">
          <div className="px-4 py-3 border-b border-slate-200">
            <p
              className="text-[10px] tracking-widest uppercase text-slate-400"
              style={MONO}
            >
              Fields
            </p>
          </div>

          <div className="p-2">
            {FIELDS_CONFIG.map((f, i) => {
              const filled = form[f.key]?.length > 0;

              return (
                <button
                  key={f.key}
                  onClick={() => setActiveField(i)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left transition-all ${
                    activeField === i
                      ? "bg-violet-100 text-violet-700"
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <span className="text-xs">{f.icon}</span>

                  <span className="text-xs flex-1" style={MONO}>
                    {f.label}
                  </span>

                  {filled && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!requiredFilled || status === "loading"}
          className="w-full py-3 rounded-2xl text-sm font-semibold transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
          style={{
            background: requiredFilled
              ? "linear-gradient(135deg, #7c3aed, #6d28d9)"
              : "#e2e8f0",
            color: requiredFilled ? "white" : "#64748b",
            ...SANS,
          }}
        >
          {status === "loading" ? "Creating..." : "Create Organization"}
        </button>

        {error && (
          <p className="text-[11px] text-rose-500 text-center" style={MONO}>
            {error}
          </p>
        )}
      </div>

      {/* RIGHT PANEL */}
      <div className="rounded-3xl border border-slate-200 overflow-hidden flex flex-col bg-white shadow-sm">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-slate-400" style={MONO}>
              admin
            </span>

            <span className="text-slate-300">/</span>

            <span className="text-[10px] text-slate-400" style={MONO}>
              organizations
            </span>

            <span className="text-slate-300">/</span>

            <span className="text-[10px] text-violet-600" style={MONO}>
              new
            </span>
          </div>
        </div>

        <div className="flex-1 p-6 overflow-y-auto">
          <div className="space-y-2 mb-8">
            {FIELDS_CONFIG.map((config, i) => (
              <FieldRow
                key={config.key}
                config={config}
                value={form[config.key]}
                onChange={handleChange}
                isActive={activeField === i}
                onFocus={setActiveField}
                index={i}
              />
            ))}
          </div>
        </div>

        <div className="px-6 py-3 border-t border-slate-200 flex items-center gap-4 bg-white">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {form.legalName || form.dbaName ? (
              <>
                <div
                  className="w-7 h-7 rounded-lg bg-violet-100 border border-violet-200 flex items-center justify-center text-[10px] text-violet-600 font-bold flex-shrink-0"
                  style={MONO}
                >
                  {(form.dbaName || form.legalName).charAt(0).toUpperCase()}
                </div>

                <div className="min-w-0">
                  <p
                    className="text-xs font-medium text-slate-800 truncate"
                    style={SANS}
                  >
                    {form.dbaName || form.legalName}
                  </p>

                  {form.legalName && form.dbaName && (
                    <p
                      className="text-[10px] text-slate-400 truncate"
                      style={MONO}
                    >
                      {form.legalName}
                    </p>
                  )}
                </div>
              </>
            ) : (
              <p className="text-[10px] text-slate-400 italic" style={MONO}>
                Start typing to see preview…
              </p>
            )}
          </div>

          <span
            className={`text-[10px] px-2 py-0.5 rounded-full border ${
              requiredFilled
                ? "bg-emerald-100 text-emerald-600 border-emerald-200"
                : "bg-slate-100 text-slate-500 border-slate-200"
            }`}
            style={MONO}
          >
            {requiredFilled ? "ready" : "incomplete"}
          </span>
        </div>
      </div>
    </div>
  );
}
