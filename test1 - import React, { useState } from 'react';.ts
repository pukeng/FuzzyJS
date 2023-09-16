import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

const Kuis = () => {
  const [pertanyaan, setPertanyaan] = useState('Pertanyaan 1');
  const [nilaiTKS, setNilaiTKS] = useState(0);

  const jawabBenar = () => {
    // Proses inferensi fuzzy dan defuzzifikasi untuk mendapatkan nilai crisp TKS berdasarkan jawaban benar
    const nilaiCrisp = 3.5; // Contoh nilai crisp hasil defuzzifikasi

    // Menentukan pertanyaan berikutnya berdasarkan nilai crisp TKS
    if (nilaiCrisp >= 0 && nilaiCrisp < 2) {
      setPertanyaan('Pertanyaan 2 (Mudah)');
    } else if (nilaiCrisp >= 2 && nilaiCrisp < 4) {
      setPertanyaan('Pertanyaan 2 (Sedang)');
    } else {
      setPertanyaan('Pertanyaan 2 (Sulit)');
    }

    // Simpan nilai crisp TKS ke dalam state
    setNilaiTKS(nilaiCrisp);
  };

  const jawabSalah = () => {
    // Proses inferensi fuzzy dan defuzzifikasi untuk mendapatkan nilai crisp TKS berdasarkan jawaban salah
    const nilaiCrisp = 2.0; // Contoh nilai crisp hasil defuzzifikasi

    // Menentukan pertanyaan berikutnya berdasarkan nilai crisp TKS
    if (nilaiCrisp >= 0 && nilaiCrisp < 2) {
      setPertanyaan('Pertanyaan 2 (Mudah)');
    } else if (nilaiCrisp >= 2 && nilaiCrisp < 4) {
      setPertanyaan('Pertanyaan 2 (Sedang)');
    } else {
      setPertanyaan('Pertanyaan 2 (Sulit)');
    }

    // Simpan nilai crisp TKS ke dalam state
    setNilaiTKS(nilaiCrisp);
  };

  return (
    <View>
      <Text>{pertanyaan}</Text>
      <Button title="Benar" onPress={jawabBenar} />
      <Button title="Salah" onPress={jawabSalah} />
    </View>
  );
};

export default Kuis;
