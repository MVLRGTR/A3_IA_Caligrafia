const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { spawn } = require('child_process')
const fs = require('fs')
const path = require('path')
const multer = require('multer')

const app = express()
app.use(express.json())
app.use(cors({Credential:true,origin: process.env.URL_FRONTEND}))

const upload = multer({dest : 'classificar/'})

app.post('/analyze-image',upload.single('image'),(req,res)=>{
    if(!req.file){
        return res.status(400).json({ error: 'Imagem não fornecida' })
    }

    const imagePath = path.resolve(req.file.path)

    // const pythonProcess = spawn('python3', ['index.py', imagePath])
    const pythonPath = path.join(__dirname, 'venv', 'Scripts', 'python.exe')
    const pythonProcess = spawn(pythonPath, ['index.py', imagePath])


    let pythonOutput = ''
    pythonProcess.stdout.on('data', (data) => {
        pythonOutput += data.toString()
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`Erro: ${data}`)
    });

    pythonProcess.on('close', (code) => {
        fs.unlink(imagePath, (err) => {
            if (err) console.error(`Erro ao remover arquivo: ${err}`)
        });

        if (code !== 0) {
            return res.status(500).json({ error: 'Erro ao executar o script Python' })
        }
        res.json({ result: pythonOutput.trim() })
    })
})

app.listen(process.env.PORT,()=>{
    console.log(`Servidor rodando na porta : ${process.env.PORT} na url ${process.env.URL_API}`)
})
