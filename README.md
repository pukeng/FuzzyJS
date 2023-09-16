# FuzzyJS
FuzzyLogic digunakan untuk mendapatkan nilai tegas untuk variabel linguistik. Dalam mendesain game kehidupan nyata, perancang gameplay dan AI game perlu menggunakan variabel linguistik untuk mendeskripsikan objek dan pemain. Sebagai contoh, kita memiliki variabel linguistik seperti "kecepatan, sulit, mudah, sedang, tinggi, rendah, dll" untuk mendeskripsikan, misalnya, seberapa mudah sebuah pertanyaan, seberapa tinggi seseorang. Jadi bagaimana cara belajar komputer untuk menghitung pilihan terbaik tergantung pada seberapa banyak kesesuaian yang diinginkan untuk kebutuhan Anda?

# Contoh Implementasi
Mari kita lanjut kepada contoh yang lebih spesifik. Kami sedang mengembangkan aplikasi pembelajaran berbasis gamifikasi dalam bentuk kuis yang menyesuaikan tingkat pengetahuan pengguna/pemain. Tujuannya adalah menciptkana aktivitas pembelajaran yang tidak terlalu mudah dan tidak terlalu sulit melainkan menyesuaikan tingkat pengetahuan pengguna. Tipe-tipe soal atau pertanyaan dalam game memiliki tingkat kesulitan yang berbeda-beda. kemudian terdapat elemen waktu yang menjadi variabel penentu ketika pengguna berada dalam satu kondisi pertanyaan, apakah lama dalam menjawab, ataukah cukup cepat atau mungkin sangat cepat. Berikutnya terdapat elemen jawaban pengguna yang juga menjadi variabel penentu untuk dapat meningkatkan tipe soal berikutnya. Sebagai kesimpulan, dalam aplikasi ini terdapat 3 masukkan berupa tipe soal, jawaban, dan waktu. 

# Menginstal paket npm
Menggunakan npm instal fuzzymodule. Lihat https://www.npmjs.com/package/fuzzymodule

# Definisikan modul untuk fungsi fuzzy.
Anda hanya perlu membuat sebuah instance dari FuzzyModule.
```JS
var FuzzyModule = require('fuzzymodule');

var AttackModule = function() {

    this.fzmod = new FuzzyModule();
}
```

# Tentukan variabel linguistik
Jadi nilai-nilai seperti dekat, rata-rata, jauh adalah Himpunan Fuzzy yang berbeda. Himpunan Fuzzy ini dalam sebuah komposisi mewakili jarak variabel linguistik Fuzzy dari setiap varibel. Contoh tipe soal (mudah, sedang, sulit), jawaban (benar, salah), dan waktu (singkat, cukup, lama).  Himpunan Fuzzy juga disebut dengan istilah fuzzy.

Dengan menggunakan ```FuzzyModule.createFLV("nama FLV"``` Anda bisa membuat variabel linguistik sebanyak yang Anda inginkan.
```JS
    this.TKFLV = this.fzmod.createFLV("TK");

    this.TK_mudah = this.TKFLV.addTrapezoidSet("mudah", 0, 0, 3, 4);
    this.TK_sedang = this.TKFLV.addTrapezoidSet("sedang", 3, 4, 6, 8);
    this.TK_sulit = this.TKFLV.addTrapezoidSet("sulit", 6, 8, 10, 10);

    this.JFLV = this.fzmod.createFLV("J");

    this.J_salah = this.JFLV.addTrapezoidSet("salah", 0, 0, 4, 8);
    this.J_benar = this.JFLV.addTrapezoidSet("benar", 4, 8, 10, 10);

    this.WFLV = this.fzmod.createFLV("W");

    this.W_singkat = this.WFLV.addTrapezoidSet("singkat", 0, 0, 4, 6);
    this.W_cukup = this.WFLV.addTrapezoidSet("cukup", 4, 6, 8, 10);
    this.W_lama = this.WFLV.addTrapezoidSet("lama", 8, 10, 15, 15);
```

# CATATAN:
Ketika Anda mendefinisikan Himpunan Fuzzy Anda untuk variabel linguistik tertentu, pastikan bahwa batas setiap himpunan (kecuali batas kiri yang pertama dan batas kanan yang terakhir) tepat berada di titik puncak tetangganya. Sebagai contoh, batas kiri dari J_salah = 0 karena itu adalah yang pertama. Tetapi batas kanannya adalah 4 yang merupakan titik puncak dari bagian kanannya. Untuk J_benar kita memiliki batas kiri 4 yang merupakan titik puncak dari tetangga kirinya J_salah dan batas kanan 10 yang merupakan titik puncak dari bagian kanannya.

