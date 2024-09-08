function consoleText(words, textId, colors, consoleId) {
  if (colors === undefined) colors = ['#fff'];
  var visible = true;
  var con = document.getElementById('console' + consoleId);
  var letterCount = 1;
  var x = 1;
  var waiting = false;
  var target = document.getElementById(textId)
  target.setAttribute('style', 'color:' + colors[0])
  window.setInterval(function() {
    if (letterCount === 0 && waiting === false) {
      waiting = true;
      target.innerHTML = words[0].substring(0, letterCount)
      window.setTimeout(function() {
        var usedColor = colors.shift();
        colors.push(usedColor);
        var usedWord = words.shift();
        words.push(usedWord);
        x = 1;
        target.setAttribute('style', 'color:' + colors[0])
        letterCount += x;
        
        waiting = false;
      }, 1000)
    } else if (letterCount === words[0].length + 1 && waiting === false) {
      waiting = true;
      window.setTimeout(function() {
        x = -1;
        letterCount += x;
        waiting = false;
      }, 1000)
    } else if (waiting === false) {
      target.innerHTML = words[0].substring(0, letterCount)
      letterCount += x;
    }
  }, 120)
  window.setInterval(function() {
    if (visible === true) {
      con.className = 'console-underscore hidden'
      visible = false;

    } else {
      con.className = 'console-underscore'

      visible = true;
    }
  }, 400)
}

// function([string1, string2],target id,[color1,color2])    
consoleText(['Administração dos Donatários', 'Inquisição e autoridade eclesiástica', 'Influência estrangeira e revoltas'], 'text1',['#F6E96B','#BEDC74','#A2CA71'], 1);
consoleText(['Ciclo do Pau-Brasil', 'Ciclo da Cana-de-açúcar', 'Ciclo do Ouro'], 'text2',['#F6E96B','#BEDC74','#A2CA71'], 2);
consoleText(['Duarte Coelho, o primeiro donatário', 'Francisco José Gomes, um pedreiro renomado', 'Antônio Vieira de Melo, o primeiro cangaceiro?'], 'text3',['#F6E96B','#BEDC74','#A2CA71'], 3);
// consoleText(['Duarte Coelho, o primeiro donatário', 'Francisco José Gomes, um pedreiro renomado', 'Antônio Vieira de Melo, o primeiro cangaceiro?'], 'text3',['#F6E96B','#BEDC74','#A2CA71'], 3);