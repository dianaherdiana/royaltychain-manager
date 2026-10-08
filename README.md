# RoyaltyChain Manager

Buat website responsive bernama RoyaltiChain.

Judul:
Prototype Sistem Lisensi dan Pelacakan Royalty Otomatis pada Karya Digital Berbasis NFT dan Smart Contract.

Tujuan

Membantu kreator karya digital mendaftarkan karya sebagai NFT, mengelola lisensi, serta memantau transaksi dan royalty secara transparan menggunakan konsep blockchain dan smart contract.

Target pengguna

Kreator karya digital.

Pembeli atau pemegang NFT.

Publik atau verifier.

Gaya UI

Buat UI yang modern, clean, profesional, dan mudah digunakan, seperti dashboard aplikasi SaaS/Web3 modern.

Jangan membuat desain terlalu futuristik, terlalu banyak neon, atau terlalu ramai.

Gunakan:

Background utama: putih atau very light gray.

Sidebar: dark navy.

Accent color: purple/indigo.

Text: dark gray/navy.

Card: putih dengan border tipis dan subtle shadow.

Border radius: 12–16px.

Font: Inter atau font sans-serif modern.

Icon: gunakan icon sederhana dan konsisten.

Spacing antar elemen harus lega.

Gunakan hierarchy yang jelas antara heading, subtitle, label, dan data.

Pastikan website terlihat seperti prototype aplikasi nyata, bukan sekadar kumpulan halaman.

Struktur Navigasi

Gunakan sidebar pada dashboard dengan:

RoyaltiChain

Dashboard
My Works
Licenses
Royalty
Transactions
Verification

Di bagian bawah sidebar:

Settings
User Profile

Tambahkan tombol Connect Wallet di bagian kanan atas.

1. Landing Page

Buat landing page yang sederhana tetapi menarik.

Navbar:

RoyaltiChain

How It Works

Features

Verification

Connect Wallet

Hero section:

“Manage Your Digital Works, Licenses & Royalties”

Subtitle:

“Register digital artworks as NFTs, manage licensing information, and track creator royalties transparently.”

Tombol:

Get Started

Verify NFT

Di sebelah kanan hero, buat visual mockup berupa card NFT yang menampilkan:

Artwork

Token ID

License: ACTIVE

Royalty: 5%

Verified badge

Di bawah hero buat section:

How It Works

Tampilkan 3 langkah berbentuk card:

Register Your Work

Manage License

Track Royalty

2. Creator Dashboard

Dashboard harus menjadi halaman utama setelah login.

Header:

Good morning, Creator 👋

Subtitle:

Manage your digital works, licenses, and royalty activity.

Tambahkan 4 statistic cards:

Total Works
12

NFT Sales
28

Total Royalty
2.45 ETH

Active Licenses
8

Di bawahnya:

Royalty Overview

Buat line/bar chart sederhana yang menunjukkan royalty berdasarkan bulan.

Recent Transactions

Tabel:

ArtworkSale PriceRoyaltyDateStatusDigital Sunset1.2 ETH0.06 ETHOct 08CompletedCyber Garden0.8 ETH0.04 ETHOct 06Completed

Gunakan badge:

Completed = hijau

Pending = kuning

Failed = merah

3. My Works

Buat halaman dengan heading:

My Digital Works

Subtitle:

Manage your registered NFT artworks.

Di kanan atas:

+ Register New Work

Gunakan grid card, bukan tabel.

Setiap artwork card berisi:

gambar artwork

nama karya

Token ID

License status

Royalty percentage

tombol View Details

Contoh:

Digital Sunset

Token #001

🟢 License Active

Royalty 5%

View Details

Buat card artwork terlihat menarik dan menjadi elemen visual utama.

4. Register New Work

Buat form yang rapi dalam dua kolom pada desktop.

Section:

Artwork Information

Artwork Title

Description

Category

Upload Artwork

Section:

License & Royalty

License Type

License Start Date

License End Date

Royalty Percentage

License Type:

Personal

Commercial

Exclusive

Non-Exclusive

Di bagian bawah tampilkan preview:

NFT Preview

Kemudian tombol:

Register NFT

Setelah berhasil, tampilkan modal:

NFT Successfully Registered ✓

Informasi:

Token ID

Contract Address

Transaction Hash

Royalty Rate

Gunakan dummy data untuk prototype.

5. License Management

Heading:

License Management

Buat tabel dengan desain clean.

