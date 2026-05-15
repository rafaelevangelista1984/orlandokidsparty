/* ==========================================================================
   ⚙️  CONFIG — Centro de controle do site
   --------------------------------------------------------------------------
   Edite os valores abaixo pra atualizar info do site SEM mexer no HTML.
   Depois de salvar, basta dar refresh (F5) que tudo se atualiza.
   ========================================================================== */

window.SITE_CONFIG = {

  /* -----------------------------------------------------------------
     ABERTURA — Aparece no badge do hero, FAQ e footer
     -----------------------------------------------------------------
     opening.status:   uma palavra-chave que controla o badge inteiro
       "soon"        → mostra "Em breve em Orlando, FL"
       "date"        → mostra "Abertura: <opening.date>"
       "open"        → mostra "Aberto em Orlando, FL"
       "custom"      → usa o texto livre em opening.customLabel.*

     opening.date:     ano ou mês/ano. Aparece em vários lugares.
                       Exemplos: "2026", "Outubro/2026", "Q3 2026"

     opening.customLabel: usado só quando status = "custom"
  ----------------------------------------------------------------- */
  opening: {
    status: 'soon',                              // "soon" | "date" | "open" | "custom"
    date: { pt: '2026', en: '2026' },

    // Labels prontos por status (não precisa mexer, a menos que queira reescrever)
    labels: {
      soon:  { pt: '🇧🇷 Em breve em Orlando, FL', en: '🇧🇷 Coming soon to Orlando, FL' },
      date:  { pt: '🇧🇷 Abertura: {date}',         en: '🇧🇷 Opening: {date}' },
      open:  { pt: '🇧🇷 Aberto em Orlando, FL',    en: '🇧🇷 Now open in Orlando, FL' },
      custom:{ pt: '🇧🇷 Pré-lançamento',           en: '🇧🇷 Pre-launch' }
    },

    // Usado quando status = "custom" (escreva o que quiser)
    customLabel: {
      pt: '🇧🇷 Pré-lançamento — vagas limitadas',
      en: '🇧🇷 Pre-launch — limited spots'
    },

    // Frase longa do FAQ "Quando vocês abrem?"
    faqAnswer: {
      pt: 'Estamos finalizando a estruturação do espaço com previsão de abertura para {date}. Quem se cadastra agora fica sabendo em primeira mão e ganha condições especiais nas primeiras festas.',
      en: 'We\'re finalizing the venue setup with an opening planned for {date}. Anyone who registers now will be the first to know and will get special pricing on the first parties.'
    },

    // Número grande do hero (social proof "abertura prevista")
    heroNumber: { pt: '2026', en: '2026' }
  },

  /* -----------------------------------------------------------------
     CONTATO
  ----------------------------------------------------------------- */
  contact: {
    whatsapp:        '16027848479',          // formato internacional sem '+', sem espaços
    whatsappDisplay: '+1 (602) 784-8479',    // como aparece pra leitura humana
    email:           'orlandokidsparty@gmail.com',
    location:        'Orlando, FL'
  },

  /* -----------------------------------------------------------------
     REDES SOCIAIS — coloque os URLs reais quando tiver
  ----------------------------------------------------------------- */
  social: {
    instagram: 'https://instagram.com/orlandokidsparty',
    facebook:  '',
    tiktok:    ''
  },

  /* -----------------------------------------------------------------
     CONTADOR DO HERO — "X+ famílias interessadas"
     Atualize manualmente conforme leads reais chegarem
  ----------------------------------------------------------------- */
  interestedCount: 127
};
