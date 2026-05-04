"use client"

import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Lock, Mail } from "lucide-react"
import { useState, Suspense } from "react"
import { toast } from "sonner"
import { authenticate } from "@/actions/auth-actions"

function LoginForm() {
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get("callbackUrl") || "/admin"
    const [isLoading, setIsLoading] = useState(false)

    async function handleSubmit(formData: FormData) {
        setIsLoading(true)
        try {
            // Using the server action to handle sign in
            const result = await authenticate(formData)
            if (result?.error) {
                toast.error("بيانات الدخول غير صحيحة")
            }
        } catch (error) {
            toast.error("حدث خطأ أثناء تسجيل الدخول")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card className="w-full max-w-md border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
            <CardHeader className="space-y-1 text-center pb-8 border-b border-gray-100">
                <div className="w-16 h-16 bg-[#0D2240] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg transform rotate-3 hover:rotate-6 transition-transform duration-300">
                    <Lock className="w-8 h-8 text-[#C4D600]" />
                </div>
                <CardTitle className="text-2xl font-bold text-[#0D2240]">لوحة التحكم</CardTitle>
                <CardDescription className="text-gray-500">
                    أدخل بيانات الدخول للوصول إلى لوحة التحكم
                </CardDescription>
            </CardHeader>
            <CardContent className="pt-8">
                <form action={handleSubmit} className="space-y-6">
                    <input type="hidden" name="redirectTo" value={callbackUrl} />
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-[#0D2240] font-medium">البريد الإلكتروني</Label>
                        <div className="relative">
                            <Mail className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="name@example.com"
                                required
                                className="pr-10 h-12 border-gray-200 focus:border-[#C4D600] focus:ring-[#C4D600]/20 transition-all font-sans"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-[#0D2240] font-medium">كلمة المرور</Label>
                        <div className="relative">
                            <Lock className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="pr-10 h-12 border-gray-200 focus:border-[#C4D600] focus:ring-[#C4D600]/20 transition-all font-sans"
                            />
                        </div>
                    </div>
                    <Button
                        className="w-full h-12 bg-[#0D2240] hover:bg-[#1a3a5c] text-white font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "تسجيل الدخول"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#F5F5F7]">
            {/* Background elements */}
            <div className="absolute inset-0 bg-[url('/modern-construction-site.png')] bg-cover bg-center opacity-10" />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0D2240]/90 via-[#0D2240]/50 to-transparent" />

            {/* Animated circles */}
            <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-[#C4D600] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
            <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-[#0D2240] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />

            <div className="relative z-10 w-full px-4 flex justify-center">
                <Suspense fallback={<div>Loading...</div>}>
                    <LoginForm />
                </Suspense>
            </div>
        </div>
    )
}
