describe('Blog app', function () {
  const userTest = {
    username: 'admin',
    name: 'Admin',
    password: 'admin1234',
  }

  const badUserTest = {
    username: 'badadmin',
    name: 'BadAdmin',
    password: 'badadmin1234',
  }

  const blogTest = {
    title: 'Blog title',
    author: 'Blog Author name',
    url: 'https://myblog.com',
  }

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/users', userTest)
    cy.request('POST', 'http://localhost:3001/api/users', badUserTest)
    cy.visit('http://localhost:3000')
  })

  describe('1.-LoginForm is shown', function () {
    it('Form is showed', function () {
      cy.contains('login')
    })
  })

  describe('2.-Succesful and bad login', function () {
    it('Succeeds with correct credentials', function () {
      cy.get('#username').type(userTest.username)
      cy.get('#password').type(userTest.password)
      cy.get('#login-button').click()

      cy.get('.good').contains(`Welcome ${userTest.name}`)
    })

    it('Fails with wrong credentials + notification is red', function () {
      cy.get('#username').type(userTest.username)
      cy.get('#password').type('wrong password')
      cy.get('#login-button').click()

      cy.get('.error')
        .contains('wrong username or password')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })


  describe('When logged in', function () {
    //Log in for each test with this credentials
    beforeEach(function () {
      cy.get('#username').type(userTest.username)
      cy.get('#password').type(userTest.password)
      cy.get('#login-button').click()
    })

    describe('3.-A blog can be created', function () {
      it('Blog is created', function () {
        cy.contains('new blog').click()
        cy.get('#title').type(blogTest.title)
        cy.get('#author').type(blogTest.author)
        cy.get('#url').type(blogTest.url)
        cy.get('#submit-blog').click()
        cy.wait(1000)
        cy.wait(1000)
        cy.wait(1000)
        cy.wait(1000)

        cy.request('GET', 'http://localhost:3001/api/blogs').then((response) => {
          const data = response.body
          expect(data).to.have.length(1)
          expect(data[0].title).contains(blogTest.title)
          expect(data[0].author).contains(blogTest.author)
          expect(data[0].url).contains(blogTest.url)
        })
      })
    })

    describe('4.-User can like a blog', function () {
      it('blog can be liked', function () {
        cy.contains('new blog').click()
        cy.get('#title').type(blogTest.title)
        cy.get('#author').type(blogTest.author)
        cy.get('#url').type(blogTest.url)
        cy.get('#submit-blog').click()

        cy.get('#show-more').click()
        cy.get('.extra-info').find('button.buttonLike').as('buttonLike')
        cy.wait(1000)
        cy.get('@buttonLike').click()
        cy.wait(1000)
        cy.get('@buttonLike').click()
        cy.wait(1000)


        cy.request('GET', 'http://localhost:3001/api/blogs').as('blogs')

        cy.get('@blogs').should((response) => {
          const data = response.body
          expect(data[0].likes).to.equal(2)
        })
      })
    })

    describe('5.-Deleting blogs', function () {
      it('user can delete his blog', function () {
        cy.contains('new blog').click()
        cy.get('#title').type(blogTest.title)
        cy.get('#author').type(blogTest.author)
        cy.get('#url').type(blogTest.url)
        cy.get('#submit-blog').click()

        cy.get('#show-more').click()
        cy.get('.extra-info').find('button.remove').as('removeButton')
        cy.get('@removeButton').click()
        cy.wait(1000)
        cy.wait(1000)

        cy.request('GET', 'http://localhost:3001/api/blogs').then((response) => {
          cy.wait(1000)
          cy.wait(1000)

          const data = response.body
          cy.wait(1000)
          cy.wait(1000)

          expect(data).to.have.length(0)
        })
      })

      it('Another user cannot delete other user blog', function () {
        cy.contains('new blog').click()
        cy.get('#title').type(blogTest.title)
        cy.get('#author').type(blogTest.author)
        cy.get('#url').type(blogTest.url)
        cy.get('#submit-blog').click()
        cy.wait(1000)
        cy.wait(1000)
        cy.wait(1000)
        cy.wait(1000)

        cy.request('GET', 'http://localhost:3001/api/blogs').then((response) => {
          const data = response.body
          expect(data).to.have.length(1)
          expect(data[0].title).contains(blogTest.title)
          expect(data[0].author).contains(blogTest.author)
          expect(data[0].url).contains(blogTest.url)
        })

        //Admin logout
        cy.get('#logout').click()

        //Bad user gets in
        cy.get('#username').type(badUserTest.username)
        cy.get('#password').type(badUserTest.password)
        cy.get('#login-button').click()

        //Bad user enters
        cy.get('.good').contains(`Welcome ${badUserTest.name}`)

        //Bad user tries to delete other blog
        cy.get('#show-more').click()
        cy.get('.extra-info').find('button.remove').as('removeButton')
        cy.get('@removeButton').click()
        cy.wait(1000)
        cy.wait(1000)

        cy.request('GET', 'http://localhost:3001/api/blogs').then((response) => {
          cy.wait(1000)
          cy.wait(1000)

          const data = response.body
          cy.wait(1000)
          cy.wait(1000)

          expect(data).to.have.length(1)
        })


      })
    })

    describe('6.-Blogs in order', function () {
      it('All blogs are ordered in most likes', function () {
        // create blogs
        cy.contains('create new blog').click()
        cy.wait(1000)
        cy.get('#title').type('Blog 1')
        cy.wait(1000)
        cy.get('#author').type('Blog 1')
        cy.wait(1000)
        cy.get('#url').type('Blog 1')
        cy.wait(1000)
        cy.get('#submit-blog').click()

        cy.contains('create new blog').click()
        cy.wait(1000)
        cy.get('#title').type('Blog 2')
        cy.wait(1000)
        cy.get('#author').type('Blog 2')
        cy.wait(1000)
        cy.get('#url').type('Blog 2')
        cy.wait(1000)
        cy.get('#submit-blog').click()

        cy.contains('create new blog').click()
        cy.wait(1000)
        cy.get('#title').type('Blog 3')
        cy.wait(1000)
        cy.get('#author').type('Blog 3')
        cy.wait(1000)
        cy.get('#url').type('Blog 3')
        cy.wait(1000)
        cy.get('#submit-blog').click()

        // like blogs
        cy.contains('.title', 'Blog 3').parent().find('#show-more').click()
        cy.get('.buttonLike').click().wait(1000)
        cy.get('.buttonLike').click().wait(1000)
        cy.get('.buttonLike').click().wait(1000)
        //hiding blog 3 because it makes test go bad
        cy.contains('.title', 'Blog 3').parent().find('#show-more').click()

        cy.contains('.title', 'Blog 2').parent().find('#show-more').click()
        cy.get('.buttonLike').click().wait(1000)
        cy.get('.buttonLike').click().wait(1000)
        //hiding blog 2 because it makes test go bad
        cy.contains('.title', 'Blog 2').parent().find('#show-more').click()

        cy.contains('.title', 'Blog 1').parent().find('#show-more').click()
        cy.get('.buttonLike').click().wait(1000)
        //hiding blog 1 because it makes test go bad
        cy.contains('.title', 'Blog 1').parent().find('#show-more').click()

        cy.get('.blog').eq(0).should('contain', 'Blog 3')
        cy.get('.blog').eq(1).should('contain', 'Blog 2')
        cy.get('.blog').eq(2).should('contain', 'Blog 1')

      })
    })



  })
})