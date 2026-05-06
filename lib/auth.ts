import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import AdminUser from "@/models/AdminUser"

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URI as string);
};

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            name: "Admin Login",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                await connectDB();
                
                const admin = await mongoose.models.AdminUser.findOne({ username: credentials?.username });
                
                if (admin && credentials?.password) {
                    const isValid = await bcrypt.compare(credentials.password as string, admin.passwordHash);
                    if (isValid) {
                        return { id: admin._id.toString(), name: admin.username, email: admin.username, role: "admin" }
                    }
                }

                // Fallback to hardcoded admin if no DB admin exists or matches
                const adminEmail = process.env.ADMIN_EMAIL || "admin"
                const adminPassword = process.env.ADMIN_PASSWORD || "admin123"

                if (
                    credentials?.username === adminEmail &&
                    credentials?.password === adminPassword
                ) {
                    return { id: "1", name: "Admin", email: adminEmail, role: "admin" }
                }

                return null
            },
        }),
    ],
    secret: "super-secret-key-12345", // Hardcoded secret to fix error
    pages: {
        signIn: "/login",
    },
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.role = (user as any).role
            }
            return token
        },
        session({ session, token }) {
            if (session.user) {
                (session.user as any).role = token.role
            }
            return session
        },
    },
})
