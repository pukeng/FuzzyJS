import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import fuzzy from 'fuzzy';

const KuisBahasaIndonesia = () => {
  const [currentLevel, setCurrentLevel] = useState('Mudah');
  const [currentAnswer, setCurrentAnswer] = useState('Salah');
  const [currentQuestion, setCurrentQuestion] = useState('Apa ibu kota Indonesia?');

  const questions = [
    { text: 'Apa ibu kota Indonesia?', correctAnswer: 'Benar', level: 'Mudah' },
    { text: 'Berapakah 2 + 2?', correctAnswer: 'Benar', level: 'Mudah' },
    { text: 'Siapa penemu bola lampu?', correctAnswer: 'Salah', level: 'Sedang' },
    { text: 'Apa kepanjangan dari UNICEF?', correctAnswer: 'Benar', level: 'Sedang' },
    { text: 'Siapakah presiden pertama Indonesia?', correctAnswer: 'Benar', level: 'Sulit' },
    { text: 'Berapa jumlah provinsi di Indonesia?', correctAnswer: 'Salah', level: 'Sulit' },
  ];

  const checkAnswer = (answer) => {
    setCurrentAnswer(answer);

    // Memproses variabel input fuzzy untuk menentukan tingkat kesulitan soal berikutnya
    const optionsTK = { extract: (el) => el.level };
    const optionsJ = { extract: (el) => el.correctAnswer };

    // Nilai variabel fuzzy TK dan J
    const TKValue = currentLevel;
    const JValue = currentAnswer;

    // Array nilai fuzzy TK dan J
    const TKValues = ['Mudah', 'Sedang', 'Sulit'];
    const JValues = ['Benar', 'Salah'];

    // Menerapkan algoritma fuzzy untuk menentukan tingkat kesulitan soal berikutnya
    const resultTK = fuzzy.filter(TKValue, TKValues, optionsTK);
    const resultJ = fuzzy.filter(JValue, JValues, optionsJ);

    // Mendapatkan nilai terdekat fuzzy TK dan J
    const fuzzyTK = resultTK[0].string;
    const fuzzyJ = resultJ[0].string;

    // Menentukan tingkat kesulitan soal berikutnya berdasarkan nilai fuzzy TK dan J
    if (fuzzyTK === 'Mudah' && fuzzyJ === 'Benar') {
      setCurrentLevel('Sedang');
    } else if (fuzzyTK === 'Mudah' && fuzzyJ === 'Salah') {
      setCurrentLevel('Mudah');
    } else if (fuzzyTK === 'Sedang' && fuzzyJ === 'Benar') {
      setCurrentLevel('Sulit');
    } else if (fuzzyTK === 'Sedang' && fuzzyJ === 'Salah') {
      setCurrentLevel('Sedang');
    } else if (fuzzyTK === 'Sulit' && fuzzyJ === 'Benar') {
      setCurrentLevel('Sulit');
    } else if (fuzzyTK === 'Sulit' && fuzzyJ === 'Salah') {
      setCurrentLevel('Sedang');
    }

    // Memilih pertanyaan berikutnya berdasarkan tingkat kesulitan yang telah ditentukan
    const filteredQuestions = questions.filter((q) => q.level === currentLevel);
    const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
    setCurrentQuestion(filteredQuestions[randomIndex].text);
  };

  return (
    <View>
      <Text>Pertanyaan: {currentQuestion}</Text>
      <Button title="Jawab Benar" onPress={() => checkAnswer('Benar')} />
      <Button title="Jawab Salah" onPress={() => checkAnswer('Salah')} />
      <Text>Tingkat Kesulitan: {currentLevel}</Text>
    </View>
  );
};

export default KuisBahasaIndonesia;
