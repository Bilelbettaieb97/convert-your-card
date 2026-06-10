import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/unsubscribe")({
  component: UnsubscribePage,
});

function UnsubscribePage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gray-100 mb-6">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          Tu ne recevras plus nos emails.
        </h1>
        <p className="text-gray-500 text-sm leading-relaxed mb-8">
          Tu as bien été désabonné de nos relances. Si tu changes d'avis, ton compte est toujours actif.
        </p>
        <Link
          to="/"
          className="inline-block bg-gray-900 text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-gray-700 transition-colors"
        >
          Retour au site →
        </Link>
      </div>
    </div>
  );
}
