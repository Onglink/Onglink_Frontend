"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Alert, Spinner } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import FeedPost from "../components/FeedPost";
import publicacaoService from "@/app/services/publicacaoService";

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

const POSTS_POR_PAGINA = 10;

const FeedVisitantePage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const isFetchingRef = useRef(false);

  const router = useRouter();

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
    const verificarAcesso = () => {
      const token = localStorage.getItem("authToken");

      if (token) {
        try {
          const decoded = jwtDecode<{ exp: number }>(token);
          if (decoded.exp * 1000 > Date.now()) {
            router.replace("/feed");
            return;
          }
        } catch (e) {
          localStorage.removeItem("authToken");
        }
      }
      carregarPosts(1);
    };

    verificarAcesso();
  }, [router, carregarPosts]);

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

  return (
    <div className="container-fluid col-12 p-0" style={{ maxWidth: "800px", margin: "0 auto" }}>
      <div className="d-flex justify-content-center mt-4 mb-3 px-3">
        <h4>Bem-vindo, Visitante! Acompanhe abaixo as publicações de nossos parceiros</h4>
      </div>

      {error && (
        <Alert variant="danger" onClose={() => setError(null)} dismissible>
          {error}
        </Alert>
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
                  currentUserId={null as any}
                  onDelete={undefined}
                />
              ))}
            </div>

            <div ref={sentinelRef} className="py-4 text-center">
              {isFetchingMore && <Spinner animation="border" variant="success" size="sm" />}
              {!hasMore && posts.length > 0 && (
                <small className="text-muted">Você chegou ao fim das publicações.</small>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FeedVisitantePage;