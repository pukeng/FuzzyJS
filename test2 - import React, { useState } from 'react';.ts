import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import FuzzyLogic from 'fuzzylogic-js';

const Kuis = () => {
  const [pertanyaan, setPertanyaan] = useState('Pertanyaan 1');
  const [nilaiTKS, setNilaiTKS] = useState(0);

  const fuzzifikasiTK = (tk) => {
    // Definisi fungsi keanggotaan untuk variabel TK (Mudah, Sedang, Sulit)
    const mudah = FuzzyLogic.triangle(tk, 1, 1, 2);
    const sedang = FuzzyLogic.trapezoid(tk, 1, 2, 3, 4);
    const sulit = FuzzyLogic.triangle(tk, 3, 5, 6);

    return { mudah, sedang, sulit };
  };

  const fuzzifikasiJ = (j) => {
    // Definisi fungsi keanggotaan untuk variabel J (Benar, Salah)
    const benar = FuzzyLogic.triangle(j, 0, 0, 0.5);
    const salah = FuzzyLogic.triangle(j, 0.5, 1, 1);

    return { benar, salah };
  };

  const inferensiFuzzy = (tk, j) => {
    // Aturan Fuzzy
    const tksSedang = FuzzyLogic.and(fuzzifikasiTK(tk).mudah, fuzzifikasiJ(j).benar);
    const tksMudah = FuzzyLogic.and(fuzzifikasiTK(tk).mudah, fuzzifikasiJ(j).salah);
    const tksSulit = FuzzyLogic.and(fuzzifikasiTK(tk).sedang, fuzzifikasiJ(j).benar);
    const tksSedang2 = FuzzyLogic.and(fuzzifikasiTK(tk).sedang, fuzzifikasiJ(j).salah);
    const tksSulit2 = FuzzyLogic.and(fuzzifikasiTK(tk).sulit, fuzzifikasiJ(j).benar);
    const tksSedang3 = FuzzyLogic.and(fuzzifikasiTK(tk).sulit, fuzzifikasiJ(j).salah);

    // Menggabungkan hasil inferensi fuzzy
    const tksMaksimum = FuzzyLogic.or(tksSedang, tksMudah, tksSulit, tksSedang2, tksSulit2, tksSedang3);

    return tksMaksimum;
  };

  const defuzzifikasi = (tks) => {
    // Definisi fungsi keanggotaan untuk variabel output TKS (Mudah, Sedang, Sulit)
    const mudah = FuzzyLogic.triangle(tks, 1, 1, 2);
    const sedang = FuzzyLogic.trapezoid(tks, 1, 2, 3, 4);
    const sulit = FuzzyLogic.triangle(tks, 3, 5, 6);

    // Metode Defuzzifikasi: Rata-rata Tertimbang
    const nilaiCrisp = (mudah * 1 + sedang * 3 + sulit * 5) / (mudah + sedang + sulit);

    return nilaiCrisp;
  };

  const jawabBenar = () => {
    const tk = 1; // Nilai input TK (misalnya 1 untuk "Mudah")
    const j = 0.7; // Nilai input J (misalnya 0.7 untuk "Benar")

    // Proses Inferensi Fuzzy
    const nilaiTKS = inferensiFuzzy(tk, j);

    // Proses Defuzzifikasi
    const nilaiCrisp = defuzzifikasi(nilaiTKS);

    // Menentukan pertanyaan berikutnya berdasarkan hasil defuzzifikasi TKS
    if (nilaiCrisp >= 1 && nilaiCrisp < 2) {
      setPertanyaan('Pertanyaan 2 (Mudah)');
    } else if (nilaiCrisp >= 2 && nilaiCrisp < 4) {
      setPertanyaan('Pertanyaan 2 (Sedang)');
    } else {
      setPertanyaan('Pertanyaan 2 (Sulit)');
    }

    // Simpan nilai crisp TKS ke dalam state
    setNilaiTKS(nilaiCrisp);
  };

  // Fungsi jawabSalah() memiliki implementasi yang serupa, namun menggunakan nilai J salah (misalnya 0.3) untuk menguji hasilnya.

  return (
    <View>
      <Text>{pertanyaan}</Text>
      <Button title="Benar" onPress={jawabBenar} />
      {/* <Button title="Salah" onPress={jawabSalah} /> */}
    </View>
  );
};

export default Kuis;
