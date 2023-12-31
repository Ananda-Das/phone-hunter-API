const loadPhone = async (searchText,isShowAll) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
  const data = await res.json();
  const phones = data.data;
  // console.log(phones);
  displayPhones(phones,isShowAll);
};

const displayPhones = (phones,isShowAll) => {
  // console.log(phones);

  const phoneContainer = document.getElementById('phone-container');
    //clar phone container cards before adding new cards
    phoneContainer.textContent = '';

    //display show all button if there are more then 12 phones
    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 12 && !isShowAll){
        showAllContainer.classList.remove('hidden');
    }else{
        showAllContainer.classList.add('hidden');
    }
    // console.log(isShowAll);

    // display only first 12 phone if not show All
    if(!isShowAll){
        phones = phones.slice(0,12);
    }


  phones.forEach((phone) => {
    // console.log(phone);
    //2 create a div
    const phoneCard = document.createElement("div");
    phoneCard.classList = "card bg-gray-100 p-4 shadow-xl";
    //3 set inner html
    phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-center">
            <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
        </div>
        `;
        //4 append child
        phoneContainer.appendChild(phoneCard);
  });

  // hide loading spinner
  toggleLoadingSpinner(false);
};

//
const handleShowDetail = async(id) =>{
    // console.log(id);
    //load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    // console.log(data);
    const phone = data.data;
    // console.log(data);

    showPhoneDetails(phone);
}

//show phone deatils
const showPhoneDetails = (phone) =>{

    console.log(phone);
    const phoneName = document.getElementById('phone-name')
    phoneName.innerText = phone.name;

    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
        <img src = "${phone.image}" alt=""/>
        <p><span>Storage:</span> ${phone.mainFeatures.storage}</p>
        <p><span>Display:</span> ${phone.mainFeatures.displaySize}</p>
        <p><span>GPS:</span> ${phone?.others?.GPS}</p>
    `;

    //show the modal
    show_modal_details.showModal()
}

// handle Search button
const handleSearch = (isShowAll) =>{
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    loadPhone(searchText,isShowAll);
}

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }else{
        loadingSpinner.classList.add('hidden');
    }
}

// handle show all
const handleShowAll = () =>{
    handleSearch(true);
}

// loadPhone();
