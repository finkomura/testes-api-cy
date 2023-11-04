/// <reference types="cypress" />

describe('Testes da Funcionalidade Usuários', () => {

    it('Deve validar contrato de usuários', () => {
         //TODO: utilizar o joi
    });

    it('Deve listar usuários cadastrados', () => {
         //TODO: realizar um pedido GET 
         cy.request({
          method: 'GET',
          url: 'usuarios'
      }).then((response) => {
          expect(response.status).to.equal(200)
          expect(response.body).to.have.property('usuarios')
          expect(response.duration).to.be.lessThan(20)
      })
    });

    it('Deve cadastrar um usuário com sucesso', () => {
         //TODO: realizar um POST com o body completo e validar a assercao e frase de sucesso
         cy.request({
          method: 'POST',
          url: 'usuarios',
          body:
          {
               "nome": "joao Leonardo",
               "email": "leodostccestes@qa.com.br",
               "password": "teste",
               "administrador": "true"
          }
      }).then((response) => {
          expect(response.status).to.equal(201)
          expect(response.body).to.have.property('usuarios')
          expect(response.duration).to.be.lessThan(20)
      })

    });

    it('Deve validar um usuário com email inválido', () => {
         //TODO: cadastrar usuario com email invalido e fazer a assercao da mensagem de erro e codigo de erro
         cy.request({
          method: 'POST',
          url: 'usuarios',
          body:
          {
               "nome": "joao Leonardo",
               "email": "leodostccestes@qa.com.br",
               "password": "teste",
               "administrador": "true"
          }
      }).then((response) => {
          expect(response.status).to.equal(400)
          expect(response.body).to.have.property('usuarios')
          expect(response.duration).to.be.lessThan(20)
      })
    });

    it('Deve editar um usuário previamente cadastrado', () => {
         //TODO: realizar um cadastro, de seguida editar o mesmo usuario, utilizar o metodo PUT e validar a assercao com mensagem e codigo de sucesso
    });

    it('Deve deletar um usuário previamente cadastrado', () => {
        //TODO: criar um usuario, buscar id do usuario, utilizar DELETE, fazer assercao da mensagem de erro
    });


});
