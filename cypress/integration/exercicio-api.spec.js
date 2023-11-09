/// <reference types="cypress" />
import contrato from '../contracts/usuarios.contract'
const faker = require('faker');

describe('Testes da Funcionalidade Usuários', () => {
    let token
    before(() => {
        cy.token('Stephan_Schumm@yahoo.com', 'teste').then(tkn => { token = tkn })
    });


    it('Deve validar contrato de usuários', () => {
        cy.request('usuarios').then(response => {
            return contrato.validateAsync(response.body)
        })
    });

    it('Deve listar usuários cadastrados', () => {
        cy.request({
            method: 'GET',
            url: 'usuarios'
        }).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.duration).to.be.lessThan(25)
        })
    });

    it('Deve cadastrar um usuário com sucesso', () => {
        let nomefaker = faker.name.findName();
        let emailfaker = faker.internet.email();
        cy.cadastrarUsuario(nomefaker, emailfaker, 'teste', 'true').then((response) => {
            expect(response.status).to.equal(201)
            expect(response.body.message).to.equal("Cadastro realizado com sucesso")
        })
    });

    it('Deve validar um usuário com email inválido', () => {
        let nomefaker = faker.name.findName();
        let emailfaker = faker.internet.email();
        cy.cadastrarUsuario(nomefaker, emailfaker, 'teste', 'true');
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
            expect(response.body.message).to.equal("Este email já está sendo usado")
        })
    });

    it('Deve editar um usuário previamente cadastrado', () => {
        let nomefaker = faker.name.findName();
        let emailfaker = faker.internet.email();
        cy.cadastrarUsuario(nomefaker, emailfaker, 'teste', 'true').then(response => {
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
            }).then(response => {
                expect(response.status).to.equal(200)
                expect(response.body.message).to.equal("Registro alterado com sucesso")
            });
        });

    });


    it('Deve deletar um usuário previamente cadastrado', () => {
        let nomefaker = faker.name.findName();
        let emailfaker = faker.internet.email();
        cy.cadastrarUsuario(nomefaker, emailfaker, 'teste', 'true').then((response) => {
            expect(response.status).to.equal(201)
            const id = response.body._id;

            cy.request({
                method: 'DELETE',
                url: `usuarios/${id}`,
                headers: { authorization: token }
            }).then(response => {
                expect(response.body.message).to.equal('Registro excluído com sucesso')
                expect(response.status).to.equal(200)
            })
        });
    });
});