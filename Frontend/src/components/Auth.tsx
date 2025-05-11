import type { SignupInput } from '@anxit/medium-common'
import { useState, type ChangeEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BACKEND_URL } from '../config'

export const Auth = ({type} : {type: "signup" | "signin"}) => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name : "",
        username : "",
        password : ""

    })

    async function sendRequest() {
        try {
           const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs)
            const jwt = response.data as string; //we expect response.data to be a string
            localStorage.setItem("token", jwt)
            navigate("/blogs")

        } catch (error) {
            //alert the user that the request failed
            alert("Error while signing up!")
        }
    }

    return(
        <div className='h-screen flex justify-center flex-col bg-teal-50'>
            
            <div className='flex justify-center'>
                <div>
                    <div className='px-10'>
                        <div className='text-3xl font-extrabold'>
                            Create an account
                        </div>
                        <div className='text-slate-400'>
                            {type === "signin" ? "Don't have an account" : "Already have an account?"}
                            <Link className='pl-2 underline' to={type === "signin" ? "/signup" : "/signin"}>
                                {type ==="signin" ? "Sign up" : "Sign in"}
                            </Link>
                        </div>
                    </div>
                        <div className='flex flex-col pt-8'>
                            {type === "signup" ? <LabelledInput label = "Name" placeholder='Ankit...' onChange={(e) => {
                                setPostInputs({
                                    ...postInputs, //give me all existing keys
                                    name : e.target.value // and override name
                                })
                            }} /> : null }
                            <LabelledInput label = "Username" placeholder='anxit@gmail.com' onChange={(e) => {
                                setPostInputs({
                                    ...postInputs, //give me all existing keys
                                    username : e.target.value // and override name
                                })
                            }} />
                            <LabelledInput label="Password" type={"password"}  placeholder='123456' onChange={(e) => {
                                setPostInputs({
                                    ...postInputs, //give me all existing keys
                                    password : e.target.value // and override name
                                })
                            }} />

                            <button onClick={sendRequest} type="button" className="w-full mt-8 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 ">{type === "signup" ?  "Sign up" : "Sign in"}</button>

                        </div>
                </div>
            </div>
        </div>
    )
}

interface LabelledInputType {
    label : string
    placeholder: string
    onChange: (e : ChangeEvent<HTMLInputElement>) => void
    type ? : string
}

function LabelledInput({label, placeholder, onChange, type} : LabelledInputType) {
    return(
        <div>
            <label className="block mb-2 text-sm font-semibold text-black pt-4 ">{label}</label>
            <input onChange={onChange} type={type} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
        </div>
    )
}