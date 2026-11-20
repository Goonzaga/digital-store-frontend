import { useEffect, useMemo, useState } from 'react'
import './App.css'

const demoProducts = [
  { id: '1', name: 'Tênis Nike Air Jordan 1 Mid', category: 'Tênis', price: 899.9, oldPrice: 1099.9, image: '/produc-image-1.jpeg', tag: '30% OFF', brand: 'Nike', gender: 'Masculino' },
  { id: '2', name: 'Tênis Nike Air Max 97', category: 'Tênis', price: 799.9, oldPrice: 999.9, image: '/produc-image-2.jpeg', tag: '20% OFF', brand: 'Nike', gender: 'Masculino' },
  { id: '3', name: 'Tênis Adidas Ultraboost Light', category: 'Tênis', price: 749.9, oldPrice: 899.9, image: '/produc-image-3.jpeg', tag: 'LANÇAMENTO', brand: 'Adidas', gender: 'Unissex' },
  { id: '4', name: 'Tênis Puma RS-X Reinvention', category: 'Tênis', price: 599.9, oldPrice: 699.9, image: '/produc-image-4.jpeg', tag: 'NOVO', brand: 'Puma', gender: 'Feminino' },
  { id: '5', name: 'Tênis Nike Dunk Low', category: 'Tênis', price: 699.9, oldPrice: 849.9, image: '/produc-image-5.jpeg', tag: '20% OFF', brand: 'Nike', gender: 'Unissex' },
  { id: '6', name: 'Tênis casual Urban Classic', category: 'Tênis', price: 399.9, oldPrice: 499.9, image: '/product-thumb-1.jpeg', tag: 'OFERTA', brand: 'Adidas', gender: 'Masculino' },
  { id: '7', name: 'Tênis esportivo Run Energy', category: 'Corrida', price: 529.9, oldPrice: 629.9, image: '/product-thumb-2.jpeg', tag: '20% OFF', brand: 'Asics', gender: 'Feminino' },
  { id: '8', name: 'Tênis Street Board', category: 'Casual', price: 349.9, oldPrice: 429.9, image: '/product-thumb-3.jpeg', tag: 'NOVO', brand: 'Puma', gender: 'Unissex' },
  { id: '9', name: 'Tênis esportivo Flex', category: 'Corrida', price: 459.9, oldPrice: 559.9, image: '/product-thumb-4.jpeg', tag: '18% OFF', brand: 'Nike', gender: 'Masculino' },
  { id: '10', name: 'Tênis Urban High', category: 'Casual', price: 629.9, oldPrice: 729.9, image: '/product-thumb-5.jpeg', tag: 'NOVO', brand: 'Adidas', gender: 'Unissex' },
]

