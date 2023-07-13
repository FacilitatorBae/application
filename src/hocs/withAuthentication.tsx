import { signIn, useSession } from "next-auth/react";

// TODO: Figure out types... or not :)
/**
HOC to prevent a route from being rendered if the user is not logged in.

withAuthentication args:
@param Component Component/Route to render if the user is logged in.
@param FallbackComponent Fallback Component/Route to render if the user is NOT logged in.
In case it's not provided, the user will be redirected to the google login page.
*/
export const withAuthentication = (Component: any, FallbackComponent?: any) => {
  const AuthenticatedComponent = (props: any) => {
    const { status } = useSession();

    if (status === "loading") {
      return null;
    }

    if (status === "unauthenticated") {
      if (!!FallbackComponent) {
        return <FallbackComponent {...props} />;
      }

      void signIn("google");
      return;
    }

    return <Component {...props} />;
  };

  return AuthenticatedComponent;
};
