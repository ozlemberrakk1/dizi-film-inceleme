# Dizi & Film İnceleme Platformu

Bu proje, kullanıcıların dizi ve filmler hakkında inceleme ve yorum yapabildiği, kullanıcılar arası mesajlaşma ve yönetici paneli gibi gelişmiş özellikler sunan bir Next.js uygulamasıdır.

## Özellikler

- **Kullanıcı Kayıt & Giriş:** E-posta ve şifre ile kayıt ve giriş.
- **Profil Yönetimi:** Kullanıcılar profil bilgilerini ve şifrelerini güncelleyebilir.
- **Film & Dizi Listeleme:** Tüm içerikler ana sayfada listelenir, detay sayfasında inceleme ve yorumlar görüntülenir.
- **Yorum Ekleme:** Giriş yapan kullanıcılar içeriklere yorum ekleyebilir.
- **Kategoriler:** Filmler/diziler kategorilere ayrılmıştır.
- **Kullanıcılar Arası Mesajlaşma:** Kullanıcılar birbirlerine özel mesaj gönderebilir.
- **Yönetici Paneli:** Yöneticiler kullanıcıları, içerikleri ve yorumları yönetebilir.
- **Rol Tabanlı Yetkilendirme:** Kullanıcı ve admin rolleri desteklenir.

## Kurulum

1. **Bağımlılıkları yükleyin:**
   ```bash
   npm install
   # veya
   yarn install
   ```
2. **.env dosyasını oluştur:**

   ```bash
   DATABASE_URL="file:./prisma/dev.db"
   NEXTAUTH_SECRET=bir-gizli-kod
   NEXTAUTH_URL=http://localhost:3000
   ```

3. **Veritabanını kurun ve seed verisini ekleyin:**

   ```bash
   npx prisma migrate dev --name init
   npm run prisma:seed
   ```

4. **Geliştirme sunucusunu başlatın:**

   ```bash
   npm run dev
   ```

5. **Uygulamayı açın:**  
   [http://localhost:3000](http://localhost:3000)

> Varsayılan admin hesabı:  
> **E-posta:** admin@example.com  
> **Şifre:** admin123
> Varsayılan kullanıcı hesabı1:  
> **E-posta:** ozlem@gmail.com  
> **Şifre:** ozlem1234
> Varsayılan kullanıcı hesabı2:  
> **E-posta:** zeynep@gmail.com  
> **Şifre:** zeynep1234

## Kullanılan Teknolojiler

- **Next.js 15**
- **React 19**
- **Prisma ORM & SQLite**
- **NextAuth.js** (Kimlik doğrulama)
- **Tailwind CSS** (Stil)
- **Lucide React** (İkonlar)
- **bcryptjs** (Şifreleme)

## Dizin Yapısı (Özet)

```
app/
  components/      // Ortak React bileşenleri
  api/             // API route'ları (REST)
  admin/           // Yönetici paneli ve alt sayfalar
  movies/          // Film/dizi detay sayfaları
  messages/        // Mesajlaşma sayfası
  profile/         // Kullanıcı profil sayfası
  register/        // Kayıt sayfası
  login/           // Giriş sayfası
prisma/
  schema.prisma    // Veritabanı şeması
  seed.js          // Seed verisi
```

## Geliştirici Notları

- Kimlik doğrulama için `.env` dosyanıza `NEXTAUTH_SECRET` eklemeyi unutmayın.
- Varsayılan olarak SQLite kullanılır, dilerseniz `prisma/schema.prisma` üzerinden farklı bir veritabanı sağlayıcısı tanımlayabilirsiniz.
