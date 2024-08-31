'use client'
import {useEffect, useState} from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import getStripe from '@/utils/get-stripe'
import {Button, CircularProgress, Typography, Box, Container} from '@mui/material'
import Header from "@/app/components/header";
import Footer from "@/app/components/footer"

const ResultPage = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const session_id = searchParams.get('session_id')

    const [loading, setLoading] = useState(true)
    const [session, setSession] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchCheckoutSession = async () => {
            if (!session_id) return

            try {
                const res = await fetch(`/api/checkout_session?session_id=${session_id}`)
                const sessionData = await res.json()
                if (res.ok) {
                    setSession(sessionData)
                } else {
                    setError(sessionData.error)
                }
            } catch (err) {
                setError('An error occurred')
            } finally {
                setLoading(false)
            }
        }
        fetchCheckoutSession()
    }, [session_id])

    if (loading) {
        return (
            <Container 
             maxWidth="false"
             sx={{
                bgcolor: "#020303",
                height: "100vh",
                textAlign: 'center',
             }}
            >
                <CircularProgress/> 
                <Typography variant="h6" sx={{ color: "#fff"}}>Loading...</Typography>
            </Container>
        )
    }

    if (error) {
        return (
            <Container 
             maxWidth="false"
             sx={{
                bgcolor: "#020303",
                height: "100vh",
             }}
            >
                <Header/ >
                <Typography variant="h6" sx={{ color: "#fff"}}>{error}</Typography>
                <Footer/ >                      
            </Container>
        )
    }

    return (
        <Container
         maxWidth="false"
         sx={{
            bgcolor: "#020303",
            height: "100vh",
         }}
        >
            <Header/ >
            {
                session.payment_status === "paid" ? (
                    <>
                        <Typography variant = 'h4'>Thank you for purchasing</Typography>
                        <Box sx={{mt:22}}>
                            <Typography variant="h6" sx={{ color: "#fff", textAlign: 'center'}}>Session ID: {session_id}</Typography>
                            <Typography variant="body1" sx={{ color: "#fff", textAlign: 'center'}}>
                                We have received your payment. You will receive an email with the 
                                order details shortly.
                            </Typography>
                        </Box>
                    </>
                ) : (
                    <>
                        <Typography variant = 'h4' sx={{ color: "#fff", textAlign: 'center'}}>Payment Failed</Typography>
                        <Box sx={{mt:22}}>
                            <Typography variant="body1" sx={{ color: "#fff", textAlign: 'center'}}>
                                Your payment was not successful. Please try again.
                            </Typography>
                        </Box>
                    </>
                )
            }    
            <Footer/ >      
        </Container>
    )
}

export default ResultPage;