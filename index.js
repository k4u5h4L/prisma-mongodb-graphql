const app = require("express")();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({ log: ["query"] });

app.get("/", async (req, res) => {
    const posts = await prisma.post.findMany({});

    res.send(posts);
});

app.listen(8000, () => console.log(`Server running on port 8000`));
