# 🎙️ JYP QUIZ MASTER | Fullstack Music Quiz

![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

Uma aplicação web gamificada de alta performance desenvolvida para testar conhecimentos sobre os artistas da **JYP Entertainment**. O projeto demonstra habilidades em consumo de APIs de terceiros, roteamento dinâmico e UI/UX imersiva.

---

## 🚀 Demonstração Técnica

O foco deste projeto foi criar um motor de quiz escalável onde a interface se adapta dinamicamente à identidade visual de cada grupo (Stray Kids, ITZY, NMIXX, TWICE, etc.).

### **Principais Funcionalidades:**
- **Roteamento Dinâmico:** Estrutura baseada em pastas utilizando o Next.js App Router.
- **Integração com iTunes API:** Consumo de dados em tempo real para busca de previews de áudio e artes de álbuns.
- **Persistência de Dados:** Gerenciamento de High Scores independentes por artista via LocalStorage.
- **UI Gamificada:** Design focado em UX com Glassmorphism, animações de entrada e feedbacks visuais de acerto/erro.

---

## 🛠️ Arquitetura e Stacks

### **Frontend**
- **React & Next.js:** Utilização de Client Components para interatividade e Server Routes para segurança.
- **Tailwind CSS:** Estilização baseada em tokens para facilitar a troca de temas (Ex: Temas Neon para ITZY vs Industrial para SKZ).
- **TypeScript:** Tipagem rigorosa para garantir a integridade dos dados vindos dos arquivos JSON e da API externa.

### **Backend (API Routes)**
- Implementação de um endpoint Proxy em `/api/songs` para realizar requisições à iTunes Search API, tratando filtros de busca e evitando erros de CORS no client-side.

---

## 📂 Estrutura de Pastas

```text
app/
├── api/            # Route Handlers (Backend)
├── artists/        # Portal de seleção de artistas
├── itzy/           # Instância do jogo para ITZY
├── skz/            # Instância do jogo para Stray Kids
└── nmixx/          # Instância do jogo para NMIXX
assets/             # Dados estáticos (JSONs) e componentes reutilizáveis
