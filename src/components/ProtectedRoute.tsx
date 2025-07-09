'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { validateTOken } from '@/services/auth-verificationService'
import toast from 'react-hot-toast'
import { useLoaderStore } from '@/lib/store/useLoaderStore'

interface ProtectedRouteProps {
    children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const setLoading = useLoaderStore.getState().setLoading;
    const router = useRouter()
    //const [loading, setLoading] = useState(true)

    useEffect(() => {
        const checkAuth = async () => {
            setLoading(true);
            const token = localStorage.getItem('access_token')
            if (!token) {
                router.replace('/login')
                return
            }

            try {
                const data = await validateTOken()
                if (data.status == 200) {
                    if(!data.data.is_valid){
                        router.replace('/login')
                        return;
                    }
                } else {
                    toast.error('Not able to send OTP');
                }
            } catch (error: any) {
                const message = error.response?.data?.message || error.message || 'Not able to send OTP'
                toast.error(message)
            } finally {
                setLoading(false);
            }
        }

        checkAuth()
    }, [router])

    // if (loading) {
    //     return <div>Loading...</div>
    // }

    return <>{children}</>
}
