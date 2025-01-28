import { SignInButton, SignUpButton } from "@clerk/nextjs"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"

export default function Unauthnticated () {
    return (
      <Card className='sticky'>
  
          <CardHeader>
             <CardTitle className='text-xl text-center font-semibold'>Welcome Back!</CardTitle> 
          </CardHeader>
  
          <CardContent>
  
              <p className='text-muted-foreground text-center mb-4'>
                  Login to access your profile and connect with others
              </p>
  
              <SignInButton mode="modal">
            <Button variant="outline" className='w-full'>Sign In</Button>
              </SignInButton>
  
              <SignUpButton mode='modal'>
                  <Button variant="default" className='w-full mt-2'>
                      Sign Up
                  </Button>
              </SignUpButton>
  
          </CardContent>
      </Card>
    )
  }