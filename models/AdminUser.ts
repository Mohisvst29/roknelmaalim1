import mongoose, { Schema, Document, Model } from "mongoose"

export interface IAdminUser extends Document {
  username: string;
  passwordHash: string;
}

const AdminUserSchema = new Schema<IAdminUser>({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
}, { timestamps: true });

const AdminUser: Model<IAdminUser> = mongoose.models.AdminUser || mongoose.model<IAdminUser>("AdminUser", AdminUserSchema);
export default AdminUser;
