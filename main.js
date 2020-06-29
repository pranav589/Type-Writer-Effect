class typeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    //current index of word
    const current = this.wordIndex % this.words.length;

    //get full text of the current word
    const fullText = this.words[current];

    //check if deleting
    if (this.isDeleting) {
      //remove character
      this.txt = fullText.substring(0, this.txt.length - 1);

    } else {
      //add character
      this.txt = fullText.substring(0, this.txt.length + 1)
    }
    //insert text into Element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}<span>`

    //initial type speed
    let typeSpeed = 300;

    if (this.isDeleting) {
      typeSpeed = typeSpeed / 2;
    }
    //if word ia completed
    if (!this.isDeleting && this.txt === fullText) {
      //make pause  at end 
      typeSpeed = this.wait;

      //set delete to true 
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;

      //move to next word 
      this.wordIndex++;

      //pause before start typing
      typeSpeed = 500
    }

    setTimeout(() => this.type(), typeSpeed)
  }
}

//init on dom load
document.addEventListener('DOMContentLoaded', init);

function init() {
  const txtElement = document.querySelector('.txt-type');

  const words = JSON.parse(txtElement.getAttribute('data-words'));

  const wait = txtElement.getAttribute('data-wait');

  new typeWriter(txtElement, words, wait)
}