/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
describe('Blog app', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'Teppo Testaaja',
      username: 'teppo',
      password: 'salainen',
    };
    cy.request('POST', 'http://localhost:3003/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.get('#username');
    cy.get('#password');
    cy.contains('Blog list app, Department of Computer Science, University of Helsinki 2022');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('teppo');
      cy.get('#password').type('salainen');
      cy.get('#login-button').click();

      cy.contains('Teppo Testaaja logged-in');
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('teppo');
      cy.get('#password').type('väärä');
      cy.get('#login-button').click();

      cy.contains('Wrong credentials');
    });

    describe('When logged in', function () {
      beforeEach(() => {
        cy.login({ username: 'teppo', password: 'salainen' });
      });

      it('A blog can be created', function () {
        cy.contains('new Blog').click();
        cy.get('#inputTitle').type('a blog created by cypress');
        cy.get('#inputAuthor').type('blog by cypress');
        cy.get('#inputUrl').type('http://cypress.com');
        cy.contains('create').click();

        cy.contains('a blog created by cypress');
      });

      it('User can like the blog', function () {
        cy.createBlog({ title: 'a blog created by cypress', author: 'blog by cypress', url: 'http://cypress.com' });
        cy.contains('view').click();
        cy.contains('likes 0');
        cy.contains('like').click();

        cy.contains('likes 1');
      });

      it('User can delete the blog', function () {
        cy.createBlog({ title: 'a blog created by cypress', author: 'blog by cypress', url: 'http://cypress.com' });
        cy.contains('view').click();
        cy.contains('remove').click();

        cy.get('html').should('not.contain', 'a blog created by cypress');
      });

      it('Blogs are ordered according to likes', function () {
        cy.createBlog({ title: 'a blog created by cypress', author: 'blog by cypress', url: 'http://cypress.com' });
        cy.createBlog({ title: 'an other blog created by cypress', author: 'blog by cypress', url: 'http://cypress.com' });
        cy.contains('a blog created by cypress')
          .contains('view').click();
        cy.contains('likes 0')
          .contains('like')
          .click();

        cy.contains('an other blog created by cypress')
          .contains('view').click();
        cy.contains('likes 0')
          .contains('like')
          .click()
          .contains('like', { timeout: 500 })
          .click();

        cy.get('[data-cy="blog"]').then(($blog) => {
          expect($blog).to.have.length(2);
          expect($blog[1].innerText).to.contain('a blog created by cypress');
          expect($blog[0].innerText).to.contain('an other blog created by cypress');
        });
      });
    });
  });
});
