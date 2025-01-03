import API from "@/api/api"
import axios from "axios"
import type { LoginError, LoginRequest, LoginResponse } from "@/types/auth"


export const LOGIN = async (request: LoginRequest): Promise<LoginResponse | LoginError> => {
    try {
        const response = await API.post<LoginResponse>("/login", request)
        return response.data

    } catch (error) {
        if (axios.isAxiosError<LoginError>(error) && error.response?.data) { 
            return error.response.data;
        }
        return { success: false, message: "Une erreur inconnue est survenue lors de la connexion." } as LoginError;
    }
}
