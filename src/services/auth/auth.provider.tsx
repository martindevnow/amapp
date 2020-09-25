import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import FirebaseContext from "../firebase/firebase.context";
import authService, { IUserProfile } from "./auth-service.class";
import AuthContext from "./auth.context";

const AuthProvider: FunctionComponent = (props) => {
  const firebase = useContext(FirebaseContext);
  const [user, setUser] = useState<IUserProfile | null>(null);
  const [loaded, setLoaded] = useState<boolean>(false);

  // TODO: Add a event listener in `useEffect` to
  // This code was found in the FrontendMasters course on React with Firebase V2:
  // But it appears to cause a memory leak when we subscribe to the `userRef.onSnapshot`
  // Unless, the unsubscribe to
  // componentDidMount = async () => {
  //   this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userInfo) => {
  //     const userRef = await createUserDocument(userInfo);
  //     userRef.onSnapshot((snapshot) => {
  //       const user = collectIdsAndData(snapshot);
  //       this.setState({ user, loaded: true });
  //     });
  //   });
  // };
  useEffect(() => {
    console.log("AuthProvider :: Initializing useEffect");
    return firebase.auth.onAuthStateChanged(async (userInfo) => {
      setLoaded(true);

      const userRef = await authService.createUserProfileDocument(userInfo);
      if (!userRef) {
        console.log("AuthProvider :: User Ref nullish :: failed logged out?");
        setUser(null);
        return;
      }

      const userSnapshot = await userRef.get();
      if (!userSnapshot.exists) {
        console.log("AuthProvider :: User snapshot doesn't exist :: logout?");
        setUser(null);
      } else {
        const normalizedUser = {
          uid: userSnapshot.id,
          ...userSnapshot.data(),
        };
        setUser(normalizedUser as IUserProfile);
      }
    });
  }, [firebase]);

  return (
    <AuthContext.Provider value={{ user, loaded, authService: authService }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
