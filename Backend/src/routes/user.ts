import { Hono } from "hono";
//import { PrismaClient } from "../generated/prisma";
import { PrismaClient } from '../generated/prisma/edge'
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from 'hono/jwt'
import z from "zod"
import { signupInput, signinInput } from '@anxit/medium-common'

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL : string,
        JWT_SECRET : string
    }
}>();

userRouter.post('/signup', async (c) => {
    const body = await c.req.json(); // body is a json object which stores the data like name, username and password
    const { success } = signupInput.safeParse(body);
    if(!success) {
      c.status(411)
      return c.json({
        message: "Inputs not correct"
      })
    }
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,  
    }).$extends(withAccelerate())
  
    //add zod and hash the password
    try {
     const user = await prisma.user.create({
        data:{
          username : body.username,
          password  :body.password,
          name : body.name
    
        }
      })
      const jwt = await sign ({
        id : user.id
      },c.env.JWT_SECRET)
      return c.text(jwt)
    } catch (error) {
      console.log(error)
      c.status(411);
      return c.text('User Already exists')
    }
  })
  
  userRouter.post('/signin', async(c) => {
    const body = await c.req.json();
    const { success } = signinInput.safeParse(body);

    if(!success) {
      c.status(411);
      return c.json({
        message : "Inputs not correct"
      })
    }
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,  
    }).$extends(withAccelerate())
  
    //add zod and hash the password
    try {
     const user = await prisma.user.findFirst({
        where:{
          username : body.username,
          password  :body.password
        }
      })
      if(!user) {
        c.status(403)
        return c.json({
          message : "Incorrect creds"
        })
      }
      const jwt = await sign ({
        id : user.id
      },c.env.JWT_SECRET)
      return c.text(jwt)
    } catch (error) {
      //console.log(error)
      c.status(411);
      return c.text('User Already exists')
    }
  })
  