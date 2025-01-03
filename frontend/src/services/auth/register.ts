import API from "@/api/api"
import type { RegisterError, RegisterRequest, RegisterResponse } from "@/types/auth"
import axios from "axios"


export const REGISTER = async (request: RegisterRequest) => {
    try {
        const response = await API.post<RegisterResponse>("/register", request)
        return response.data
    } catch (error) {
        if (axios.isAxiosError<RegisterError>(error) && error.response?.data) { 
            return error.response.data;
        }
        return { success: false, message: "Une erreur inconnue est survenue lors de l'inscription." } as RegisterResponse;
    }
}