// 'use client';
// import React, { useState, useEffect } from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import Header_feed from '@/app/components/header_feed';
// import FormInput from '@/app/components/formulario/FormInput';
// import FormRadioGroup from '@/app/components/formulario/FormRadioGroup';
// import ImageUpload from '@/app/components/formulario/ImageUpload';
// import FileUpload from '@/app/components/formulario/FileUpload';
// import StepButton from '@/app/components/formulario/StepButton';
// import FormGroup from '@/app/components/formulario/FormGroup';
// import { getCepData } from '@/app/services/cep';
// import Image from "next/image"
// import planetilson3 from '@/app/img/gb3.png'
// import '@/app/CSS/home.css'
// import '@/app/CSS/header_alt.css'
// import '@/app/CSS/menu.css'
// import '@/app/CSS/main.css'
// import '@/app/CSS/body.css'
// import '@/app/CSS/cadastro.css'

// interface BasicFormValues {
//   razaoSocial: string;
//   nomeFantasia: string;
//   cnpj: string;
//   email: string;
//   pessoaResponsavel: string;
//   cpf: string;
//   telefone01: string;
//   telefone02: string;
//   causaSocial: string;
//   sobreOng: string;
// }

// interface AddressFormValues {
//   cep: string;
//   cidade: string;
//   estado: string;
//   endereco: string;
//   numero: string;
//   complemento: string;
//   bairro: string;
// }

// interface SocialFormValues {
//   linkedin: string;
//   facebook: string;
//   instagram: string;
//   twitter: string;
// }

// interface UploadFormValues {
//   arquivo1: File | null;
//   arquivo2: File | null;
//   imagem: File | null;
// }

// const CadastroCompleto: React.FC = () => {
//   const [activeStep, setActiveStep] = useState<number>(0);
//   const [imagem, setImagem] = useState<File | null>(null);

//   // ---------------- Formik Básico ----------------
//   const formikBasico = useFormik<BasicFormValues>({
//     initialValues: {
//       razaoSocial: '',
//       nomeFantasia:'',
//       cnpj: '',
//       email: '',
//       pessoaResponsavel: '',
//       cpf: '',
//       telefone01: '',
//       telefone02: '',
//       causaSocial: '',
//       sobreOng: '',
//     },
//     validationSchema: Yup.object({
//       razaoSocial: Yup.string().required('Razão Social é obrigatória'),
//       cnpj: Yup.string().required('CNPJ é obrigatório'),
//       email: Yup.string().email('Email inválido').required('Email é obrigatório'),
//       pessoaResponsavel: Yup.string().required('Pessoa responsável é obrigatória'),
//       cpf: Yup.string().required('CPF é obrigatório'),
//       telefone01: Yup.string().required('Telefone é obrigatório'),
//       causaSocial: Yup.string().required('Causa social é obrigatória'),
//       sobreOng: Yup.string().required('Sobre a ONG é obrigatória'),
//     }),
//     onSubmit: () => nextStep(),
//   });

//   // ---------------- Formik Endereço ----------------
//   const formikEndereco = useFormik<AddressFormValues>({
//     initialValues: {
//       cep: '',
//       endereco: '',
//       numero: '',
//       complemento: '',
//       bairro: '',
//       cidade: '',
//       estado: '',
//     },
//     validationSchema: Yup.object({
//       cep: Yup.string().required('CEP é obrigatório'),
//       endereco: Yup.string().required('Endereço é obrigatório'),
//       numero: Yup.string().required('Número é obrigatório'),
//       bairro: Yup.string().required('Bairro é obrigatório'),
//       cidade: Yup.string().required('Cidade é obrigatória'),
//       estado: Yup.string().required('Estado é obrigatório'),
//     }),
//     onSubmit: () => nextStep(),
//   });

//   const buscarCep = async (cep: string) => {
//     try {
//       const data = await getCepData(cep.replace(/\D/g, ''));
//       formikEndereco.setFieldValue('endereco', data.logradouro || '');
//       formikEndereco.setFieldValue('bairro', data.bairro || '');
//       formikEndereco.setFieldValue('cidade', data.localidade || '');
//       formikEndereco.setFieldValue('estado', data.uf || '');
//     } catch (error) {
//       console.error('Erro ao buscar CEP:', error);
//     }
//   };

