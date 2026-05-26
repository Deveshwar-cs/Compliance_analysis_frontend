import {useState} from "react";
import CreateOrganization from "../components/CreateOrganization";
import OrganizationsList from "../components/OrganizationsList";

const SANS = {
  fontFamily: "'Plus Jakarta Sans', sans-serif",
};

export default function Organization() {
  const [view, setView] = useState("create");

  return (
    <div className="h-full w-full overflow-auto bg-slate-100 p-6" style={SANS}>
      <div className="w-full max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Organization Management
            </h1>

            <p className="text-sm text-slate-500 mt-1">
              Create and manage organizations
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white border border-slate-200 p-1 rounded-2xl shadow-sm">
            <button
              onClick={() => setView("create")}
              className={`px-4 py-2 rounded-xl text-sm transition-all ${
                view === "create"
                  ? "bg-violet-600 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              Create
            </button>

            <button
              onClick={() => setView("list")}
              className={`px-4 py-2 rounded-xl text-sm transition-all ${
                view === "list"
                  ? "bg-violet-600 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              View All
            </button>
          </div>
        </div>

        {view === "create" ? <CreateOrganization /> : <OrganizationsList />}
      </div>
    </div>
  );
}
