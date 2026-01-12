// test file for api routes

const app = require("../app")
const supertest = require("supertest")
const assert = require("assert")
const {test, beforeEach, after, describe} = require("node:test")
const Blog = require("../model/blog")
const mongoose = require("mongoose")
const helper = require("./test_helper")

const api = supertest(app)



beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
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


test("New blog post created, total +1, content correctly saved to db ", async () =>{
    const newPost = {
        "title": "Post Method Sample Data",
        "author": "John Doe",
        "url": "www.testing.com",
        "likes": 6
    }

    const result = await api
                    .post("/api/blogs")
                    .send(newPost)
                    .expect(201)
                    .expect('Content-Type', /application\/json/)
    
    // total size of blogs
    const dataFromStart = await helper.getDataFromDB()
    assert.strictEqual(dataFromStart.length, helper.initialBlogs.length + 1)

    // correct data saved
    const data = dataFromStart.map(blog => blog.title)
    assert(data.includes("Post Method Sample Data"))
})

test("If likes property missing from request, auto set to 0", async () =>{
    const newPost = {
        "title": "Missing Likes Sample Data",
        "author": "John Doe",
        "url": "www.testing.com"
    }

    const result = await api
                    .post("/api/blogs")
                    .send(newPost)
                    .expect(201)
                    .expect('Content-Type', /application\/json/)
    // grab data from db
    const dataDB = await helper.getOneData(result.body.id)
    assert.deepEqual(dataDB.likes, 0)

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
                    .send(noURLPost)
                    .expect(400)
    })
})

//TODO: testing update

test("Deleting one blog", async () => {
    const data = await helper.getDataFromDB()
    const sampleDataID = data[0].id

    await api.delete(`/api/blogs/${sampleDataID}`).expect(204)

    // grab all ids from db after deletion api
    const dataAfterDel = await helper.getDataFromDB()
    const ids = dataAfterDel.map(blogs => blogs.id)

    assert(!ids.includes(sampleDataID))
    assert.strictEqual(dataAfterDel.length, helper.initialBlogs.length - 1)
})





after( async () => {
    await mongoose.connection.close()
})

// npm test -- --test-only
// running test with specific name/includes specific name
// npm test -- --test-name-pattern="a specific note is within the returned notes"