Kita hampir mendefinisikan semua variabel yang kita butuhkan. Dengan metode yang sama kita dapat mendefinisikan variabel linguistik untuk menetukan varibel keluaran/output. Cukup tambahkan satu variabel lagi yang disebut tingkat kesulitan soal. Variabel ini berperan sebagai variabel keluaran yang merepresentasikan hasil tingkat kesulitan soal berikutnya yang akan muncul.
```JS
    this.TKSFLV = this.fzmod.createFLV("TKS");

    this.TKS_mudah = this.TKSFLV.addTrapezoidSet("TKSmudah", 0, 0, 3, 4);
    this.TKS_sedang = this.TKSFLV.addTrapezoidSet("TKSsedang", 3, 4, 6, 8);
    this.TKS_sulit = this.TKSFLV.addTrapezoidSet("TKSsulit", 6, 8, 10, 10);
```

# Mendeklarasikan aturan
Ini adalah hal yang paling penting dalam mendapatkan nilai pilihan yang akurat. Di sini kita perlu berhati-hati untuk membuat aturan kita akurat dan ekspresif sehingga dapat mewakili penilaian kita atas variabel linguistik. Termin yang tepat berbeda dengan aturan fuzzy.

Aturan-aturan tersebut menggunakan Fuzzy Terms yang seperti Himpunan Fuzzy. Namun kita ingin menggunakan himpunan kita berkali-kali dan kita tidak ingin mengubahnya, jadi kita membutuhkan contoh baru dan cukup membuat contoh baru yang mewarisi himpunan kita. Kita sebut saja mereka FuzzyRules. Kita juga membutuhkan Rules baru untuk setiap variabel input ketika membuat perbedaan dengan aturan. Itulah mengapa kita membutuhkan sebuah fungsi untuk dipanggil setiap kali kita perlu mendapatkan nilai tegas untuk beberapa variabel.

Menggunakan metode lain dari FuzzyModule ```FuzzyModule.addRule(antecedent, consequent)```. Aturannya dapat ditulis seperti: ```IF antecedent THEN consequent```. Saya tidak akan membahas lebih dalam apa yang dimaksud dengan antecedent dan consequent, tetapi antecedent adalah kondisi yang ada di dalam pernyataan IF dan consequent menggambarkan apa yang menjadi consequent jika kondisi tersebut terpenuhi. Jadi untuk antecedent kita akan menggunakan variabel linguistik dan mengkomposisikannya dengan operator seperti ```AND``` dan ```OR``` di atasnya. Karena variabel linguistik tidak lebih dari komposisi himpunan, maka operator-operator ini tidak lebih dari operasi dengan himpunan di mana ```AND``` berhubungan dengan persimpangan dan ```OR``` berhubungan dengan penyatuan dua himpunan. Untuk contoh ini saya hanya akan menggunakan operator ```AND```.
```JS
this.declareRules = function() {
        var mudah = this.fzmod.makeNewFuzzyTerm(this.TK_mudah);
        var sedang = this.fzmod.makeNewFuzzyTerm(this.TK_sedang);
        var sulit = this.fzmod.makeNewFuzzyTerm(this.TK_sulit);

        var salah = this.fzmod.makeNewFuzzyTerm(this.J_salah);
        var benar = this.fzmod.makeNewFuzzyTerm(this.J_benar);
        
        var singkat = this.fzmod.makeNewFuzzyTerm(this.W_singkat);
        var cukup = this.fzmod.makeNewFuzzyTerm(this.W_cukup);
        var lama = this.fzmod.makeNewFuzzyTerm(this.W_lama);

        var TKSmudah = this.fzmod.makeNewFuzzyTerm(this.TKS_mudah);
        var TKSsedang = this.fzmod.makeNewFuzzyTerm(this.TKS_sedang);
        var TKSsulit = this.fzmod.makeNewFuzzyTerm(this.TKS_sulit);

        this.fzmod.addRule(mudah.fzAndWith(benar.fzAndWith(singkat)), TKSsedang);
        this.fzmod.addRule(mudah.fzAndWith(salah.fzAndWith(singkat)), TKSmudah);
        this.fzmod.addRule(sedang.fzAndWith(benar.fzAndWith(singkat)), TKSsulit);
        this.fzmod.addRule(sedang.fzAndWith(salah.fzAndWith(singkat)), TKSmudah);
        this.fzmod.addRule(sulit.fzAndWith(benar.fzAndWith(singkat)), TKSsulit);
        this.fzmod.addRule(sulit.fzAndWith(salah.fzAndWith(singkat)), TKSsedang);

        this.fzmod.addRule(mudah.fzAndWith(benar.fzAndWith(cukup)), TKSsedang);
        this.fzmod.addRule(mudah.fzAndWith(salah.fzAndWith(cukup)), TKSmudah);
        this.fzmod.addRule(sedang.fzAndWith(benar.fzAndWith(cukup)), TKSsulit);
        this.fzmod.addRule(sedang.fzAndWith(salah.fzAndWith(cukup)), TKSmudah);
        this.fzmod.addRule(sulit.fzAndWith(benar.fzAndWith(cukup)), TKSsulit);
        this.fzmod.addRule(sulit.fzAndWith(salah.fzAndWith(cukup)), TKSsedang);

        this.fzmod.addRule(mudah.fzAndWith(benar.fzAndWith(lama)), TKSmudah);
        this.fzmod.addRule(mudah.fzAndWith(salah.fzAndWith(lama)), TKSmudah);
        this.fzmod.addRule(sedang.fzAndWith(benar.fzAndWith(lama)), TKSmudah);
        this.fzmod.addRule(sedang.fzAndWith(salah.fzAndWith(lama)), TKSmudah);
        this.fzmod.addRule(sulit.fzAndWith(benar.fzAndWith(lama)), TKSsulit);
        this.fzmod.addRule(sulit.fzAndWith(salah.fzAndWith(lama)), TKSsedang);
    };
```
Di sini saya perlu mengatakan bahwa ```fzAndWith``` dan ```fzOrWith``` adalah metode dari FuzzyRules dan operasi ini dihitung pada saat kita mendeklarasikan (menambahkan) aturan ke modul kita. Ini adalah alasan lain mengapa kita harus menggunakan sebuah fungsi untuk melakukan hal ini. Ketika metode ```AND``` dan ```OR``` dipanggil di dalam aturan-aturan kita, antecedent diwakili oleh FuzzyRules sederhana sehingga kita bisa menggunakan kondisi ```IF THEN``` consequent.

