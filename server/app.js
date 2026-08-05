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