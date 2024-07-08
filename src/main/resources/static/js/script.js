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
/******************* CLIENTES ***********************/
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
                    <button class="btn-add-contato" onclick="abrirModalContato(${cliente.idCliente})">Adicionar contato</button>                    
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


// Função para abrir a modal de edição de nome do cliente
function abrirModalEdicaoCliente(idCliente) {
    const modalEdicao = document.getElementById('form-cliente-modal-edicao');
    const modalDetalhes = document.getElementById('form-cliente-modal-detalhes');
  
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
    });

    // Exibir a modal de edição e ocultar a modal de detalhes
    modalDetalhes.style.display = "none";
    modalEdicao.style.display = "block";   
         
}


/**
 * Função para salvar as alterações de nome do cliente
 */
function salvarEdicaoCliente() {
    const idCliente = document.getElementById('form-cliente-id-edit').value;
    const nomeCompleto = document.getElementById('form-cliente-nome-edit').value;

    // Fazer requisição para obter os detalhes completos do cliente
    fetch(`${urlAPIClientes}/${idCliente}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao obter detalhes completos do cliente');
            }
            return response.json();
        })
        .then(data => {
            // Atualizar o nome no objeto de dados do cliente
            data.nomeCompleto = nomeCompleto;

            // Fazer requisição para salvar as alterações do cliente
            console.log("ANTES DA REQUISIÇÃO" + JSON.stringify(data));
            return fetch(`${urlAPIClientes}/${idCliente}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao salvar as alterações do cliente');
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('form-cliente-nome').textContent = data.nomeCompleto;
            console.log("DEPOIS DA REQUISIÇÃO" + JSON.stringify(data));
            fecharModalEdicao();
            abrirModalDetalhesCliente(idCliente);
            listarClientes();
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao salvar as alterações do cliente');
        });
}

// Função para abrir a modal de EDIÇÃO de email do cliente
function adicionarNovoEmailCliente(idCliente) {
    const modalAddEmails = document.getElementById('form-cliente-modal-add-emails');
    const modalDetalhes = document.getElementById('form-cliente-modal-detalhes');

     // Exibir a modal de adição de e-mail e ocultar a modal de detalhes
     modalDetalhes.style.display = "none";
     modalAddEmails.style.display = "block";   
     
     document.getElementById('form-cliente-id-add-email').value = idCliente;    
}

/**
 * Função para salvar as adição de email do cliente
 */
function salvarNovoEmailCliente() {
    const idClienteElement = document.getElementById('form-cliente-id-add-email');
    const idCliente = idClienteElement.value; // Captura o valor do campo ID do cliente
    const novoEmail = document.getElementById('form-cliente-email-add').value.trim();

    console.log('ID do cliente antes - função salvar: ' + idCliente);

    if (!novoEmail) {
        alert("Campo de novo e-mail é obrigatório");
        return;
    }

    // Monta o objeto do novo e-mail
    const novoEmailCliente = {
        email: novoEmail
    };

    // Faz a requisição para obter os detalhes completos do cliente
    fetch(`${urlAPIClientes}/${idCliente}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao obter detalhes completos do cliente');
            }
            return response.json();
        })
        .then(data => {
            // Adiciona o novo e-mail ao array de e-mails do cliente
            data.emails.push(novoEmailCliente);

            // Faz a requisição PUT para salvar as alterações com o novo e-mail adicionado
            return fetch(`${urlAPIClientes}/${idCliente}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao salvar as alterações do cliente');
            }
            return response.json();
        })
        .then(data => {
            // Atualiza a interface com o nome do cliente
            document.getElementById('form-cliente-nome').textContent = data.nomeCompleto;
            console.log("DEPOIS DA REQUISIÇÃO" + JSON.stringify(data));

            // Fecha a modal de adição de e-mail e abre os detalhes do cliente atualizados
            fecharModalAddEmail();
            abrirModalDetalhesCliente(idCliente);
            listarClientes();
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao salvar as alterações do cliente');
        });
}