//   // ---------------- Formik Redes Sociais ----------------
//   const formikSocial = useFormik<SocialFormValues>({
//     initialValues: {
//       linkedin: '',
//       facebook: '',
//       instagram: '',
//       twitter: '',
//     },
//     validationSchema: Yup.object({
//       linkedin: Yup.string().url('URL inválida'),
//       facebook: Yup.string().url('URL inválida'),
//       instagram: Yup.string().url('URL inválida'),
//       twitter: Yup.string().url('URL inválida'),
//     }),
//     onSubmit: () => nextStep(),
//   });

//   // ---------------- Formik Upload ----------------
//   const formikUpload = useFormik<UploadFormValues>({
//     initialValues: {
//       arquivo1: null,
//       arquivo2: null,
//       imagem: null,
//     },
//     onSubmit: (values) => {
//       alert('Cadastro completo!\n\n' + JSON.stringify({
//         basico: formikBasico.values,
//         endereco: formikEndereco.values,
//         social: formikSocial.values,
//         upload: values,
//       }, null, 2));
//     },
//   });

//   const nextStep = () => setActiveStep(prev => Math.min(prev + 1, 3));
//   const prevStep = () => setActiveStep(prev => Math.max(prev - 1, 0));

//   const steps = ['Básico', 'Endereço', 'Rede Social', 'Documentos'];

//   // Salvamento automático
//   useEffect(() => {
//     localStorage.setItem('basico', JSON.stringify(formikBasico.values));
//     localStorage.setItem('endereco', JSON.stringify(formikEndereco.values));
//     localStorage.setItem('social', JSON.stringify(formikSocial.values));
//     localStorage.setItem('upload', JSON.stringify(formikUpload.values));
//   }, [
//     formikBasico.values,
//     formikEndereco.values,
//     formikSocial.values,
//     formikUpload.values
//   ]);

//   // ---------------- Render Form ----------------
//   const renderForm = () => {
//     switch(activeStep) {
//       case 0:
//         return (
//           <form onSubmit={formikBasico.handleSubmit}>
//             <FormInput formik={formikBasico} name="razaoSocial" label="Razão Social" />
//             <FormInput formik={formikBasico} name="nomeFantasia" label="Nome Fantasia" />
//             <FormGroup
//               formik={formikBasico}
//               fields={[
//                 { name: "cnpj", label: "CNPJ", width: "w-1/2" },
//                 { name: "email", label: "Email", width: "w-1/2" }
//               ]}
//             />
//             <FormGroup
//               formik={formikBasico}
//               fields={[
//                 { name: "pessoaResponsavel", label: "Pessoa Responsável", width: "w-1/2" },
//                 { name: "cpf", label: "CPF", width: "w-1/2" }
//               ]}
//             />
//             <FormGroup
//               formik={formikBasico}
//               fields={[
//                 { name: "telefone01", label: "Telefone 01", width: "w-1/2" },
//                 { name: "telefone02", label: "Telefone 02", width: "w-1/2" }
//               ]}
//             />
//             <FormRadioGroup
//               formik={formikBasico}
//               name="causaSocial"
//               label="Escolha a causa principal da sua organização"
//               options={[
//                 { label: 'Ambiental', value: '1' },
//                 { label: 'Animal', value: '2' },
//                 { label: 'Educação', value: '3' },
//                 { label: 'Saúde', value: '4' },
//                 { label: 'Social', value: '5' },
//               ]}
//             />
//             <div className="mb-4">
//               <label className="block mb-1 font-medium">Conte mais sobre a ONG</label>
//               <textarea
//                 name="sobreOng"
//                 rows={4}
//                 value={formikBasico.values.sobreOng}
//                 onChange={formikBasico.handleChange}
//                 onBlur={formikBasico.handleBlur}
//                 className="w-full border-1 rounded p-2"
//               />
//               {formikBasico.touched["sobreOng"] && formikBasico.errors["sobreOng"] && (
//               <div className="text-red-500 text-sm mt-1">{formikBasico.errors["sobreOng"]}</div>
//               )}
//             </div>
//             <div className='flex justify-end'>
//               <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">Próximo</button>
//             </div>
//           </form>
//         );
//       case 1:
//         return (
//           <form onSubmit={formikEndereco.handleSubmit}>
//             <FormGroup
//               formik={formikEndereco}
//               fields={[
//                 { name: "cep", label:"CEP", placeholder:"00000-000", width:"w-1/2"}
//               ]}
//             />

