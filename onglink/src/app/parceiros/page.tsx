// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import {
//   Button,
//   Col,
//   Row,
//   Form,
//   FormLabel,
//   InputGroup,
//   FormControl,
// } from "react-bootstrap";
// import logo_onglink_01 from "@/app/img/LOGO_ONGLINK_1.png";
// import image_home from "@/app/img/image_home.jpg";
// import logo_muxn from "@/app/img/MUXN_logo1.png";
// import React from "react";
// import { useRouter } from "next/navigation";
// import "@/app/CSS/home.css";
// import "@/app/CSS/header_alt.css";
// import "@/app/CSS/menu.css";
// import "@/app/CSS/main.css";
// import "@/app/CSS/body.css";
// import "@/app/CSS/parceiros.css";
// import Header_home from "@/app/components/header_home";
// import CardsParceiros from "@/app/components/card_parceiros";
// import arara from "@/app/img/arara.jpeg";

// export default function Parceiros() {
//   const router = useRouter();

//   return (
//     <>
//       {/*<!--Header--> */}

//       <Header_home />

//       {/* <!--Main--> */}

//       <main id="main_parceiros">
//         <div className="" id="page_title">
//           <h1>NOSSOS PARCEIROS</h1>
//         </div>

//         <div className="container-fluid col-12">
//           <form className="form-busca" role="search">
//             <InputGroup id="ong_busca">
//               <Form.Control
//                 placeholder="Procurar ONG"
//                 aria-label="Procurar ONG"
//                 aria-describedby="basic-addon2"
//                 className="input-busca"
//               />
//               <Button id="botaoBuscar" className="btn-busca">
//                 Buscar
//               </Button>
//             </InputGroup>
//           </form>

//           <div id="fundo_navbar">
//             <div className="row">
//               <div className="col-12">
//                 <nav id="navbar">
//                   <ul id="items_list">
//                     <Link href="/">
//                       <li>Meio ambiente</li>
//                     </Link>
//                     <Link href="/">
//                       <li>Saúde</li>
//                     </Link>
//                     <Link href="/">
//                       <li>Educação</li>
//                     </Link>
//                     <Link href="/">
//                       <li>Exibir todos</li>
//                     </Link>
//                   </ul>
//                 </nav>
//               </div>
//             </div>
//           </div>

//           <div id="div_parceiros">
//             <div className="row">
//               <div className="container-fluid">
//                 <h2>PARCEIROS DA EDUCAÇÃO</h2>
//                 <div className="d-flex " id="educacao">
//                   <CardsParceiros
//                     titulo="Outra ONG"
//                     imagem={arara}
//                     resumo="prévia."
//                     link="/"
//                   />

//                   <CardsParceiros
//                     titulo="Outra ONG"
//                     imagem={logo_muxn}
//                     resumo="prévia."
//                     link="/"
//                   />
//                   <div className="d-flex align-items-center justify-content-end w-100">
//                     <button id="educacao">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="30"
//                         height="30"
//                         fill="currentColor"
//                         className="bi bi-plus-circle"
//                         viewBox="0 0 16 16"
//                         stroke="currentColor"
//                       >
//                         <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
//                         <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
//                       </svg>
//                     </button>
//                   </div>
//                 </div>

//                 <h2>PARCEIROS CONTRA A FOME</h2>
//                 <div className="d-flex " id="fome">
//                   <CardsParceiros
//                     titulo="Outra ONG"
//                     imagem={logo_muxn}
//                     resumo="prévia."
//                     link="/"
//                   />

//                   <CardsParceiros
//                     titulo="Outra ONG"
//                     imagem={logo_muxn}
//                     resumo="prévia."
//                     link="/"
//                   />
//                   <div className="d-flex align-items-center justify-content-end w-100">
//                     <button id="fome">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="30"
//                         height="30"
//                         fill="currentColor"
//                         className="bi bi-plus-circle"
//                         viewBox="0 0 16 16"
//                         stroke="currentColor"
//                       >
//                         <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
//                         <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
//                       </svg>
//                     </button>
//                   </div>
//                 </div>

