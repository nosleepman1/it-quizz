
import { useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, Lock, Terminal, ShieldAlert, ArrowRight } from "lucide-react"
import useLogin from "@/hooks/auth/useLogin"
import type { LoginRequest } from "@/types/auth"
import { Spinner } from "@/components/ui/spinner"

const Login = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [focusInput, setFocusInput] = useState<string | null>(null)

    const { handleLogin: login, loading, error } = useLogin()

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const request: LoginRequest = {
            email,
            password
        }
        login(request)
    }

    return (
        <div className="w-full min-h-screen md:min-h-[796px] bg-game-bg text-game-text flex flex-col justify-between p-8 relative overflow-hidden select-none font-sans">
            {/* Background Grid Pattern (Subtle) */}
            <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.03]" 
                 style={{ 
                     backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)', 
                     backgroundSize: '24px 24px' 
                 }} 
            />

            {/* Header */}
            <header className="z-10 text-center pt-8">
                <motion.div
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="flex justify-center items-center gap-2.5 mb-2.5"
                >
                    <div className="w-9 h-9 rounded-lg bg-game-primary/10 border border-game-primary/20 flex items-center justify-center text-game-primary">
                        <Terminal className="w-4 h-4" />
                    </div>
                    <span className="text-lg font-bold tracking-[0.25em] text-game-text uppercase">
                        IT <span className="text-game-primary">QUIZZ</span>
                    </span>
                </motion.div>
                <p className="text-[9px] uppercase font-bold tracking-[0.3em] text-game-muted">
                    Système d'Accréditation
                </p>
            </header>

            {/* Main Form Card */}
            <main className="z-10 my-auto py-6 w-full">
                <motion.div
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="bg-game-card border border-game-border rounded-xl p-6 relative overflow-hidden shadow-md"
                >
                    <div className="text-center mb-6">
                        <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-game-text">Connexion</h2>
                        <div className="h-[1px] w-8 bg-game-primary/40 mx-auto mt-2" />
                    </div>

                    <AnimatePresence mode="wait">
                        {error && (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                className="bg-game-error/5 border border-game-error/15 text-game-error/90 p-3 rounded-xl flex items-start gap-2.5 text-xs mb-5"
                            >
                                <ShieldAlert className="w-4 h-4 mt-0.5 shrink-0 text-game-error" />
                                <span>{error.message || "Erreur de connexion. Veuillez réessayer."}</span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form onSubmit={handleLogin} className="space-y-4">
                        {/* Email Input */}
                        <div className="space-y-1.5">
                            <label className="text-[9px] font-bold uppercase tracking-[0.15em] text-game-muted block pl-0.5">
                                Identifiant / Email
                            </label>
                            <div className="relative">
                                <span className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-200 ${focusInput === 'email' ? 'text-game-primary' : 'text-game-muted/65'}`}>
                                    <Mail className="w-4 h-4" />
                                </span>
                                <input
                                    type="email"
                                    required
                                    placeholder="nom@developpeur.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onFocus={() => setFocusInput('email')}
                                    onBlur={() => setFocusInput(null)}
                                    className={`w-full pl-10 pr-4 py-3 bg-game-input border rounded-xl text-xs text-game-text placeholder-game-muted/30 outline-none transition-all duration-300 ${
                                        focusInput === 'email'
                                            ? 'border-game-primary/45 bg-game-input shadow-sm'
                                            : 'border-game-border'
                                    }`}
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="space-y-1.5">
                            <div className="flex justify-between items-center px-0.5">
                                <label className="text-[9px] font-bold uppercase tracking-[0.15em] text-game-muted">
                                    Mot de Passe
                                </label>
                            </div>
                            <div className="relative">
                                <span className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-200 ${focusInput === 'password' ? 'text-game-primary' : 'text-game-muted/65'}`}>
                                    <Lock className="w-4 h-4" />
                                </span>
                                <input
                                    type="password"
                                    required
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onFocus={() => setFocusInput('password')}
                                    onBlur={() => setFocusInput(null)}
                                    className={`w-full pl-10 pr-4 py-3 bg-game-input border rounded-xl text-xs text-game-text placeholder-game-muted/30 outline-none transition-all duration-300 ${
                                        focusInput === 'password'
                                            ? 'border-game-primary/45 bg-game-input shadow-sm'
                                            : 'border-game-border'
                                    }`}
                                />
                            </div>
                        </div>

                        {/* Login Button */}
                        <motion.button
                            whileHover={{ scale: 1.005 }}
                            whileTap={{ scale: 0.99 }}
                            type="submit"
                            disabled={loading}
                            className="w-full mt-6 py-3.5 bg-game-primary text-game-bg rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-1.5 cursor-pointer transition-all duration-300 disabled:opacity-50 hover:bg-[#DBC19D] shadow-[0_4px_12px_rgba(197,168,128,0.15)]"
                        >
                            {loading ? (
                                <Spinner className="w-4 h-4 text-game-bg" />
                            ) : (
                                <>
                                    Authentifier
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </>
                            )}
                        </motion.button>
                    </form>
                </motion.div>
            </main>

            {/* Footer */}
            <footer className="z-10 text-center pb-6">
                <p className="text-xs text-game-muted">
                    Nouveau dans l'arène ?{" "}
                    <Link to="/register" className="text-game-primary font-bold hover:underline ml-1 transition-colors">
                        Rejoindre l'équipe
                    </Link>
                </p>
            </footer>
        </div>
    )
}

export default Login