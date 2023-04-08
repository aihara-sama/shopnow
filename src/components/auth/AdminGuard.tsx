import { SplashScreen } from "components/common/SplashScreen";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "store";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AdminGuard: React.FC<AuthGuardProps> = (props) => {
  const { children } = props;
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const [checked, setChecked] = React.useState(false);

  React.useEffect(() => {
    if (!router.isReady) {
      return;
    }

    onAuthStateChanged(getAuth(), (user) => {
      if (!user) {
        router.replace({
          pathname: "/admin/login",
        });
      } else {
        setChecked(true);
      }
    });
  }, [isAuthenticated, router]);

  // The following route is a private route.
  // So, we should not show any content from the rendered page
  // In this case, we will show Splash Screen component
  if (!checked) {
    return <SplashScreen />;
  }

  return <>{children}</>;
};

export default AdminGuard;
