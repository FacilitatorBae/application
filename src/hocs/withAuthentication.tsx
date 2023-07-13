import { signIn, useSession } from "next-auth/react";

// TODO: Figure out types... or not :)
export const withAuthentication = (Component: any, FallbackComponent?: any) => {
  const AuthenticatedComponent = (props: any) => {
    const { status } = useSession();

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
