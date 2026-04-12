# ==========================================
# Stage 1: Install Dependencies
# ==========================================
FROM node:20-alpine AS deps

# Necessário para binários nativos em Alpine (ex: sharp, bcrypt)
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copia apenas os arquivos de dependência para aproveitar cache
COPY package.json package-lock.json* ./

# Instala dependências de forma determinística
RUN npm ci

# ==========================================
# Stage 2: Build da Aplicação
# ==========================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copia dependências instaladas no stage anterior
COPY --from=deps /app/node_modules ./node_modules

# Copia todo o código-fonte
COPY . .

# Desativa telemetria da Vercel/Next.js
ENV NEXT_TELEMETRY_DISABLED=1

# Build de produção (sem --turbopack, que é experimental)
RUN npm run build

# ==========================================
# Stage 3: Servidor de Produção (imagem mínima)
# ==========================================
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Cria grupo e usuário não-root para segurança
RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nextjs

# Copia arquivos estáticos públicos
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Copia o output standalone gerado pelo Next.js
# (requer output: 'standalone' no next.config.ts)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static    ./.next/static

# Muda para o usuário seguro
USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Inicia o servidor standalone gerado pelo Next.js
CMD ["node", "server.js"]
