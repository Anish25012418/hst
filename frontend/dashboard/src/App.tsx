// Import - default
import { ThemeProvider } from "@material-tailwind/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Import - helpers
import { ErrorBoundary } from "./helpers/components";
import { ToastProvider } from "./helpers/contexts";

// Import - utils
import { MainRoute } from "./utils/routes";

// Import - views
import { Error404Page } from "./views/pages";

// Main
const App = () => {
  // Main query client to handle @tanstack/react-query
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
        // retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 2000),
        staleTime: 2000,
      },
    },
  });

  return (
    <ThemeProvider>
      <ErrorBoundary fallbackComponent={<Error404Page />}>
        <QueryClientProvider client={queryClient}>
          <ToastProvider>
            <MainRoute />
          </ToastProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App;