//                 <h2>PARCEIROS DA SAÚDE</h2>
//                 <div className="d-flex " id="saude">
//                   <CardsParceiros
//                     titulo="Outra ONG"
//                     imagem={logo_muxn}
//                     resumo="prévia."
//                     link="/"
//                   />

//                   <CardsParceiros
//                     titulo="Outra ONG"
//                     imagem={logo_muxn}
//                     resumo="prévia."
//                     link="/"
//                   />
//                   <div className="d-flex align-items-center justify-content-end w-100">
//                     <button id="saude">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="30"
//                         height="30"
//                         fill="currentColor"
//                         className="bi bi-plus-circle"
//                         viewBox="0 0 16 16"
//                         stroke="currentColor"
//                       >
//                         <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
//                         <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
//                       </svg>
//                     </button>
//                   </div>
//                 </div>

//                 <h2>PARCEIROS DO MEIO AMBIENTE</h2>
//                 <div className="d-flex " id="meio_ambiente">
//                   <CardsParceiros
//                     titulo="Outra ONG"
//                     imagem={logo_muxn}
//                     resumo="prévia."
//                     link="/"
//                   />

//                   <CardsParceiros
//                     titulo="Outra ONG"
//                     imagem={logo_muxn}
//                     resumo="prévia."
//                     link="/"
//                   />
//                   <div className="d-flex align-items-center justify-content-end w-100">
//                     <button id="meio_ambiente">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="30"
//                         height="30"
//                         fill="currentColor"
//                         className="bi bi-plus-circle"
//                         viewBox="0 0 16 16"
//                         stroke="currentColor"
//                       >
//                         <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
//                         <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
//                       </svg>
//                     </button>
//                   </div>
//                 </div>

//                 <h2>PARCEIROS DOS ANIMAIS</h2>
//                 <div className="d-flex " id="animais">
//                   <CardsParceiros
//                     titulo="Outra ONG"
//                     imagem={logo_muxn}
//                     resumo="prévia."
//                     link="/"
//                   />

//                   <CardsParceiros
//                     titulo="Outra ONG"
//                     imagem={logo_muxn}
//                     resumo="prévia."
//                     link="/"
//                   />
//                   <div className="d-flex align-items-center justify-content-end w-100">
//                     <button id="animais">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="30"
//                         height="30"
//                         fill="currentColor"
//                         className="bi bi-plus-circle"
//                         viewBox="0 0 16 16"
//                         stroke="currentColor"
//                       >
//                         <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
//                         <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
//                       </svg>
//                     </button>
//                   </div>
//                 </div>

//                 <h2>PARCEIROS DA SOCIEDADE</h2>
//                 <div className="d-flex " id="sociedade">
//                   <CardsParceiros
//                     titulo="Outra ONG"
//                     imagem={logo_muxn}
//                     resumo="prévia."
//                     link="/"
//                   />

//                   <CardsParceiros
//                     titulo="Outra ONG"
//                     imagem={logo_muxn}
//                     resumo="prévia."
//                     link="/"
//                   />
//                   <div className="d-flex align-items-center justify-content-end w-100">
//                     <button id="sociedade">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="30"
//                         height="30"
//                         fill="currentColor"
//                         className="bi bi-plus-circle"
//                         viewBox="0 0 16 16"
//                         stroke="currentColor"
//                       >
//                         <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
//                         <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
//                       </svg>
//                     </button>
//                   </div>
//                 </div>

//                 <h2>PARCEIROS DAS CRIANÇAS</h2>
//                 <div className="d-flex " id="criancas">
//                   <CardsParceiros
//                     titulo="Outra ONG"
//                     imagem={logo_muxn}
//                     resumo="prévia."
//                     link="/"
//                   />

//                   <CardsParceiros
//                     titulo="Outra ONG"
//                     imagem={logo_muxn}
//                     resumo="prévia."
//                     link="/"
//                   />
//                   <div className="d-flex align-items-center justify-content-end w-100">
//                     <button id="criancas">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="30"
//                         height="30"
//                         fill="currentColor"
//                         className="bi bi-plus-circle"
//                         viewBox="0 0 16 16"
//                         stroke="currentColor"
//                       >
//                         <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
//                         <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
//                       </svg>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </>
//   );
// }





















