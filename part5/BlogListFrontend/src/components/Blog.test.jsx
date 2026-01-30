import {render, screen} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"

const sampleBlog = {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
}

const sampleUser = {
    "token": "asdfasdf",
    "name": "Me",
    "username": "Tester1"
}

test("Blog Component displays title & author but not URL & Likes", () => {
    render(<Blog blog = {sampleBlog}/>)

    const blogTitle = screen.getByText("React patterns", {exact: false})
    const blogAuthor = screen.getByText("Michael Chan", {exact: false})

    const blogURL = screen.queryByText("reactpatterns", {exact: false})
    const blogLikes = screen.queryByText("Like", {exact: false})

    expect(blogTitle).toBeDefined()
    expect(blogAuthor).toBeDefined()

    expect(blogURL).toBeNull()
    expect(blogLikes).toBeNull()
})


test.only("Clicking Show button displays URL & #Likes ", async () => {
    render(
        <Blog blog = {sampleBlog} requester = {sampleUser}></Blog>
    )

    const user = userEvent.setup()
    const button = screen.getByText("Show")
    await user.click(button)

    screen.getByRole("button", {name: "Like"})
    screen.getByText("7",{exact: false})
    // getBy throws thus .toBeDefined not needed - redundant
    screen.getByText("http", {exact: false})
})
