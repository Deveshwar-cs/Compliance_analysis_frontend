import {
  ArrowLeft,
  Building2,
  Globe,
  Phone,
  Mail,
  MapPin,
  User,
  ShieldCheck,
  FileBadge,
  Landmark,
  ClipboardList,
  CreditCard,
  Layers3,
  Fingerprint,
} from "lucide-react";

export default function OrganizationDetails({org, onBack}) {
  const identifiers = org.identifiers || {};

  return (
    <div className="bg-slate-50 min-h-screen p-6">
      {/* TOP BAR */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 transition-all text-sm"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            org.isActive
              ? "bg-emerald-100 text-emerald-700"
              : "bg-rose-100 text-rose-700"
          }`}
        >
          {org.isActive ? "Active" : "Inactive"}
        </span>
      </div>

      {/* HERO */}
      <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm mb-6">
        <div className="flex items-start gap-5">
          <div className="w-20 h-20 rounded-3xl bg-violet-100 text-violet-700 flex items-center justify-center">
            <Building2 size={38} />
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-900">
              {org.legalName}
            </h1>

            <p className="text-slate-500 mt-1 text-lg">{org.dbaName}</p>

            <div className="flex flex-wrap gap-3 mt-5">
              {org.website && (
                <a
                  href={org.website}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition-all text-sm"
                >
                  <Globe size={16} />
                  Website
                </a>
              )}

              {org.phoneNumber && (
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 text-sm">
                  <Phone size={16} />
                  {org.phoneNumber}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="xl:col-span-2 space-y-6">
          {/* CONTACT */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <User size={18} className="text-violet-600" />

              <h2 className="text-lg font-semibold text-slate-900">
                Primary Contact
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <p className="text-xs text-slate-400 mb-1">Name</p>

                <p className="font-medium text-slate-800">
                  {org.primaryContact?.name || "N/A"}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <p className="text-xs text-slate-400 mb-1">Email</p>

                <p className="font-medium text-slate-800 break-all">
                  {org.primaryContact?.email || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* ADDRESS */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <MapPin size={18} className="text-violet-600" />

              <h2 className="text-lg font-semibold text-slate-900">Address</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <p className="text-xs text-slate-400 mb-1">Street</p>

                <p className="font-medium text-slate-800">
                  {org.address?.street || "N/A"}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <p className="text-xs text-slate-400 mb-1">City</p>

                <p className="font-medium text-slate-800">
                  {org.address?.city || "N/A"}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <p className="text-xs text-slate-400 mb-1">State</p>

                <p className="font-medium text-slate-800">
                  {org.address?.state || "N/A"}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <p className="text-xs text-slate-400 mb-1">Country</p>

                <p className="font-medium text-slate-800">
                  {org.address?.country || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          {/* IDENTIFIERS */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <ShieldCheck size={18} className="text-violet-600" />

              <h2 className="text-lg font-semibold text-slate-900">
                Regulatory IDs
              </h2>
            </div>

            <div className="space-y-3">
              <IdentifierCard
                icon={<ShieldCheck size={16} />}
                label="FDA FEI"
                value={identifiers.fdafei}
              />

              <IdentifierCard
                icon={<FileBadge size={16} />}
                label="Labeller Code"
                value={identifiers.labellerCode}
              />

              <IdentifierCard
                icon={<Layers3 size={16} />}
                label="DUNS"
                value={identifiers.dunsNumber}
              />

              <IdentifierCard
                icon={<Landmark size={16} />}
                label="CIN"
                value={identifiers.cin}
              />

              <IdentifierCard
                icon={<ClipboardList size={16} />}
                label="GSTIN"
                value={identifiers.gstin}
              />

              <IdentifierCard
                icon={<CreditCard size={16} />}
                label="PAN"
                value={identifiers.pan}
              />

              <IdentifierCard
                icon={<Fingerprint size={16} />}
                label="CDSCO"
                value={identifiers.cdsco}
              />
            </div>
          </div>

          {/* META */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900 mb-5">
              Metadata
            </h2>

            <div className="space-y-4 text-sm">
              <div>
                <p className="text-slate-400 mb-1">UUID</p>

                <p className="text-slate-700 break-all">{org.uuid}</p>
              </div>

              <div>
                <p className="text-slate-400 mb-1">Created At</p>

                <p className="text-slate-700">
                  {new Date(org.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div>
                <p className="text-slate-400 mb-1">Updated At</p>

                <p className="text-slate-700">
                  {new Date(org.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function IdentifierCard({icon, label, value}) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-2xl border border-slate-200 bg-slate-50">
      <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-violet-600">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs text-slate-400 mb-1">{label}</p>

        <p className="text-sm font-medium text-slate-800 break-all">
          {value || "N/A"}
        </p>
      </div>
    </div>
  );
}
