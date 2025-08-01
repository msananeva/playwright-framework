import { test, expect } from '@playwright/test'
import users from '../test-data/usersResponse.json'
// This file contains API tests for verifying user data from the Reqres API
// It includes tests for GET, POST, PUT, and DELETE requests

test.describe("API Verification", () => {

  // 1) verify users endpoint is returning expected users
  test("Verify multiple records returned against stored static response", async ({ request }) => {
    // save raw response into a variable
    const response = await request.get('https://reqres.in/api/users?page=2')

    // parse the respose body into a JS object w access to the actual data within the respose body
    const responseBody = await response.json()

    //to see what is stored inside
    // console.log(responseBody)

    expect(response.status()).toBe(200)
    expect(responseBody).toEqual(users)

  }) 

  // 2) verify single user endpoint is returning expected user
  test("Verify single user returned against stored static response", async ({ request }) => {

    const response = await request.get('https://reqres.in/api/users/2')
    const responseBody = await response.json()

    //to see what is stored inside
    console.log(responseBody)

    // Assert user's information
    expect(response.status()).toBe(200)
    expect(responseBody.data.id).toBe(2)
    expect(responseBody.data.email).toBe('janet.weaver@reqres.in')
    expect(responseBody.data.first_name).toBe('Janet')
    expect(responseBody.data.last_name).toBe('Weaver')
    expect(responseBody.data.avatar).toBe('https://reqres.in/img/faces/2-image.jpg')
  })

  // 3) Test for POST request
  test("Verify POST request", async ({ request }) => {
    const newUser = {
      name: "Sam",
      job: "QA Engineer"
    }

    // Create request and save response
    const response = await request.post("https://reqres.in/api/users", {
      data: newUser
    })

    const responseBody = await response.json()
    // console.log(responseBody)

    // Verify response
    expect(response.status()).toBe(201)
    expect(responseBody.name).toBe(newUser.name)
    expect(responseBody.job).toBe(newUser.job)
  })

  // 4) Verify PUT request
  test("Verify PUT request", async ({ request }) => {
    const updateUser = {
      name: "Mr Banana",
      job: "USA President"
    }

    // Do put request and save response
    const respone = await request.put('https://reqres.in/api/users/2', {
      data: updateUser
    })

    const responseBody = await respone.json()
    // console.log(respone)

    // Verify the response
    expect(respone.status()).toBe(200)
    expect(responseBody.name).toBe(updateUser.name)
    expect(responseBody.job).toBe(updateUser.job)
  })

  // 5) Verify DELETE request
  test('Verify user is deleted', async ({ request }) => {
    const respone = await request.delete('https://reqres.in/api/users/2')
    // console.log(respone)

    expect(respone.status()).toBe(204)
  })


})
