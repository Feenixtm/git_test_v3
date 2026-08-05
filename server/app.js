import express from "express"
import cors from "cors"; // Allows you to perform a fetch request from a different port.

// Importing Prisma FROM /lib/prisma.js
import { prisma } from "./lib/prisma.js"

// -------------------------------

const app = express();

app.use(cors()); // Allows frontend requests from different port numbers
app.use(express.json()); // 'Parses incoming JSON request bodies'


app.get("/",  (req, res) => {
    // res.send("Hello world!");
    res.json({
        message: "Fetch Request Successful!"
    })
});

app.get("/specific-blog", async (req, res) => {
    try {
        const specificId = 2;
        const specificUser = await prisma.post.findUnique({
            where: {
                id: specificId
            }
        });

        if (!specificUser) {
            res.json({ message: `Error. User with id of ${ specificId } does not exist...`})
        }

        res.json(specificUser);
    } catch (error) {
        res.status(400).json({ error: `Database retrieval process failed...`})
    }
})

// Need to turn function to async when using prisma
// TESTING
app.get("/all-users", async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        // const users = { message: "Here are all the users..."}
        res.json(users);
    } catch (error) {
        res.status(400).json({error: `Database retrieval process failed...`})
    }
});

app.get("/all-blogs", async(req, res) => {
    try {
        const allBlogs = await prisma.post.findMany();
        res.json(allBlogs);
    } catch (error) {
        res.status(400).json({ error: `Database retrieval process failed...`})
    }
})

app.get("/blogs/:id", async (req, res) => {
    try {
        // REQ.PARAMS.ID IS ALWAYS A STRING
        const postId = req.params.id;

        const post = await prisma.post.findUnique({
            where: {
                id: Number(postId)
            }
        })
    
        if (!post) {
            return res.status(404).json({ error: "Could not retrieve post. Post doesn't exist"});
        }

        res.json(post);
        console.log(post);
    } catch (error) {
        res.status(400).json({ error: `Post retrieval process failed...`})
    }    
})

app.post("/sign-up", (req, res) => {
    const { username, password } = req.body;

    res.status(201).json({
        message: "Sign-up submission received",
        receviedData: { username, password }
    })
})

const PORT = 5050;

app.listen(PORT, () => {
    console.log("Listening to PORT: " + PORT);
});