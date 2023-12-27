const {
  createAdmin,
  createDoctor,
  createPatient,
  getUserByEmail,
  deleteUser: crudDeleteUser,
} = require("../crud/crudUser");

const { createSession, deldeleteSession } = require("../crud/crudSession");
const { deleteSession } = require("../crud/crudSession");

const registerAdmin = async (req, res) => {
  const { Nom, Prenom, Gener, dt_Naiss, email, password, Autorisation ,avatar } =
  req.body;
  if( !(Nom && Prenom && Gener && dt_Naiss && email && password && Autorisation && avatar) ){
    res.json({input: "notComplete"});
  }else{
    const user = await getUserByEmail(email);
  
    if (user) {
      return res.status(500).json({ message: "Email already existing" });
    }
  
    const adminId = await createUser(
      {
        Nom: Nom,
        Prenom: Prenom,
        Gener: Gener,
        dt_Naiss: new Date(dt_Naiss),
        email: email,
        password: password,
        is_accepte: false,
        avatar
      },
      {
        Role: "ADMIN",
        Autorisation: Autorisation,
      }
    );
  
    res
      .status(200)
      .json({ message: "Admin " + adminId + " created Successfuly" });
  }
};

const registerDoctor = async (req, res) => {
  const {
    Nom,
    Prenom,
    Gener,
    dt_Naiss,
    email,
    password,
    Specilite,
    /*Sess_thrp_plnf,
    med_atrbs,*/
  } = req.body;

  if(!(Nom && Prenom && Gener && dt_Naiss && email && password && Specilite)){
    res.json({input: "notComplete"});
  }else{

    const user = await getUserByEmail(email);
  
    if (user) {
      return res.status(500).json({ message: "Email already existing" });
    }
  
    const doctorId = await createDoctor(
      {
        Nom: Nom,
        Prenom: Prenom,
        Gener: Gener,
        dt_Naiss: new Date(dt_Naiss),
        email: email,
        password: password,
        Specilite: Specilite,
        is_accepte: false,
      },
      {
        Specilite: Specilite,
        Sess_thrp_plnf: ''/*Sess_thrp_plnf*/,
        med_atrbs: ''/*med_atrbs*/,
      }
    );
  
    res
      .status(200)
      .json({ message: "Doctor " + doctorId + " created Successfuly" });
  }

};

const registerPatient = async (req, res) => {
  const {
    Nom,
    Prenom,
    Gener,
    dt_Naiss,
    email,
    password,
    /*niveau_dadd,
    moyenne_dheur,
    moyenne_dMoinsj,
    score_dinsom,
    score_somlnc,
    score_danxi,
    score_dépr,
    autres_attrpat,*/
  } = req.body;

  if(!(Nom && Prenom && Gener && dt_Naiss && email && password)){
    res.json({input: "notComplete"});
  }else{

    const user = await getUserByEmail(email);
  
    if (user) {
      return res.status(500).json({ message: "Email already existing" });
    }
  
    const patientId = await createPatient(
      {
        Nom: Nom,
        Prenom: Prenom,
        Gener: Gener,
        dt_Naiss: new Date(dt_Naiss),
        email: email,
        password: password,
        is_accepte: false,
      },
      {
        niveau_dadd:'',// niveau_dadd,
        moyenne_dheur:'',// moyenne_dheur,
        moyenne_dMoinsj:'',// moyenne_dMoinsj,
        score_dinsom:'',// score_dinsom,
        score_somlnc:'',// score_somlnc,
        score_danxi:'',// score_danxi,
        score_dépr:'',// score_dépr,
        autres_attrpat:'',// autres_attrpat,
      }
    );
  
    res
      .status(200)
      .json({ message: "Patient " + patientId + " created Successfuly" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await getUserByEmail(email);

  if (!user)
    return res
      .status(404)
      .json({ error: "Couldn't find a user with this email!" });

  if (user.password !== password)
    return res.status(404).json({ error: "Wrong password!" });

  const session = await createSession(user._id);
  res.status(200).json({ user: user, session: session });
};

const deleteUser = async (req, res) => {
 // const { userInfo, sessionId } = req.currentUser;
  const { deleteUserId } = req.body;

  /*if (userInfo.role !== "ADMIN") {
    console.log("User:", userInfo._id, "Is an Admin");
    return res.status(500).json({
      error: "You're Not Authorized to access this recource. ADMIN ONLY",
    });
  }*/

  await crudDeleteUser(deleteUserId);

  res.status(200).json({ message: "Success" });
};

const logout = async (req, res) => {
  const { currentUser, sessionId } = req.currentUser;
  const session = await deleteSession(sessionId);

  res.status(200).json(session);
};

module.exports = {
  registerAdmin,
  registerDoctor,
  registerPatient,
  deleteUser,
  login,
  logout,
};
