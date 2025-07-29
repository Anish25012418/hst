// Import - default
import { Navigate } from "react-router-dom";

// Import - relative
import { CenterContainer, Spinner } from "@/helpers/components";
import { useAuthStore } from "@/helpers/stores";

// Import - utils
import { getUser } from "@/utils/methods/app-methods";
// import { useRegenApi } from "@/helpers/hooks";

// Main
const PublicRoute = (props: any) => {
  // Props
  const { children } = props;

  // Hooks
  // useRegenApi();
  const { initialState: authStore } = useAuthStore();

  // Variables
  const { isLoadingLogin, isLoggedIn } = authStore;
  const { isAdmin, isUser } = getUser({ authStore });

  return (
    <>
      {isLoadingLogin ? (
        <CenterContainer isScreen>
          <Spinner />
        </CenterContainer>
      ) : isLoggedIn && isAdmin ? (
        <Navigate to="/admin" />
      ) : isLoggedIn && isUser ? (
        <Navigate to="/user" />
      ) : (
        children
      )}
    </>
  );
};

export default PublicRoute;
