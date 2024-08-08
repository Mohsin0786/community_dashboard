const express = require('express')
const { connectDb } = require('./utils/db')

const communityRoutes = require('./routes/communityRoutes');
const cors = require('cors')
const app = express()


app.get('/', (req, res) => {
    res.status(200).json("server running......")
})

app.use(cors());
app.use(express.json());

app.use('/api', communityRoutes)
const PORT = process.env.PORT || 5000
connectDb()
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})