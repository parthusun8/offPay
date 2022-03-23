const { auth, db } = require("../firebase");
const {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPhoneNumber,
  onAuthStateChanged,
  signOut,
  RecaptchaVerifier,
} = require("firebase/auth");

const {
  getDocs,
  getDoc,
  collection,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
  deleteDoc,
  setDoc,
} = require("firebase/firestore");

const user_login = async (req, res) => {
  try {
    const userData = req.body;
    console.log(userData.loginEmail, userData.loginPass);
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      userData.loginEmail,
      userData.loginPass
    );
    const uid = userCredentials.user.uid;
    console.log(uid);
    res.send(uid);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// /api/users/signup
const user_register = async (req, res) => {
  console.log("Hi");
  try {
    const userData = req.body;
    console.log(userData);
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      userData.loginEmail,
      userData.loginPass
    );

    //adding user to firestore
    const uid = userCredentials.user.uid;
    const usersRef = doc(db, `users/${uid}`);
    await setDoc(usersRef, userData);
    console.log(uid);
    //updatingID
    res.send(uid);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const logout = async (req, res, next) => {
  try {
    await signOut(auth);
    console.log("User successfully logged out");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Logout error");
  }
  res.end();
};

const monitor_AuthState = async (req, res, next) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user.displayName);
    } else {
      console.log("No user logged in");
    }
    res.end();
  });
};

// /api/users/getAllUsers
const getAllUsers = async (req, res, next) => {
  try {
    const colref = collection(db, "users");
    const userSnapshot = await getDocs(colref);
    const userList = userSnapshot.docs.map((doc) => doc.data());
    console.log(userList);
    // res.send(userList);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  user_register,
  user_login,
  logout,
  monitor_AuthState,
  getAllUsers,
};