Kolom:

Artwork
License Type
Start Date
End Date
Royalty
Status
Action

Status:

🟢 ACTIVE
🟡 EXPIRED
🔴 REVOKED

Gunakan tombol:

View

Edit

Revoke

Jika license direvoke, jangan hapus histori.

6. Royalty Dashboard

Heading:

Royalty Tracking

Buat 3 statistic cards:

Total Royalty
2.45 ETH

Royalty Rate
5%

Transactions
28

Di bawahnya tampilkan chart:

Royalty Earnings

Gunakan bar chart sederhana.

Kemudian tabel:

| Transaction | Artwork | Sale Price | Royalty | Date | Status |

Tambahkan informasi kecil:

Royalty is calculated automatically based on the configured royalty percentage.

7. Transaction History

Heading:

Transaction History

Buat tabel responsive.

Kolom:

Transaction Hash
Artwork
Token ID
Buyer
Sale Price
Royalty
Timestamp
Status

Wallet address ditampilkan secara singkat:

0x12A4...89BC

Jangan menampilkan informasi pribadi.

Tambahkan filter:

All

Completed

Pending

Failed

8. NFT Verification

Buat halaman yang lebih sederhana dan fokus.

Di tengah halaman:

Verify Digital Artwork

Subtitle:

Check the registration, ownership, license status, and royalty information of an NFT.

Buat search box besar:

Enter Token ID or Contract Address

Tombol:

Verify NFT

Jika valid, tampilkan verification result card:

🟢 NFT VERIFIED

Artwork image

Digital Sunset

Token ID: #001

Creator: 0x12A4...89BC

License: Commercial

License Status: 🟢 ACTIVE

Royalty: 5%

Registered: Oct 01, 2026

Contract: 0xAB12...91EF

Transaction: 0x98FA...72BC

Tambahkan timeline:

Registered → Licensed → Sold → Royalty Distributed

Jika tidak ditemukan:

🔴 NFT NOT FOUND

Jika lisensi berakhir:

🟡 LICENSE EXPIRED

Jika lisensi dicabut:

🔴 LICENSE REVOKED

9. NFT Detail Page

Buat layout dua kolom.

Kiri:

artwork besar.

Kanan:

Artwork title

Token ID

Creator

Owner

License

Royalty

Verification status

Di bawahnya buat dua section:

License History

dan

Transaction History

Gunakan timeline agar informasi mudah dibaca.

10. Responsive Design

Pastikan:

Desktop menggunakan sidebar.

Tablet menyesuaikan ukuran card dan tabel.

Mobile menggunakan collapsible sidebar/menu.

Card berubah menjadi satu kolom pada mobile.

Tabel dapat di-scroll horizontal jika diperlukan.

Tombol dan input tetap nyaman digunakan pada layar kecil.

11. Data Prototype

Gunakan data dummy/fiktif saja.

Contoh karya:

Digital Sunset

Cyber Garden

Pixel Dreams

Abstract Motion

Contoh wallet:
0x12A4...89BC

0x89EF...123A

Jangan gunakan data pribadi nyata.

12. Blockchain Concept

Untuk prototype, gunakan mock blockchain data.

On-chain concept:

Token ID

Contract Address

Wallet Address

Royalty Rate

Transaction Hash

Timestamp

Metadata Hash/URI

Off-chain concept:

Artwork image

Artwork description

License details

License dates

Display information

Jangan menyimpan:

Password

Private key

Seed phrase

Nomor identitas

Nomor telepon

Alamat rumah

Data pribadi sensitif

secara langsung di blockchain.

Jangan mengklaim dummy transaction sebagai transaksi blockchain sungguhan.

13. Teknologi

Gunakan:

React

TypeScript

Tailwind CSS

Reusable components

Mock data

Buat komponen reusable untuk:

Sidebar

Navbar

Statistic Card

Artwork Card

Status Badge

Data Table

Modal

Verification Card

Chart

Pastikan struktur kode rapi dan mudah dikembangkan untuk integrasi database dan smart contract pada tahap berikutnya.

Prioritas prototype

Prioritaskan kualitas UI dan tiga fungsi utama:

1. NFT Registration

2. License Management

3. Royalty Tracking

NFT Verification menjadi fitur pendukung.

Buat seluruh prototype dapat digunakan tanpa wallet sungguhan menggunakan Demo Mode.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/8eddb5ff-2b71-48c6-b674-5e1b0aa15fed).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
