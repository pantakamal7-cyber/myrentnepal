import { Switch, Route } from "wouter";
import Home from "./pages/Home";
import Listings from "./pages/Listings";
import Terms from "./pages/Terms"; 
import Privacy from "./pages/Privacy"; 
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Switch>
      {/* Home Route */}
      <Route path="/" component={Home} />

      {/* Listings Route - Changed to a wrapper component to pass query search parameters smoothly */}
      <Route path="/listings">
        <Listings />
      </Route>

      {/* Terms and Privacy Legal Routes */}
      <Route path="/terms" component={Terms} /> 
      <Route path="/privacy" component={Privacy} /> 

      {/* Fallback 404 Route */}
      <Route component={NotFound} />
    </Switch>
  );
}
