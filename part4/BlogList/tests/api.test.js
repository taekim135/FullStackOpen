// test file for api routes

const app = require("../app")
const supertest = require("supertest")
const assert = require("assert")
const {test, beforeEach, beforeAll, after, describe} = require("node:test")
const Blog = require("../model/blog")
const mongoose = require("mongoose")
const helper = require("./test_helper")

const api = supertest(app)

const userSample = {
    "username": process.env.TEST_USER,
    "password": process.env.TEST_PW
}
let loggedUserToken;

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
    loggedUserToken = await api.post("/api/login").send(userSample)
    
})

test("Correct number of blogs returned & in json format", async () => {
    await api
        .get("/api/blogs")
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const result = await api.get("/api/blogs")
   
    assert.strictEqual(result.body.length, helper.initialBlogs.length)
})

test("_id is formatted correctly to id", async () =>{
    const result = await api.get("/api/blogs")
    const blog = result.body[0]
    
    assert(blog.id !== undefined)
    assert(blog._id === undefined)
})

describe("Testing Login Features", () => {
    test("Successful Login creates token for the user", async () => {

        // const User = await api.post("/api/login")
        //                     .send(userSample)
        //                     .expect(200)
        //                     .expect('Content-Type', /application\/json/)

        assert.ok(loggedUserToken.body.token)
    })  

    test("Unauthorised login by incorrect username or pw", async () => {
        const loginSample = {
            "username": "IncorrectID",
            "password": "IncorrectPW"
        }

        const User = await api.post("/api/login")
                            .send(loginSample)
                            .expect(401)
                            .expect('Content-Type', /application\/json/)
    })
})


describe("Testing post method", () => {
    test("New blog post created, total +1, content correctly saved to db ", async () =>{
    
        const newPost = {
            "title": "Post Method Sample Data",
            "author": "John Doe",
            "url": "www.testing.com",
            "likes": 6,
            "user": {
                "username": "Tester1",
                "name": "Me",
                "id": "6967021af48550d27d84c679"
            }
        }

        const result = await api
                        .post("/api/blogs")
                        .set("Authorization", `Bearer ${loggedUserToken.body.token}`)
                        .send(newPost)
                        .expect(201)
                        .expect('Content-Type', /application\/json/)

        // total size of blogs after posting
        const dataAfterAdding = await helper.getDataFromDB()
        assert.strictEqual(dataAfterAdding.length, helper.initialBlogs.length + 1)

        // correct data saved
        const data = dataAfterAdding.map(blog => blog.title)
        assert(data.includes("Post Method Sample Data"))
    })

    test("Posting a new blog with likes field missing should auto set to 0", async () =>{

        const newPost = {
            "title": "Sample Data with missing likes field",
            "author": "John Doe",
            "url": "www.testing.com"
        }

        const result = await api
                        .post("/api/blogs")
                        .send(newPost)
                        .set("Authorization", `Bearer ${loggedUserToken.body.token}`)
                        .expect(201)
                        .expect('Content-Type', /application\/json/)
        // grab data from db
        const dataDB = await helper.getOneData(result.body.id)
        assert.strictEqual(dataDB.likes, 0)
    })

    test("Posting a new blog w/o token throws 401 unauthorised error", async () => {
        const newPost = {
            "title": "Sample Data but missing token",
            "author": "John Doe",
            "url": "www.testing.com"
        }

        const result = await api
                        .post("/api/blogs")
                        .send(newPost)
                        .set("Authorization", `Bearer `)
                        .expect(401)
                        .expect('Content-Type', /application\/json/)
        
    })
})

describe("Missing Fields test - 400 error", () => {
    test("Missing title in new blog throws 400 error", async () =>{
        const noTitlePost = {
            "author": "John Doe",
            "url": "www.testing.com",
            "likes" : 10
        }

        const result1 = await api
                        .post("/api/blogs")
                        .set("Authorization", `Bearer ${loggedUserToken.body.token}`)
                        .send(noTitlePost)
                        .expect(400)
    })

    test("Missing URL field in new blog throws 400 error", async () => {
        const noURLPost ={
            "title": "Missing URL",
            "author": "John Doe",
            "likes": 11
        }
        const result2 = await api
                    .post("/api/blogs")
                    .set("Authorization", `Bearer ${loggedUserToken.body.token}`)
                    .send(noURLPost)
                    .expect(400)
    })
})



describe("Testing deletion", () => {
    test("Deleting someone else's blog throws 401 error", async () => {
        const data = await helper.getDataFromDB()
        const sampleDataID = data[0].id

        await api.delete(`/api/blogs/${sampleDataID}`)
                .set("Authorization", `Bearer ${loggedUserToken.body.token}`)
                .expect(401)
    })

    test("Successful deletion of their own blog ", async () => {
        // delete Tester1's post from db
        await api.delete("/api/blogs/5a422bc61b54a676234d17fd")
                .set("Authorization", `Bearer ${loggedUserToken.body.token}`)
                .expect(204)

        // grab all ids from db after deletion api
        const dataAfterDel = await helper.getDataFromDB()
        const blogIDs = dataAfterDel.map(blogs => blogs.id)

        assert(!blogIDs.includes("5a422bc61b54a676234d17fd"))
        assert.strictEqual(dataAfterDel.length, helper.initialBlogs.length-1)
    })
})

test("Update one blog's likes", async () => {
    const data = await helper.getDataFromDB()
    const sampleDataID = data[0].id

    const updated = await api.put(`/api/blogs/${sampleDataID}`)
                            .send({likes: 1000})
                            .expect(200)
                            .expect('Content-Type', /application\/json/)
    
    // grab all ids from db after update api
    const dataAfterUpdate = await helper.getOneData(sampleDataID)
    assert.strictEqual(updated.body.likes, 1000)
 
})


after( async () => {
    await mongoose.connection.close()
})

// npm test -- --test-only
// running test with specific name/includes specific name
// npm test -- --test-name-pattern="a specific note is within the returned notes"
