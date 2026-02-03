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
      await expect(page.getByText("2nd test for new blog")).toBeVisible()
    })

    test("a blog can be liked", async ({page}) => {
      await createBlog(page, "blog for testing like", "Tester1", "www.test2.org")
      await page.getByRole("button", {name: "Show"}).click()
      await expect(page.getByTestId("like")).toContainText("0")
      await page.getByRole("button", {name: "Like"}).click()
      await expect(page.getByTestId("like")).toContainText("1")
    })

    test.only("a blog can be deleted by the creator", async ({page, request}) => {
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

      // log in again using a different account to double check the delete button visibility
      // await page.getByRole("button", {name: "Logout"}).click()
      
      // await request.post("/api/users", {
      //   data: {
      //     name: 'You',
      //     username: 'Tester2',
      //     password: 'testtest'
      //   }
      // })

      // await loginUser(page, "Tester2", "testtest")
      // await page.getByRole("button", {name: "Show"}).click()
      // await expect(page.getByRole("button", {name: "Delete"})).not.toBeVisible()

    })
  })




})