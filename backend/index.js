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

const imageStorage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'classificar/')
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+path.extname(file.originalname))
    }

})

const imageUpload = multer({
    storage:imageStorage,
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(png|jpg)$/)) { 
            return cb(new Error('Por favor envie apenas JPG ou PNG !!!'))
        }
        cb(undefined,true) 
    }
})

app.post('/analyze-image',imageUpload.single('image'),(req,res)=>{
    if(!req.file){
        return res.status(400).json({ error: 'Imagem não fornecida , por favor verifique !!!' })
    }

    const imagePath = path.resolve(req.file.path)
    console.log(`image path : ${imagePath}`)
    
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
        // try {
        //     const parsedOutput = JSON.parse(pythonOutput.trim());
        //     res.status(200).json(parsedOutput);
        // } catch (err) {
        //     console.error(`Erro ao analisar a saída do Python: ${err}`);
        //     res.status(500).json({ error: 'Erro ao processar a saída do script Python' });
        // }
        // const parseJson = JSON.parse(pythonOutput.trim())
        
        const parseJson = JSON.parse(pythonOutput)
        res.status(200).json(parseJson)
    })
})

app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_UNEXPECTED_FILE') {
            return res.status(400).json({ error: 'Você enviou múltiplos arquivos, mas apenas um é permitido.' })
        }
        return res.status(400).json({ error: `Erro de upload: ${err.message}` })
    }
    console.error(`Erro: ${err.message}`)
    const status = err.status || 500
    res.status(status).json({ message: err.message || 'Erro interno no servidor.' })
})

app.listen(process.env.PORT,()=>{
    console.log(`Servidor rodando na porta : ${process.env.PORT} na url ${process.env.URL_API}`)
})
