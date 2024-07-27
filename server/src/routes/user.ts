import { PrismaClient } from "@prisma/client";
import { Request, Response, Router } from "express";
import { withAccelerate } from "@prisma/extension-accelerate";

export const userRouter = Router();

userRouter.post("/signup", async (req: Request, res: Response) => {
  const username = req.body.json();
  const password = req.body.json();
  const email = req.body.json();
  const name = req.body.json();

  const prisma = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const newUser = await prisma.user.create({
      data: {
        username: username,
        password: password,
        email: email,
        name: name,
      },
    });

    return res.json({
      message: "Signed up",
      newUser,
    });
  } catch (error) {
    return res.status(403).json({
      message: "Error while signing up",
    });
  }
});

userRouter.post("/signin", async (req: Request, res: Response) => {
  const { username, password } = req.body.json();

  const prisma = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const user = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });

    if (!user) {
      return res.status(403).json({
        message: "User not found",
      });
    }

    return res.json({
      message: "User signed in successfully",
      username: user?.username,
    });
  } catch (error) {
    return res.status(403).json({
      message: "Error while logging in",
    });
  }
});