// Função para fechar a modal de adição de e-mail
function fecharModalAddEmail() {
    const modalAddEmails = document.getElementById('form-cliente-modal-add-emails');
    modalAddEmails.style.display = "none";
}

// Função para abrir a modal de EDIÇÃO de email cliente
function editarEmailCliente(idCliente, idEmail) {
    const modalEdicaoEmails = document.getElementById('form-cliente-modal-edicao-emails');
    const modalDetalhes = document.getElementById('form-cliente-modal-detalhes');
  
    // Fazer requisição para obter os detalhes do cliente
    fetch(`${urlAPIClientes}/${idCliente}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao obter detalhes do cliente');
            }
            return response.json();
        })
        .then(data => {
            // Encontrar o email específico dentro dos emails do cliente
            const email = data.emails.find(email => email.idEmail === idEmail);

            if (!email) {
                throw new Error('E-mail não encontrado para o cliente');
            }

            // Preencher os dados do e-mail na modal de edição
            const formEmailsList = document.getElementById('form-cliente-emails-edit');
            //formEmailsList.innerHTML = ''; // Limpar conteúdo anterior

            const inputEmail = document.createElement('input');
            inputEmail.type = 'email';
            inputEmail.value = email.email;
            inputEmail.dataset.idEmail = email.idEmail; // Guardar o ID do e-mail para referência
            formEmailsList.appendChild(inputEmail);

            // Exibir a modal de edição de e-mail e ocultar a modal de detalhes
            modalDetalhes.style.display = "none";
            modalEdicaoEmails.style.display = "block";   
        })
        .catch(error => {
            console.error('Erro ao obter detalhes do cliente:', error);
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
                        <td>
                            <button class="btn-novo-email" onclick="adicionarNovoEmailCliente(${email.idEmail})">Novo</button>
                            <button class="btn-editar-email" onclick="editarEmailCliente(${idCliente}, ${email.idEmail})">Editar</button>
                            <button class="btn-excluir-email" onclick="excluirEmailCliente(${email.idEmail})">Excluir</button>
                        </td>                       
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
                        <td>
                            <button class="btn-novo-telefone" onclick="adicionarNovoTelefoneCliente(${telefone.idTelefone})">Novo</button>
                            <button class="btn-editar-telefone" onclick="editarTelefoneCliente(${telefone.idTelefone})">Editar</button>
                            <button class="btn-excluir-telefone" onclick="excluirTelefoneCliente(${telefone.idTelefone})">Excluir</button>
                        </td>                      
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

/****************************************************/
/******************* CONTATOS ***********************/
/****************************************************/

/** Salvar contato e associar a cliente com ID determinado */
function salvarContato(cliente) {
    console.log("PARAMETRO ANTES -> ID do cliente para salvar contato:", cliente);
    const idCliente = document.getElementById('form-cliente-id-contato').innerText;
    console.log("Salvar contato idCliente: " + idCliente);

    // Coletar dados do formulário
    const nomeContato = document.getElementById('nome-contato').value.trim();
    const emailInputs = document.querySelectorAll('.emailInputContato');
    const telefoneInputs = document.querySelectorAll('.telefoneInputContato');

    const emailsArray = Array.from(emailInputs).map(emailInput => emailInput.value.trim());
    if (emailsArray.some(email => email === '')) {
        alert("Favor preencher todos os campos de e-mail.");
        return;
    }

    const telefonesArray = Array.from(telefoneInputs).map(telefoneInput => telefoneInput.value.trim());
    if (telefonesArray.some(telefone => telefone === '')) {
        alert("Favor preencher todos os campos de telefone.");
        return;
    }

    if (!nomeContato || emailsArray.length === 0 || telefonesArray.length === 0) {
        alert("Todos os campos são obrigatórios e devem conter valores válidos.");
        return;
    }

    // Construir objeto do novo contato
    const novoContato = {
        nomeCompleto: nomeContato,
        emails: emailsArray.map(email => ({ email: email })),
        telefones: telefonesArray.map(telefone => ({ telefone: telefone }))
    };

    // Enviar solicitação POST para a API
    fetch(`${urlAPIClientes}/${idCliente}/contatos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoContato)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao adicionar contato');
        }
        return response.json();
    })
    .then(data => {
        alert("Contato adicionado com sucesso!");
        console.log(data);
        adicionarContatoNaTabela(idCliente, data);
        fecharModalContato();
        listarClientes();
        listarContatosPorCliente(idCliente);
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao adicionar contato');
    });
}

