'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { createContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'

interface propsContext {
    checkLoginAdmin: () => void
    checkLoginStudent: () => void
}

export const LoginContext = createContext<propsContext>({
    checkLoginAdmin: () => { },
    checkLoginStudent: () => { }

})

export default function LoginProvider({ children }: { children: React.ReactNode }) {
    const API_URL = process.env.API_URL
    const access_token = Cookies.get('access_token')
    const navigation = useRouter()

    const checkLoginAdmin = () => {
        if (access_token) {
            navigation.push('/admin')
        }
    }
    const checkLoginStudent = () => {
        if (access_token) {
            navigation.push('/student')
        }
    }

    return <LoginContext.Provider
        value={{
            checkLoginAdmin, checkLoginStudent
        }}>
        {children}
    </LoginContext.Provider>

}