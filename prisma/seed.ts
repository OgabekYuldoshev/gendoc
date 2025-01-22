import hash from "@/lib/hash";
import { prisma } from "@/lib/prisma";
import { loadEnvConfig } from "@next/env";

const projectDir = process.cwd()

loadEnvConfig(projectDir);


(async () => {
    try {
        const username = process.env.DEFAULT_USERNAME || 'admin'
        const password = await hash.passwordHash(process.env.DEFAULT_PASSWORD || "admin1234")

        const user = await prisma.user.findUnique({
            where: {
                username
            }
        })

        if (user) {
            console.log("User already exists")
            return;
        }

        const defaultUser = await prisma.user.create({
            data: {
                name: "Admin",
                username,
                password,
            }
        })

        console.log(defaultUser)
    } catch (error) {
        console.error(error)
        process.exit(-1)
    }
})()