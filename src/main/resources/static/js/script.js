/**************************************************/
/******************* GERAIS ***********************/
/**************************************************/

const urlAPIClientes = 'http://localhost:8080/clientes'

/**
 * Função que permite motrar e ocultar seção especificada do HTML.
 * @param {string} sectionId - O ID da seção a ser exibida.
 */
function showSection(sectionId) {
    // Esconde todas as seções
    document.querySelectorAll('.section-group').forEach(section => {
        section.style.display = 'none';
    });
    
    // Mostra a seção específica passada como parâmetro
    const sectionToShow = document.getElementById(sectionId);
    if (sectionToShow) {
        sectionToShow.style.display = 'block';
    }
    document.getElementById(sectionId).style.display = 'block';
}

/** 
 * Abertura de página padrão da lista cliente
 */
document.addEventListener('DOMContentLoaded', function() {
    showSection('form-cliente-list'); 
    listarClientes(); 
});

/****************************************************/
/******************* CLEINTES ***********************/
/****************************************************/

/**
 * Carregar a lista de clientes ao carregar a página
 */
document.addEventListener('DOMContentLoaded', listarClientes);

/**
 * Função para limpar os campos do formulário de cliente
 */
function limparFormulario() {
    document.getElementById('nome_cliente').value = '';
    
    // Limpa os campos de email
    const emailInputs = document.querySelectorAll('.emailInput');
    emailInputs.forEach(input => {
        input.value = '';
    });

    // Remove campos de email adicionais
    const emailContainers = document.querySelectorAll('#divEmails > div');
    emailContainers.forEach(container => {
        container.remove();
    });

    // Limpa os campos de telefone
    const telefoneInputs = document.querySelectorAll('.telefoneInput');
    telefoneInputs.forEach(input => {
        input.value = '';
    });

    // Remove campos de telefone adicionais
    const telefoneContainers = document.querySelectorAll('#divTelefones > div');
    telefoneContainers.forEach(container => {
        container.remove();
    });
}

/**
 * Função para fechar a modal de edição
 */
function fecharModal() {
    document.getElementById("form-cliente-modal").style.display = 'none';
}


/**
* Função para listar todas os clientes cadastrados.
*/
function listarClientes() {
    fetch(`${urlAPIClientes}`)
        .then(response => {
            if (!response.ok) {
                if (response.status === 404) {
                    // Se o status for 404, significa que não há peças
                    return [];
                } else {
                    throw new Error('Erro ao listar cleintes');
                }
            }
            // Verifica se a resposta tem conteúdo
            if (response.status === 204) {
                return []; // No Content
            }
            return response.json();
        })
        .then(data => {
            const listaClientes = document.getElementById('form-cliente-list-tuples');
            listaClientes.innerHTML = '';

            if (data.length === 0) {
                listaClientes.innerHTML = '<tr><td colspan="7">Nenhum cliente cadastrado.</td></tr>';
                return;
            }

            // deve corresponder ao formato de atributos do backend (java)
            data.forEach(cliente => {                
                const row = document.createElement('tr');
                row.innerHTML = `
                <td>${cliente.idCliente}</td>
                <td>${cliente.criadoEm}</td>
                <td>${cliente.nomeCompleto}</td>
                <td>
                    <button class="btn-detalhes" onclick="abrirModalDetalhesCliente(${cliente.idCliente})">Detalhes</button>
                    <button class="btn-editar" onclick="abrirModalEdicaoCliente(${cliente.idCliente})">Editar</button>
                    <button class="btn-excluir" onclick="excluirCliente(${cliente.idCliente})">Excluir</button>
                </td>
            `;
                listaClientes.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao listar clientes');
        });
}

/**
 * Função para cadastrar cliente 
 */
function adicionarCliente() {
    const nome = document.getElementById('nome_cliente').value.trim();

    // Obtem todos os campos de entrada de email
    const emailInputs = document.querySelectorAll('.emailInput');
    const listaEmails = [];

    // Obtem todos os campos de entrada de telefone
    const telefoneInputs = document.querySelectorAll('.telefoneInput');
    const listaTelefones = [];

    // Itere sobre os campos de entrada de email e adiciona-os à lista de emails
    emailInputs.forEach(input => {
        if (input.value.trim() !== '') {
            listaEmails.push({ enderecoEmail: input.value.trim() });
        }
    });

    // Itere sobre os campos de entrada de telefone e adiciona-os à lista de telefones
    telefoneInputs.forEach(input => {
        if (input.value.trim() !== '') {
            listaTelefones.push({ numeroTelefone: input.value.trim() });
        }
    });

    // Validação dos campo
    if (!nome || !nome != '' || listaEmails.length === 0 || listaTelefones.length === 0) {
        alert("Todos os campos são obrigatórios e devem conter valores válidos.");
        return;
    }
    
    const novoCliente = {
        nomeCompleto: nome,
        emails: listaEmails,
        telefones: listaTelefones
    };

    fetch(`${urlAPIClientes}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoCliente)
    })
        .then(response => {
            if (!response.ok) {
                console.log(data); 
                throw new Error('Erro ao adicionar cliente');
            }
            return response.json();
        })
        .then(data => {
            alert("Cliente adicionada com sucesso!");
            console.log(data); 
            limparFormulario();
            listarClientes();
        })
        .catch(error => {
            console.log(data); 
            console.error('Erro:', error);
            alert('Erro ao adicionar cliente');
        });
}

/**
 * Função para adicionar um campo de email adicional no cliente
 */
function adicionarCampoEmail() {
    const divEmails = document.getElementById('divEmails');
    const novoCampoEmail = document.createElement('div');
    novoCampoEmail.innerHTML = `
        <input id="botao-adicionar-campo-e-mail" type="email" class="emailInput" name="email_cliente" placeholder="nome@email.com">
        <button id="botao-remover-campo-e-mail"type="button" onclick="removerCampoEmail(this)">Remover campo de e-mail</button>
    `;
    divEmails.appendChild(novoCampoEmail);
}

/**
 * Função para remover um campo de email adicional no cliente
 */
function removerCampoEmail(botaoRemoverEmail) {
    const campoEmail = botaoRemoverEmail.parentNode;
    campoEmail.parentNode.removeChild(campoEmail);
}

/**
 * Função para adicionar um campo de telefone adicional no cliente
 */
function adicionarCampoTelefone() {
    const divTelefones = document.getElementById('divTelefones');
    const novoCampoTelefone = document.createElement('div');
    novoCampoTelefone.innerHTML = `
        <input id="botao-adicionar-campo-telefone" type="telefone" class="telefoneInput" name="telefone_cliente" placeholder="(00) XXXXX-XXXX">
        <button id="botao-remover-campo-telefone" type="button" onclick="removerCampoTelefone(this)">Remover campo de telefone</button>
    `;
    divTelefones.appendChild(novoCampoTelefone);
}

/**
 * Função para remover um campo de telefone adicional no cliente
 */
function removerCampoTelefone(botaoRemoverTelefone) {
    const campoTelefone = botaoRemoverTelefone.parentNode;
    campoTelefone.parentNode.removeChild(campoTelefone);
}