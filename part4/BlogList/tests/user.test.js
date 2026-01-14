// test file for api routes

const app = require("../app")
const supertest = require("supertest")
const assert = require("assert")
const {test, beforeEach, after, describe} = require("node:test")
const User = require("../model/user")
const mongoose = require("mongoose")
const helper = require("./test_helper")

const api = supertest(app)


beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(helper.initialUsers)
})
    

test("Correct number of users returned & in json format", async () => {
    const usersInDB = await api.get("/api/users")
                            .expect(200)
                            .expect('Content-Type', /application\/json/)
    
    assert.strictEqual(usersInDB.body.length, helper.initialUsers.length)
})

describe("Testing input validation", () => {

    test("usernames are unique", async () =>{
        const newUser = {
            "name": "Me",
            "username": "Tester1",
            "password": "testtest1"
        }

        const result = await api.post("/api/users")
                            .send(newUser)
                            .expect(400)
                            .expect('Content-Type', /application\/json/)

        assert(result.body.error.includes("unique"))
    })

    test("usernames are longer than 3 characters", async () => {
        const userFound = await helper.getUsersFromDB()
        const users = userFound.map(user => user.username)
        users.forEach(name => assert(!name.length < 3))
    })

    test("invalid user (username too short) not added to DB + status code + error message", async () =>{
        const newUser = {
            "name": "Me",
            "username": "T",
            "password": "testtest1"
        }

        const result = await api.post("/api/users")
                            .send(newUser)
                            .expect(400)
                            .expect('Content-Type', /application\/json/)

        assert(result.body.error.includes("shorter than the minimum allowed length"))

        const users = await helper.getUsersFromDB()
        assert.strictEqual(users.length, helper.initialUsers.length)
    })

    test("invalid user (password too short) not added to DB + status code + error message", async () =>{
        const newUser = {
            "name": "Me",
            "username": "Tester1",
            "password": "t"
        }

        const result = await api.post("/api/users")
                            .send(newUser)
                            .expect(400)
                            .expect('Content-Type', /application\/json/)

        assert(result.body.error.includes("password not long enough"))

        const users = await helper.getUsersFromDB()
        assert.strictEqual(users.length, helper.initialUsers.length)
    })
})


after( async () => {
    await mongoose.connection.close()
})

// npm test -- --test-only
// running test with specific name/includes specific name
// npm test -- --test-name-pattern="a specific note is within the returned notes"
