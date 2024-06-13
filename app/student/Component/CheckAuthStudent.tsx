'use client'
import React, { useContext, useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { AuthStudentContext } from './StudentContext'

const CheckAuth = () => {
    const auth = useContext(AuthStudentContext)
    useEffect(() => {
        auth.checkAuth()
    }, [])

    return null
}

export default CheckAuth