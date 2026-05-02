"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import planetilson3 from '@/app/img/gb3.png'; 

// Tipagem das mensagens
interface Mensagem {
  id: number;
  texto: string;
  remetente: 'bot' | 'usuario';
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputAtual, setInputAtual] = useState('');
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const fimDasMensagensRef = useRef<HTMLDivElement>(null);

  // Efeito para carregar o nome do usuário do LocalStorage e setar a mensagem inicial
  useEffect(() => {
    let nome = 'visitante';
    
    // Tenta buscar o usuário no localStorage
    const usuarioSalvo = localStorage.getItem('usuarioLogado');
    if (usuarioSalvo) {
      try {
        const usuarioObj = JSON.parse(usuarioSalvo);
        nome = usuarioObj.nome || usuarioObj.name || 'usuário';
      } catch (error) {
        console.error("Erro ao ler usuário do localStorage", error);
      }
    }

    // Define a mensagem inicial com o nome correto
    setMensagens([
      {
        id: 1,
        texto: `Olá ${nome}, sou o seu assistente pessoal aqui da Onglink, como posso ajudá-lo hoje?`,
        remetente: 'bot',
      }
    ]);
  }, []);

  // Rolar para a última mensagem automaticamente
  useEffect(() => {
    if (fimDasMensagensRef.current) {
      fimDasMensagensRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [mensagens, isOpen]);

  // Função principal de envio e comunicação com o backend
  const enviarMensagem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputAtual.trim()) return;

    // 1. Salva a mensagem do usuário na tela imediatamente
    const textoDigitado = inputAtual;
    const novaMensagemUsuario: Mensagem = {
      id: Date.now(),
      texto: textoDigitado,
      remetente: 'usuario',
    };

    setMensagens((prev) => [...prev, novaMensagemUsuario]);
    setInputAtual(''); // Limpa o campo de texto

    // 2. Prepara o histórico para mandar para o backend
    const historicoParaEnvio = mensagens.map(m => ({
        role: m.remetente,
        content: m.texto
    }));

    try {
        // 3. Faz a requisição POST para a sua rota exata do Gemini
        const response = await fetch('http://localhost:4000/api/gemini/analisar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                mensagem: textoDigitado, 
                historico: historicoParaEnvio
            }),
        });

        const data = await response.json();

        if (data.sucesso) {
             setMensagens((prev) => [
                ...prev,
                {
                  id: Date.now() + 1,
                  texto: data.resposta,
                  remetente: 'bot',
                },
              ]);
        } else {
             console.error("Erro retornado pelo backend:", data.error);
             setMensagens((prev) => [...prev, { id: Date.now()+1, texto: "Desculpe, tive um problema ao processar isso.", remetente: 'bot' }]);
        } 

    } catch (error) {
        console.error("Erro na requisição fetch:", error);
        setMensagens((prev) => [...prev, { id: Date.now()+1, texto: "Erro de conexão com o servidor.", remetente: 'bot' }]);
    }
  }; // Fim da função enviarMensagem (O código antigo do setTimeout que ficava aqui abaixo foi removido)

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end" style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
      
      {/* Janela do Chat */}
      {isOpen && (
        <div className="mb-4 bg-white rounded-4 shadow flex flex-col overflow-hidden transition-all duration-300" style={{ height: '450px', width: '350px', maxWidth: 'calc(100vw - 2rem)', border: '1px solid #dee2e6', borderRadius: '1rem', marginBottom: '1rem' }}>
          
          {/* Header do Bot */}
          <div className="p-3 text-black d-flex align-items-center justify-content-between" style={{ backgroundColor: '#038c2559' }}>
            <div className="d-flex align-items-center gap-2" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div className="rounded-circle d-flex align-items-center justify-content-center fw-bold" >
                <Image src={planetilson3} alt="Logo" width={40} height={40} style={{ borderRadius: '50%' }} />
              </div>
              <h6 className="m-0 fw-bold">Assistente Onglink</h6>
            </div>
            <button onClick={() => setIsOpen(false)} className="btn btn-sm text-black" style={{ background: 'none', border: 'none', cursor: 'pointer' }} aria-label="Minimizar">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8z"/>
              </svg>
            </button>
          </div>

          {/* Área de Mensagens */}
          <div className="p-3 flex-grow-1 overflow-auto" style={{ flexGrow: 1, overflowY: 'auto', backgroundColor: '#f8f9fa', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {mensagens.map((msg) => (
              <div key={msg.id} style={{ display: 'flex', justifyContent: msg.remetente === 'usuario' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '85%',
                  padding: '10px 14px',
                  borderRadius: '1rem',
                  fontSize: '0.9rem',
                  backgroundColor: msg.remetente === 'usuario' ? '#198754' : '#ffffff',
                  color: msg.remetente === 'usuario' ? '#ffffff' : '#212529',
                  border: msg.remetente === 'bot' ? '1px solid #dee2e6' : 'none',
                  borderBottomRightRadius: msg.remetente === 'usuario' ? '0' : '1rem',
                  borderBottomLeftRadius: msg.remetente === 'bot' ? '0' : '1rem',
                }}>
                  {msg.texto}
                </div>
              </div>
            ))}
            <div ref={fimDasMensagensRef} />
          </div>

          {/* Input */}
          <div className="p-2 border-top bg-white" style={{ borderTop: '1px solid #dee2e6', padding: '10px', backgroundColor: 'white' }}>
            <form onSubmit={enviarMensagem} style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                value={inputAtual}
                onChange={(e) => setInputAtual(e.target.value)}
                placeholder="Digite sua mensagem..."
                className="form-control rounded-pill"
                style={{ flex: 1, borderRadius: '50rem', padding: '8px 16px', border: '1px solid #ced4da' }}
              />
              <button type="submit" disabled={!inputAtual.trim()} className="btn btn-success rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', borderRadius: '50%' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Botão Flutuante (Fechado) */}
      {!isOpen && (
        <button onClick={() => setIsOpen(true)} className="btn btn-success rounded-circle shadow d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px', borderRadius: '50%', boxShadow: '0 .5rem 1rem rgba(0,0,0,0.15)' }} aria-label="Abrir assistente">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="white" viewBox="0 0 16 16">
            <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15z"/>
          </svg>
        </button>
      )}
    </div>
  );
}