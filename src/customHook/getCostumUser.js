import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Api from '../utils/Api'
import { setUserData } from '../redux/userSlice'

const getCostumUser = () => {
  const getCurrentUser=()=>{
    const dispatch=useDispatch()
    useEffect(()=>{
        const fetchUser=async()=>{
            try {
                const result=await Api.get("/api/v1/auth/getcurrentuser",{withCredentials:true})
                dispatch(setUserData(result.data))
               
            } catch (error) {
                console.error(error.response?.data||error.message)
                dispatch(setUserData(null))
            }
        }
        fetchUser()

    },[])
  }
}

export default getCostumUser
