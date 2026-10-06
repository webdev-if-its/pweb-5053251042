// PERTEMUAN 5 — JavaScript Dasar dan DOM
// versi revisi

export const katalog = [
  { judul: 'Laskar Pelangi', penulis: 'Andrea Hirata', harga: 45000, tersedia: true },
  { judul: 'Bumi Manusia', penulis: 'Pramoedya Ananta Toer', harga: 60000, tersedia: false },
  { judul: 'Cantik Itu Luka', penulis: 'Eka Kurniawan', harga: 55000, tersedia: true },
  { judul: 'Negeri 5 Menara', penulis: 'Ahmad Fuadi', harga: 40000, tersedia: true },
  { judul: 'Ayat-Ayat Cinta', penulis: 'Habiburrahman El Shirazy', harga: 0, tersedia: false },
];

// Level 1
export function formatRupiah(angka) {
  if (angka === undefined) return 'Rp';
  return 'Rp ' + angka.toLocaleString('id-ID');
}

// Level 2
export function saringTersedia(daftar) {
  return daftar.filter((buku) => buku.tersedia);
}

// Level 3
export function sorotJudulPengumuman() {
  const judul = document.querySelector('#judul-pengumuman');
  judul.textContent = judul.textContent.toUpperCase();
}

// Level 4
export function tandaiPengumumanPenting() {
  const daftarLi = document.querySelectorAll('#daftar-pengumuman li');

  for (const li of daftarLi) {
    const teks = li.textContent;

    if (!teks.toLowerCase().includes('tutup') || teks.startsWith('⚠ ')) {
      continue;
    }

    li.textContent = '⚠ ' + teks;
  }
}

// Level 5
export function buatKartuBuku(buku) {
  const article = document.createElement('article');

  const judul = document.createElement('h3');
  judul.textContent = buku.judul;

  const penulis = document.createElement('p');
  penulis.textContent = buku.penulis;

  const harga = document.createElement('p');
  harga.textContent = formatRupiah(buku.harga);

  article.appendChild(judul);
  article.appendChild(penulis);
  article.appendChild(harga);

  return article;
}

// Level 6 & 10
export function render(data) {
  const wadah = document.querySelector('#katalog');
  const ringkasan = document.querySelector('#ringkasan');

  ringkasan.textContent = `${data.length} buku ditemukan`;

  if (data.length === 0) {
    const pesan = document.createElement('p');
    pesan.textContent = 'Tidak ada buku yang cocok.';

    wadah.replaceChildren(pesan);
    return;
  }

  const kartuList = data.map((buku) => {
    const kartu = buatKartuBuku(buku);

    kartu.addEventListener('click', () => {
      tampilkanDetail(buku);
    });

    return kartu;
  });

  wadah.replaceChildren(...kartuList);
}

// Level 7
function tampilkanDetail(buku) {
  const panel = document.querySelector('#panel-detail');

  panel.textContent =
    `Judul: ${buku.judul}, Penulis: ${buku.penulis}, Harga: ${formatRupiah(buku.harga)}`;
}

// Level 8 & 9
export function pasangFormCari() {
  document.querySelector('#form-cari').addEventListener('submit', (event) => {
    event.preventDefault();

    const kata = document.querySelector('#input-cari').value.toLowerCase();

    const hasil = katalog.filter((buku) =>
      buku.judul.toLowerCase().includes(kata)
    );

    render(hasil);
  });
}

// Bootstrap halaman
sorotJudulPengumuman();
tandaiPengumumanPenting();
render(katalog);
pasangFormCari();