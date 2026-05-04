import mongoose, { Schema, Document, Model } from "mongoose"

export interface ITeamMember extends Document {
  name: string;
  jobTitle: string;
  shortText: string;
  image: string;
}

const TeamMemberSchema = new Schema<ITeamMember>({
  name: { type: String, required: true },
  jobTitle: { type: String, required: true },
  shortText: { type: String, required: true },
  image: { type: String, required: true },
}, { timestamps: true });

const TeamMember: Model<ITeamMember> = mongoose.models.TeamMember || mongoose.model<ITeamMember>("TeamMember", TeamMemberSchema);
export default TeamMember;
