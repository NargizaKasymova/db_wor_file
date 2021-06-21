const express = require('express')
const app = express()
const PORT = 5050
app.use(express.json())
const { existsSync, writeFileSync } = require('fs')


const { hasUserFile, registerUser, login, unregister } = require('./register')
app.post('/register', registerUser )
app.post('/login', login)
app.delete('/unregister/:email', unregister )



app.listen(PORT, function() {

    if (!existsSync('db-users.json')) {
        writeFileSync('db-users.json', JSON.stringify([]))
        console.log('Файл успешно создан')
} else {
    console.log('File was found')
}

    console.log('Backend has been started ' + PORT)
})