/** Fechar modal de contato */
function fecharModalContato() {
    document.getElementById('form-cliente-modal-contato').style.display = 'none';
}


// Abrir modal com os dados do cliente preenchidos
function abrirModalContato(cliente) {
    console.log("ANTES - Chamou abrirModalContato para o cliente ID:", cliente);
    document.getElementById('form-cliente-id-contato').innerText = cliente;
    document.getElementById('form-cliente-modal-contato').style.display = 'block';

    // Limpar os campos do formulário de adicionar contato
    document.getElementById('nome-contato').value = '';

     // Limpar campos de e-mail
     const divEmailsContato = document.getElementById('divEmailsContato');
     divEmailsContato.innerHTML = `
         <label for="email_contato-add">E-mail:</label>
         <input type="email" class="emailInputContato" name="email_contato-add" placeholder="nome@email.com" required>
         <button type="button" onclick="adicionarCampoEmailContato()">Adicionar campo de e-mail</button>
     `;
 
     // Limpar campos de telefone
     const divTelefonesContato = document.getElementById('divTelefonesContato');
     divTelefonesContato.innerHTML = `
         <label for="telefone_contato-add">Telefone:</label>
         <input type="tel" class="telefoneInputContato" name="telefone_contato-add" placeholder="(00) 0000-0000" required>
         <button type="button" onclick="adicionarCampoTelefoneContato()">Adicionar campo de telefone</button>
     `;

    console.log("DEPOIS - Chamou abrirModalContato para o cliente ID:", cliente);
}

function adicionarCampoEmailContato() {
    const divEmailsContato = document.getElementById('divEmailsContato');
    const novoCampoEmail = document.createElement('div');
    novoCampoEmail.innerHTML = `
        <input type="email" class="emailInputContato" name="email_contato-add" placeholder="nome@email.com" required>
        <button type="button" onclick="removerCampoEmailContato(this)">Remover</button>
    `;
    divEmailsContato.insertBefore(novoCampoEmail, divEmailsContato.lastElementChild);
}

function adicionarCampoTelefoneContato() {
    const divTelefonesContato = document.getElementById('divTelefonesContato');
    const novoCampoTelefone = document.createElement('div');
    novoCampoTelefone.innerHTML = `
        <input type="tel" class="telefoneInputContato" name="telefone_contato-add" placeholder="(00) 0000-0000" required>
        <button type="button" onclick="removerCampoTelefoneContato(this)">Remover</button>
    `;
    divTelefonesContato.insertBefore(novoCampoTelefone, divTelefonesContato.lastElementChild);
}

function removerCampoEmailContato(button) {
    const campoParaRemover = button.parentNode;
    campoParaRemover.remove();
}

function removerCampoTelefoneContato(button) {
    const campoParaRemover = button.parentNode;
    campoParaRemover.remove();
}


/** Adicionar os contatos à lista de detalhes de cliente */
function adicionarContatoNaTabela(idCliente, contato) {
    const tabelaContatos = document.getElementById('form-cliente-contatos');
    const novaLinha = tabelaContatos.insertRow();

    const celulaId = novaLinha.insertCell(0);
    const celulaNome = novaLinha.insertCell(1);
    const celulaAcoes = novaLinha.insertCell(2);

    celulaId.textContent = contato.idContato;
    celulaNome.textContent = contato.nomeCompleto;
    celulaAcoes.innerHTML = `
        <button class="btn-detalhes-contato" onclick="detalhesContato(${idCliente}, ${contato.idContato})">Detalhes</button>
        <button class="btn-editar-contato" onclick="editarContato(${idCliente}, ${contato.idContato})">Editar</button>
        <button class="btn-excluir-contato" onclick="excluirContato(${idCliente}, ${contato.idContato})">Excluir</button>
    `;    
}

