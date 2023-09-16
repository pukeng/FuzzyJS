//level untuk nomor 1 dirandom

if (waktu <= 10) return singkat
if (waktu >10 && waktu <=20) return cukup
if (waktu >20) return lama

if (level = sulit, jawaban = benar) return sulit
if (level = sulit, jawaban = salah) return sedang
if (level = sedang, jawaban = benar, waktu = singkat) return sulit
if (level = sedang, jawaban = benar, waktu = cukup) return sedang
if (level = sedang, jawaban = benar, waktu = lama) return mudah
if (level = sedang, jawaban = salah) return mudah
if (level = mudah, jawaban = benar) return sedang
if (level = mudah, jawaban = salah) return mudah