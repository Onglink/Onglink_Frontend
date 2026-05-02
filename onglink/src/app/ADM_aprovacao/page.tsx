"use client";

import Header_feed from "@/app/components/header_feed";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/app/CSS/feed.css";
import "@/app/CSS/header_alt.css";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";
import { ICadastro } from "./ICadastro";
import { ApprovalTable } from '@/app/components/tabela_adm/ApprovalTable';
import { ApprovalTableRow } from '../components/tabela_adm/ApprovalTableRow';
import { ImageModal } from '@/app/components/tabela_adm/ImageModal';
import { FileModal } from '@/app/components/tabela_adm/FileModal';
import { ApprovalModal } from '@/app/components/tabela_adm/ApprovalModal';
import ongService from "@/app/services/ongService";

export default function ADM_aprovacao() {
    const [products, setProducts] = useState<ICadastro[]>([]);
    const router = useRouter();
    const [showImageModal, setShowImageModal] = useState<'images1' | 'images2' | null>(null);
    const [showFileModal, setShowFileModal] = useState<'files1' | 'files2' | null>(null);
    const [showAprovacaoModal, setShowAprovacaoModal] = useState(false);
    const [zoomedImage, setZoomedImage] = useState<string | null>(null);

    useEffect(() => {
        const listProducts = async() => {
            try {
                const data = await ongService.listarAprovacoes();
                setProducts(data);
                console.log(data);
            } catch (error) {
                console.error("Erro ao buscar aprovações:", error);
            }
        }
        listProducts();
    }, []);

    const handleZoomImage = (imgSrc: string) => {
        setZoomedImage(imgSrc);
    };

    const closeZoom = () => {
        setZoomedImage(null);
    };

    const imageUrls1 = [
        "https://images.pexels.com/photos/29397646/pexels-photo-29397646/free-photo-of-grupo-de-meninas-adolescentes-sorrindo-juntas-dentro-de-casa.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/29395685/pexels-photo-29395685/free-photo-of-recepcao-de-casamento-elegante-com-casal-sorridente.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/29416174/pexels-photo-29416174/free-photo-of-camera-digital-olympus.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/29437096/pexels-photo-29437096/free-photo-of-um-dia-agradavel.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/29382413/pexels-photo-29382413/free-photo-of-jovens-adultos-em-estrutura-de-escalada-de-playground.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/29371042/pexels-photo-29371042/free-photo-of-celebracao-de-casamento-tradicional-com-arranjos-florais.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ];

    const imageUrls2 = [
        "https://images.pexels.com/photos/28354746/pexels-photo-28354746.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/3491940/pexels-photo-3491940.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/697244/pexels-photo-697244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/4262424/pexels-photo-4262424.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/1387037/pexels-photo-1387037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ];

    const fileUrls1 = [
        "https://diariooficial.imprensaoficial.com.br/doflash/prototipo/2024/Novembro/04/exec3/pdf/pg_0001.pdf",
        "https://diariooficial.imprensaoficial.com.br/doflash/prototipo/2024/Novembro/04/municipios/pdf/pg_0001.pdf"
    ];

    const fileUrls2 = [
        "https://do-api-publication-pdf.doe.sp.gov.br/v1/editions/2346d204-a2ac-4c75-8d22-5d1a70e8737c",
        "https://noticias.sorocaba.sp.gov.br/wp-content/uploads/2025/06/noticias.sorocaba.sp.gov.br-3737-18-de-junho-de-2025.pdf"
    ];

    // Dados mockados para a tabela (substitituir pelas informações depois que tiver conexão com o banco de dados)
    const tableData = [
        {
            id: "0111",
            requestType: "Criar Conta",
            orgName: "ONGExemplo 1",
            responsibleName: "Costa Silva",
            requestDate: "16/11/2024",
            status: "Negada",
            obs: "Documentos enviados estão com informações faltantes",
            approvalResponsible: "Cláudio Willian Moura Henrique"
        },
        {
            id: "0112",
            requestType: "Reportar Publicação",
            orgName: "MUNDO.Company",
            responsibleName: "Cleber Helio de Souza",
            requestDate: "17/11/2024",
            status: "Aprovado",
            obs: "Tudo certo",
            approvalResponsible: "Cláudio Willian Moura Henrique"
        },
        {
            id: "0113",
            requestType: "Reportar Publicação",
            orgName: "Testes.INC",
            responsibleName: "Roberto Gomes",
            requestDate: "17/11/2024",
            status: "Não Avaliado",
            obs: "",
            approvalResponsible: ""
        },
        {
            id: "0114",
            requestType: "Criar Conta",
            orgName: "ONGExemplo 2",
            responsibleName: "Leonardo da Silva",
            requestDate: "17/11/2024",
            status: "Em Aprovação",
            obs: "",
            approvalResponsible: ""
        }
    ];

    return (
        <>
            <Header_feed/>
            <main>
                <div className="col-12 justify-self-center m-2 p-2" id="div_cont_principal_aprovacao">
                    <h1 className="justify-self-center"> Seja bem vindo, @nome_da_pessoa!</h1>
                    
                    <ApprovalTable
                        data={tableData}
                        onViewImages={(type) => setShowImageModal(type)}
                        onViewFiles={(type) => setShowFileModal(type)}
                        onOpenApproval={() => setShowAprovacaoModal(true)}
                    />
                    



                    {/* Modais */}
                    <ImageModal
                        show={showImageModal === 'images1'}
                        onHide={() => setShowImageModal(null)}
                        title="Publicação reportada: Ação sobre a diversidade"
                        imageUrls={imageUrls1}
                        initialText="Primeiro texto de exemplo"
                        onZoomImage={handleZoomImage}
                    />

                    <ImageModal
                        show={showImageModal === 'images2'}
                        onHide={() => setShowImageModal(null)}
                        title="Publicação reportada: ação sobre diversidade"
                        imageUrls={imageUrls2}
                        initialText="Segundo texto de exemplo"
                        onZoomImage={handleZoomImage}
                    />

                    <FileModal
                        show={showFileModal === "files1"}
                        onHide={() => setShowFileModal(null)}
                        title="Criacao de conta ONG: ONGExemplo 1"
                        fileUrls={[fileUrls1[0], fileUrls1[1]]}
                        initialText="Texto de exemplo"
                    />

                    <FileModal
                        show={showFileModal === "files2"}
                        onHide={() => setShowFileModal(null)}
                        title="Criacao de conta ONG: ONGExemplo 1"
                        fileUrls={[fileUrls2[0], fileUrls2[1]]}
                        initialText="Texto de exemplo"
                    />

                    <ApprovalModal
                        show={showAprovacaoModal}
                        onHide={() => setShowAprovacaoModal(false)}
                        onApprove={() => {
                            console.log('Aprovado');
                            setShowAprovacaoModal(false);
                        }}
                        onReject={() => {
                            console.log('Rejeitado');
                            setShowAprovacaoModal(false);
                        }}
                    />

                    {/* Overlay de Zoom */}
                    {zoomedImage && (
                        <div 
                            className="zoom-overlay" 
                            style={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: 'rgba(0,0,0,0.8)',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                zIndex: 9999,
                                cursor: 'pointer'
                            }}
                            onClick={closeZoom}
                        >
                            <img 
                                src={zoomedImage} 
                                alt="Zoom" 
                                style={{ maxWidth: '90%', maxHeight: '90%' }}
                            />
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}