/** Listar os contatos do cliente de acordo com o ID */
function listarContatosPorCliente(idCliente) {
    fetch(`${urlAPIClientes}/${idCliente}/contatos`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao listar contatos do cliente');
            }
            return response.json();
        })
        .then(data => {
            const tabelaContatos = document.getElementById('form-cliente-contatos');
            tabelaContatos.innerHTML = '';

            if (data.length === 0) {
                tabelaContatos.innerHTML = '<tr><td colspan="3">Nenhum contato cadastrado.</td></tr>';
                return;
            }

            data.forEach(contato => {
                const novaLinha = tabelaContatos.insertRow();
                const celulaId = novaLinha.insertCell(0);
                const celulaNome = novaLinha.insertCell(1);
                const celulaAcoes = novaLinha.insertCell(2);

                celulaId.textContent = contato.idContato;
                celulaNome.textContent = contato.nomeCompleto;
                celulaAcoes.innerHTML = `
                    <button class="btn-detalhes-contato" onclick="detalhesContato(${idCliente}, ${contato.idContato})">Detalhes</button>
                    <button class="btn-editar-contato" onclick="editarContato(${idCliente}, ${contato.idContato})">Editar</button>
                    <button class="btn-excluir-contato" onclick="excluirContato(${idCliente}, ${contato.idContato})">Excluir</button>
                `; 
            });
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao listar contatos do cliente');
        });
}

/** Exibir detalhes do contato associação ao cliente */
function detalhesContato(idCliente, idContato) {
    console.log("Cliente: " + idCliente +" Contato: " + idContato); 

    const modalDetalhesContato = document.getElementById('form-cliente-modal-contato-detalhes');    

     // Limpar tabelas antes de preencher novos dados
     document.getElementById('detalhes-emails-contato').innerHTML = '';
     document.getElementById('detalhes-telefones-contato').innerHTML = '';
        
    // Fazer requisição para obter os detalhes do contato
    fetch(`${urlAPIClientes}/${idCliente}/contatos/${idContato}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao obter detalhes do contato');
            }
            return response.json();
        })
        .then(data => {
            // Preencher os dados na modal
            document.getElementById('detalhes-id-contato').textContent = data.idContato;
            document.getElementById('detalhes-nome-contato').textContent = data.nomeCompleto;

            // Preencher os e-mails do contato
            const tabelaEmails = document.getElementById('detalhes-emails-contato');
            data.emails.forEach(email => {
                const linha = tabelaEmails.insertRow();
                const celulaEmail = linha.insertCell();
                celulaEmail.textContent = email.email;
            });

            // Preencher os telefones do contato
            const tabelaTelefones = document.getElementById('detalhes-telefones-contato');
            data.telefones.forEach(telefone => {
                const linha = tabelaTelefones.insertRow();
                const celulaTelefone = linha.insertCell();
                celulaTelefone.textContent = telefone.telefone;
            });

            // Exibir a modal
            modalDetalhesContato.style.display = "block";
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao obter detalhes do contato');
        });
}

/** Fechar o modal de detalhes de contato */
function fecharModalContatoDetalhes() {
    const modalDetalhesContato = document.getElementById('form-cliente-modal-contato-detalhes');
    modalDetalhesContato.style.display = "none";
}

// Variável global para controlar se o botão de salvar já foi adicionado
let botaoSalvarAdicionado = false;

/** Função para editar os dados do contato associado ao cliente */
function editarContato(idCliente, idContato) {
    console.log("Cliente: " + idCliente  + "Contato: " + idContato);

    document.getElementById('form-contato-id-edit').value = idContato;
    document.getElementById('form-cliente-modal-contato-editar').style.display = 'block';

    const botaoSalvar = document.getElementById('modal-content-contato-editar');

    // Verifica se o botão de salvar já foi adicionado
    if (!botaoSalvarAdicionado) {
        const btnSalvar = document.createElement('button');
        btnSalvar.classList.add('btn-salvar-contato');
        btnSalvar.textContent = 'Salvar contato';

        btnSalvar.onclick = function () {
            salvarEdicaoContato(idCliente, idContato);
        };

        botaoSalvar.appendChild(btnSalvar);
        botaoSalvarAdicionado = true; 
    }
    
}

/** Função para salvar a edição do nome do contato associado ao cliente */
function salvarEdicaoContato(idCliente, idContato) {
    console.log("salvar antes: Cliente: " + idCliente  + "Contato: " + idContato);
    const novoNome = document.getElementById('form-contato-nome-edit').value;
    console.log("salvar depois: Cliente: " + idCliente  + "Contato: " + idContato);
    const contatoAtualizado = {
        idContato: idContato,
        nomeCompleto: novoNome
    };

    fetch(`${urlAPIClientes}/${idCliente}/contatos/${idContato}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contatoAtualizado)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao salvar edição do contato');
        }
        console.log(`Edição do nome do contato ID ${idContato} salva com sucesso`);
        fecharModalContatoEdicao(); 
        listarClientes();
        listarContatosPorCliente(idCliente);
    })
    .catch(error => {
        console.error('Erro ao salvar edição do contato:', error);
        // Trate o erro conforme necessário (exibir mensagem de erro, etc.)
        alert('Erro ao salvar edição do contato. Verifique o console para mais detalhes.');
    });
}

