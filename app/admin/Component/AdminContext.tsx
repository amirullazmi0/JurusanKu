'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { createContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'

interface propsContext {
    checkAuth: () => Promise<void>
}

export const AuthAdminContext = createContext<propsContext>({
    checkAuth: async () => { }
})

export default function AuthAdminProvider({ children }: { children: React.ReactNode }) {
    const API_URL = process.env.API_URL
    const access_token = Cookies.get('access_token')
    const navigation = useRouter()
    const checkAuth = async () => {
        try {
            const response = await axios.get(`${API_URL}/admin/rekomendasi`, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })


            if (response.data.status == false) {
                Cookies.remove('access_token')
                Cookies.remove('authName')
                Cookies.remove('level')
                navigation.push('/login/admin')
            }

        } catch (error) {
            Cookies.remove('access_token')
            Cookies.remove('authName')
            Cookies.remove('level')
            navigation.push('/login/admin')
        }
    }

    return <AuthAdminContext.Provider
        value={{
            checkAuth
        }}>
        {children}
    </AuthAdminContext.Provider>

}