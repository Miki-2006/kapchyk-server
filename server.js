const express = require('express')
const app = express()
const cors = require('cors')
const db = require('./db')

app.get('/', (req, res) => {
    res.send('Успешное соединение!')
})

const corsOptions = {
    origin: ['https://kapchyk-client.vercel.app', 'http://localhost:3000'],
    methods: ['PUT', 'POST', 'DELETE', 'GET', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true
}




app.use(cors(corsOptions))
app.use(express.json())
app.options('*', cors(corsOptions))


app.post('/register', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    try {
        const {userName, userSurname, userNumber, userPassword} = req.body;

        const result = await db.collection('users').insertOne({userName, userSurname, userNumber, userPassword, account: 1000})

        res.status(201).json({message: 'Пользователь успешно зарегистрирован:', result})
    } catch (err) {
        console.error('Ошибка при добавлении данных:', err);
        res.status(500).json({ error: 'Ошибка регистрации пользователя' });
    }
})

app.post('/account', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    try {
        const {userNumber} = req.body

        const account = await db.collection('users').findOne({userNumber: userNumber})

        res.status(200).json({message:"Успешно получено счет пользователя:", account})
        res.status(201).json(account)
    } catch (error) {
        console.error('Ошибка при получении счета:', error)
        res.status(500).json('Ошибка при получении счета')
    }
})

app.listen(5000, () => console.log(`Сервер запушен на http://localhost:5000/`))