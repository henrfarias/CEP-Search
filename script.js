function cepFocused () {
  const inputCep = document.querySelector('.input-cep')
  document.addEventListener('keypress', (event) => {
    if(event.key === 'Enter') {
      inputCep.blur();
    }
  })
}

function buscaCep() {
  const cep = document.querySelector('.input-cep').value; 
  const pureCep = cep.replace(/[/ /\-/]/g, '');

  loading();

  if(pureCep.length != 8 || pureCep.match(/[A-Za-z]/g) !== null) {
    return spanDisplayed();
  }
  
  const url = `https://viacep.com.br/ws/${pureCep}/json/`
  
  fetch(url)
  .then(response => response.json())
  .then(resolve => {
    if(!resolve.erro) {
      pushCep(resolve);
      requestSuccesful();
    } else {
      spanDisplayed();
    }
  })
}

function pushCep(object) {
  document.querySelector('.input-public-place').value = object.logradouro;
  document.querySelector('.input-neighborhood').value = object.bairro;
  document.querySelector('.input-city').value = object.localidade;
  document.querySelector('.input-state').value = object.uf;
}

function spanDisplayed() {
  loading();
  removeAddress();
  document.querySelector('.span-invalid').classList.remove('invisible');
  document.querySelector('.check-icon').classList.add('invisible');
  document.querySelector('.input-cep').classList.remove('req-correct');
  document.querySelector('.input-cep').classList.add('req-incorrect');
}

function requestSuccesful() {
  loading();
  document.querySelector('.span-invalid').classList.add('invisible');
  document.querySelector('.check-icon').classList.remove('invisible');
  document.querySelector('.input-cep').classList.remove('req-incorrect');
  document.querySelector('.input-cep').classList.add('req-correct');
}

function loading() {
  document.querySelector('.input-cep').classList.remove('req-correct');
  document.querySelector('.input-cep').classList.remove('req-incorrect');
  document.querySelector('.check-icon').classList.add('invisible');
  document.querySelector('.span-invalid').classList.add('invisible');
  document.querySelector('.loading').classList.toggle('invisible');

}

function removeAddress() {
  document.querySelector('.input-public-place').value = '';
  document.querySelector('.input-neighborhood').value = '';
  document.querySelector('.input-city').value = '';
  document.querySelector('.input-state').value = '';
}