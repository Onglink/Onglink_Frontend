    

// novo login abaixo:
"use client";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button, Alert, Spinner, Form as BootstrapForm } from 'react-bootstrap'; // Renomeei Form para evitar conflito com Formik
import { Field, Form, Formik, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from 'yup';
import Link from "next/link";

 import Header_home from "@/app/components/header_home";
 import '@/app/CSS/header_alt.css'
 import '@/app/CSS/menu.css'
 import '@/app/CSS/main.css'
 import '@/app/CSS/body.css'
 import '@/app/CSS/cadastro.css'
 import '@/app/CSS/feed.css'
 import usuarioService from "@/app/services/usuarioService";
// =====================================================================

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email inválido').required('Campo obrigatório'),
    senha: Yup.string().required('Campo obrigatório')
});
type LoginFormValues = Yup.InferType<typeof validationSchema>;

const initialValues: LoginFormValues = {
  email: '',
  senha: ''
};

export default function Login() {
    const router = useRouter();
    const [loginError, setLoginError] = useState<string | null>(null);

    const handleLogin = async (
      values: LoginFormValues, 
      { setSubmitting }: FormikHelpers<LoginFormValues>
    ) => {
    setLoginError(null);
    try {
      const response = await usuarioService.loginUsuario(values);
      console.log("Login bem-sucedido:", response);

            // Salva os dados do usuário no localStorage
            localStorage.setItem('authToken', response.token); // O token      
            localStorage.setItem('usuarioLogado', JSON.stringify(response.usuario));
            localStorage.setItem('user_status', response.usuario.status);
            localStorage.setItem('userId', response.usuario._id);
            
            // Redireciona para o Feed
            router.push('/feed'); 

        } catch (error:any) {
            console.error("Erro no login:", error);
            const mensagem = error.response?.data?.error || error.response?.data?.message || "Falha ao realizar login.";
            setLoginError(mensagem);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
        <Header_home/>
        
        <main id="bg_login" className="min-h-screen flex items-center justify-center" style={{minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#D0E2E9'}}>
            <div id="caixa_login" className="bg-white rounded-4 p-3 shadow w-100" style={{maxWidth: '500px'}}>
                
                <div className="m-4" id="div_login">
                    <h1 id="h1_login" className="text-center mb-4 fw-bold ">Faça seu Login</h1>
                    
                    {loginError && <Alert variant="danger" onClose={() => setLoginError(null)} dismissible>{loginError}</Alert>}

                    <Formik 
                        initialValues={ initialValues }
                        validationSchema={validationSchema}
                        onSubmit={handleLogin}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                {/* Email */}
                                <div className="rowlogin mb-3">
                                    <div id="div_email" className="w-100">
                                        <BootstrapForm.Label htmlFor="email" className="fw-semibold">Digite seu e-mail:</BootstrapForm.Label>
                                        <Field 
                                            as={BootstrapForm.Control} 
                                            className="border-2 form-control-lg" 
                                            type="email" 
                                            name="email" 
                                            id="email" 
                                            placeholder="seu@email.com"
                                        />
                                        <ErrorMessage name="email" component="div" className="text-danger small mt-1"/>
                                    </div>
                                </div>

                                {/* Senha */}
                                <div className="rowlogin mb-4">
                                    <div id="div_senha" className="w-100">
                                        <BootstrapForm.Label htmlFor="senha" className="fw-semibold">Digite sua senha:</BootstrapForm.Label>
                                        <Field 
                                            as={BootstrapForm.Control} 
                                            className="border-2 form-control-lg" 
                                            type="password" 
                                            name="senha" 
                                            id="senha" 
                                            placeholder="********" 
                                        />
                                        <ErrorMessage name="senha" component="div" className="text-danger small mt-1"/>
                                        <div className="text-end mt-2">
                                            <Link id="esqueci_senha" href="/recuperar_senha" className="text-success text-decoration-none small">
                                                Esqueci minha senha
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                    
                                {/* Botão Entrar */}
                                <div className="row" id="div_entrar">
                                    <div className="col-12" id="div_btn_entrar">
                                        <Button 
                                            type="submit" 
                                            id="btn_entrar" 
                                            variant="success" 
                                            size="lg" 
                                            className="w-100 fw-bold" 
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                                                    Entrando...
                                                </>
                                            ) : (
                                                "Entrar"
                                            )}
                                        </Button>
                                    </div>
                                </div>

                            </Form>
                        )}
                    </Formik>

                </div>
            </div>
        </main>
        </>
    )
}