//             <button
//               type="button"
//               onClick={() => buscarCep(formikEndereco.values.cep)}
//               className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
//             >
//               Buscar CEP
//             </button>
//             <FormGroup
//               formik={formikEndereco}
//               fields={[
//                 { name: "endereco", label: "Endereço", width: "w-full", readonly: true },

//               ]}
//             />
//             <FormGroup
//               formik={formikEndereco}
//               fields={[
//                 { name: "numero", label: "Número", width: "flex-1" },
//                 { name: "complemento", label: "Complemento", width: "w-full" },

//               ]}
//             />
//             <FormGroup
//               formik={formikEndereco}
//               fields={[
//                 { name: "bairro", label: "Bairro", width: "w-1/2", readonly: true },
//                 { name: "cidade", label: "Cidade", width: "w-1/2", readonly: true },
//                 { name: "estado", label: "Estado", width: "w-1/10 sm:w-1/5", readonly: true}
//               ]}
//             />
//             <div className="flex space-x-2 justify-end mt-4 gap-4">
//               <button type="button" onClick={prevStep} className="px-4 py-2 bg-gray-400 text-white rounded">Voltar</button>
//               <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">Próximo</button>
//             </div>
//           </form>
//         );
//       case 2:
//         return (
//           <form onSubmit={formikSocial.handleSubmit}>
//             <FormGroup
//               formik={formikSocial}
//               fields={[
//                 { name: "linkedin", label: "LinkedIn",  width: "w-1/2" },
//                 { name: "facebook", label: "Facebook",  width: "w-1/2" }
//               ]}
//             />
//             <FormGroup
//               formik={formikSocial}
//               fields={[
//                 { name: "instagram", label: "Instagram",  width: "w-1/2" },
//                 { name: "twitter", label: "Twitter",  width: "w-1/2" }
//               ]}
//             />
//             <div className="flex space-x-2 justify-end mt-4 gap-4">
//               <button type="button" onClick={prevStep} className="px-4 py-2 bg-gray-400 text-white rounded">Voltar</button>
//               <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">Próximo</button>
//             </div>
//           </form>
//         );
//       case 3:
//         return (
//           <form onSubmit={formikUpload.handleSubmit}>
//             <FileUpload
//               label="Primeiro Arquivo"
//               file={formikUpload.values.arquivo1}
//               setFile={(file) => formikUpload.setFieldValue('arquivo1', file)}
//               accept=".pdf"
//             />
//             <FileUpload
//               label="Segundo Arquivo"
//               file={formikUpload.values.arquivo2}
//               setFile={(file) => formikUpload.setFieldValue('arquivo2', file)}
//               accept=".pdf"
//             />
//             <ImageUpload
//               label="Logo da ONG"
//               image={imagem}
//               setImage={(file) => { setImagem(file); formikUpload.setFieldValue('imagem', file); }}
//             />
//             <div className="flex space-x-2 justify-end mt-4 gap-4">
//               <button type="button" onClick={prevStep} className="px-4 py-2 bg-gray-400 text-white rounded">Voltar</button>
//               <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">Enviar</button>
//             </div>
//           </form>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <>
//       <Header_feed />
//       <main className='main1'>
//         <div className="mx-auto p-2 w-full flex">
//           <div className='w-full'></div>
//           <div id='sideMenu_cadComp' className='p-2 mb-2 bg-header rounded-2 text-center w-80'>
//             <h1 className="text-xl font-bold mb-4">Cadastro Completo</h1>
//             <div className="flex  mb-2 flex-full w-full justify-center sm: flex-wrap flex-column  ">

//               {steps.map((step, index) => (
//                 <StepButton
//                   key={step}
//                   label={step}
//                   active={activeStep === index}
//                   onClick={() => setActiveStep(index)}
//                 />
//               ))}
//             </div>
//           </div>
//           <div className="bg-white p-4 mb-2 rounded shadow w-75">{renderForm()}</div>
//           <div className='w-full'></div>
//         </div>
//       </main>
//     </>
//   );
// };

// export default CadastroCompleto;

// cadastro completo novo conectado ao backend abaixo:
"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Spinner, Alert } from "react-bootstrap";
import Image from "next/image";

