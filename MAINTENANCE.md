# 🎖️ GUIDA ALLA MANUTENZIONE E ESPANSIONE

## Istruzioni per Mantenere e Sviluppare il Sito

### 📂 Struttura dei File

```
storia bersaglieri/
├── index.html          # ⭐ File principale - Contiene tutta la struttura HTML
├── styles.css          # 🎨 Styling moderno - Tutti gli stili CSS
├── script.js           # ⚙️ Logica interattiva - JavaScript per animazioni
├── manifest.json       # 📦 Web app manifest per PWA
├── config.json         # ⚙️ Configurazione sito
├── sw.js              # 🔄 Service Worker per offline
├── robots.txt         # 🤖 SEO - istruzioni per i motori di ricerca
├── sitemap.xml        # 🗺️ SEO - mappa del sito
├── .htaccess          # 🔧 Configurazione Apache server
├── README.md          # 📖 Documentazione completa
├── MAINTENANCE.md     # 📋 Questo file
└── loader.html        # ⚡ Loader/Entry point opzionale
```

---

## 🔧 Modifiche Comuni

### 1️⃣ Cambiare i Colori

**File**: `styles.css` - Righe 6-12

```css
:root {
    --primary-color: #DC143C;      /* Crimson - Rosso Bersaglieri */
    --secondary-color: #001A80;    /* Blu reale */
    --accent-color: #FFD700;       /* Oro */
    --dark-bg: #0a0e27;            /* Sfondo scuro */
    --card-bg: #1a1f3a;            /* Card background */
    --text-light: #e0e0e0;         /* Testo chiaro */
    --text-muted: #a0a0a0;         /* Testo muted */
    --border-color: #2a3050;       /* Bordi */
}
```

### 2️⃣ Aggiungere una Nuova Sezione

**Passo 1**: Aggiungi il link nella navbar in `index.html`

```html
<li><a href="#nuova-sezione" class="nav-link">Nuova Sezione</a></li>
```

**Passo 2**: Aggiungi il contenuto HTML

```html
<section id="nuova-sezione" class="section nuova-sezione">
    <div class="container">
        <h2 class="section-title">TITOLO SEZIONE</h2>
        <!-- Contenuto qui -->
    </div>
</section>
```

**Passo 3**: Aggiungi lo stile in `styles.css`

```css
.nuova-sezione {
    background: linear-gradient(180deg, rgba(26, 31, 58, 0.5) 0%, rgba(15, 20, 53, 0.5) 100%);
}
```

**Passo 4**: Aggiungi l'animazione in `script.js`

```javascript
observer.observe(document.querySelectorAll('.nuova-sezione .card'));
```

### 3️⃣ Modificare il Contenuto Storico

Tutto il contenuto storico è direttamente in `index.html` e può essere facilmente modificato cercando:
- Timeline sections (linee 100-200)
- Battaglia cards (linee 350-450)
- Fanfare cards (linee 550-650)
- Raduni cards (linee 750-850)

### 4️⃣ Aggiungere Effetti di Parallax

In `script.js`, personalizza la velocità:

```javascript
// Cambiar il fattore di parallax (0.5 = normale, 1.0 = doppio)
heroParticles.style.transform = `translateY(${scrollPosition * 0.5}px)`;
```

---

## 🚀 Deployment

### Per Netlify
1. Carica l'intera cartella su GitHub
2. Connetti il repository a Netlify
3. Deploy automatico ad ogni push

### Per Vercel
1. `npm install -g vercel`
2. `vercel` nella directory del progetto
3. Segui le istruzioni

### Per Server Tradizionale
1. Carica tutti i file via FTP
2. Assicurati che `.htaccess` sia presente
3. Abilita GZIP compression
4. Configura SSL/HTTPS

---

## 📈 SEO Optimization

### ✅ Già Implementato
- Meta tags completi
- Robots.txt
- Sitemap.xml
- Schema.org structured data
- OpenGraph tags
- Twitter Card tags

### 📝 Da Fare Opzionalmente
- Aggiungere Google Analytics
- Aggiungere breadcrumb schema
- Creare pagine per backlinks
- Aggiungere FAQ schema

### Aggiungi Google Analytics

In `index.html`, prima di `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_ID');
</script>
```

---

## 🐛 Debugging

### Problemi Comuni

#### 1. Le animazioni non funzionano
**Soluzione**: Controlla che il browser supporti CSS Transforms e JavaScript sia abilitato

#### 2. Il sito carica lentamente
**Soluzione**: 
- Abilita GZIP compression
- Implementa caching aggressivo
- Usa un CDN
- Minifica CSS/JS

#### 3. Il Service Worker non funziona
**Soluzione**: 
- Usa HTTPS (localmente funziona su localhost)
- Svuota la cache del browser
- Controlla la console per errori

---

## 🔐 Sicurezza

### Headers Configurati in `.htaccess`
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`

### Best Practices
1. Mantieni HTTPS sempre abilitato
2. Valida tutto l'input dell'utente
3. Mantieni le dipendenze aggiornate
4. Usa Content Security Policy (CSP) se necessario

---

## 📊 Analytics da Tracciare

```javascript
// Aggiungi tracking per sezioni visitate
gtag('event', 'page_view', {
    'page_path': location.pathname + location.hash,
    'page_title': document.title
});
```

---

## 🎯 Ottimizzazioni Future

### Core Web Vitals
- [ ] LCP (Largest Contentful Paint) < 2.5s
- [ ] FID (First Input Delay) < 100ms
- [ ] CLS (Cumulative Layout Shift) < 0.1

### Miglioramenti Suggeriti
1. Aggiungere immagini ottimizzate (WebP)
2. Implementare lazy loading per sezioni
3. Aggiungere form di contatto
4. Aggiungere newsletter signup
5. Aggiungere commenti/discussioni
6. Aggiungere dark mode toggle
7. Aggiungere lingue multiple (EN, FR, DE)
8. Aggiungere blog section

---

## 📱 Testing Responsive

### Breakpoints da Testare
- 📱 320px (Very small phone)
- 📱 480px (Small phone)
- 📱 768px (Tablet)
- 💻 1024px (Laptop)
- 🖥️ 1400px+ (Large desktop)

### Browser Testing
```bash
# Test localmente
python -m http.server 8000
# Poi visita http://localhost:8000
```

---

## 🔄 Versionamento

Versioni correnti:
- **Site Version**: 2.0.0
- **Cache Version**: bersaglieri-v1.0.0
- **Deployed**: 2026-04-27

Per aggiornamenti:
1. Incrementa la versione in `config.json`
2. Aggiorna `CACHE_NAME` in `sw.js`
3. Aggiorna `manifest.json`
4. Aggiorna la data di lastmod in `sitemap.xml`

---

## 📞 Support

Per problemi o domande:
- Email: info@storia-bersaglieri.it
- Telefono: +39 06 1234 5678

---

## 📚 Ulteriori Risorse

- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS Tricks](https://css-tricks.com/)
- [Web.dev](https://web.dev/)
- [Can I Use](https://caniuse.com/)

---

**🎖️ Motto: Velocitas, Ferrum, Gloria 🇮🇹**
