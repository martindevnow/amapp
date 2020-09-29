import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";

import FirebaseContext from "../firebase/firebase.context";
import authService from "./auth.service";
import AuthContext from "./auth.context";
import { ACL, DEFAULT_ACL } from "./auth.acl";
import { IUserProfile } from "./auth.types";

const AuthProvider: FunctionComponent = (props) => {
  const firebaseService = useContext(FirebaseContext);
  const [user, setUser] = useState<IUserProfile | null>(null);
  const [loaded, setLoaded] = useState<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [acl, _setAcl] = useState<ACL>(DEFAULT_ACL);
  authService.loadAcl(acl);

  useEffect(() => {
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
                  const normalizedUser = authService.normalizeUser(snapshot);
                  return observer.next(normalizedUser as IUserProfile);
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
    <AuthContext.Provider value={{ user, loaded, authService }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
