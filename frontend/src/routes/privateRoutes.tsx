import { Spinner } from "@/components/ui/spinner"
import { AuthContext } from "@/context/AuthContext"
import type { AuthContextType } from "@/types/auth"
import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"

const PrivateRoutes = () => {
    const { isAuthenticated, loading } = useContext(AuthContext) as AuthContextType  

    if (loading) return <div className="flex items-center justify-center h-screen"><Spinner /></div>
    
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoutes
