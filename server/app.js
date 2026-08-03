import express from "express"
import cors from "cors"; // Allows you to perform a fetch request from a different port.

const app = express();

app.use(cors()); // Allows frontend requests from different port numbers
app.use(express.json()); // 'Parses incoming JSON request bodies'

app.get("/", (req, res) => {
    // res.send("Hello world!");
    res.json({
        message: "Fetch Request Successful!"
    })
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