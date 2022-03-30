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
  // console.log("Hi");
  try {
    const userData = req.body;
    console.log(userData);
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      userData.loginEmail,
      userData.loginPass
    );

    const uid = userCredentials.user.uid;
    userData.privateToken = "0000";
    userData.publicId = uid;
    const fullName = userData.name.split(" ");
    userData.firstName = fullName[0];
    if (fullName.length == 3) {
      userData.middleName = fullName[1];
      userData.lastName = fullName[2];
    } else {
      userData.lastName = fullName[1];
      userData.middleName = "";
    }
    delete userData.loginPass;
    console.log(userData);

    //adding user to firestore
    const usersRef = doc(db, `users/${uid}`);
    await setDoc(usersRef, userData);
    console.log(uid);
    //updatingID
    res.send(uid);
  } catch (err) {
    console.error(err.message);
    res.status(200).send(err.message);
  }
};

// users/getuser
const getUserDetails = async (req, res) => {
  try {
    console.log(req.body);
    const docRef = doc(db, "users", req.body.docId);
    const userSnapshot = await getDoc(docRef);

    if (userSnapshot.exists()) {
      console.log("Document Data: ", userSnapshot.data());
      res.status(200).send(userSnapshot.data());
    } else {
      console.log("User Does Not exist");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const logout = async (req, res, next) => {
  try {
    await signOut(auth);
    console.log("User successfully logged out");
    res.status(200).send("User Successfully Logged Out");
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
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
  getUserDetails,
};
