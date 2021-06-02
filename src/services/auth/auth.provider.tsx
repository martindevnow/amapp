import React from "react";
import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";

import authService from "./auth.service";
import AuthContext from "./auth.context";
import { ACL, DEFAULT_ACL, GuestRoleMap } from "./auth.acl";
import { IUserProfile, IUserRoles } from "./auth.types";
import useFirebase from "../../hooks/useFirebase.hook";
// import Logger from "../../utils/Logger";

const AuthProvider: React.FC = (props) => {
  const firebaseService = useFirebase();
  const [user, setUser] = React.useState<IUserProfile | null>(null);
  const [roles, setRoles] = React.useState<IUserRoles>(GuestRoleMap);
  const [loaded, setLoaded] = React.useState<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [acl, _setAcl] = React.useState<ACL>(DEFAULT_ACL);
  authService.loadAcl(acl);

  React.useEffect(() => {
    // Logger.log("AuthProvider :: useEffect");
    const { auth } = firebaseService;
    const user$ = new Observable<firebase.User | null>((observer) =>
      auth.onAuthStateChanged((userInfo) => {
        if (userInfo) {
          firebaseService.analytics.logEvent("login", { user: userInfo.email });
        }

        return observer.next(userInfo);
      })
    ).pipe(
      // switchMap((userInfo) => authService.createUserProfileDocument(userInfo)),
      switchMap((userInfo) => {
        const userRef = authService.authChanged(userInfo);

        return userRef
          ? new Observable<IUserProfile>((observer) =>
              userRef.onSnapshot(
                (
                  snapshot: firebase.firestore.DocumentSnapshot<IUserProfile>
                ) => {
                  const normalizedUser = authService.loadUser(snapshot);
                  authService.loadRoles(normalizedUser.uid).then((roles) => {
                    // const normalizedUser = authService.normalizeUser(snapshot);
                    setRoles(roles);
                    return observer.next(normalizedUser as IUserProfile);
                  });
                }
              )
            )
          : of(null);
      })
    );

    const subscription = user$.subscribe(
      (user) => {
        setUser(user);
        setLoaded(true);
      },
      (e) => {
        setUser(() => {
          throw e;
        });
      }
    );
    return () => subscription.unsubscribe();
  }, [firebaseService]);

  return (
    <AuthContext.Provider value={{ user, loaded, authService, roles }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