// Imports de Componentes
import Header_feed from "@/app/components/header_feed";
import FormInput from "@/app/components/formulario/FormInput";
import FormRadioGroup from "@/app/components/formulario/FormRadioGroup";
import ImageUpload from "@/app/components/formulario/ImageUpload";
import FileUpload from "@/app/components/formulario/FileUpload";
import StepButton from "@/app/components/formulario/StepButton";
import FormGroup from "@/app/components/formulario/FormGroup";

// Imports de CSS
import "@/app/CSS/home.css";
import "@/app/CSS/header_alt.css";
import "@/app/CSS/menu.css";
import "@/app/CSS/main.css";
import "@/app/CSS/body.css";
import "@/app/CSS/cadastro.css";

// Imports de Serviços
import { getCepData } from "@/app/services/cep";
import ongService from "@/app/services/ongService";
// Certifique-se que seu uploadService exporta 'uploadToCloudinary' corretamente (named ou default)
import uploadService from "@/app/services/uploadService";

// --- Interfaces (Mantidas) ---
interface BasicFormValues {
  razaoSocial: string;
  nomeFantasia: string;
  cnpj: string;
  email: string;
  pessoaResponsavel: string;
  cpf: string;
  telefone01: string;
  telefone02: string;
  causaSocial: string;
  sobreOng: string;
}

interface AddressFormValues {
  cep: string;
  cidade: string;
  estado: string;
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
}

interface SocialFormValues {
  linkedin: string;
  facebook: string;
  instagram: string;
  twitter: string;
}

interface UploadFormValues {
  arquivo1: File | null;
  arquivo2: File | null;
  imagem: File | null;
}

