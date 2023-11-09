/// <reference types="cypress" />
import contrato from '../contracts/usuarios.contract'
const faker = require('faker');
//chamando as ferramentas que vamos utilizar ao longo do exercicio

describe('Testes da Funcionalidade Usuários', () => {
//nesse teste a intencao esta voltada em testar os principais verbos da funcionalidade usuarios
    
    let token
    before(() => {
        cy.token('Stephan_Schumm@yahoo.com', 'teste').then(tkn => { token = tkn })
    });
    //nessa funcao estamos 'convidando' o token que vamos utilizar sempre que for necessario autenticar-se como adm


    it('Deve validar contrato de usuários', () => {
        //TODO: utilizar o joi para validar o contrato, para isso foi feita a pasta contracts e dentro dela o arquivo usuarion.contracts.js
        cy.request('usuarios').then(response => {
            return contrato.validateAsync(response.body)
        })
    });

    it('Deve listar usuários cadastrados', () => {
        //TODO: realizar um pedido GET 
        cy.request({
            method: 'GET',
            url: 'usuarios'
        }).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.duration).to.be.lessThan(25)
        }) 
    });

    it('Deve cadastrar um usuário com sucesso', () => {
        //TODO: realizar um POST com o body completo e validar a assercao e frase de sucesso
        let nomefaker = faker.name.findName();
        let emailfaker = faker.internet.email();
        // A escolha de envolver uma biblioteca faker foi somente para gerar dados mais reais
        cy.cadastrarUsuario(nomefaker, emailfaker, 'teste', 'true').then((response) => { 
            expect(response.status).to.equal(201) //validando codigo da resposta
            expect(response.body.message).to.equal("Cadastro realizado com sucesso") //validando mensagem de sucesso
            expect(response.duration).to.be.lessThan(30) //validando desempenho
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
            failOnStatusCode: false //necessario para que a mensagem 4xx nao falhe nosso teste
        }).then((response) => {
            expect(response.status).to.equal(400) //verificando o codigo de erro, ok
            expect(response.body.message).to.equal("Este email já está sendo usado") //validando mensagem de erro
        })
    });

    it('Deve editar um usuário previamente cadastrado', () => {
        //TODO: realizar um cadastro, de seguida editar o mesmo usuario, utilizar o metodo PUT e validar a assercao com mensagem e codigo de sucesso
        let nomefaker = faker.name.findName(); //procura um nome e sobrenome faker
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