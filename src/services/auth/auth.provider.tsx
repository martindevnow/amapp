import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import FirebaseContext from "../firebase/firebase.context";
import authService from "./auth.service";
import AuthContext from "./auth.context";
import { ACL, DEFAULT_ACL } from "./auth.acl";
import { IUserProfile } from "./auth.types";
import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";

const AuthProvider: FunctionComponent = (props) => {
  const firebase = useContext(FirebaseContext);
  const [user, setUser] = useState<IUserProfile | null>(null);
  const [loaded, setLoaded] = useState<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [acl, _setAcl] = useState<ACL>(DEFAULT_ACL);
  authService.loadAcl(acl);

  useEffect(() => {
    const { auth } = firebase;
    const user$ = new Observable<firebase.User | null>((observer) =>
      auth.onAuthStateChanged((userInfo) => observer.next(userInfo))
    ).pipe(
      switchMap((userInfo) => authService.createUserProfileDocument(userInfo)),
      switchMap((userRef) =>
        userRef
          ? new Observable<IUserProfile>((observer) =>
              userRef.onSnapshot((snapshot) => {
                const normalizedUser = {
                  uid: snapshot.id,
                  ...snapshot.data(),
                  createdAt: snapshot.data()?.createdAt.toDate(),
                };
                return observer.next(normalizedUser as IUserProfile);
              })
            )
          : of(null)
      )
    );

    const subscription = user$.subscribe(
      (user) => {
        console.log("user subscription", user);
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
  }, [firebase]);

  return (
    <AuthContext.Provider value={{ user, loaded, authService }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