const CadastroCompleto: React.FC = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState<number>(0);
  const [imagem, setImagem] = useState<File | null>(null);

  // Estados para controle de submissão final
  const [isSubmittingFinal, setIsSubmittingFinal] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [usuarioLogado, setUsuarioLogado] = useState<any>(null);

  const steps = ["Básico", "Endereço", "Rede Social", "Documentos"];

  // 1. Verificar Usuário Logado ao carregar
  useEffect(() => {
    const userStr = localStorage.getItem("usuarioLogado");
    if (userStr) {
      setUsuarioLogado(JSON.parse(userStr));
    } else {
      router.push("/login");
    }
  }, [router]);

  const nextStep = () =>
    setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setActiveStep((prev) => Math.max(prev - 1, 0));

  // ---------------- Formik Básico ----------------
  const formikBasico = useFormik<BasicFormValues>({
    initialValues: {
      razaoSocial: "",
      nomeFantasia: "",
      cnpj: "",
      email: "",
      pessoaResponsavel: "",
      cpf: "",
      telefone01: "",
      telefone02: "",
      causaSocial: "",
      sobreOng: "",
    },
    validationSchema: Yup.object({
      razaoSocial: Yup.string().required("Razão Social é obrigatória"),
      cnpj: Yup.string()
        .test("cnpj-valido", "CNPJ inválido (deve ter 14 dígitos)", (val) => {
          if (!val) return false;
          return val.replace(/\D/g, "").length === 14;
        })
        .required("CNPJ é obrigatório"),
      email: Yup.string()
        .email("Email inválido")
        .required("Email é obrigatório"),
      pessoaResponsavel: Yup.string().required(
        "Pessoa responsável é obrigatória"
      ),
      cpf: Yup.string()
        .test("cpf-valido", "CPF inválido (deve ter 11 dígitos)", (val) => {
          if (!val) return false;
          return val.replace(/\D/g, "").length === 11;
        })
        .required("CPF é obrigatório"),
      telefone01: Yup.string()
        .test("telefone-valido", "Telefone inválido (mínimo 10 dígitos)", (val) => {
          if (!val) return false;
          const len = val.replace(/\D/g, "").length;
          return len === 10 || len === 11;
        })
        .required("Telefone é obrigatório"),
      telefone02: Yup.string()
        .nullable()
        .test("telefone2-valido", "Telefone secundário inválido", (val) => {
          if (!val || val.trim() === "") return true;
          const len = val.replace(/\D/g, "").length;
          return len === 10 || len === 11;
        }),
      causaSocial: Yup.string().required("Causa social é obrigatória"),
      sobreOng: Yup.string().required("Sobre a ONG é obrigatória"),
    }),
    onSubmit: () => nextStep(),
  });

  // ---------------- Formik Endereço ----------------
  const formikEndereco = useFormik<AddressFormValues>({
    initialValues: {
      cep: "",
      endereco: "",
      numero: "",
      complemento: "",
      bairro: "",
      cidade: "",
      estado: "",
    },
    validationSchema: Yup.object({
      cep: Yup.string()
        .test("cep-valido", "CEP inválido (deve ter 8 dígitos)", (val) => {
          if (!val) return false;
          return val.replace(/\D/g, "").length === 8;
        })
        .required("CEP é obrigatório"),
      endereco: Yup.string().required("Endereço é obrigatório"),
      numero: Yup.string().required("Número é obrigatório"),
      bairro: Yup.string().required("Bairro é obrigatório"),
      cidade: Yup.string().required("Cidade é obrigatória"),
      estado: Yup.string().required("Estado é obrigatório"),
    }),
    onSubmit: () => nextStep(),
  });

  const buscarCep = async (cep: string) => {
    try {
      const data = await getCepData(cep.replace(/\D/g, ""));
      if (data && !(data as any).erro) {
        formikEndereco.setFieldValue("endereco", data.logradouro || "");
        formikEndereco.setFieldValue("bairro", data.bairro || "");
        formikEndereco.setFieldValue("cidade", data.localidade || "");
        formikEndereco.setFieldValue("estado", data.uf || "");
      } else {
        alert("CEP não encontrado.");
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      alert("Erro ao buscar CEP.");
    }
  };

  // ---------------- Formik Redes Sociais ----------------
  const formikSocial = useFormik<SocialFormValues>({
    initialValues: { linkedin: "", facebook: "", instagram: "", twitter: "" },
    validationSchema: Yup.object({
      linkedin: Yup.string()
        .url("Deve começar com http:// ou https://")
        .nullable(),
      facebook: Yup.string()
        .url("Deve começar com http:// ou https://")
        .nullable(),
      instagram: Yup.string()
        .url("Deve começar com http:// ou https://")
        .nullable(),
      twitter: Yup.string()
        .url("Deve começar com http:// ou https://")
        .nullable(),
    }),
    onSubmit: () => nextStep(),
  });

  // ---------------- Formik Upload (FINAL) ----------------
  const formikUpload = useFormik<UploadFormValues>({
    initialValues: { arquivo1: null, arquivo2: null, imagem: null },
    onSubmit: async (values) => {
      await finalizarCadastro(values);
    },
  });

  // --- Função Principal de Envio ---
  const finalizarCadastro = async (uploadValues: UploadFormValues) => {
    if (!usuarioLogado?._id) {
      setSubmitError("Erro: Usuário não identificado. Faça login novamente.");
      return;
    }

    setIsSubmittingFinal(true);
    setSubmitError(null);

    try {
      console.log("🚀 Iniciando uploads para Cloudinary...");
      // Upload paralelo para ganhar tempo
      const [logoUrl, arquivo1Url, arquivo2Url] = await Promise.all([
        uploadService(imagem),
        uploadService(uploadValues.arquivo1),
        uploadService(uploadValues.arquivo2),
      ]);

      if (!logoUrl)
        throw new Error("É obrigatório fazer o upload da Logo da ONG.");

      // Montagem do objeto final conforme Schema Mongoose
      const dadosFinais = {
        razaoSocial: formikBasico.values.razaoSocial,
        nomeFantasia: formikBasico.values.nomeFantasia,
        cnpj: formikBasico.values.cnpj,
        email: formikBasico.values.email,
        repLegal: formikBasico.values.pessoaResponsavel,
        cpf: formikBasico.values.cpf,
        telefone: formikBasico.values.telefone01,
        causaSocial: formikBasico.values.causaSocial,
        descricao: formikBasico.values.sobreOng,
        dataFund: new Date(), // Idealmente, adicionar este campo no Step 1

        endereco: {
          rua: formikEndereco.values.endereco,
          numeroEnd: formikEndereco.values.numero,
          complemento: formikEndereco.values.complemento,
          bairro: formikEndereco.values.bairro,
          cidade: formikEndereco.values.cidade,
          estado: formikEndereco.values.estado,
          cep: formikEndereco.values.cep,
        },
        redeSocial: {
          linkedin: formikSocial.values.linkedin || "N/A",
          facebook: formikSocial.values.facebook || "N/A",
          instagram: formikSocial.values.instagram || "N/A",
          site: formikSocial.values.twitter || "N/A",
        },

        logo: logoUrl,
        // Filtra URLs nulas caso algum arquivo opcional não tenha sido enviado
        arquivosLegais: [arquivo1Url, arquivo2Url].filter(
          (url) => typeof url === "string" && url.length > 0
        ),
        imagens: [logoUrl], // Usando logo como primeira imagem provisoriamente

        assignedTo: [usuarioLogado._id],
      };

      console.log("📦 Enviando dados para o backend:", dadosFinais);
      await ongService.cadastrarOng(dadosFinais);

      alert("✅ Cadastro enviado com sucesso! Aguarde a aprovação.");
      router.push("/feed");
    } catch (error: any) {
      console.error("❌ Erro no cadastro completo:", error);
      setSubmitError(
        error.response?.data?.error ||
          error.message ||
          "Falha ao finalizar cadastro. Tente novamente."
      );
    } finally {
      setIsSubmittingFinal(false);
    }
  };

  // ---------------- Render Form ----------------
  const renderForm = () => {
    switch (activeStep) {
      case 0: // Básico
        return (
          <form onSubmit={formikBasico.handleSubmit}>
            {/* ... (Campos mantidos iguais) ... */}
            <FormInput
              formik={formikBasico}
              name="razaoSocial"
              label="Razão Social"
            />
            <FormInput
              formik={formikBasico}
              name="nomeFantasia"
              label="Nome Fantasia"
            />
            <FormGroup
              formik={formikBasico}
              fields={[
                {
                  name: "cnpj",
                  label: "CNPJ",
                  placeholder: "00.000.000/0000-00",
                  mask: "cnpj",
                  width: "w-1/2",
                },
                { name: "email", label: "Email", width: "w-1/2" },
              ]}
            />
            <FormGroup
              formik={formikBasico}
              fields={[
                {
                  name: "pessoaResponsavel",
                  label: "Pessoa Responsável",
                  width: "w-1/2",
                },
                {
                  name: "cpf",
                  label: "CPF",
                  placeholder: "000.000.000-00",
                  mask: "cpf",
                  width: "w-1/2",
                },
              ]}
            />
            <FormGroup
              formik={formikBasico}
              fields={[
                {
                  name: "telefone01",
                  label: "Telefone 01",
                  placeholder: "(00) 00000-0000",
                  mask: "telefone",
                  width: "w-1/2",
                },
                {
                  name: "telefone02",
                  label: "Telefone 02 (Opcional)",
                  placeholder: "(00) 0000-0000",
                  mask: "telefone",
                  width: "w-1/2",
                },
              ]}
            />
            <FormRadioGroup
              formik={formikBasico}
              name="causaSocial"
              label="Escolha a causa principal"
              options={[
                { label: "Ambiental", value: "ambiental" },
                { label: "Animal", value: "animal" },
                { label: "Educação", value: "educacao" },
                { label: "Saúde", value: "saude" },
                { label: "Social", value: "social" },
              ]}
            />
            <div className="mb-4">
              <label className="block mb-1 font-medium">
                Conte mais sobre a ONG
              </label>
              <textarea
                name="sobreOng"
                rows={4}
                value={formikBasico.values.sobreOng}
                onChange={formikBasico.handleChange}
                onBlur={formikBasico.handleBlur}
                className="w-full border-1 rounded p-2"
              />
              {formikBasico.touched.sobreOng &&
                formikBasico.errors.sobreOng && (
                  <div className="text-red-500 text-sm mt-1">
                    {formikBasico.errors.sobreOng}
                  </div>
                )}
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Próximo
              </button>
            </div>
          </form>
        );
      case 1: // Endereço
        return (
          <form onSubmit={formikEndereco.handleSubmit}>
            <FormGroup
              formik={formikEndereco}
              fields={[
                {
                  name: "cep",
                  label: "CEP",
                  placeholder: "00000-000",
                  mask: "cep",
                  width: "w-1/2",
                },
              ]}
            />
            <button
              type="button"
              onClick={() => buscarCep(formikEndereco.values.cep)}
              className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Buscar CEP
            </button>
            <FormGroup
              formik={formikEndereco}
              fields={[
                {
                  name: "endereco",
                  label: "Endereço",
                  width: "w-full",
                  readonly: true,
                },
              ]}
            />
            <FormGroup
              formik={formikEndereco}
              fields={[
                { name: "numero", label: "Número", width: "flex-1" },
                { name: "complemento", label: "Complemento", width: "w-full" },
              ]}
            />
            <FormGroup
              formik={formikEndereco}
              fields={[
                {
                  name: "bairro",
                  label: "Bairro",
                  width: "w-1/2",
                  readonly: true,
                },
                {
                  name: "cidade",
                  label: "Cidade",
                  width: "w-1/2",
                  readonly: true,
                },
                {
                  name: "estado",
                  label: "Estado",
                  width: "w-1/10 sm:w-1/5",
                  readonly: true,
                },
              ]}
            />
            <div className="flex space-x-2 justify-end mt-4 gap-4">
              <button
                type="button"
                onClick={prevStep}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Voltar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Próximo
              </button>
            </div>
          </form>
        );

        //------------------------------------CASE 2 REDES SOCIAIS ALTERADO PARA VALIDAR URLS-------------------
      case 2: // Redes Sociais
        return (
          <form onSubmit={formikSocial.handleSubmit}>
            <FormGroup
              formik={formikSocial}
              fields={[
                { name: "linkedin", label: "LinkedIn", width: "w-1/2" },
                { name: "facebook", label: "Facebook", width: "w-1/2" },
              ]}
            />
            <FormGroup
              formik={formikSocial}
              fields={[
                { name: "instagram", label: "Instagram", width: "w-1/2" },
                { name: "twitter", label: "Twitter (Site)", width: "w-1/2" },
              ]}
            />
            <div className="flex space-x-2 justify-end mt-4 gap-4">
              <button
                type="button"
                onClick={prevStep}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Voltar
              </button>
              <div className="text-red-500">
                {JSON.stringify(formikSocial.errors)}
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Próximo
              </button>
            </div>
          </form>
        );
      case 3: // Upload (CORRIGIDO)
        return (
          <form onSubmit={formikUpload.handleSubmit}>
            <FileUpload
              label="Primeiro Arquivo Legal (PDF)"
              file={formikUpload.values.arquivo1}
              setFile={(file) => formikUpload.setFieldValue("arquivo1", file)}
              accept=".pdf"
            />
            <FileUpload
              label="Segundo Arquivo Legal (PDF)"
              file={formikUpload.values.arquivo2}
              setFile={(file) => formikUpload.setFieldValue("arquivo2", file)}
              accept=".pdf"
            />
            <ImageUpload
              label="Logo da ONG *"
              image={imagem}
              setImage={(file) => {
                setImagem(file);
                formikUpload.setFieldValue("imagem", file);
              }}
            />

            <div className="flex space-x-2 justify-end mt-4 gap-4">
              <button
                type="button"
                onClick={prevStep}
                className="px-4 py-2 bg-gray-400 text-white rounded"
                disabled={isSubmittingFinal}
              >
                Voltar
              </button>

              {/* BOTÃO FINAL CORRIGIDO COM LOADING */}
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded d-flex align-items-center"
                disabled={isSubmittingFinal}
              >
                {isSubmittingFinal ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    Enviando...
                  </>
                ) : (
                  "Finalizar Cadastro"
                )}
              </button>
            </div>
          </form>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Header_feed />
      <main className="main1">
        <div className="mx-auto p-2 w-full flex">
          <div className="w-full"></div>
          <div
            id="sideMenu_cadComp"
            className="p-2 mb-2 bg-header rounded-2 text-center w-80"
          >
            <h1 className="text-xl font-bold mb-4">Cadastro Completo</h1>
            <div className="flex mb-2 flex-full w-full justify-center sm: flex-wrap flex-column">
              {steps.map((step, index) => (
                <StepButton
                  key={step}
                  label={step}
                  active={activeStep === index}
                  onClick={() => !isSubmittingFinal && setActiveStep(index)}
                />
              ))}
            </div>
          </div>
          <div className="bg-white p-4 mb-2 rounded shadow w-75">
            {/* ALERTA DE ERRO ADICIONADO */}
            {submitError && (
              <Alert
                variant="danger"
                onClose={() => setSubmitError(null)}
                dismissible
              >
                {submitError}
              </Alert>
            )}

            {renderForm()}
          </div>
          <div className="w-full"></div>
        </div>
      </main>
    </>
  );
};

export default CadastroCompleto;
