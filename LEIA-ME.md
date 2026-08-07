# Sua loja — guia rápido

## Arquivos
- `index.html` — estrutura da página (catálogo, carrinho, contato)
- `style.css` — visual (cores, tipografia, layout)
- `script.js` — produtos, lógica do carrinho, botões de pagamento
- Ficam todos na mesma pasta — não mova um sem os outros.

## 1. Editar os produtos
Abra `script.js` e edite o array `PRODUCTS` no topo do arquivo. Cada produto tem:
```js
{ id: "p1", name: "Nome", price: 19.90, stock: "Em estoque", desc: "Descrição curta." }
```
Adicione, remova ou edite quantos quiser — a página se atualiza sozinha.

## 2. Domínio .com gratuito ou barato
Domínios `.com` de verdade não são gratuitos (custam ~$10–15/ano em registradores como Namecheap ou Porkbun), mas a **hospedagem** pode ser gratuita. Duas rotas comuns:

- **Opção rápida (recomendada):** hospede grátis em **Netlify**, **Vercel** ou **GitHub Pages** (te dão um endereço tipo `sua-loja.netlify.app`), depois compre um domínio `.com` separado e aponte-o para lá.
- **Totalmente gratuito, sem domínio próprio:** fique só no subdomínio gratuito da Netlify/Vercel/GitHub Pages enquanto testa o negócio.

Todos esses funcionam normalmente fora da China (não são bloqueados lá onde você está).

### Publicar no Netlify (mais simples)
1. Crie uma conta grátis em netlify.com
2. Arraste a pasta desta loja (com os 3 arquivos) para a área "Deploy" do painel
3. Pronto — você recebe um link ativo em segundos
4. Em "Domain settings" você pode conectar um domínio `.com` comprado depois

## 3. Pagamentos

**PayPal** — já está integrado no `script.js`, mas em modo de teste (`client-id=sb` no `index.html`).
Antes de publicar de verdade:
1. Crie uma conta em developer.paypal.com
2. Gere um "Client ID" de produção (live)
3. Substitua `sb` por esse ID na tag `<script>` do `index.html`

**Alipay** — não tem botão simples de front-end como o PayPal; exige um backend (servidor) que fale com a Alipay Open Platform API para gerar a cobrança. O botão no site é um espaço reservado — quando você tiver o backend pronto, me chame para conectarmos.

## 4. SEO (Google e Baidu)
- `index.html` já tem uma tag `<meta name="description">` — edite com a descrição real da sua loja
- Troque `<title>Loja — Catálogo</title>` pelo nome real do seu negócio
- Baidu prioriza sites com bom tempo de carregamento e conteúdo em chinês — se quiser alcance na China depois, uma versão em chinês da página ajuda bastante

## 5. Formulário de contato
O formulário hoje só mostra uma mensagem de confirmação — ele não envia e-mail de verdade ainda. Para receber as mensagens, conecte-o a um serviço gratuito como **Formspree** (formspree.io) — leva 5 minutos.
