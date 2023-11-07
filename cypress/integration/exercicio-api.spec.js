/// <reference types="cypress" />

const faker = require('faker');

describe('Testes da Funcionalidade Usuários', () => {

    let token
    before(() => {
        cy.token('Stephan_Schumm@yahoo.com', 'teste').then(tkn => { token = tkn })
    });


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
            expect(response.duration).to.be.lessThan(100)
        })
    });

    it('Deve cadastrar um usuário com sucesso', () => {
        //TODO: realizar um POST com o body completo e validar a assercao e frase de sucesso
        let nomefaker = faker.name.findName();
        let emailfaker = faker.internet.email();
        cy.request({
            method: 'POST',
            url: 'usuarios',
            body:
            {
                "nome": nomefaker,
                "email": emailfaker,
                "password": "teste",
                "administrador": "true"
            }
        }).then((response) => {
            expect(response.status).to.equal(201)
            expect(response.duration).to.be.lessThan(200)
        })
    });

    it('Deve validar um usuário com email inválido', () => {
        //TODO: cadastrar usuario com email invalido e fazer a assercao da mensagem de erro e codigo de erro
        let nomefaker = faker.name.findName();
        let emailfaker = faker.internet.email();
        cy.request({
            method: 'POST',
            url: 'usuarios',
            body:
            {
                "nome": nomefaker,
                "email": emailfaker,
                "password": "teste",
                "administrador": "true"
            }
        });
        cy.request({
            method: 'POST',
            url: 'usuarios',
            body:
            {
                "nome": nomefaker,
                "email": emailfaker,
                "password": "teste",
                "administrador": "true"
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.equal(400)
        })
    });

    it('Deve editar um usuário previamente cadastrado', () => {
        //TODO: realizar um cadastro, de seguida editar o mesmo usuario, utilizar o metodo PUT e validar a assercao com mensagem e codigo de sucesso
        let nomefaker = faker.name.findName();
        let emailfaker = faker.internet.email();
        cy.request({
            method: 'POST',
            url: 'usuarios',
            body:
            {
                "nome": nomefaker,
                "email": emailfaker,
                "password": "teste",
                "administrador": "true"
            },
        }).then(response => {
            let id = response.body._id
            let nomefaker2 = faker.name.findName();
            cy.request({
                headers: { authorization: token },
                method: 'PUT',
                url: `usuarios/${id}`,
                body:
                {
                    "nome": nomefaker2,
                    "email": emailfaker,
                    "password": "teste",
                    "administrador": "true"
                }
            });
        });

    });


    it('Deve deletar um usuário previamente cadastrado', () => {
        //TODO: criar um usuario, buscar id do usuario, utilizar DELETE, fazer assercao da mensagem de erro
    });
});