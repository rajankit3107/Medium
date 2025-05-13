import { Hono } from "hono";
import { PrismaClient } from '../generated/prisma/edge'
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@anxit/medium-common";

export const blogRouter = new Hono<{
    Bindings : {
        DATABASE_URL : string,
        JWT_SECRET : string,
    },
    Variables : {
      userId : string,
    }
}>()

  blogRouter.use("/*", async (c, next) => {
    const autheader = c.req.header("authorization") || "";
    let user: { id: string } | undefined;
    try {
      user = await verify(autheader, c.env.JWT_SECRET) as { id: string };
      if(user) {
        c.set("userId", user.id);
        await next();
      } else {
        c.status(403);
        return c.json({
          message: "You are not logged in"
        });
      }
    } catch (error) {
      c.status(403);
      return c.json({
        message: "You are not logged in"
      });
    }
  });

  blogRouter.post('/', async (c) => {
    const body = await c.req.json()
    const {success} = createBlogInput.safeParse(body)

    if(!success) {
      c.status(411)
      return c.json({
        message : "Inputs are not correct"
      })
    }

    const authorId = c.get("userId")
    const prisma = new PrismaClient({
      datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blog = await prisma.blog.create({
      data : {
        title : body.title,
        content : body.content,
        authorId : Number(authorId)
      }
    })
    return c.json({
      id : blog.id 
    })
  })


  blogRouter.put('/', async(c) => {
    const body = await c.req.json(); //here we are getting the body which contains the id of the blog
    const { success } = updateBlogInput.safeParse(body)

    if(!success) {
      c.status(411)
      return c.json({
        message : "Inputs are not correct"
      }) 
    }
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    
    try {
      const blog = await prisma.blog.update({
        where : {
          id : body.id
        },
        data : {
          title : body.title,
          content : body.content
        },
      })
      return c.json({
        id: blog.id
      })
    } catch (error) {
      c.status(411)
      return c.json({
        message : "Error while feetching blog post"
      })
      
    }

    //return c.text('Hello Hono2!')
  })
  

      //Todo - Add Pagination
      blogRouter.get('/bulk', async (c) => {
        const prisma = new PrismaClient({
          datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())
    
        try {
          const blogs = await prisma.blog.findMany({
            select : {
              content : true,
              title : true,
              id : true,
              author : {
                select : {
                  name : true,
              }
            }
          }
          })
    
        return c.json({
          blogs
        })
        } catch (error) {
          c.status(411);
          return c.json({
            message: "Error while fetching blogs"
          });
        }
        
      })
  
  blogRouter.get('/:id', async(c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    
    try {
      const blog = await prisma.blog.findFirst({
        where: {
          id: Number(id)
        },
        select : {
          id : true,
          title : true,
          content : true,
          author : {
            select : {
              name : true
            }
          }
        }
      })
      return c.json({
        blog
      })    
    } catch (error) {
      c.status(411);
      return c.json({
        message: "Error while fetching blog post"
      });
    }
  })

  
  