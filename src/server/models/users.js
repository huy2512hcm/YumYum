import mongoose from "mongoose";

const Users = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

export const UsersSchema = new Users({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  groups: [
    {
      groupId: { type: ObjectId, ref: "Groups", required: true },
      name: { type: String, required: true },
      isOwner: { type: Boolean, required: true },
    },
  ],
});

UsersSchema.statics.getUserById = async function (userId) {
  let result = await this.findOne({ _id: mongoose.Types.ObjectId(userId) })
    .select("-password -__v")
    .lean();
  return result;
};

UsersSchema.statics.getUserByEmail = async function (email) {
  let result = await this.findOne({ email: email }).select("email").lean();
  return result;
};

UsersSchema.statics.createUser = async function (name, phone, email, password) {
  let result = await this.create({
    name: name,
    phone: phone,
    email: email,
    password: password,
  });
  return result;
};

const userModel = mongoose.model("Users", UsersSchema);
export default userModel;