'use client';

import Image from "next/image";
import Link from "next/link";
import {
  Button,
  Modal, 
} from "react-bootstrap";
import React, { useState, useEffect, useCallback } from "react";
// O componente Header_home e CardsParceiros devem estar importados de seus respectivos caminhos
import Header_home from "@/app/components/header_home";
import CardsParceiros from "@/app/components/card_parceiros"; 
// Se você usa next/navigation, mantenha a importação:
import { useRouter } from "next/navigation";
import parceiroService from "@/app/services/parceiroService";


// -------------------------------------------------------------------
// [Frontend] CONSTANTES E TIPAGEM
// -------------------------------------------------------------------

// A URL deve ser ajustada para o seu ambiente de produção/teste se não for localhost:4000
//const API_URL = 'http://localhost:4000/api/parceiros'; 
// const API_URL = 'https://onglink-backend.vercel.app/api/parceiros';

const ITEMS_PER_LOAD = 4; 

// Lista de categorias válidas (Sem acentos para bater com o valor do DB)
const CATEGORIAS_VALIDAS = [
    'Ambiental', 
    'Animal', 
    'Educacao', 
    'Saude', 
    'Social'
]; 

// Mapeamento de cores para as categorias
const CATEGORY_COLORS = {
    'Ambiental': '#28a745', // Verde
    'Animal': '#ffc107',    // Amarelo
    'Educacao': '#007bff',   // Azul
    'Saude': '#dc3545',     // Vermelho
    'Social': '#6f42c1',    // Roxo
};

// Mapeamento de IDs
const categoryIdMap = {
    'Ambiental': 'ambiental',
    'Animal': 'animal', 
    'Educacao': 'educacao',
    'Saude': 'saude',
    'Social': 'social'
};


// NOVAS INTERFACES para sub-documentos (para tipagem limpa no Modal)
type RedeSocial = {
    instagram?: string;
    facebook?: string;
    site?: string;
};

type Endereco = {
    rua?: string;
    numeroEnd?: string;
    complemento?: string;
    bairro?: string;
    cidade?: string;
    estado?: string;
    cep?: string;
};

interface Parceiro {
    _id?: string;
    nomeFantasia: string; 
    telefone: string;     
    logo: string;        // URL da imagem
    causaSocial: string;
    email: string;       
    descricao: string;   
    link?: string; // Mantido para compatibilidade, mas o site está em redeSocial
    
    // CAMPOS ADICIONAIS DO MODAL (Retornados pelo parceiroController.js)
    razaoSocial: string; 
    endereco: Endereco;  
    redeSocial: RedeSocial; 
}

type ParceirosAgrupados = { [key: string]: Parceiro[]; };
type VisibleCounts = { [key: string]: number; };

