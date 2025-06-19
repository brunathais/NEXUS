describe('Cadastro de usuário', () => {
  it('Deve cadastrar um usuário com sucesso', () => {
    cy.visit('http://localhost:3000/cadastro/cadastro.html');

    cy.get('#nome').type('Bruna Teste');
    cy.get('#email').type('bruna@example.com');
    cy.get('#senha').type('123456');
    cy.get('#confirmar-senha').type('123456');

    cy.contains('Cadastrar').click();

    cy.url().should('include', '/login');
  });
});
