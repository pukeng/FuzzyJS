var FuzzyModule = require("fuzzymodule");
//const firstLevel = "sedang";
var AttackModule = function() {

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

var a = new AttackModule();
console.log(a.getCrispValue(1, 6, 9));