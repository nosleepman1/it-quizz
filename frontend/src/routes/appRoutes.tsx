import { Routes, Route } from "react-router-dom"
import Login from "@/pages/auth/login"
import Register from "@/pages/auth/register"
import PrivateRoutes from "./privateRoutes"

// Gameplay and Lobby screens
import SplashScreen from "@/screens/SplashScreen"
import HomeScreen from "@/screens/HomeScreen"
import ModeDetailScreen from "@/screens/ModeDetailScreen"
import ScopeSelectionScreen from "@/screens/ScopeSelectionScreen"
import GameConfigScreen from "@/screens/GameConfigScreen"
import GameShell from "@/screens/game/GameShell"
import ResultScreen from "@/screens/ResultScreen"
import ExploreScreen from "@/screens/ExploreScreen"
import LeaderboardScreen from "@/screens/LeaderboardScreen"
import ProfileScreen from "@/screens/ProfileScreen"
import SettingsScreen from "@/screens/SettingsScreen"

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<SplashScreen />} />

            {/* Protected gaming routes */}
            <Route element={<PrivateRoutes/>}>
                <Route path="/home" element={<HomeScreen />} />
                <Route path="/modes/:modeId" element={<ModeDetailScreen />} />
                <Route path="/play/scope" element={<ScopeSelectionScreen />} />
                <Route path="/play/config" element={<GameConfigScreen />} />
                <Route path="/play/game" element={<GameShell />} />
                <Route path="/play/result" element={<ResultScreen />} />
                <Route path="/explore" element={<ExploreScreen />} />
                <Route path="/leaderboard" element={<LeaderboardScreen />} />
                <Route path="/profile" element={<ProfileScreen />} />
                <Route path="/settings" element={<SettingsScreen />} />
            </Route>

            {/* Public authentication routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    )
}

export default AppRoutes;