const formatPrice = (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
const navigateTo = (path) => {
  window.history.pushState({}, '', path)
  window.dispatchEvent(new PopStateEvent('popstate'))
  window.scrollTo(0, 0)
}

function useRoute() {
  const readLocation = () => `${window.location.pathname}${window.location.search}`
  const [path, setPath] = useState(readLocation)
  useEffect(() => {
    const update = () => setPath(readLocation())
    window.addEventListener('popstate', update)
    const navigate = (event) => {
      const link = event.target instanceof Element ? event.target.closest('a[data-link]') : null
      if (!link || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      event.preventDefault()
      window.history.pushState({}, '', link.href)
      setPath(readLocation())
      window.scrollTo(0, 0)
    }
    document.addEventListener('click', navigate)
    return () => { window.removeEventListener('popstate', update); document.removeEventListener('click', navigate) }
  }, [])
  return path
}

function Header({ cartCount, onSearch, onCartClick, activeNav }) {
  const [search, setSearch] = useState('')
  return <>
    <div className="topline">Frete grátis em compras acima de R$ 199,90 <span> | </span> 10% OFF na primeira compra: <b>DS10</b></div>
    <header className="site-header"><div className="header-main wrap">
      <a data-link href="/" aria-label="Digital Store - início"><img className="brand-logo" src="/assets/logo-header.svg" alt="Digital Store" /></a>
      <form className="search" onSubmit={(event) => { event.preventDefault(); onSearch(search); window.history.pushState({}, '', '/products'); window.dispatchEvent(new PopStateEvent('popstate')) }}>
        <input aria-label="Buscar produto" placeholder="Buscar produto..." value={search} onChange={(event) => setSearch(event.target.value)} /><button aria-label="Buscar">⌕</button>
      </form>
      <div className="header-actions"><a className="signup" data-link href="/products">Cadastre-se</a><a className="login" data-link href="/products">Entrar</a><button type="button" className="cart" onClick={onCartClick} aria-label={`Abrir sacola, ${cartCount} itens`}><img src="/assets/mini-cart.svg" alt="" />{cartCount > 0 && <span>{cartCount}</span>}</button></div>
    </div><nav className="main-nav wrap"><a data-link href="/" className={activeNav === 'home' ? 'active' : ''}>Início</a><a data-link href="/products" className={activeNav === 'products' ? 'active' : ''}>Produtos</a><a data-link href="/products?nav=categories" className={activeNav === 'categories' ? 'active' : ''}>Categorias</a><a data-link href="/products?nav=brands" className={activeNav === 'brands' ? 'active' : ''}>Marcas</a><a data-link href="/products?nav=offers" className={activeNav === 'offers' ? 'active' : ''}>Ofertas</a></nav></header>
  </>
}

function Footer() {
  return <footer className="footer"><div className="wrap footer-inner"><div className="footer-brand"><a data-link href="/"><img src="/assets/logo-footer.svg" alt="Digital Store" /></a><p>Estilo e atitude para acompanhar você em todos os caminhos.</p><div className="socials">{['instagram', 'facebook', 'twitter'].map((social) => <a href="#" key={social} aria-label={social}><img src={`/assets/${social}.svg`} alt="" /></a>)}</div></div><div><h3>Institucional</h3><a href="#">Sobre nós</a><a href="#">Nossas lojas</a><a href="#">Privacidade</a><a href="#">Termos de uso</a></div><div><h3>Ajuda</h3><a href="#">Fale conosco</a><a href="#">Dúvidas frequentes</a><a href="#">Trocas e devoluções</a><a href="#">Acompanhe seu pedido</a></div><div><h3>Contato</h3><p>Av. das Nações Unidas, 12901<br />São Paulo, SP — 04578-910</p><p>(11) 4002-8922<br />contato@digitalstore.com.br</p></div></div><div className="wrap copyright">© 2024 Digital Store. Todos os direitos reservados.</div></footer>
}

function ProductCard({ product }) {
  return <article className="product-card"><a data-link className="product-image" href={`/product/${product.id}`}><span className="product-tag">{product.tag}</span><img src={product.image} alt={product.name} /></a><div className="product-info"><span className="product-category">{product.category}</span><a data-link href={`/product/${product.id}`}><h3>{product.name}</h3></a><div className="prices"><del>{formatPrice(product.oldPrice)}</del><strong>{formatPrice(product.price)}</strong></div></div></article>
}

function ProductGrid({ products }) { return <div className="product-grid">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div> }

function SectionTitle({ title, link = true }) { return <div className="section-title"><h2>{title}</h2>{link && <a data-link href="/products">Ver todos <span>→</span></a>}</div> }

function Home({ products }) {
  const [slide, setSlide] = useState(0)
  const slides = ['/home-slide-1.jpeg', '/home-slide-2.jpeg', '/home-slide-3.jpeg']
  const categories = [{ title: 'Camisetas', image: '/collection-1.png', icon: '◉' }, { title: 'Calças', image: '/collection-2.png', icon: '▤' }, { title: 'Bonés', image: '/collection-3.png', icon: '♧' }, { title: 'Headphones', image: '/collection-1.png', icon: '◖' }, { title: 'Tênis', image: '/collection-2.png', icon: '⌁' }]
  return <main><section className="hero wrap"><div className="hero-copy"><span className="eyebrow">A NOVA TEMPORADA CHEGOU</span><h1>Estilo que<br /><em>acompanha você.</em></h1><p>Encontre as peças que traduzem seu jeito de viver. Novidades para todos os momentos.</p><a data-link className="button button-pink" href="/products">Ver coleção</a></div><div className="hero-art"><img src={slides[slide]} alt="Destaque da coleção Digital Store" /><button className="slide-arrow prev" onClick={() => setSlide((slide + slides.length - 1) % slides.length)} aria-label="Banner anterior">‹</button><button className="slide-arrow next" onClick={() => setSlide((slide + 1) % slides.length)} aria-label="Próximo banner">›</button><div className="slide-dots">{slides.map((_, i) => <button key={i} aria-label={`Banner ${i + 1}`} className={slide === i ? 'selected' : ''} onClick={() => setSlide(i)} />)}</div></div></section>
    <section className="wrap category-section"><SectionTitle title="Compre por categoria" link={false} /><div className="category-list">{categories.map((item) => <a data-link href="/products" key={item.title} className="category-item"><span className="category-icon">{item.icon}</span><img src={item.image} alt="" /><strong>{item.title}</strong></a>)}</div></section>
    <section className="wrap home-products"><SectionTitle title="Coleção em destaque" /><ProductGrid products={products.slice(0, 4)} /></section>
    <section className="promo wrap"><div><span className="eyebrow">FEITO PARA IR MAIS LONGE</span><h2>Seu próximo passo<br />começa aqui.</h2><p>Conforto, tecnologia e design no ritmo da sua vida.</p><a data-link className="button button-dark" href="/products">Descobrir produtos</a></div><img src="/produc-image-3.jpeg" alt="Tênis da coleção" /></section>
    <section className="wrap home-products"><SectionTitle title="Mais vendidos" /><ProductGrid products={products.slice(4, 8)} /></section>
  </main>
}

const filterGroups = [{ title: 'Categoria', options: ['Esporte e lazer', 'Casual', 'Corrida', 'Tênis'] }, { title: 'Gênero', options: ['Masculino', 'Feminino', 'Unissex'] }, { title: 'Estado', options: ['Novo', 'Usado'] }, { title: 'Marca', options: ['Adidas', 'Asics', 'Nike', 'Puma'] }, { title: 'Tamanho', options: ['38', '39', '40', '41', '42', '43'] }]

function Listing({ products, searchTerm }) {
  const [filters, setFilters] = useState([])
  const [sort, setSort] = useState('relevance')
  const [mobileFilters, setMobileFilters] = useState(false)
  const filtered = useMemo(() => {
    let result = products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
    const brands = filters.filter((filter) => ['Adidas', 'Asics', 'Nike', 'Puma'].includes(filter))
    const genders = filters.filter((filter) => ['Masculino', 'Feminino', 'Unissex'].includes(filter))
    const cats = filters.filter((filter) => ['Casual', 'Corrida', 'Tênis'].includes(filter))
    if (brands.length) result = result.filter((product) => brands.includes(product.brand))
    if (genders.length) result = result.filter((product) => genders.includes(product.gender))
    if (cats.length) result = result.filter((product) => cats.includes(product.category))
    return [...result].sort((a, b) => sort === 'price-asc' ? a.price - b.price : sort === 'price-desc' ? b.price - a.price : 0)
  }, [products, filters, sort, searchTerm])
  const toggle = (option) => setFilters((current) => current.includes(option) ? current.filter((item) => item !== option) : [...current, option])
  return <main className="wrap listing-page"><div className="breadcrumbs"><a data-link href="/">Home</a> / Produtos</div><div className="listing-heading"><div><h1>Produtos</h1><span>Resultados para “{searchTerm || 'Todos os produtos'}” - {filtered.length} itens</span></div><div className="sort-wrap"><label htmlFor="sort">Ordenar por</label><select id="sort" value={sort} onChange={(event) => setSort(event.target.value)}><option value="relevance">Mais relevantes</option><option value="price-asc">Menor preço</option><option value="price-desc">Maior preço</option></select></div><button className="mobile-filter-button" onClick={() => setMobileFilters(!mobileFilters)}>☷ Filtros</button></div><div className="listing-layout"><aside className={`filters ${mobileFilters ? 'filters-open' : ''}`}><div className="filter-top"><h2>Filtrar por</h2><button onClick={() => setFilters([])}>Limpar</button></div>{filterGroups.map((group) => <fieldset key={group.title}><legend>{group.title}</legend>{group.options.map((option) => <label key={option}><input type="checkbox" checked={filters.includes(option)} onChange={() => toggle(option)} />{option}</label>)}</fieldset>)}</aside><section className="listing-results"><ProductGrid products={filtered} />{filtered.length === 0 && <p className="empty-state">Nenhum produto encontrado. Tente ajustar os filtros.</p>}</section></div></main>
}

function ProductDetail({ products, onAdd }) {
  const id = window.location.pathname.split('/').pop()
  const product = products.find((item) => String(item.id) === id) || products[0]
  const [image, setImage] = useState(0)
  const [size, setSize] = useState('40')
  const gallery = [product.image, '/product-thumb-1.jpeg', '/product-thumb-2.jpeg', '/product-thumb-3.jpeg', '/product-thumb-4.jpeg']
  return <main className="wrap detail-page"><div className="breadcrumbs"><a data-link href="/">Home</a> / <a data-link href="/products">Produtos</a> / {product.name}</div><div className="detail-layout"><section className="gallery"><div className="gallery-main"><button className="gallery-arrow" aria-label="Imagem anterior" onClick={() => setImage((image + gallery.length - 1) % gallery.length)}>‹</button><img src={gallery[image]} alt={product.name} /><button className="gallery-arrow" aria-label="Próxima imagem" onClick={() => setImage((image + 1) % gallery.length)}>›</button></div><div className="thumbnails">{gallery.map((src, index) => <button className={image === index ? 'thumb-selected' : ''} key={src + index} onClick={() => setImage(index)}><img src={src} alt={`Visualização ${index + 1}`} /></button>)}</div></section><section className="buy-box"><span className="product-category">{product.category} • {product.brand}</span><h1>{product.name}</h1><div className="rating"><span>★★★★★</span> <b>4.8</b> (128 avaliações)</div><p className="reference">REF: {product.id.padStart(6, '0')}</p><div className="detail-prices"><del>{formatPrice(product.oldPrice)}</del><strong>{formatPrice(product.price)}</strong><span>ou 10x de {formatPrice(product.price / 10)} sem juros</span></div><p className="description">O equilíbrio perfeito entre conforto e estilo. Desenvolvido com materiais de alta qualidade, este modelo garante uma experiência única em cada passo.</p><div className="option-heading"><strong>Tamanho</strong><a href="#guia">Guia de tamanhos</a></div><div className="size-options">{['38', '39', '40', '41', '42', '43'].map((option) => <button key={option} className={size === option ? 'option-selected' : ''} onClick={() => setSize(option)}>{option}</button>)}</div><div className="option-heading color-heading"><strong>Cor</strong><span>Verde / branco</span></div><div className="color-options"><button className="color-chip chosen" aria-label="Verde" /><button className="color-chip gray" aria-label="Cinza" /><button className="color-chip black" aria-label="Preto" /></div><button className="button button-pink buy-button" onClick={() => onAdd(product, size)}>Adicionar à sacola</button><div className="shipping"><span>♧</span><div><strong>Frete grátis</strong><p>em compras acima de R$ 199,90</p></div></div></section></div><section className="detail-description"><h2>Descrição do produto</h2><p>Feito para acompanhar você em todos os desafios do dia a dia. Com design contemporâneo, acabamento premium e amortecimento leve, este tênis combina com diferentes estilos e oferece conforto por muito mais tempo.</p></section><section className="home-products related"><SectionTitle title="Produtos relacionados" /><ProductGrid products={products.filter((item) => item.id !== product.id).slice(0, 4)} /></section></main>
}

function CartDrawer({ items, onClose, onQuantityChange, onRemove, onCheckout }) {
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
  const itemCount = items.reduce((count, item) => count + item.quantity, 0)
  return <div className="cart-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
    <aside className="cart-drawer" aria-label="Sacola de compras" aria-modal="true" role="dialog">
      <div className="cart-drawer-header"><h2>Sacola de compras <span>({itemCount})</span></h2><button onClick={onClose} aria-label="Fechar sacola">×</button></div>
      {items.length === 0 ? <div className="cart-empty"><span>🛍</span><h3>Sua sacola está vazia</h3><p>Que tal encontrar algo especial para você?</p><button className="button button-pink" onClick={onClose}>Continuar comprando</button></div> : <>
        <div className="cart-items">{items.map((item) => <article className="cart-item" key={item.key}><img src={item.image} alt={item.name} /><div className="cart-item-info"><h3>{item.name}</h3><p>Tamanho: {item.size}</p><strong>{formatPrice(item.price)}</strong><div className="cart-item-controls"><div className="quantity-control"><button aria-label="Diminuir quantidade" onClick={() => onQuantityChange(item.key, item.quantity - 1)}>−</button><span>{item.quantity}</span><button aria-label="Aumentar quantidade" onClick={() => onQuantityChange(item.key, item.quantity + 1)}>+</button></div><button className="remove-item" onClick={() => onRemove(item.key)}>Remover</button></div></div></article>)}</div>
        <div className="cart-summary"><div><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div><p>Frete calculado no checkout.</p><button className="button button-pink" onClick={onCheckout}>Finalizar compra</button><button className="cart-continue" onClick={onClose}>Continuar comprando</button></div>
      </>}
    </aside>
  </div>
}

function calculateCpfDigit(digits) {
  const sum = digits.split('').reduce((total, digit, index) => total + Number(digit) * (digits.length + 1 - index), 0)
  const remainder = (sum * 10) % 11
  return remainder === 10 ? 0 : remainder
}

function isValidCpf(value) {
  const digits = value.replace(/\D/g, '')
  if (digits.length !== 11 || /^([0-9])\1{10}$/.test(digits)) return false
  return calculateCpfDigit(digits.slice(0, 9)) === Number(digits[9]) && calculateCpfDigit(digits.slice(0, 10)) === Number(digits[10])
}

function Checkout({ items, onConfirm }) {
  const [form, setForm] = useState({ fullName: '', email: '', cpf: '', address: '', city: '', state: '', zip: '', payment: '' })
  const [errors, setErrors] = useState({})
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = subtotal >= 199.9 ? 0 : 19.9
  const total = subtotal + shipping
  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  const submit = (event) => {
    event.preventDefault()
    const nextErrors = {}
    if (form.fullName.trim().split(/\s+/).filter(Boolean).length < 2) nextErrors.fullName = 'Informe seu nome e sobrenome.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = 'Informe um e-mail válido.'
    if (!isValidCpf(form.cpf)) nextErrors.cpf = 'Informe um CPF válido.'
    if (form.address.trim().length < 5) nextErrors.address = 'Informe um endereço válido.'
    if (form.city.trim().length < 2) nextErrors.city = 'Informe sua cidade.'
    if (!/^[A-Za-z]{2}$/.test(form.state.trim())) nextErrors.state = 'Informe a sigla do estado com 2 letras.'
    if (!/^\d{8}$/.test(form.zip.replace(/\D/g, ''))) nextErrors.zip = 'Informe um CEP válido com 8 números.'
    if (!form.payment) nextErrors.payment = 'Selecione uma forma de pagamento.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) onConfirm({ items, subtotal, shipping, total })
  }
  const field = (name, label, props = {}) => <label className="checkout-field" htmlFor={name}>{label}<input id={name} name={name} value={form[name]} onChange={update} required aria-invalid={Boolean(errors[name])} aria-describedby={errors[name] ? `${name}-error` : undefined} {...props} />{errors[name] && <span className="field-error" id={`${name}-error`}>{errors[name]}</span>}</label>
  if (items.length === 0) return <main className="wrap checkout-page"><div className="checkout-empty"><h1>Sua sacola está vazia</h1><p>Adicione produtos à sacola antes de finalizar a compra.</p><button className="button button-pink" onClick={() => navigateTo('/products')}>Voltar à loja</button></div></main>
  return <main className="wrap checkout-page"><div className="breadcrumbs"><a data-link href="/">Início</a> / <button onClick={() => navigateTo('/products')}>Produtos</button> / Finalizar compra</div><h1 className="checkout-title">Finalizar compra</h1><p className="checkout-demo-note">Checkout demonstrativo. Nenhum pagamento será processado e seus dados não serão enviados.</p><div className="checkout-layout"><form className="checkout-form" onSubmit={submit} noValidate><section className="checkout-section"><h2>Dados pessoais</h2><div className="checkout-fields">{field('fullName', 'Nome completo', { autoComplete: 'name' })}{field('email', 'E-mail', { type: 'email', autoComplete: 'email' })}{field('cpf', 'CPF', { inputMode: 'numeric', maxLength: 14, placeholder: '000.000.000-00' })}</div></section><section className="checkout-section"><h2>Endereço de entrega</h2><div className="checkout-fields">{field('address', 'Endereço', { autoComplete: 'street-address' })}{field('city', 'Cidade', { autoComplete: 'address-level2' })}<div className="checkout-fields checkout-fields-inline">{field('state', 'Estado (UF)', { maxLength: 2, autoComplete: 'address-level1' })}{field('zip', 'CEP', { inputMode: 'numeric', maxLength: 9, placeholder: '00000-000', autoComplete: 'postal-code' })}</div></div></section><section className="checkout-section"><h2>Forma de pagamento</h2><div className="payment-options">{[['pix', 'Pix', 'Pagamento demonstrativo via Pix'], ['card', 'Cartão', 'Sem informar dados do cartão'], ['boleto', 'Boleto', 'Boleto demonstrativo']].map(([value, title, description]) => <label className={`payment-option ${form.payment === value ? 'payment-selected' : ''}`} key={value}><input type="radio" name="payment" value={value} checked={form.payment === value} onChange={update} /> <span><strong>{title}</strong><small>{description}</small></span></label>)}</div>{errors.payment && <span className="field-error">{errors.payment}</span>}</section><button type="submit" className="button button-pink checkout-submit">Confirmar pedido (demonstração)</button></form><aside className="checkout-summary"><h2>Resumo do pedido</h2><div className="checkout-summary-items">{items.map((item) => <div className="checkout-summary-item" key={item.key}><img src={item.image} alt="" /><div><strong>{item.name}</strong><span>Tamanho {item.size} · Qtd. {item.quantity}</span></div><b>{formatPrice(item.price * item.quantity)}</b></div>)}</div><div className="checkout-totals"><div><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div><div><span>Frete</span><span>{shipping === 0 ? 'Grátis' : formatPrice(shipping)}</span></div><div className="checkout-total"><strong>Total</strong><strong>{formatPrice(total)}</strong></div></div></aside></div></main>
}

function OrderConfirmation({ order }) {
  if (!order) return <main className="wrap checkout-page"><div className="checkout-empty"><h1>Nenhum pedido para exibir</h1><button className="button button-pink" onClick={() => navigateTo('/')}>Voltar à loja</button></div></main>
  return <main className="wrap checkout-page"><section className="order-confirmation"><div className="confirmation-check">✓</div><h1>Compra realizada com sucesso!</h1><p>Este é um pedido demonstrativo. Nenhum pagamento foi realizado.</p><div className="order-number">Número do pedido <strong>{order.number}</strong></div><div className="order-items"><h2>Resumo da compra</h2>{order.items.map((item) => <div className="order-item" key={item.key}><span>{item.quantity}× {item.name} · Tamanho {item.size}</span><strong>{formatPrice(item.price * item.quantity)}</strong></div>)}<div className="order-total"><span>Valor total</span><strong>{formatPrice(order.total)}</strong></div></div><button className="button button-pink" onClick={() => navigateTo('/')}>Voltar à loja</button></section></main>
}

function App() {
  const path = useRoute()
  const [products, setProducts] = useState(demoProducts)
  const [searchTerm, setSearchTerm] = useState('')
  const [cartItems, setCartItems] = useState(() => {
    try { return JSON.parse(window.localStorage.getItem('digital-store-cart') || '[]') } catch { return [] }
  })
  const [cartOpen, setCartOpen] = useState(false)
  const [order, setOrder] = useState(null)
  useEffect(() => {
    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), 2500)
    fetch('http://localhost:3000/v1/products', { signal: controller.signal }).then((response) => response.ok ? response.json() : Promise.reject()).then((data) => {
      const list = Array.isArray(data) ? data : data.products || data.data || []
      if (list.length) setProducts(list.map((item, index) => ({ ...demoProducts[index % demoProducts.length], ...item, image: item.image || item.images?.[0] || demoProducts[index % demoProducts.length].image, price: Number(item.price) || demoProducts[index % demoProducts.length].price, oldPrice: Number(item.oldPrice || item.price) || demoProducts[index % demoProducts.length].oldPrice, id: String(item.id || index + 1) })))
    }).catch(() => {}).finally(() => window.clearTimeout(timeout))
    return () => { controller.abort(); window.clearTimeout(timeout) }
  }, [])
  useEffect(() => { window.localStorage.setItem('digital-store-cart', JSON.stringify(cartItems)) }, [cartItems])
  useEffect(() => {
    if (!cartOpen) return undefined
    const closeOnEscape = (event) => { if (event.key === 'Escape') setCartOpen(false) }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [cartOpen])
  const addToCart = (product, size) => {
    const key = `${product.id}-${size}`
    setCartItems((items) => {
      const existing = items.find((item) => item.key === key)
      return existing ? items.map((item) => item.key === key ? { ...item, quantity: item.quantity + 1 } : item) : [...items, { key, id: product.id, name: product.name, price: product.price, image: product.image, size, quantity: 1 }]
    })
    setCartOpen(true)
  }
  const changeQuantity = (key, quantity) => setCartItems((items) => quantity < 1 ? items : items.map((item) => item.key === key ? { ...item, quantity } : item))
  const [pathname, query = ''] = path.split('?')
  const navSection = new URLSearchParams(query).get('nav')
  const activeNav = pathname === '/' ? 'home' : ['categories', 'brands', 'offers'].includes(navSection) ? navSection : 'products'
  const isDetail = pathname.startsWith('/product/')
  const isListing = pathname.startsWith('/products')
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0)
  const confirmOrder = (summary) => {
    const number = `DS-${Date.now().toString().slice(-8)}`
    setOrder({ ...summary, number })
    setCartItems([])
    setCartOpen(false)
    navigateTo('/order-confirmation')
  }
  const page = pathname === '/checkout'
    ? <Checkout items={cartItems} onConfirm={confirmOrder} />
    : pathname === '/order-confirmation'
      ? <OrderConfirmation order={order} />
      : isDetail
        ? <ProductDetail products={products} onAdd={addToCart} />
        : isListing
          ? <Listing products={products} searchTerm={searchTerm} />
          : <Home products={products} />
  return <><Header cartCount={cartCount} onSearch={setSearchTerm} onCartClick={() => setCartOpen(true)} activeNav={activeNav} />{page}<Footer />{cartOpen && <CartDrawer items={cartItems} onClose={() => setCartOpen(false)} onQuantityChange={changeQuantity} onRemove={(key) => setCartItems((items) => items.filter((item) => item.key !== key))} onCheckout={() => { setCartOpen(false); navigateTo('/checkout') }} />}</>
}

export default App
