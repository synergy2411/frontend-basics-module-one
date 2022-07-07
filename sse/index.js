const express = require('express')
const cors = require("cors");

const app = express()
app.use(cors());
app.use(express.static('public'))

app.get('/stocks', function (req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    })
    countdown(res, 101)
})

function countdown(res, count) {
    res.write("data: " + count + "\n\n")
    const rnd = Math.round(Math.random() * 10) + 1
    if (rnd > 5)
        setTimeout(() => countdown(res, (count + rnd)), rnd*1000)
    else
        setTimeout(() => countdown(res, (count - rnd)), (rnd/2)*1000)
}

app.listen(3000, () => console.log('SSE app listening on port 3000!'))

