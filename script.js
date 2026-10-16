const menuBtn = document.getElementById('menuBtn');
const mainMenu = document.getElementById('mainMenu');
menuBtn.addEventListener('click', () => {
  const next = menuBtn.getAttribute('aria-expanded') !== 'true';
  menuBtn.setAttribute('aria-expanded', String(next));
  mainMenu.classList.toggle('open', next);
});
mainMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  mainMenu.classList.remove('open');
  menuBtn.setAttribute('aria-expanded', 'false');
}));
document.getElementById('year').textContent = new Date().getFullYear();
const dateInput = document.querySelector('input[name="data"]');
const now = new Date();
dateInput.min = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
document.getElementById('quoteForm').addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const get = name => String(data.get(name) || '').trim();
  const date = get('data');
  const dateLabel = date ? date.split('-').reverse().join('/') : '';
  const lines = [
    'Olá! Gostaria de solicitar um orçamento com a YAGO TOUR.', '',
    'Nome: ' + get('nome'),
    'WhatsApp: ' + get('telefone'),
    'Data da viagem: ' + dateLabel,
    'Quantidade de passageiros: ' + get('passageiros'),
    'Saída: ' + get('origem'),
    'Destino: ' + get('destino'),
    'Serviço: ' + get('servico')
  ];
  if (get('detalhes')) lines.push('Detalhes: ' + get('detalhes'));
  const url = 'https://wa.me/5531985035668?text=' + encodeURIComponent(lines.join('\n'));
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
  if (!newWindow) window.location.href = url;
});
