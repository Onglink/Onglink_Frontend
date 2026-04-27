"use client";

import Image from "next/image"
import Link from "next/link"
//import { useRouter } from "next/router";
import {Button, Col, Row} from "react-bootstrap"
//import logo_onglink_01 from '@/app/img/LOGO_ONGLINK_1.png'
//import image_home from '@/app/img/image_home.jpg'
//import logo_muxn from '@/app/img/MUXN_logo1.png'
import React from "react";
import planetilson from '@/app/img/gb1png 1.png'
import planetilson_pintor from '@/app/img/gb2png 2.png'
import planetilson3 from '@/app/img/gb3.png'
import '@/app/CSS/home.css'
import '@/app/CSS/header_alt.css'
import '@/app/CSS/menu.css'
import '@/app/CSS/main.css'
import '@/app/CSS/body.css'
import Header_home from "@/app/components/header_home"
import Script from 'next/script'
import BotaoVisitante from "./components/BotaoVisitante";


export default function Home() {

  return (
        <>
        <Script
          id="microsoft-clarity-script" // Um ID único para o seu script
          strategy="afterInteractive"  // A estratégia de carregamento recomendada
          dangerouslySetInnerHTML={{ 
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "tvor3v73uk");
            `,
          }}
        />
        
        <Header_home/>
        
        
            <main className="main_home">
        <div className="main1">
          
          {/* --- ROW 1: Imagem (Esq) | Texto (Dir) --- */}
          <Row className="row" id="row1">
            {/* Coluna da Imagem: Empurra para a DIREITA (->) */}
            <Col md={6} className="col-content-right">
              <Image
                alt="Mascote Onglink"
                src={planetilson}
                className="mascote-img"
              />
            </Col>
            
            {/* Coluna do Texto: Empurra para a ESQUERDA (<-) */}
            <Col md={6} className="col-content-left" id="desc_home">
              <h4> O apoio que sua ONG precisa! </h4>
              <p>
                Venha conhecer a Onglink, plataforma desenvolvida para você
                poder consultar as entidades de apoio social e ONG’s. Nossa
                missão é ter na plataforma, entidades certificadas e de real
                atuação no mercado. Cadastre-se e nos ajude a
                divulgar o link do bem.
              </p>
            </Col>
          </Row>

          {/* --- ROW 2: Texto (Esq) | Imagem (Dir) --- */}
          <Row className="row" id="row2">
             {/* Coluna do Texto: Empurra para a DIREITA (->) */}
            <Col md={6} className="col-content-right">
              <h4>Por que se juntar à ONGlink?</h4>
              <ul id="vantagens" style={{ listStyle: 'none' }}> {/* listStyle none para alinhar melhor */}
                <li> Se você está procurando uma instituição para poder contribuir</li>
                <li> e quer ter certeza de que essa organização tem seriedade e é confiável?</li>
                <li> Venha fazer parte da nossa plataforma e nunca mais preocupe-se com isso.</li>
              </ul>
            </Col>

             {/* Coluna da Imagem: Empurra para a ESQUERDA (<-) */}
            <Col md={6} className="col-content-left">
              <Image
                alt="Mascote Pintor"
                src={planetilson_pintor}
                className="mascote-img"
              />
            </Col>
          </Row>

          {/* --- ROW 3: Imagem (Esq) | Texto (Dir) --- */}
          <Row className="row" id="row3">
             {/* Coluna da Imagem: Empurra para a DIREITA (->) */}
            <Col md={6} className="col-content-right">
              <Image
                alt="Mascote Final"
                src={planetilson3}
                className="mascote-img"
              />
            </Col>

             {/* Coluna do Texto: Empurra para a ESQUERDA (<-) */}
            <Col md={6} className="col-content-left">
              <div id="div_botao" className="text-center text-md-start"> {/* Ajuste de alinhamento interno */}
                <h4>Junte-se à ONGlink!</h4>
                <p>
                  Seja mais um parceiro e ajude-nos a divulgar o link do bem!
                </p>

                <Link href={"/cadastroSimples"}>
                  <Button id="botao_cadastro2">Cadastre-se</Button>
                </Link>

                <p className="mt-3 mb-3"> ou </p>

                <BotaoVisitante />
                          
                      </div>
                    </Col>

                  </Row>

                <div className="pt-5" id="div_nossos_parceiros">
{/*           
                      <h3>Nossos Parceiros:</h3>
          
                      <div id="div_apoiadores">
                          <img className="border-3 border-blue-500 rounded-xl" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAxmdfTkAvl8uqvjj8M3TUV-n9SkBSZL0kTVOpfRUxaI9X1LtKlfUiOfmHchqZoBkIs-M&usqp=CAU"} alt="Empresa 1" width="200" height="200"></img>
                          <img className="border-3 border-yellow-300 rounded-xl" src={"https://img.freepik.com/vector-premium/logotipo-comercializacion-venta_712682-3297.jpg"} alt="Empresa 2" width="200" height="200"></img>
                          <img className="border-3 border-red-500 rounded-xl" src={"https://img.freepik.com/vetores-premium/modelo-do-logotipo-da-caixa-do-estudio_10399-28.jpg"} alt="Empresa 3" width="200" height="200"></img>
                          <img className="border-3 border-green-500 rounded-xl" src={"https://img.freepik.com/vetores-premium/logotipo-da-empresa_7436-14.jpg"} alt="Empresa 4" width="200" height="200"></img>
                      </div> */}

                      <Link href={"/parceiros"}>
                          <Button
                            id="botao_ver_todos"
                          >
                            Conheça nossos parceiros!
                          </Button>
                      </Link>
                      
                </div>

              </div>
            </main>
            
            
        </>
    )
    
}