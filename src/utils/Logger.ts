import { Environment, environment } from "../services/firebase/firebase.config";

class Logger {
  static env: Environment = environment;

  static log(message: string) {
    if (Logger.env !== "production") {
      console.log(message);
    }
  }

  static info(message: string) {
    if (Logger.env !== "production") {
      console.info(message);
    }
  }
}

export default Logger;
