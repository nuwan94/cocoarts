export function SetupNotice() {
  return (
    <div className="bg-shell px-4 py-3 text-center text-sm text-kernel">
      Sanity is not connected yet. Add{" "}
      <code className="font-mono">NEXT_PUBLIC_SANITY_PROJECT_ID</code> to{" "}
      <code className="font-mono">.env.local</code> and restart the dev server.
    </div>
  );
}
