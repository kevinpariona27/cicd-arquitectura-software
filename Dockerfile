# ========================================================
# ETAPA 1: Builder (Dependencias y optimización)
# Responsable: Zaga (Capítulo 3: Inmutabilidad y Contenedores Docker)
# ========================================================
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Copiar manifiestos de dependencias
COPY package*.json ./

# Instalar dependencias solo de producción para la imagen final
RUN npm ci --only=production --ignore-scripts

# ========================================================
# ETAPA 2: Runner (Entorno de producción ligero y seguro)
# Principio de menor privilegio y reducción de superficie de ataque
# ========================================================
FROM node:20-alpine AS runner

# Definir variables de entorno de producción
ENV NODE_ENV=production \
    PORT=3000

WORKDIR /usr/src/app

# Copiar dependencias de producción limpias desde la etapa anterior
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY package*.json ./

# Copiar el código fuente de la aplicación
COPY src ./src

# Asignar permisos al usuario no privilegiado 'node' (DevSecOps)
USER node

# Exponer el puerto de la aplicación
EXPOSE 3000

# Health check integrado a nivel de contenedor Docker (Miriam - Resiliencia)
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

# Comando de inicio del servidor
CMD ["node", "src/server.js"]
