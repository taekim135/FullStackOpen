const { test, expect, beforeEach, describe } = require('@playwright/test')
const {loginUser, createBlog} = require("./testHelper")

// .only() runs automatically by playwright
// all nee async/await for the pages to render first
describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    // clear user & blog db
    // create new user
    await request.post("/api/testing/reset")
    await request.post("/api/users", {
      data: {
        name: 'Me',
        username: 'Tester1',
        password: 'testtest'
      }
    })

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await page.getByRole("button", {name: "Login"}).click()
    await expect(page.getByText("username")).toBeVisible()
    await expect(page.getByText("password")).toBeVisible()
    await expect(page.getByRole("button", {name: "Cancel"})).toBeVisible()
  })

  describe("Testing login", () => {

    test("Successful Login", async ({page}) => {
      await loginUser(page, "Tester1", "testtest")
      await expect(page.getByText("Welcome, Me", {exact: false})).toBeVisible()
      await expect(page.getByRole("button", {name: "Logout"})).toBeVisible()
    })

    test("Failed Login - wrong credentials", async ({page}) => {
      await loginUser(page, "Tester1", "wrong")
      await expect(page.locator(".error")).toContainText("Invalid username or password")
    })

  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginUser(page, "Tester1", "testtest")
    })

    test('a new blog can be created', async ({ page }) => {
      await expect(page.getByRole("button", {name: "New Blog"})).toBeVisible()

      await createBlog(page, "Testing new blog using Playwright", "Tester1", "www.test.org")

      await expect(page.getByText("Saved", {exact: false})).toBeVisible()
      await expect(page.locator(".pass")).toHaveCSS('color', 'rgb(0, 128, 0)')
    })

    test("the new blog shows up on the list", async ({page}) => {
      await createBlog(page, "2nd test for new blog", "Tester1", "www.test2.org")
      await expect(page.getByTestId("blog")).toContainText("2nd test for new blog")
    })

    test("a blog can be liked", async ({page}) => {
      await createBlog(page, "blog for testing like", "Tester1", "www.test2.org")
      await page.getByRole("button", {name: "Show"}).click()
      await expect(page.getByTestId("like")).toContainText("0")
      await page.getByRole("button", {name: "Like"}).click()
      await expect(page.getByTestId("like")).toContainText("1")
    })

    test("a blog can be deleted by the creator", async ({page}) => {
      // popup message event listener
      page.on('dialog', async (dialog) => {
        expect(dialog.message()).toContain("Remove", {exact: false})
        await dialog.accept()
      })

      await createBlog(page, "blog for testing delete", "Tester1", "www.test2.org")
      await page.getByRole("button", {name: "Show"}).click()
      
      await page.getByRole("button", {name: "Delete"}).click()
      await expect(page.locator(".pass")).toContainText("Removed")

      await expect(page.getByText("blog for testing delete")).not.toBeVisible()
    })

    test("only the creator can see the delete button for their blgos", async ({page, request}) => {
      await createBlog(page, "testing delete button visibility", "Tester1", "www.test2.org")
      await page.getByRole("button", {name: "Show"}).click()
      await expect(page.getByRole("button", {name: "Delete"})).toBeVisible()

      //Re-login with another account & check 
      await page.getByRole("button", {name: "Logout"}).click()

       await request.post("/api/users", {
        data: {
          name: 'You',
          username: 'Tester2',
          password: 'testtest'
        }
      })

      await loginUser(page, "Tester2", "testtest")
      await page.getByRole("button", {name: "Show"}).click()
      await expect(page.getByRole("button", {name: "Delete"})).not.toBeVisible()
    })

    test("blogs are arranged in the order of #likes (most at top)", async ({page}) => {
      await createBlog(page, "testing blogs order1", "Tester1", "www.test1.org")
      const blog1 = page.getByTestId("blog").filter({ hasText: 'testing blogs order1' })
      await blog1.getByRole("button", {name: "Show"}).click()
      await blog1.getByRole("button", {name: "Like"}).click()
      await expect(blog1.getByTestId("like")).toContainText("1")

      await createBlog(page, "testing blogs order2", "Tester1", "www.test2.org")
      const blog2 = page.getByTestId("blog").filter({ hasText: 'testing blogs order2' })
      await blog2.getByRole("button", {name: "Show"}).click()
      await blog2.getByRole("button", {name: "Like"}).click()
      await expect(blog2.getByTestId("like")).toContainText("1") 
      await blog2.getByRole("button", {name: "Like"}).click()
      await expect(blog2.getByTestId("like")).toContainText("2")

      await createBlog(page, "testing blogs order3", "Tester1", "www.test2.org")
      const blog3 = page.getByTestId("blog").filter({ hasText: 'testing blogs order3' })
      await blog3.getByRole("button", {name: "Show"}).click()
      await blog3.getByRole("button", {name: "Like"}).click()
      await expect(blog3.getByTestId("like")).toContainText("1") 
      await blog3.getByRole("button", {name: "Like"}).click()
      await expect(blog3.getByTestId("like")).toContainText("2") 
      await blog3.getByRole("button", {name: "Like"}).click()
      await expect(blog3.getByTestId("like")).toContainText("3")

      //Below checks the order of the blogs - highest likes at top
      const allBlogs = await page.getByTestId("blog").all()
      await expect(allBlogs[0]).toContainText("order3")
      await expect(allBlogs[1]).toContainText("order2")
      await expect(allBlogs[2]).toContainText("order1")
    })
  })
})