// const { auth, db } = require("../firebase");
// const {
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
//   signInWithPhoneNumber,
//   onAuthStateChanged,
//   signOut,
//   RecaptchaVerifier,
// } = require("firebase/auth");

// const {
//   getDocs,
//   getDoc,
//   collection,
//   addDoc,
//   serverTimestamp,
//   doc,
//   updateDoc,
//   deleteDoc,
//   setDoc,
//   query,
//   where,
//   increment,
// } = require("firebase/firestore");

// const user_login = async (req, res) => {
//   try {
//     const userData = req.body;
//     const loginEmail = userData.loginEmail.split(" ")[0];
//     console.log(loginEmail, userData.loginPass);
//     const userCredentials = await signInWithEmailAndPassword(
//       auth,
//       loginEmail,
//       userData.loginPass
//     );
//     const uid = userCredentials.user.uid;
//     console.log(uid);
//     res.send(uid);
//   } catch (err) {
//     console.error(err.code.split("/")[1]);

//     res.status(500).send(err.code.split("/")[1]);
//   }
// };

// // /api/users/signup
// const user_register = async (req, res) => {
//   try {
//     const userData = req.body;
//     console.log(userData);
//     const userCredentials = await createUserWithEmailAndPassword(
//       auth,
//       userData.loginEmail,
//       userData.loginPass
//     );

//     const uid = userCredentials.user.uid;
//     // console.log("uuid :=> ", uid);
//     userData.privateToken = "0000";
//     // console.log("curr_user", userData);
//     userData.publicId = uid;
//     // console.log("curr_user", userData);
//     let fullName = userData.name;
//     fullName = fullName.split(" ");
//     userData.firstName = fullName[0];
//     if (fullName.length == 3) {
//       userData.middleName = fullName[1];
//       userData.lastName = fullName[2];
//     } else {
//       userData.lastName = fullName[1];
//       userData.middleName = "";
//     }
//     userData.balance = 0;
//     delete userData.name;
//     delete userData.loginPass;
//     //adding user to firestore
//     const usersRef = doc(db, `users/${uid}`);
//     await setDoc(usersRef, userData);
//     console.log(uid);
//     //updatingID
//     res.status(200).send(uid);
//   } catch (err) {
//     console.log(err.code.split("/")[1]);
//     res.status(500).send(err.code.split("/")[1]);
//   }
// };

// // users/getuser
// const getUserDetails = async (req, res) => {
//   try {
//     console.log(req.body);
//     const docRef = doc(db, "users", req.body.docId);
//     const userSnapshot = await getDoc(docRef);

//     if (userSnapshot.exists()) {
//       console.log("Document Data: ", userSnapshot.data());
//       res.status(200).send(userSnapshot.data());
//     } else {
//       console.log("User Does Not exist");
//     }
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// };

// const logout = async (req, res, next) => {
//   try {
//     await signOut(auth);
//     console.log("User successfully logged out");
//     res.status(200).send("User Successfully Logged Out");
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send(err.message);
//   }
//   res.end();
// };

// const monitor_AuthState = async (req, res, next) => {
//   onAuthStateChanged(auth, (user) => {
//     if (user) {
//       console.log(user.displayName);
//     } else {
//       console.log("No user logged in");
//     }
//     res.end();
//   });
// };

// // /api/users/getAllUsers
// const getAllUsers = async (req, res) => {
//   try {
//     const colref = collection(db, "users");
//     const userSnapshot = await getDocs(colref);
//     const userList = userSnapshot.docs.map((doc) => doc.data());
//     console.log(userList);
//     res.send(userList);
//   } catch (err) {
//     console.log(err.message);
//     res.status(500).send("Server error");
//   }
// };

// // users/transaction
// const transaction = async (req, res) => {
//   // let transactionAmt = 400;
//   try {
//     const ToRef = doc(db, "users", req.body.To);
//     const FromRef = doc(db, "users", req.body.From);
//     const FromSnapshot = await getDoc(FromRef);
//     const fromData = FromSnapshot.data();
//     if (fromData.balance >= req.body.amount) {
//       console.log("Transaction is successful");
//       await updateDoc(FromRef, {
//         balance: increment(-1 * req.body.amount),
//       });
//       await updateDoc(ToRef, {
//         balance: increment(req.body.amount),
//       });
//       const newData = await getDoc(FromRef);
//       const ToSnapshot = await getDoc(ToRef);
//       console.log(newData.data());
//       console.log(ToSnapshot.data());
//       res.status(200).send(ToSnapshot.data().firstName);
//     } else {
//       console.log("Transaction is not possible");
//       res.status(300).send("Not Possible");
//     }
//   } catch (err) {
//     console.log(err.message);
//   }
// };

// module.exports = {
//   user_register,
//   user_login,
//   logout,
//   monitor_AuthState,
//   getAllUsers,
//   getUserDetails,
//   transaction,
// };

const { uid } = require('../Helper/helper');
const user = require('../models/user.model');

const login_using_email = async (req, res) => {
  try{
    const {email, password} = req.body;
    if(!email || !password){
      res.status(201).send({error : "Please fill all the fields"});
      return;
    }
    const result = await user.findOne({email : email});
    if(!result){
      res.status(202).send({error : "User Not found"});
      return;
    } else{
      if(result.password === password){
        res.status(200).send({
          message : "success",
          result : result
        });
        return;
      } else{
        res.status(203).send({error : "Incorrect Password"});
        return;
      }
    }
  } catch(e){
    console.log(e);
    res.status(500).send({error : "Internal Server Error"});
  }
}
const login_using_phone = async (req, res) => {
  try{
    const {phone, password} = req.body;
    if(!phone || !password){
      res.status(201).send({error : "Please fill all the fields"});
      return;
    }
    const result = await user.findOne({phone : phone});
    if(!result){
      res.status(202).send({error : "User Not found"});
      return;
    } else{
      if(result.password === password){
        res.status(200).send({
          message : "success",
          result : result
        });
        return;
      } else{
        res.status(203).send({error : "Incorrect Password"});
        return;
      }
    }
  } catch(e){
    console.log(e);
    res.status(500).send({error : "Internal Server Error"});
  }
}

const register = async (req, res) => {
  try{
    const {name, email, password, phone, address} = req.body;
    if(!name || !email || !password || !phone || !address){
      res.status(201).send({error : "Please fill all the fields"});
      return;
    }
    const result = await user.findOne({email : email}, {email : 1});
    const result2 = await user.findOne({phone : phone});
    // console.log(result);
    console.log(result2);
    if(result || result2){
      res.status(202).send({error : "User already exists"});
      return;
    }

    const publicId = uid();
    const newUser = new user({
      name : name,
      phone: phone,
      email: email,
      address : address,
      password : password,
      publicId : publicId
    });
    console.log("New User is : " + publicId);
    await newUser.save();
    res.status(200).send({
      message : "success",
      publicId : publicId
    });
  } catch(e){
    console.log(e);
    res.status(500).send({error : "Server Error"});
  }
}

const deleteUser = async(req, res) => {
  try{
    const {email} = req.body;
    const result = await user.deleteOne({email : email});
    console.log(result);
    if(result.deletedCount){
      res.status(200).send({message : "success"});
    } else{
      res.status(201).send({error : "Not Able to Delete User"});
    }
  } catch(e){
    console.log(e);
    res.status(500).send({error : "Server Error"});
  }
}

module.exports = {
  register,
  login_using_email,
  login_using_phone,
  deleteUser
}