# Fuzzify & DeFuzzify
Sekarang kita sudah hampir selesai dengan pekerjaan persiapan untuk membuat komputer membuat keputusan untuk kita. Kita hanya perlu melakukan Fuzzify variabel linguistik dengan nilai crisp untuk tingkat kesulitan soal, dan kemudian DeFuzzify variabel linguistik yang diinginkan atau dengan kata lain untuk mendapatkan nilai crisp pilihan.

Jadi bagaimana cara mencapai tujuan kita. Dengan menggunakan ```FuzzyModule.fuzzify(FLV, value)``` di mana ```FLV``` adalah variabel linguistik Fuzzy dan value adalah nilai crisp dari variabel tersebut untuk variabel input tertentu yang sedang di "analisis" dan fuzzifying nilai crisp variabel linguistik kita. Dengan ```FuzzyModule.deFuzzify(FLV)``` kita dapat memperoleh nilai tegas dari himpunan fuzzy dan aturan yang berbeda.

Untuk alasan yang sama pada bab di atas di mana kita mendeklarasikan aturan-aturan kita, kita perlu melakukan fuzzifikasi dan defuzzifikasi dalam sebuah fungsi untuk setiap variabel input yang ingin kita analisis. Juga setelah melakukan fuzzifikasi dan sebelum melakukan defuzzifikasi, kita perlu mendeklarasikan aturan-aturan kita karena aturan-aturan tersebut hanya memiliki arti ketika dibedakan dengan sebuah suku dari himpunan-himpunan yang telah difuzzifikasi untuk sebuah nilai tertentu.
```JS
this.getCrispValue = function(TK, J, W) {
        this.fzmod.fuzzify("TK", TK);
        this.fzmod.fuzzify("J", J);
        this.fzmod.fuzzify("W", W);
        this.declareRules();
        return this.fzmod.deFuzzify("TKS");
    };
```
Jadi, metode ini memberi kita nilai kelayakan yang jelas untuk nilai variabel output yang diingkan (tingkat kesulitan soal). Jika kita mendapat keluaran berdasarkan nilai variabel input (tipe soal, jawaban dan waktu) yang telah dilakukan proses fuzzifikasi hingga deffuzifikasi. Hasil keluaran tingkat keseulitan soal dengan nilai keinginan terbesar/tertinggi yang akan menjadi pilihan kita.

