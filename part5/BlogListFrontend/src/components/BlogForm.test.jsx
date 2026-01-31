import BlogForm from "./BlogForm"
import {render, screen} from "@testing-library/react"
import userEvent from "@testing-library/user-event"

const sampleUser = {
    "token": "asdfasdf",
    "name": "Me",
    "username": "Tester1"
}

const sampleNewBlog = {
    "title": "Testing form",
    "author": "Tester1",
    "url": "www.google.com"
}


describe.only("Testing Blog Form", () => {

    const postSubmitFunc = vi.fn()

    render(<BlogForm createPost={postSubmitFunc}></BlogForm>)
    screen.debug()

    const user = userEvent.setup()
    const postButton = screen.getByText("Create")

    test("Blog Form shows all 3 input fields - title, author, url", () => {
        screen.getByLabelText("Title:")
        screen.getByLabelText("Author:")
        screen.getByLabelText("URL:")
    })


    test.only("Form input data -> create button -> new post generated", async () => {
        const titleInput = screen.getByLabelText("Title:")
        const authorInput = screen.getByLabelText("Author:")
        const urlInput = screen.getByLabelText("URL:")

        await user.type(titleInput, sampleNewBlog.title)
        await user.type(authorInput, sampleNewBlog.author)
        await user.type(urlInput, sampleNewBlog.url)

        await user.click(postButton)

        //console.log(postSubmitFunc.mock.calls)

        expect(postSubmitFunc.mock.calls).toHaveLength(1)
        expect(postSubmitFunc.mock.calls[0][0].title).toBe("Testing form")
    })





})