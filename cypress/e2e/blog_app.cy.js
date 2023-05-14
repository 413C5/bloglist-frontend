describe('1.-Blog app', function () {
  const userTest = {
    username: 'admin',
    name: 'Admin',
    password: 'admin1234',
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
})