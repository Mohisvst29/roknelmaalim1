import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            name: "Admin Login",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                // Simple hardcoded check for the "admin" user
                // In a real app, you'd check against a database
                const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com"
                const adminPassword = process.env.ADMIN_PASSWORD || "admin123"

                if (
                    credentials.email === adminEmail &&
                    credentials.password === adminPassword
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
