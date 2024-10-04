const loadAllPhones = async (show, inputValue) => {
 
    document.getElementById('loader').classList.add('hidden');
    const reponse = await fetch(`https://openapi.programming-hero.com/api/phones?search=${inputValue ? inputValue : "iphone"}`);
    const data = await reponse.json();
    
    show ? displayAllPhones(data.data) : displayAllPhones(data.data.slice(0, 6));



}
const displayAllPhones = (phones) => {
    const phoneContainer = document.getElementById('phone-container');
    phones.forEach(phone => {
        const {brand, image, slug, phone_name} = phone;
        
        const phoneCard = document.createElement('div');
        phoneCard.innerHTML = `
        <div class="card bg-base-100 shadow-2xl">
  <figure class="px-10 pt-10">
    <img src=${image} />
  </figure>
  <div class="card-body items-center text-center">
    <h2 class="card-title">Model: ${phone_name}</h2>
    <h2 class="card-title">Brand: ${brand}</h2>
    <div class="card-actions">
      <button onclick="showDeatils('${slug}')" class="btn bg-blue-400">See Details</button>
    </div>
  </div>
</div>   
 `;
phoneContainer.appendChild(phoneCard)
    });
}

const showDeatils = async (details) => {
     const response = await fetch(` https://openapi.programming-hero.com/api/phone/${details}`)
     const data = await response.json();
     const {brand , image, slug} = data.data;
    const modalContent = document.getElementById('modal-content');
    modalContent.innerHTML = `
    <div class="text-center">
    <img src="${image}"/>
    <h1 class="text-lg font-bold">${brand}</h1>
    <P>${slug}</p>
    </div>
    `
     myModal.showModal()
};


const showAllHandler = () => {
    loadAllPhones(true);
}


const buttonHandler = () => {
    document.getElementById('loader').classList.remove('hidden');
    const inputText = document.getElementById('inputValue').value;

    setTimeout(() => {
        loadAllPhones(false, inputText);
    }, 3000);
}




loadAllPhones(false, 'iphone');




