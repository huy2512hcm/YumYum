import userModel from "../models/users";

export const getUserByEmail = async (email) => {
  let result = await userModel
    .findOne({ email: email })
    .select("email password groups")
    .lean();
  if (!result) {
    return { message: "Email does not exist", status: false };
  }
  return { result, status: true };
};

export const createUser = async (email, phone, password, name) => {
  let result = await userModel.create({
    name: name,
    phone: phone,
    email: email,
    password: password,
  });
  return { result, status: true };
};