// ... existing imports
import Terms from "./pages/Terms"; // New import
import Privacy from "./pages/Privacy"; // New import

function Router() {
  return (
    <Switch>
      {/* ... existing routes */}
      <Route path="/terms" component={Terms} /> {/* Add route */}
      <Route path="/privacy" component={Privacy} /> {/* Add route */}
      {/* ... existing fallback */}
    </Switch>
  );
}
