/* ==========================================================
   1. DADOS DOS PRODUTOS
   Edite este array com seus produtos reais.
   id: único · name: nome · price: número (USD) · desc: descrição curta
   ========================================================== */
const PRODUCTS = [
  { id: "p1", name: "Fritadeira Elétrica Sem Óleo KONKA", price: 17.90, stock: "Em estoque", desc: "Grande capacidade, tela digital e janela visível — cabe até um frango inteiro.", img: "images/fritadeira-konka.jpg" },
  { id: "p2", name: "Caixa de Som Bluetooth Portátil", price: 37.00, stock: "Em estoque", desc: "Som potente e portátil, à prova de água e poeira (IP68) — ideal pra qualquer lugar.", img: "images/caixa-de-som.jpg" },
];

/* ==========================================================
   2. ESTADO DO CARRINHO (em memória — reinicia ao recarregar)
   ========================================================== */
let cart = [];

/* ---------- Renderizar catálogo ---------- */
function renderProducts() {
  const grid = document.getElementById("productGrid");
  grid.innerHTML = PRODUCTS.map(p => `
    <article class="product-card">
      <div class="product-media">
        <span class="stock-tag">${p.stock}</span>
        <img src="${p.img}" alt="${p.name}" loading="lazy">
      </div>
      <div class="product-body">
        <h3 class="product-name">${p.name}</h3>
        <p class="product-desc">${p.desc}</p>
        <div class="product-foot">
          <span class="product-price">$${p.price.toFixed(2)}</span>
          <button class="add-btn" data-id="${p.id}">Adicionar</button>
        </div>
      </div>
    </article>
  `).join("");

  grid.querySelectorAll(".add-btn").forEach(btn => {
    btn.addEventListener("click", () => addToCart(btn.dataset.id));
  });
}

/* ---------- Lógica do carrinho ---------- */
function addToCart(id) {
  const product = PRODUCTS.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  renderCart();
  openCart();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  renderCart();
}

function cartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function renderCart() {
  const itemsEl = document.getElementById("cartItems");
  const emptyEl = document.getElementById("cartEmpty");
  const countEl = document.getElementById("cartCount");
  const totalEl = document.getElementById("cartTotal");

  countEl.textContent = cart.reduce((n, item) => n + item.qty, 0);
  totalEl.textContent = `$${cartTotal().toFixed(2)}`;

  if (cart.length === 0) {
    itemsEl.innerHTML = "";
    itemsEl.appendChild(emptyEl);
    return;
  }

  itemsEl.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div>
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-meta">${item.qty} × $${item.price.toFixed(2)}</div>
        <button class="cart-item-remove" data-id="${item.id}">remover</button>
      </div>
      <div>$${(item.price * item.qty).toFixed(2)}</div>
    </div>
  `).join("");

  itemsEl.querySelectorAll(".cart-item-remove").forEach(btn => {
    btn.addEventListener("click", () => removeFromCart(btn.dataset.id));
  });

  renderPayPalButton();
}

/* ---------- Abrir / fechar gaveta do carrinho ---------- */
function openCart() {
  document.getElementById("cartDrawer").classList.add("open");
  document.getElementById("cartOverlay").classList.add("open");
}
function closeCart() {
  document.getElementById("cartDrawer").classList.remove("open");
  document.getElementById("cartOverlay").classList.remove("open");
}

document.getElementById("cartToggle").addEventListener("click", openCart);
document.getElementById("cartClose").addEventListener("click", closeCart);
document.getElementById("cartOverlay").addEventListener("click", closeCart);

/* ==========================================================
   3. PAGAMENTO — PayPal
   O client-id "sb" no index.html é o modo SANDBOX (teste).
   Antes de publicar: crie uma conta developer em
   https://developer.paypal.com, gere um Client ID de produção
   e substitua "sb" por ele na tag <script> do index.html.
   ========================================================== */
let paypalRendered = false;
function renderPayPalButton() {
  const container = document.getElementById("paypal-button-container");
  if (!window.paypal || cart.length === 0) {
    container.innerHTML = "";
    paypalRendered = false;
    return;
  }
  container.innerHTML = "";
  paypal.Buttons({
    style: { layout: "vertical", color: "black", shape: "rect", label: "paypal" },
    createOrder: (data, actions) => actions.order.create({
      purchase_units: [{ amount: { value: cartTotal().toFixed(2) } }]
    }),
    onApprove: (data, actions) => actions.order.capture().then(details => {
      alert(`Pagamento aprovado por ${details.payer.name.given_name}. Obrigado!`);
      cart = [];
      renderCart();
      closeCart();
    }),
    onError: err => {
      console.error(err);
      alert("Ocorreu um erro no pagamento. Tente novamente.");
    }
  }).render("#paypal-button-container");
}

/* ==========================================================
   4. PAGAMENTO — Alipay
   Alipay não tem um botão de client-side simples como o PayPal:
   é necessário um backend que crie a cobrança usando a
   Alipay Open Platform API (https://global.alipay.com) e
   devolva um link/QR code de pagamento. O botão abaixo é um
   placeholder — conecte-o ao seu backend quando estiver pronto.
   ========================================================== */
document.getElementById("alipayBtn").addEventListener("click", () => {
  if (cart.length === 0) return;
  alert("Botão de exemplo. Conecte este botão ao seu backend com a Alipay Open Platform API para gerar a cobrança real.");
});

/* ==========================================================
   5. Formulário de contato (front-end apenas)
   Para receber as mensagens de verdade, conecte este formulário
   a um serviço como Formspree, EmailJS, ou seu próprio backend.
   ========================================================== */
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  document.getElementById("formNote").textContent = "Mensagem pronta para envio — conecte este formulário a um serviço de e-mail (ex: Formspree, EmailJS).";
  e.target.reset();
});

/* ---------- Init ---------- */
document.getElementById("year").textContent = new Date().getFullYear();
renderProducts();
renderCart();
