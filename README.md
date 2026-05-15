# Orlando Kids Party - Brazilian Buffet

Landing page de validação de mercado. Captura leads, mede demanda, mostra a proposta.

## Estrutura

```
orlando-kids-party/
├── index.html          # Página principal (bilíngue PT/EN, toggle via JS)
├── forms.html          # Formulários de detecção pelo Netlify (não linkado)
├── css/styles.css      # Estilos (paleta coral/mostarda/menta + gold, sparkles, ondas)
├── js/
│   ├── config.js       # ⚙️ EDITE AQUI: data de abertura, contato, redes sociais
│   └── script.js       # Lógica (toggle idioma, form, GA, animações)
├── netlify.toml        # Config Netlify (headers, cache)
└── README.md           # Este arquivo
```

---

## ⚙️ 1. CONFIG — Mudar data de abertura, contato e redes (sem mexer no HTML)

Toda info dinâmica do site fica em **`js/config.js`**. Abra esse arquivo e edite os valores.
Depois é só salvar e dar refresh no navegador — o site atualiza sozinho em tudo que é dinâmico (badge do hero, FAQ, footer, botão flutuante).

### Mudar a data de abertura

```js
opening: {
  status: 'soon',                              // ← MUDE AQUI
  date: { pt: '2026', en: '2026' },           // ← E AQUI se quiser data específica
  ...
}
```

**Status disponíveis:**
| `status` | Badge no hero | Quando usar |
|---|---|---|
| `'soon'` | "🇧🇷 Em breve em Orlando, FL" | Ainda sem data definida (fase atual) |
| `'date'` | "🇧🇷 Abertura: 2026" (usa `date`) | Já tem mês/ano definido |
| `'open'` | "🇧🇷 Aberto em Orlando, FL" | Quando inaugurar |
| `'custom'` | Usa `customLabel` livre | Texto personalizado (ex: "Pré-lançamento") |

**Exemplos práticos:**

```js
// Cenário 1: ainda sem data (estado atual)
opening: { status: 'soon', date: { pt: '2026', en: '2026' } }

// Cenário 2: definiu Outubro de 2026
opening: { status: 'date', date: { pt: 'Outubro/2026', en: 'October 2026' } }

// Cenário 3: já abriu
opening: { status: 'open', date: { pt: '2026', en: '2026' } }

// Cenário 4: texto custom
opening: { status: 'custom', customLabel: { pt: '🇧🇷 Reservas abertas — vagas limitadas', en: '🇧🇷 Bookings open — limited spots' } }
```

A `date` é usada automaticamente:
- No badge (quando `status: 'date'`)
- No número grande do hero ("abertura prevista: 2026")
- Na resposta do FAQ "Quando vocês abrem?"

### Mudar contato

```js
contact: {
  whatsapp:        '16027848479',          // formato internacional sem '+' nem espaços
  whatsappDisplay: '+1 (602) 784-8479',    // como vai aparecer pro leitor
  email:           'orlandokidsparty@gmail.com',
  location:        'Orlando, FL'
}
```

O `whatsapp` (só números) gera o link `https://wa.me/16027848479`. O `whatsappDisplay` é só visual.

### Adicionar redes sociais (quando criar)

```js
social: {
  instagram: 'https://instagram.com/orlandokidsparty',
  facebook:  'https://facebook.com/orlandokidsparty',
  tiktok:    'https://tiktok.com/@orlandokidsparty'
}
```

> **Importante**: enquanto o URL estiver vazio (`''`), o link **fica oculto no footer**. Assim você não tem dead links. Quando criar a conta, cola o URL e o link aparece automaticamente.

### Atualizar contador de famílias interessadas

```js
interestedCount: 127
```

Atualize manualmente conforme leads reais chegarem. **Sugestão honesta**: comece com um número real (ex: 12 nas primeiras semanas) — fica mais autêntico do que inventar 100+ de cara.

---

## 🖼️ 2. Trocar fotos por reais

As fotos atuais vêm do **Unsplash** (banco gratuito com licença comercial). São placeholders pra você ter ideia visual. Quando tiver suas próprias fotos, substitua.

### Onde estão as fotos no HTML

| Local | Como achar no `index.html` |
|---|---|
| About — foto principal | Busque por `about-visual` |
| Serviço "Salão temático" | Busque por `service-card__media` (3 ocorrências, em ordem) |
| Serviço "Pacote completo" | 2ª ocorrência |
| Serviço "Decoração personalizada" | 3ª ocorrência |
| Cardápio — banner principal | Busque por `menu-hero-photo` |
| OG image (compartilhamento social) | Busque por `og:image` no `<head>` |

### Como trocar

Cada foto está num `<img src="https://images.unsplash.com/...">`. Substitua o `src` por:

**Opção A — Foto local (recomendado pra controle total)**
1. Crie uma pasta `images/` dentro de `orlando-kids-party/`
2. Salve a foto lá (ex: `images/salao.jpg`)
3. Mude o `src` para `images/salao.jpg`
4. Otimize antes! Use https://squoosh.app — comprima JPG até ~150KB

**Opção B — Outra foto Unsplash**
Vá em https://unsplash.com, busque "kids birthday party", copie o ID da URL (a parte tipo `photo-1530103862676-de8c9debad1d`) e cole no `src` mantendo `?w=600&q=80&auto=format&fit=crop`.

**Fallback automático**: se uma foto não carregar, o site mostra um emoji gradiente bonito no lugar — nada quebra visualmente.

---

## 3. Como rodar localmente

