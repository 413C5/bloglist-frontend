describe('1.-Blog app', function () {
  const userTest = {
    username: 'admin',
    name: 'Admin',
    password: 'admin1234',
  }

  const blogTest = {
    title: 'Blog title',
    author: 'Blog Author name',
    url: 'https://myblog.com',
  }

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/users', userTest)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('login')
  })

  describe('2.-Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type(userTest.username)
      cy.get('#password').type(userTest.password)
      cy.get('#login-button').click()

      //css class
      cy.get('.good').contains(`Welcome ${userTest.name}`)
    })

    it('fails with wrong credentials + red notification', function () {
      cy.get('#username').type(userTest.username)
      cy.get('#password').type('wrong password')
      cy.get('#login-button').click()

      //css class
      cy.get('.error')
        .contains('wrong username or password')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
  describe.only('3.-When logged in', function () {
    beforeEach(function () {
      cy.get('#username').type(userTest.username)
      cy.get('#password').type(userTest.password)
      cy.get('#login-button').click()
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type(blogTest.title)
      cy.get('#author').type(blogTest.author)
      cy.get('#url').type(blogTest.url)
      cy.get('#submit-blog').click()

      cy.request('GET', 'http://localhost:3001/api/blogs').as('blogs')

      cy.get('@blogs').should((response) => {
        const data = response.body
        expect(data).to.have.length(1)
        expect(data[0].title).contains(blogTest.title)
        expect(data[0].author).contains(blogTest.author)
        expect(data[0].url).contains(blogTest.url)
      })
    })
  })
})