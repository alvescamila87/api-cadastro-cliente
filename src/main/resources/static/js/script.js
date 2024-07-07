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
    const emailInputs = document.querySelectorAll('.emailInput');
    const telefoneInputs = document.querySelectorAll('.telefoneInput');

    // Validar se há emails em branco
    const emailsArray = Array.from(emailInputs).map(emailInput => emailInput.value.trim());
    if (emailsArray.some(email => email === '')) {
        alert("Favor preencher todos os campos de e-mail.");
        return;
    }

     // Validar se há telefones em branco
    const telefonesArray = Array.from(telefoneInputs).map(telefoneInput => telefoneInput.value.trim());
    if (telefonesArray.some(telefone => telefone === '')) {
        alert("Favor preencher todos os campos de telefone.");
        return;
    }

    // Validar se todos os campos obrigatórios estão preenchidos
    if (!nome || emailsArray.length === 0 || telefonesArray.length === 0) {
        alert("Todos os campos são obrigatórios e devem conter valores válidos.");
        return;
    }

    const novoCliente = {
        nomeCompleto: nome,
        emails: emailsArray.map(email => ({ email: email })),
        telefones: telefonesArray.map(telefone => ({ telefone: telefone }))
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
            alert("Cliente adicionado com sucesso!");
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
        <label for="botao-adicionar-campo-e-mail">Email adicional:</label>
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
        <label for="botao-adicionar-campo-telefone">Telefone adicional:</label>
        <input id="botao-adicionar-campo-telefone" type="tel" class="telefoneInput" name="telefone_cliente" placeholder="(00) XXXXX-XXXX">
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


// Função para abrir a modal de EDIÇÃO do cliente
function abrirModalEdicaoCliente(idCliente) {
    const modalDetalhes = document.getElementById('form-cliente-modal-detalhes');
    const modalEdicao = document.getElementById('form-cliente-modal-edicao');
  
    // Fazer requisição para obter os detalhes do cliente
    fetch(`${urlAPIClientes}/${idCliente}`)
        .then(response => {
            if (!response.ok) {
            throw new Error('Erro ao obter detalhes do cliente');
            }
        return response.json();
        })
        .then(data => {
        // Preencher os dados na modal de edição
        document.getElementById('form-cliente-id-edit').value = data.idCliente;
        document.getElementById('form-cliente-nome-edit').value = data.nomeCompleto;

        // Limpar campos de e-mail e telefone antes de preencher os valores existentes
        document.getElementById('form-cliente-emails-edit').innerHTML = '';
        document.getElementById('form-cliente-telefones-edit').innerHTML = '';

        // Preencher os emails do cliente na modal de edição
        data.emails.forEach(email => {
            const inputEmail = document.createElement('input');
            inputEmail.type = 'email';
            inputEmail.value = email.email;
            inputEmail.disabled = true; // Desabilitar edição
            document.getElementById('form-cliente-emails-edit').appendChild(inputEmail);
        });

        // Preencher os telefones do cliente na modal de edição
        data.telefones.forEach(telefone => {
            const inputTelefone = document.createElement('input');
            inputTelefone.type = 'tel';
            inputTelefone.value = telefone.telefone;
            inputTelefone.disabled = true; // Desabilitar edição
            document.getElementById('form-cliente-telefones-edit').appendChild(inputTelefone);
        });

        // Exibir apenas a modal de edição
        modalDetalhes.style.display = "none";
        modalEdicao.style.display = "block";
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao obter detalhes do cliente');
    });
}

/**
 * Função para fechar a modal de EDICAO
 */
function fecharModalEdicao() {
    const modalEdicao = document.getElementById('form-cliente-modal-edicao');
    modalEdicao.style.display = "none";
}
  

// Função para abrir a modal de DETALHES do cliente
function abrirModalDetalhesCliente(idCliente) {
    const modalDetalhes = document.getElementById('form-cliente-modal-detalhes');
    const modalEdicao = document.getElementById('form-cliente-modal-edicao');
  
    // Fazer requisição para obter os detalhes do cliente
    fetch(`${urlAPIClientes}/${idCliente}`)
        .then(response => {
            if (!response.ok) {
            throw new Error('Erro ao obter detalhes do cliente');
            }
        return response.json();
        })
        .then(data => {
        // Preencher os dados na modal
        document.getElementById('form-cliente-id').textContent = data.idCliente;
        document.getElementById('form-cliente-nome').textContent = data.nomeCompleto;
        document.getElementById('form-cliente-criado-em').textContent = data.criadoEm;
  
        // Preencher os emails do cliente na lista
        const formEmailsList = document.getElementById('form-cliente-emails');
        formEmailsList.innerHTML = '';
        if (data.emails.length > 0) {
            data.emails.forEach(email => {
                if (email.email) {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${email.idEmail}</td>
                        <td>${email.email}</td>                        
                    `;
                    formEmailsList.appendChild(row);
                }
            });
        } else {
            formEmailsList.innerHTML = '<tr><td colspan="3">Nenhum e-mail cadastrado.</td></tr>';
        }
  
        // Preencher os telefones do cliente na lista
        const formTelefonesList = document.getElementById('form-cliente-telefones');
        formTelefonesList.innerHTML = '';
        if (data.telefones.length > 0) {
            data.telefones.forEach(telefone => {
                if (telefone.telefone) {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${telefone.idTelefone}</td>
                        <td>${telefone.telefone}</td>                        
                    `;
                    formTelefonesList.appendChild(row);
                }
            });
        } else {
            formTelefonesList.innerHTML = '<tr><td colspan="3">Nenhum telefone cadastrado.</td></tr>';
        }
  
        // Exibir a modal
        modalDetalhes.style.display = "block";
        })
        .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao obter detalhes do cliente');
        });
}