```powershell
# Opção 1: Python
cd orlando-kids-party
python -m http.server 8000
# Abre http://localhost:8000

# Opção 2: VS Code Live Server
# Instala extensão "Live Server" → clica direito no index.html → "Open with Live Server"
```

> **Nota**: os formulários só funcionam **depois do deploy no Netlify**. Localmente, vão dar erro ao submeter — isso é normal.

---

## 4. Deploy no Netlify (5 minutos)

### Drag & Drop (mais rápido)

1. Acesse https://app.netlify.com/drop
2. Faça login (Google/GitHub)
3. Arraste a pasta `orlando-kids-party` inteira
4. Em ~30s seu site sobe num domínio tipo `https://amazing-pasteur-123456.netlify.app`

### Via Git (recomendado para iterar com versão)

1. Crie repo no GitHub e dê push
2. Netlify → **Add new site** → **Import an existing project** → conecte ao repo
3. Deploy automático

### Domínio próprio (opcional)

Compre `orlandokidsparty.com` em Namecheap/GoDaddy e configure os nameservers do Netlify. ~10 min de setup.

---

## 5. Google Analytics 4 (tracking de visitantes + localização)

1. https://analytics.google.com → **Admin** → **Create Property**
2. Nome: "Orlando Kids Party", time zone: Eastern, currency: USD
3. Adicione um **Web data stream** com a URL do seu Netlify
4. Copie o **Measurement ID** (formato `G-XXXXXXXXXX`)
5. No `index.html`, busque `G-XXXXXXXXXX` (2 ocorrências) e substitua
6. Faça novo deploy

**Em ~24h você vai ver:**
- País/cidade dos visitantes (Orlando vai dominar; mas qualquer cidade aparece)
- Dispositivo, idioma, fonte (Instagram, Google, direto)
- Tempo na página, scroll depth (25%, 50%, 75%, 90%)
- Eventos: `lead_submit`, `whatsapp_float_click`, `faq_opened`, `package_complete_click`, `language_change`

**Relatórios chave:**
- **Reports → Realtime** → ver visitantes ao vivo
- **Reports → Engagement → Events** → quantos leads vs WhatsApp vs pacote clicado
- **Reports → Demographics → City** (filtro Florida) → bairros mais interessados

---

## 6. Microsoft Clarity (heatmaps + gravações)

1. https://clarity.microsoft.com → Sign up grátis
2. **New Project**: nome "Orlando Kids Party", URL do Netlify
3. Copie o **Project ID** (string tipo `abc123xyz0`)
4. No `index.html`, busque `clarity.ms/tag/XXXXXXXXXX` e substitua
5. Deploy

Em ~2h aparecem heatmaps de cliques e gravações de sessões anônimas.

---

## 7. Receber os leads (Netlify Forms)

Os formulários já estão configurados. Após o primeiro deploy:

**Habilitar notificação por email:**
1. No painel Netlify do site → **Forms** → **Settings & usage** → **Form notifications**
2. **Add notification** → **Email notification**
3. `orlandokidsparty@gmail.com` (ou outro)
4. Selecione o form **interesse** → Save
5. Repita para o form **pergunta**

Cada lead chega no seu email com todos os campos.

**Exportar leads**: Forms → clique no nome → **Download CSV**.

**Quota gratuita**: 100 submissões/mês. Se passar, US$ 19/mês.

---

## 8. Checklist pré-lançamento

- [ ] Editou `js/config.js` com data atual e contatos
- [ ] Trocou `G-XXXXXXXXXX` (GA4) no `index.html`
- [ ] Trocou Clarity Project ID no `index.html`
- [ ] Ativou email de notificação dos forms no Netlify
- [ ] Testou em celular (menu mobile, toggle PT/EN)
- [ ] Testou o formulário no ar (envia, mostra tela de sucesso, chega no email)
- [ ] Testou WhatsApp (clicou no botão flutuante, abriu o WhatsApp com o número certo)
- [ ] FAQ abre e fecha bem
- [ ] Pediu pra 2-3 pessoas testarem antes de divulgar

---

## 9. Onde divulgar para validar

**Público brasileiro em Orlando:**

1. **Grupos Facebook**: "Brasileiros em Orlando", "Brasileiros na Flórida", "Mães Brasileiras em Orlando"
2. **Instagram**: cria `@orlandokidsparty`, posta o link na bio, conteúdo "vem aí"
3. **WhatsApp**: grupos de brasileiros, condomínios com forte comunidade BR
4. **Tráfego pago** (depois de métricas orgânicas): Meta Ads geo-Orlando + interesse em Brasil/Brazilian food/Kids parties

**Sinais fortes de validação** (~200-500 visitantes):
- Conversão visitante → lead > 5% = demanda real forte
- Cliques em "Pacote Completo" > 30% dos cliques em pacotes = sweet spot achado
- > 20% dos leads marcam "data definida" ou "próximos 3 meses" = urgência real
- Perguntas espontâneas no formulário aberto = engajamento autêntico

---

## 10. Próximos passos pós-validação

Quando tiver dados (~30 dias):
- Trocar fotos placeholder pelas reais do espaço
- Adicionar depoimentos das primeiras famílias
- Criar páginas por tema (SEO de cauda longa: "festa princesa orlando", etc.)
- Integrar agendamento online (Calendly grátis)
- Blog em PT pra SEO ("doces brasileiros para festa", "como organizar festa em Orlando")

---

Boa sorte com a validação. Quando precisar iterar, é só chamar.
