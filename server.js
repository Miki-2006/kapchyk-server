const express = require('express')
const app = express()
const cors = require('cors')
const { MongoClient } = require('mongodb')

app.get('/', (req, res) => {
    res.send('Успешное соединение!')
})

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['PUT', 'POST', 'DELETE', 'GET', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true
}


const mongodbURI = 'mongodb+srv://rys5ek0v111:Miki-2006@users.itj4l.mongodb.net/?retryWrites=true&w=majority&appName=Users'
const client = new MongoClient(mongodbURI)
client.connect()
.then(() => {console.log("MongoDB подключен!"), db = client.db('test')})
.catch(error => console.error('Ошибка при подключении к MongoDB:', error))

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
        // res.status(201).json(account)
    } catch (error) {
        console.error('Ошибка при получении счета:', error)
        res.status(500).json('Ошибка при получении счета')
    }
})

app.listen(5000, () => console.log(`Сервер запушен на http://localhost:5000/`))