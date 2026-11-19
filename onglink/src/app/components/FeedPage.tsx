"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Alert, Spinner, Container, Row, Col } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";
import AutoLogout from "../components/AutoLogout";
import PublicarForm from "../components/PublicarForm";
import FeedPost from "../components/FeedPost";
import "@/app/CSS/feed.css";
import MenuLat from "../components/menu_lat/menu_lat";

import publicacaoService from "@/app/services/publicacaoService";
import usuarioService from "@/app/services/usuarioService";

interface Post {
  _id: string;
  titulo: string;
  descricao: string;
  imagem?: string[];
  criadoPor?: {
    _id: string;
    nome: string;
    email: string;
    assignedTo?:
      | {
          _id: string;
          nomeFantasia?: string;
          logo?: string;
        }
      | string;
  };
  createdAt?: string;
}

interface JwtPayload {
  id: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

const POSTS_POR_PAGINA = 10;

const FeedPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [userRole, setUserRole] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [currentUserAvatar, setCurrentUserAvatar] = useState<string | undefined>(undefined);
  const [currentOngName, setCurrentOngName] = useState<string | undefined>(undefined);

  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const isFetchingRef = useRef(false);

  const ROLES_PUBLICADORES = ["admin", "ong"];

  const fetchUserData = async (id: string) => {
    try {
      const data = await usuarioService.buscarPorId(id);
      const usuario = data.usuario || data;

      if (usuario.status === "ong" && usuario.assignedTo) {
        if (typeof usuario.assignedTo === "object") {
          if (usuario.assignedTo.logo) setCurrentUserAvatar(usuario.assignedTo.logo);
          if (usuario.assignedTo.nomeFantasia) setCurrentOngName(usuario.assignedTo.nomeFantasia);
          return;
        }
      }

      if (usuario.avatar) {
        setCurrentUserAvatar(usuario.avatar);
      }
    } catch (err) {
      console.error("Erro ao carregar perfil:", err);
    }
  };

  const carregarPosts = useCallback(async (paginaAlvo: number) => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;

    if (paginaAlvo === 1) {
      setIsLoading(true);
    } else {
      setIsFetchingMore(true);
    }

    try {
      const { publicacoes, hasMore: temMais } = await publicacaoService.listarPublicacao(
        paginaAlvo,
        POSTS_POR_PAGINA
      );

      setPosts((prev) => {
        if (paginaAlvo === 1) return publicacoes;
        const idsExistentes = new Set(prev.map((p) => p._id));
        const novosUnicos = publicacoes.filter((p: Post) => !idsExistentes.has(p._id));
        return [...prev, ...novosUnicos];
      });

      setHasMore(temMais);
      setPage(paginaAlvo);
    } catch (err) {
      setError("Não foi possível carregar as publicações.");
    } finally {
      setIsLoading(false);
      setIsFetchingMore(false);
      isFetchingRef.current = false;
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        if (decoded.exp * 1000 > Date.now()) {
          setUserRole(decoded.role);
          setUserId(decoded.id);
          fetchUserData(decoded.id);
        } else {
          localStorage.removeItem("authToken");
        }
      } catch (e) {
        console.error(e);
      }
    }
    carregarPosts(1);
  }, [carregarPosts]);

  // Observa o fim da lista para carregar as próximas 10 publicações
  useEffect(() => {
    if (isLoading || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetchingRef.current) {
          carregarPosts(page + 1);
        }
      },
      { rootMargin: "200px" }
    );

    const currentSentinel = sentinelRef.current;
    if (currentSentinel) {
      observer.observe(currentSentinel);
    }

    return () => {
      if (currentSentinel) observer.unobserve(currentSentinel);
      observer.disconnect();
    };
  }, [isLoading, hasMore, page, carregarPosts]);

  const handleCreatePost = async (dadosForm: { title: string; message: string; image?: File | null }) => {
    try {
      if (!userId) return alert("Faça login novamente.");

      const formData = new FormData();
      formData.append("titulo", dadosForm.title);
      formData.append("descricao", dadosForm.message);
      formData.append("criadoPor", userId);
      if (dadosForm.image) formData.append("image", dadosForm.image);

      const novaPublicacao = await publicacaoService.cadastrarPublicacao(formData);

      if (currentUserAvatar && novaPublicacao.criadoPor) {
        novaPublicacao.criadoPor.assignedTo = {
          logo: currentUserAvatar,
          nomeFantasia: currentOngName || "Minha ONG",
          _id: "temp",
        };
      }

      setPosts((prev) => [novaPublicacao, ...prev]);
    } catch (err: any) {
      console.error(err);
      alert("Falha ao publicar.");
    }
  };

  const handleDeletePost = async (id: string) => {
    if (!window.confirm("Excluir publicação?")) return;
    try {
      await publicacaoService.deletarPublicacao(id);
      setPosts((prev) => prev.filter((post) => post._id !== id));
    } catch (err) {
      alert("Erro ao excluir.");
    }
  };

  const canPublish = ROLES_PUBLICADORES.includes(userRole);

  return (
    <div className="feed-container-wrapper">
      <AutoLogout />

      <Container>
        <Row className="justify-content-center gx-5">
          {/* MENU LATERAL */}
          <Col md={4} lg={3} className="d-none d-md-block">
            <div style={{ position: "sticky", top: "100px" }}>
              <MenuLat />
            </div>
          </Col>

          {/* FEED */}
          <Col xs={12} md={8} lg={6}>
            {error && (
              <Alert variant="danger" onClose={() => setError(null)} dismissible>
                {error}
              </Alert>
            )}

            {canPublish && (
              <div className="mb-4" id="div_feed">
                <PublicarForm onPublish={handleCreatePost} />
              </div>
            )}

            <div className="mt-4">
              {isLoading ? (
                <div className="text-center p-5">
                  <Spinner animation="border" variant="success" />
                </div>
              ) : posts.length === 0 ? (
                <div className="text-center p-5 bg-white border rounded">
                  Nenhuma publicação encontrada.
                </div>
              ) : (
                <>
                  <div className="vstack gap-4">
                    {posts.map((post) => (
                      <FeedPost
                        key={post._id}
                        post={post}
                        currentUserId={userId}
                        onDelete={handleDeletePost}
                      />
                    ))}
                  </div>

                  {/* Elemento sentinela para disparar a próxima página */}
                  <div ref={sentinelRef} className="py-4 text-center">
                    {isFetchingMore && <Spinner animation="border" variant="success" size="sm" />}
                    {!hasMore && posts.length > 0 && (
                      <small className="text-muted">Você chegou ao fim das publicações.</small>
                    )}
                  </div>
                </>
              )}
            </div>
          </Col>

          {/* COLUNA DIREITA (Vazia) */}
          <Col lg={3} className="d-none d-lg-block" />
        </Row>
      </Container>
    </div>
  );
};

export default FeedPage;