// -------------------------------------------------------------------
// [Frontend] COMPONENTE PRINCIPAL
// -------------------------------------------------------------------
export default function Parceiros() {
  const router = useRouter(); // Se não for usado, pode ser removido
  
  const [parceirosAgrupados, setParceirosAgrupados] = useState<ParceirosAgrupados>({});
  const [visibleCounts, setVisibleCounts] = useState<VisibleCounts>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [totalFetched, setTotalFetched] = useState(0); 

  // ESTADO DO MODAL
  const [showModal, setShowModal] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<Parceiro | null>(null);

  // Handlers do Modal
  const handleClose = () => setShowModal(false);
  
  const handleViewDetails = (partner: Parceiro) => {
      setSelectedPartner(partner);
      setShowModal(true);
  };

  // Método para buscar e agrupar os parceiros
  const fetchAndGroupParceiros = useCallback(async () => {
      try {
        const responseJson = await parceiroService.listarParceiro();
        
        // Assume que a resposta é um array, mas adiciona fallback
        
        // Assume que a resposta é um array, mas adiciona fallback
        let rawData: any = responseJson;
        if (responseJson && !Array.isArray(responseJson)) {
            rawData = (responseJson.parceiros || responseJson.data) || [];
        }
        const finalDataArray = rawData as Parceiro[]; 
        
        setTotalFetched(finalDataArray.length);
        
        // 1. Inicializa os grupos
        const gruposIniciais: ParceirosAgrupados = CATEGORIAS_VALIDAS.reduce((acc, cat) => {
            acc[cat] = [];
            return acc;
        }, {} as ParceirosAgrupados);

        // 2. Agrupa os parceiros
        const grupos = finalDataArray.reduce((acc, parceiro) => {
            const causaSocialDoParceiro = parceiro.causaSocial; 
            
            const categoriaChave = CATEGORIAS_VALIDAS.find(validCat => 
                validCat.toLowerCase() === causaSocialDoParceiro.toLowerCase().trim() 
            );

            if (categoriaChave) {
                if (!acc[categoriaChave]) {
                    acc[categoriaChave] = [];
                }
                acc[categoriaChave].push(parceiro);
            } 
            return acc;
        }, gruposIniciais);

        setParceirosAgrupados(grupos);
        
        // 3. Inicializa a contagem visível
        const initialCounts = CATEGORIAS_VALIDAS.reduce((acc, cat) => {
            acc[cat] = ITEMS_PER_LOAD;
            return acc;
        }, {} as VisibleCounts);
        setVisibleCounts(initialCounts);

      } catch (err) {
        console.error("Erro ao buscar parceiros:", err);
        setError(`Erro ao carregar lista: ${err instanceof Error ? err.message : 'Verifique o console para detalhes.'}`);
      } finally {
        setIsLoading(false);
      }
  }, []);

  useEffect(() => {
    fetchAndGroupParceiros();
  }, [fetchAndGroupParceiros]);


  // Método para carregar mais itens (Load More)
  const handleLoadMore = (category: string) => {
      setVisibleCounts(prevCounts => ({
          ...prevCounts,
          [category]: prevCounts[category] + ITEMS_PER_LOAD,
      }));
  };

  // Componente para Renderizar uma Seção de Categoria
  const RenderCategorySection = ({ categoryName, idName }: { categoryName: string, idName: string }) => {
    const allUsers = parceirosAgrupados[categoryName] || [];
    const visibleCount = visibleCounts[categoryName] || 0;
    const usersToShow = allUsers.slice(0, visibleCount);
    const totalUsers = allUsers.length;
    const hasMore = totalUsers > visibleCount;
    const categoryColor = CATEGORY_COLORS[categoryName as keyof typeof CATEGORY_COLORS] || '#6c757d'; 

    if (totalUsers === 0) return null; 

    return (
        <>
            {/* TÍTULO E BORDA DA SEÇÃO */}
            <div style={{ border: `2px solid ${categoryColor}`, borderRadius: '8px', padding: '15px', marginBottom: '25px' }}>
                
                <h2>PARCEIROS {categoryName.toUpperCase()} ({totalUsers})</h2>
                
                {/* CLASSE justify-content-center ADICIONADA PARA CENTRALIZAÇÃO */}
                <div className="d-flex flex-wrap justify-content-center" id={idName}>
                    
                    {/* 1. RENDERIZA OS CARDS VISÍVEIS */}
                    {usersToShow.map((parceiro, index) => (
                        <CardsParceiros
                            key={parceiro._id || `${categoryName}-${index}`} 
                            titulo={parceiro.nomeFantasia} 
                            resumo={parceiro.telefone}     
                            imagem={parceiro.logo} 
                            link={parceiro.link || parceiro.redeSocial?.site || '#'} // Usa o site como link
                            borderColor={categoryColor} 
                            
                            // PROPS PARA O MODAL
                            onViewDetails={handleViewDetails}
                            partnerData={parceiro} 
                        />
                    ))}

                    {/* 2. BOTÃO CARREGAR MAIS */}
                    {hasMore && (
                        <div className="d-flex align-items-center justify-content-center w-100" style={{ margin: '15px 0' }}>
                            <button id={idName} onClick={() => handleLoadMore(categoryName)} disabled={isLoading}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0 15px' }}>
                                <svg 
                                  xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill={categoryColor} 
                                  className="bi bi-plus-circle" viewBox="0 0 16 16" stroke="currentColor">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
  };


  // --------------------------------------------------
  // Renderização Final (Inclui o Modal de Detalhes)
  // --------------------------------------------------
  return (
    <>
      <Header_home />

      <main id="main_parceiros">
        <div className="container-fluid col-12 mt-2 mb-2">
          {/* ... (Busca e navegação estática) ... */}
          
          {/* Mensagens de Erro/Carregamento */}
          {isLoading && <p>Carregando dados dos parceiros...</p>}
          {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}
          
          {/* INIDICADOR DE DIAGNÓSTICO NA UI */}
          {/*{totalFetched > 0 && <p style={{fontWeight: 'bold', color: 'blue', marginTop: '10px'}}>Total de Parceiros Encontrados no Backend: {totalFetched}</p>}*/}
          {totalFetched === 0 && !isLoading && !error && <p style={{fontWeight: 'bold', color: 'orange', marginTop: '10px'}}>Nenhum parceiro aprovado encontrado na base de dados.</p>}


          {/* DIVS DOS PARCEIROS (ÁREA DINÂMICA) */}
          {!isLoading && !error && ( 
            <div id="div_parceiros">
              <div className="row">
                <div className="container-fluid">
                    
                    {/* Mapeamento Dinâmico para as Seções */}
                    {CATEGORIAS_VALIDAS.map(category => (
                        <RenderCategorySection 
                            key={category}
                            categoryName={category}
                            idName={categoryIdMap[category as keyof typeof categoryIdMap]} 
                        />
                    ))}

                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* COMPONENTE MODAL DE DETALHES */}
      <Modal show={showModal} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedPartner?.nomeFantasia || "Detalhes do Parceiro"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPartner ? (
            <div>
              <div className="text-center mb-4 flex justify-content-center">
                  {/* Logo da ONG */}
                  {selectedPartner.logo && (
                      <Image 
                          src={selectedPartner.logo} 
                          alt={`Logo ${selectedPartner.nomeFantasia}`} 
                          width={300} 
                          height={300} 
                          className="rounded-circle border"
                          style={{ objectFit: "cover" }}
                      />
                  )}
                 
              </div>
              
              <hr />

              {/* GRUPO DE INFORMAÇÕES DE CONTATO */}
              <h5 className="mb-2">Contato & Sede</h5>
              <div className="row">
                <div className="col-md-6 mb-3">
                    <p className="mb-1"><strong>Telefone:</strong> {selectedPartner.telefone}</p>
                    <p className="mb-1"><strong>Email:</strong> {selectedPartner.email || 'Não informado'}</p>
                </div>

                <div className="col-md-6 mb-3">
                    {/* Endereço */}
                    <p className="mb-1">
                        <strong>Endereço:</strong> {selectedPartner.endereco?.rua}, {selectedPartner.endereco?.numeroEnd} {selectedPartner.endereco?.complemento}
                    </p>
                    <p className="mb-1">
                        {selectedPartner.endereco?.bairro} - {selectedPartner.endereco?.cidade}/{selectedPartner.endereco?.estado} | CEP: {selectedPartner.endereco?.cep}
                    </p>
                </div>
              </div>

              <hr />
              
              {/* REDES SOCIAIS */}
              <h5 className="mb-2">Redes e Site</h5>
              <div className="d-flex gap-3 mb-4">
                  {selectedPartner.redeSocial?.site && (
                      <a href={selectedPartner.redeSocial.site} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary btn-sm">
                          Site Oficial
                      </a>
                  )}
                  {selectedPartner.redeSocial?.instagram && (
                      <a href={selectedPartner.redeSocial.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-outline-danger btn-sm">
                          Instagram
                      </a>
                  )}
                  {selectedPartner.redeSocial?.facebook && (
                      <a href={selectedPartner.redeSocial.facebook} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary btn-sm">
                          Facebook
                      </a>
                  )}
              </div>
              
              <hr />
              
              {/* DESCRIÇÃO */}
              <h5 className="mb-2">Descrição da ONG</h5>
              <p>{selectedPartner.descricao || 'Nenhuma descrição disponível.'}</p>

            </div>
          ) : (
            <p>Carregando informações...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

