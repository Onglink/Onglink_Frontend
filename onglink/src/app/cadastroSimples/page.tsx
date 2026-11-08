
// abaixo o codigo refatorado para inserir usuario no banco de dados, com os campos required corretos:
"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Alert, Spinner } from "react-bootstrap";
import { Field, Form, Formik, ErrorMessage, FieldProps } from "formik";
import * as Yup from "yup";
import Header_home from "@/app/components/header_home";
import "@/app/CSS/home.css";
import "@/app/CSS/cadastro.css";
import "@/app/CSS/header_alt.css";
import usuarioService from "@/app/services/usuarioService";
import { maskCpf } from "@/app/utils/masks";
// =====================================================================

// Esquema de Validação Yup
const validationSchema = Yup.object().shape({
  nome: Yup.string().required("Campo obrigatório"), // Renomeado de pessoaResponsavel para nome
  cpf: Yup.string()
    .matches(
      /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
      "CPF inválido (use o formato 000.000.000-00)"
    )
    .required("Campo Obrigatório"),
  email: Yup.string().email("Email inválido").required("Campo Obrigatório"),
  senha: Yup.string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .required("Campo Obrigatório"),
  confirmarSenha: Yup.string()
    .oneOf([Yup.ref("senha")], "As senhas devem ser iguais") // Validação de igualdade
    .required("Campo Obrigatório"),
});

export default function CadastroSimplesPessoaFisica() {
  const router = useRouter();
  const [formError, setFormError] = useState(null);

  const initialValues = {
    nome: "", // Ajustado para bater com o Schema do Mongoose
    cpf: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  };

  const handleSubmit = async (
    values: any,
    { setSubmitting, resetForm }: any
  ) => {
    setFormError(null);
    try {
      // Prepara o objeto para envio (remove confirmarSenha, que não vai pro backend)
      const dadosParaEnvio = {
        nome: values.nome,
        cpf: values.cpf,
        email: values.email,
        senha: values.senha,
        status: "user", // Opcional, já é o padrão no backend
      };

      // Chama o serviço real
      await usuarioService.cadastrarUsuario(dadosParaEnvio);

      alert("Cadastro realizado com sucesso! Redirecionando para o login...");
      router.push("/login"); // Redireciona após sucesso
    } catch (error: any) {
      console.error("Erro no cadastro:", error);
      // Tenta pegar a mensagem de erro do backend, ou usa uma genérica
      const mensagemErro =
        error.response?.data?.message ||
        "Falha ao cadastrar. Verifique os dados e tente novamente.";
      setFormError(mensagemErro);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header_home />
      <div
        className="bg-verde1"
        style={{
          backgroundColor: "#D0E2E9",
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <main
          id="bg_cadastro"
          className="w-100 d-flex justify-content-center align-items-center py-5"
        >
          <div
            id="caixa_cadastro"
            className="bg-white rounded-4 p-5 shadow w-100 mt-3 mb-5"
            style={{ maxWidth: "600px" }}
          >
            <h2 className="" id="h1_cadastro">
              Criar Conta
            </h2>

            {formError && (
              <Alert
                variant="danger"
                onClose={() => setFormError(null)}
                dismissible
              >
                {formError}
              </Alert>
            )}

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  {/* Nome */}
                  <div className="mb-3">
                    <label htmlFor="nome" className="form-label fw-semibold">
                      Nome Completo <span className="text-danger">*</span>
                    </label>
                    <Field
                      type="text"
                      name="nome"
                      placeholder="Ex: João da Silva"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="nome"
                      component="div"
                      className="text-danger small mt-1"
                    />
                  </div>

                  {/* CPF e Email */}
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="cpf" className="form-label fw-semibold">
                        CPF <span className="text-danger">*</span>
                      </label>
                      <Field name="cpf">
                        {({ field, form }: FieldProps) => (
                          <input
                            {...field}
                            id="cpf"
                            type="text"
                            placeholder="000.000.000-00"
                            maxLength={14}
                            className="form-control text-start"
                            onChange={(e) => {
                              const masked = maskCpf(e.target.value);
                              form.setFieldValue("cpf", masked);
                            }}
                          />
                        )}
                      </Field>
                      <ErrorMessage
                        name="cpf"
                        component="div"
                        className="text-danger small mt-1"
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="email" className="form-label fw-semibold">
                        Email <span className="text-danger">*</span>
                      </label>
                      <Field
                        type="email"
                        name="email"
                        placeholder="exemplo@email.com"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-danger small mt-1"
                      />
                    </div>
                  </div>

                  {/* Senhas */}
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="senha" className="form-label fw-semibold">
                        Senha <span className="text-danger">*</span>
                      </label>
                      <Field
                        type="password"
                        name="senha"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="senha"
                        component="div"
                        className="text-danger small mt-1"
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label
                        htmlFor="confirmarSenha"
                        className="form-label fw-semibold"
                      >
                        Confirmar Senha <span className="text-danger">*</span>
                      </label>
                      <Field
                        type="password"
                        name="confirmarSenha"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="confirmarSenha"
                        component="div"
                        className="text-danger small mt-1"
                      />
                    </div>
                  </div>

                  {/* Botão de Enviar */}
                  <div className="text-center mt-4">
                    <Button
                      type="submit"
                      variant="success"
                      size="lg"
                      className="w-100 fw-bold"
                      disabled={isSubmitting}
                      id="btn_enviar_cad"
                    >
                      {isSubmitting ? (
                        <>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            className="me-2"
                          />
                          Cadastrando...
                        </>
                      ) : (
                        "Enviar"
                      )}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </main>
      </div>
    </>
  );
}