Hasilnya, kita memiliki sebuah soal/pertanyaan dengan algoritma AI yang dapat menyesuaikan tingkat kesulitan pengguna. 
```JS
var FuzzyModule = require("fuzzymodule");
//const firstLevel = "sedang";
var question = function() {

    this.fzmod = new FuzzyModule();

    this.TKFLV = this.fzmod.createFLV("TK");

    this.TK_mudah = this.TKFLV.addTrapezoidSet("mudah", 0, 0, 3, 4);
    this.TK_sedang = this.TKFLV.addTrapezoidSet("sedang", 3, 4, 6, 8);
    this.TK_sulit = this.TKFLV.addTrapezoidSet("sulit", 6, 8, 10, 10);

    this.JFLV = this.fzmod.createFLV("J");

    this.J_salah = this.JFLV.addTrapezoidSet("salah", 0, 0, 4, 8);
    this.J_benar = this.JFLV.addTrapezoidSet("benar", 4, 8, 10, 10);

    this.WFLV = this.fzmod.createFLV("W");

    this.W_singkat = this.WFLV.addTrapezoidSet("singkat", 0, 0, 4, 6);
    this.W_cukup = this.WFLV.addTrapezoidSet("cukup", 4, 6, 8, 10);
    this.W_lama = this.WFLV.addTrapezoidSet("lama", 8, 10, 15, 15);

    this.TKSFLV = this.fzmod.createFLV("TKS");

    this.TKS_mudah = this.TKSFLV.addTrapezoidSet("TKSmudah", 0, 0, 3, 4);
    this.TKS_sedang = this.TKSFLV.addTrapezoidSet("TKSsedang", 3, 4, 6, 8);
    this.TKS_sulit = this.TKSFLV.addTrapezoidSet("TKSsulit", 6, 8, 10, 10);

    this.declareRules = function() {
        var mudah = this.fzmod.makeNewFuzzyTerm(this.TK_mudah);
        var sedang = this.fzmod.makeNewFuzzyTerm(this.TK_sedang);
        var sulit = this.fzmod.makeNewFuzzyTerm(this.TK_sulit);

        var salah = this.fzmod.makeNewFuzzyTerm(this.J_salah);
        var benar = this.fzmod.makeNewFuzzyTerm(this.J_benar);
        
        var singkat = this.fzmod.makeNewFuzzyTerm(this.W_singkat);
        var cukup = this.fzmod.makeNewFuzzyTerm(this.W_cukup);
        var lama = this.fzmod.makeNewFuzzyTerm(this.W_lama);

        var TKSmudah = this.fzmod.makeNewFuzzyTerm(this.TKS_mudah);
        var TKSsedang = this.fzmod.makeNewFuzzyTerm(this.TKS_sedang);
        var TKSsulit = this.fzmod.makeNewFuzzyTerm(this.TKS_sulit);

        this.fzmod.addRule(mudah.fzAndWith(benar.fzAndWith(singkat)), TKSsedang);
        this.fzmod.addRule(mudah.fzAndWith(salah.fzAndWith(singkat)), TKSmudah);
        this.fzmod.addRule(sedang.fzAndWith(benar.fzAndWith(singkat)), TKSsulit);
        this.fzmod.addRule(sedang.fzAndWith(salah.fzAndWith(singkat)), TKSmudah);
        this.fzmod.addRule(sulit.fzAndWith(benar.fzAndWith(singkat)), TKSsulit);
        this.fzmod.addRule(sulit.fzAndWith(salah.fzAndWith(singkat)), TKSsedang);

        this.fzmod.addRule(mudah.fzAndWith(benar.fzAndWith(cukup)), TKSsedang);
        this.fzmod.addRule(mudah.fzAndWith(salah.fzAndWith(cukup)), TKSmudah);
        this.fzmod.addRule(sedang.fzAndWith(benar.fzAndWith(cukup)), TKSsulit);
        this.fzmod.addRule(sedang.fzAndWith(salah.fzAndWith(cukup)), TKSmudah);
        this.fzmod.addRule(sulit.fzAndWith(benar.fzAndWith(cukup)), TKSsulit);
        this.fzmod.addRule(sulit.fzAndWith(salah.fzAndWith(cukup)), TKSsedang);

        this.fzmod.addRule(mudah.fzAndWith(benar.fzAndWith(lama)), TKSmudah);
        this.fzmod.addRule(mudah.fzAndWith(salah.fzAndWith(lama)), TKSmudah);
        this.fzmod.addRule(sedang.fzAndWith(benar.fzAndWith(lama)), TKSmudah);
        this.fzmod.addRule(sedang.fzAndWith(salah.fzAndWith(lama)), TKSmudah);
        this.fzmod.addRule(sulit.fzAndWith(benar.fzAndWith(lama)), TKSsulit);
        this.fzmod.addRule(sulit.fzAndWith(salah.fzAndWith(lama)), TKSsedang);
    };

    this.getCrispValue = function(TK, J, W) {
        this.fzmod.fuzzify("TK", TK);
        this.fzmod.fuzzify("J", J);
        this.fzmod.fuzzify("W", W);
        this.declareRules();
        return this.fzmod.deFuzzify("TKS");
    };

}

var a = new question();
console.log(a.getCrispValue(1, 6, 9));
```

