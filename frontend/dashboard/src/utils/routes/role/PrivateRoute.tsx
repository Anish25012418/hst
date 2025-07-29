// Import - default
import { Navigate } from "react-router-dom";

// Import - helpers
import { Spinner } from "@/helpers/components";
import { useAuthStore } from "@/helpers/stores";
import { useRegenApi } from "@/helpers/hooks";

// Import - utils
import { getUser } from "@/utils/methods/app-methods";
import { CenterContainer } from "@/helpers/components";

// Main
const PrivateRoute = (props: any) => {
  // Props
  const { children } = props;

  // Hooks
  useRegenApi();
  const { initialState: authStore } = useAuthStore();

  // Variables
  const { isLoadingLogin } = authStore;
  const { isAuthStore } = getUser({ authStore });

  return (
    <>
      {isLoadingLogin ? (
        <CenterContainer isScreen>
          <Spinner status="primary" />
        </CenterContainer>
      ) : isAuthStore ? (
        children
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default PrivateRoute;