/**
 * Função para fechar a modal de DETALHES
 */
function fecharModalDetalhes() {
    const modalDetalhes = document.getElementById('form-cliente-modal-detalhes');
    modalDetalhes.style.display = "none";
}

/**
 * Função para excluir cliente por ID 
 */
function excluirCliente(idCliente) {
    if (confirm("Confirma a exclusão deste cliente?")) {
        fetch(`${urlAPIClientes}/${idCliente}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao excluir cliente');
            }
            listarClientes();
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao excluir cliente');
        });
    } 
}

/**
 * Função para pesquisar peça por ID
 */
function pesquisarCliente() {
    const idCliente = document.getElementById('id_cliente').value;
    
    if (!idCliente || idCliente <= 0) {
        alert(`Favor inserir um ID válido de cliente. ID informado: ${idCliente}`);
        return;
    }

    fetch(`${urlAPIClientes}/${idCliente}`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Cliente de ID: ${idCliente} não encontrado.`);
        }
        return response.json();
        })
        .then(data => {
            const resultadoPesquisaId = document.getElementById('form-cliente-list-tuples');
            resultadoPesquisaId.innerHTML = `            
            <tr>
                <td>${data.idCliente}</td>
                <td>${data.criadoEm}</td>
                <td>${data.nomeCompleto}</td>
                <td>
                    <button class="btn-detalhes" onclick="abrirModalDetalhesCliente(${data.idCliente})">Detalhes</button>
                    <button class="btn-editar" onclick="abrirModalEdicaoCliente(${data.idCliente})">Editar</button>
                    <button class="btn-excluir" onclick="excluirCliente(${data.idCliente})">Excluir</button>                   
                </td>
            </tr>
            `;
        })
        .catch(error => {
            console.error('Erro capturado: ', error);
            alert(`Erro ao pesquisar cliente. Detalhes: ${error.message}`);
            const resultadoPesquisaId = document.getElementById('form-cliente-list-tuples');
            resultadoPesquisaId.innerHTML = ''; // Limpa o resultado anterior, se houver
        });
}

/**
 * Função para limpar os campos do formulário de pesquisa de clientes
 */
function limparPesquisaCliente() {
    document.getElementById('id_cliente').value = '';
    listarClientes();
}