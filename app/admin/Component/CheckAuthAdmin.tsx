'use client'
import React, { useContext, useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { AuthAdminContext } from './AdminContext'

const CheckAuthAdmin = () => {
    const auth = useContext(AuthAdminContext)
    useEffect(() => {
        auth.checkAuth()
    }, [])

    return null
}

export default CheckAuthAdmin