const { readFileSync, writeFileSync, truncateSync } = require('fs')
exports.registerUser = async function registerUser(req, res) {
    const user = req.body
    console.log('Данные, которые пришли в постман', user)
    const users = JSON.parse(readFileSync('db-users.json', 'utf-8'))
    console.log('Пользователи .json-файла', users)

    const userExists = users.find(oneUser => oneUser.email === user.email)
    console.log(userExists)
    if (userExists) {
        return res.status(400).json('Пользователь уже зарегистрирован')
    }
    users.unshift(user)

    truncateSync('db-users.json')
    writeFileSync('db-users.json', JSON.stringify(users))
    res.status(200).json('user added')
}

exports.login = async function login(req, res) {
    const user = req.body
    console.log('Данные, которые пришли в постман', user)
    const users = JSON.parse(readFileSync('db-users.json', 'utf-8'))
    console.log('Пользователи .json-файла', users)

    const userExists = users.find(oneUser => oneUser.email === user.email)
    console.log(userExists)
    if (userExists) {
        return res.status(201).json('Введите логин')
    }
    
    res.status(400).json("Вам необходимо пройти регистрацию")

}

exports.unregister = async function unregister(req, res) {
    
    let users = JSON.parse(readFileSync('db-users.json', 'utf-8'))
    console.log('Пользователи .json-файла', users)

    let userExists = users.find(oneUser => oneUser.email === req.params.email)
    console.log(userExists)

        if (!userExists) {
        return res.status(400).json('Вы пытаетесь удалить несуществующего пользователя')
    }
    users = users.filter(oneUser => oneUser.email !== req.params.email)
    res.status(201).json('User was deleted')
    console.log(users)
   
}
