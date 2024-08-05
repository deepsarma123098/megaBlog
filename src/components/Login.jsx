import React, {useState} from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { Button , Input, Logo } from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'


function Login() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")

    const login = async(data)=> {

      // console.log(data); //Check

        setError("") 
        // 20:40 listen very important, All login and register form should be made inthis concept, i.e. it state that when logged in all the errors must have cleaned

        try {
           const session = await authService.logIn(data)
           if(session){
            const userData = await authService.getCurrentUser()
             if(userData) dispatch(authLogin(userData))
             navigate("/")
           }
        } catch (error) {
            setError(error.message)
        }

    }

  return (
    <div
    className='flex items-center justify-center w-full'
    >
      <div 
      className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >

      
      <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
        </div>

        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>

           <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p> 
        {error &&  <p className="text-red-600 mt-8 text-center">{error}</p>}

{/* handleSubmit=> Whenever the form is submited then handleSubmit is only used. It is a method where we pass our own method which defines how our form is handled. handleSubmint()is an event that gets called. This event is important because the input fields we pass to register, the state for those fileds are managed automatically i.e. the vales are picked automatically during handleSubmit*/}

        <form onSubmit={handleSubmit(login)} className='mt-8'>
          <div className="space-y-5">
            <Input
            label= 'Email: '
            placeholder= "Enter your email"
            type= "email"
            {...register("email", {
              required: true,
              validate:{
                matchPatern:(value)=> /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(value) || "Email address must be a valid address",
                }
            })}
            
            />

            <Input 
             label= "Password: "
             placeholder="Enter your password"
             type="password"
             {...register("password", { 
              required: true,
              minLength: 5,
              message: "Passowrd should be minimum 5 characters long"
             })}
            />

{/* ..register is compulsory when we use useForm(). If we don't use ... then if we use register in some different Input element or other element then the value of that fileds will be overridden by register value */}

            <Button
             type='submit'
             className='w-full'
            >
              Sign In
            </Button>

          </div>
        </form>

      </div>
    </div>
  )
}

export default Login
