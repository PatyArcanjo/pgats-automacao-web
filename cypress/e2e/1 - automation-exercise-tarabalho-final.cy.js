/// <reference types="cypress" />

import { faker } from '@faker-js/faker';

//Cadastro
import * as cadastro from '../modules/cadastro/index.js';

//Menu
import Menu from '../modules/menu/index.js';

//Login
import * as login from '../modules/login/index.js';

//Contato
import { formularioparaContato , uploadArquivo, validacaoEnvioFormulario } from '../modules/contato/index.js';

//Produtos
import { listaTodosProdutos, verProduto , pesquisaProduto} from '../modules/produtos/index.js';
import { acessarCarrinho } from '../modules/carrinho/index.js';

//carrinho
import * as carrinho from '../modules/carrinho/index.js';

describe('Automation Exercise', () => {
    beforeEach(() => {
        cy.visit('https://www.automationexercise.com/');
        cy.url().should('includes', '/www.automationexercise.com/'); // validação de url, recupera a url da página atual e valida se inclui o texto
    })

    it('Cadastrar Usuário', () => {
        Menu.navegarParaLogin();
        cadastro.formularioPreCadastro();
        cadastro.formularioCadastro();
        cadastro.validacaoCadastro();
    })

    it('2 - Login do Usuário', () => {
        Menu.navegarParaLogin();
    formularioPraLogin();

    });
    it('3 - Login do Usuário com email e senhas inválidos', () => {
        Menu.navegarParaLogin();
        login.formularioLoginInvalido();
    });

    it('4 - Logout do Usuário', () => {
        Menu.navegarParaLogin();
        login.formularioPraLogin();
        login.logOutUsuario();
    });

    it('5 - Cadastrar Usuário com email existente no sistema', () => {
        Menu.navegarParaLogin();
        cadastro.cadastroUsuarioExistente();
    });

    it('6 - Enviar formulário de Contato com upload de arquivo', () => {
        Menu.navegarParaFormularioContato();
        formularioparaContato();
        uploadArquivo();
        validacaoEnvioFormulario(); 
    });

    it('8  -Verifique todos os produtos e a página de detalhes do produto', () => {
        Menu.navegarParaProdutos();
        listaTodosProdutos();
        verProduto(1);
    });

    it('9 -Prsquisar Produto', () => {
        Menu.navegarParaProdutos();
        pesquisaProduto('Sleeves Printed Top - White');
    });

    it('10 - Verificar assinatura na página inicial', () => {
        verificarAssinaturaDaPagina();
    });

     it.only('15 - Cadastre-se antes de finalizar a compra.', () => {
        Menu.navegarParaLogin();
        cadastro.formularioPreCadastro();
        cadastro.formularioCadastro();
        cadastro.validacaoCadastro();
        //login.verificaUsuarioLogado();
        carrinho.adicionarProdutoAoCarrinho(faker.number.int({ min: 1, max: 10 }));
        carrinho.acessarCarrinho();
        carrinho.checkoutCarrinho();
    });
})