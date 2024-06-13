'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { createContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'

interface propsContext {
    checkAuth: () => Promise<void>
}

export const AuthStudentContext = createContext<propsContext>({
    checkAuth: async () => { }
})

export default function AuthStudentProvider({ children }: { children: React.ReactNode }) {
    const API_URL = process.env.API_URL
    const access_token = Cookies.get('access_token')
    const navigation = useRouter()
    const checkAuth = async () => {
        try {
            const response = await axios.get(`${API_URL}/siswa/biodata`, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })


            if (response.data.status == false) {
                Cookies.remove('access_token')
                Cookies.remove('authName')
                Cookies.remove('level')
                navigation.push('/login')
            }

        } catch (error) {
            Cookies.remove('access_token')
            Cookies.remove('authName')
            Cookies.remove('level')
            navigation.push('/login')
        }
    }

    return <AuthStudentContext.Provider
        value={{
            checkAuth
        }}>
        {children}
    </AuthStudentContext.Provider>

}