/** Função para fechar a modal de edição do nome do contato associado ao cliente */
function fecharModalContatoEdicao() {
    document.getElementById('form-cliente-modal-contato-editar').style.display = 'none';
}

/** Função para excluir o contato associado ao cliente */
function excluirContato(idCliente, idContato) {
    // Confirmar a exclusão do contato
    console.log("Cliente: " + idCliente  + "Contato: " + idContato);
    if (confirm("Tem certeza de que deseja excluir este contato?")) {
        fetch(`${urlAPIClientes}/${idCliente}/contatos/${idContato}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao excluir contato');
            }
            // Remover a linha correspondente ao contato excluído
            const tabelaContatos = document.getElementById('form-cliente-contatos');
            const linhas = tabelaContatos.getElementsByTagName('tr');

            for (let i = 0; i < linhas.length; i++) {
                const celulas = linhas[i].getElementsByTagName('td');
                if (celulas.length > 0 && celulas[0].textContent === idContato.toString()) {
                    tabelaContatos.deleteRow(i);
                    break; // Sai do loop após remover a linha correta
                }
            }
            alert("Contato excluído com sucesso!");            
            listarClientes();
            removerDetalhesContato(); 
            //listarContatosPorCliente(idCliente);
            //abrirModalDetalhesCliente(idCliente);
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao excluir contato');
        });
    }
}

/** Função para remover os contatos associados ao cliente após exclusão */
function removerDetalhesContato() {
    document.getElementById('form-contato-id-edit').value = '';
    document.getElementById('form-contato-nome-edit').value = '';
}


/** Função que gera o relatório de cliente em PDF com os respectivos contatos */
function gerarRelatorio() {
    // Verifica se há clientes na lista antes de gerar o relatório
    const listaClientes = document.getElementById('form-cliente-list-tuples');
    if (listaClientes.rows.length === 0) {
        alert('Não há clientes cadastrados para gerar o relatório.');
        return;
    }

     // Se houver clientes, faz a requisição para gerar o relatório em PDF
     fetch(`${urlAPIClientes}/relatorio`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao gerar relatório');
            }
            return response.blob();
        })
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${new Date().toISOString().split('T')[0]}_Relatorio_Clientes.pdf`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao gerar relatório');
        });
}