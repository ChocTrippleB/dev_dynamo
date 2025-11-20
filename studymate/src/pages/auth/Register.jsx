import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Input, Card, CardBody } from '@heroui/react'

const Register = () => {
  return (
    <div className="min-h-screen bg-[#111] flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-[#1a1a1a]">
        <CardBody className="p-8">
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-gray-400 mb-8">Sign up to get started with StudyMate</p>

          <form className="space-y-4">
            <Input
              type="text"
              label="Full Name"
              placeholder="Enter your name"
              variant="bordered"
              classNames={{
                input: "text-white",
                label: "text-gray-400"
              }}
            />

            <Input
              type="email"
              label="Email"
              placeholder="Enter your email"
              variant="bordered"
              classNames={{
                input: "text-white",
                label: "text-gray-400"
              }}
            />

            <Input
              type="password"
              label="Password"
              placeholder="Create a password"
              variant="bordered"
              classNames={{
                input: "text-white",
                label: "text-gray-400"
              }}
            />

            <Button
              type="submit"
              className="w-full bg-[#333] hover:bg-[#444] text-white"
              size="lg"
            >
              Sign Up
            </Button>
          </form>

          <p className="text-center text-gray-400 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-white hover:underline">
              Sign in
            </Link>
          </p>
        </CardBody>
      </Card>
    </div>
  )
}

export default Register