import React, { useState } from "react";
import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { ACL, DEFAULT_ACL, GuestRoleMap } from "../services/auth/auth.acl";
import authService, { AuthService } from "../services/auth/auth.service";
import { IUserProfile, IUserRoles } from "../services/auth/auth.types";
import useFirebase from "./useFirebase.hook";

type useAuthReturn = {
  authService: AuthService;
  user: null | IUserProfile;
  loaded: boolean;
  roles: IUserRoles;
};

const useAuth = (): useAuthReturn => {
  const firebaseService = useFirebase();
  const [user, setUser] = React.useState<IUserProfile | null>(null);
  const [roles, setRoles] = React.useState<IUserRoles>(GuestRoleMap);
  const [loaded, setLoaded] = React.useState<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [acl, _setAcl] = useState<ACL>(DEFAULT_ACL);
  authService.loadAcl(acl);

  React.useEffect(() => {
    const { auth } = firebaseService;
    const user$ = new Observable<firebase.User | null>((observer) =>
      auth.onAuthStateChanged((userInfo) => observer.next(userInfo))
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

  return { user, loaded, authService, roles };
};

export default useAuth;
