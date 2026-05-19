export default function SetupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-base-200">
      <div className="card bg-base-100 shadow-xl max-w-lg w-full">
        <div className="card-body">
          <h1 className="card-title text-2xl">Almost ready</h1>
          <p className="text-base-content/80">
            The app needs your Supabase settings in a file named{" "}
            <code className="bg-base-200 px-1 rounded">.env.local</code> in the
            project folder.
          </p>
          <ol className="list-decimal list-inside space-y-2 text-sm mt-4">
            <li>
              Copy <code>.env.local.example</code> to <code>.env.local</code>
            </li>
            <li>
              Paste your Project URL and publishable key from Supabase (Concert
              Costs project)
            </li>
            <li>
              Stop the dev server (Ctrl+C in the terminal), then run{" "}
              <code className="bg-base-200 px-1 rounded">npm run dev</code> again
            </li>
            <li>
              Open{" "}
              <a
                href="http://127.0.0.1:3000/login"
                className="link link-primary"
              >
                http://127.0.0.1:3000/login
              </a>
            </li>
          </ol>
          <p className="text-xs text-base-content/60 mt-4">
            Use <strong>http</strong> (not https). If localhost does not work,
            try 127.0.0.1 instead.
          </p>
        </div>
      </div>
    </div>
  );
}
