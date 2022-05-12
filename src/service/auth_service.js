import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut,
} from "firebase/auth";

// 파이어베이스를 이용한 로직들을 한번에 관리하기 위해서 클래스 객체화한다.
class AuthService {
  constructor() {
    this.firebaseAuth = getAuth();
    this.googleProvider = new GoogleAuthProvider();
    this.githubProvider = new GithubAuthProvider();
  }
  // 어떤 방식으로 로그인하던 매개변수에 따라 로그인 방식을 달리 하기위해서
  // provider를 별도록 정의한다.
  getProvider(providerName) {
    switch (providerName) {
      case "Google":
        return this.googleProvider;
      case "Github":
        return this.githubProvider;
      default:
        // 에러를 정의하고 provierName을 받지 못하면 에러를 던진다.
        throw new Error(`not supported provider`);
    }
  }
  login(providerName) {
    const authProvider = this.getProvider(providerName);
    return signInWithPopup(this.firebaseAuth, authProvider);
  }
  // 파이어베이스에서 로그인 상태를 기억하고 변화를 저장하는 메소드는 onAuthStateChanged가 있다.
  onAuthChange(onUserChanged) {
    this.firebaseAuth.onAuthStateChanged((user) => onUserChanged(user));
  }
  logout() {
    return signOut(this.firebaseAuth);
  }
}

export default AuthService;
