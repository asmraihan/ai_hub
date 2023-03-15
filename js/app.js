// spinner function
const toggleSpinner = (isLoading) =>{
  const spinner = document.getElementById('spinner');
  if(isLoading){
    spinner.classList.remove('hidden');
  }else{
    spinner.classList.add('hidden');
  }
}
// calling data
const fetchData = async (cardCount) =>{
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url);
    const data = await res.json();
    displayData(data.data.tools,cardCount)
}

// function to display data
const displayData = (data,cardCount) =>{
    const cardsBody = document.getElementById('cards')
    const seeMoreContainer = document.getElementById('see-more-container')
    cardsBody.textContent = '';
  // default card limit
    if(cardCount && data.length > 6){
      data = data.slice(0,6);
      seeMoreContainer.classList.remove('hidden')
    }else{
      seeMoreContainer.classList.add('hidden') 
    }

    data.forEach((card) => {
        cardsBody.innerHTML += `<div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
        <a href="#">
            <img class="rounded-lg p-5" src="${card.image}" alt="" />
        </a>
        <div class="px-5 flex flex-col justify-between">
            <a href="#">
                <h5 class="text-2xl font-semibold tracking-tight text-black ">Features</h5>
            </a>
            <ol class="">
            <li class="mb-1 font-normal text-gray-700 "> ${'1. '+card.features[0]}</li>
            <li class="mb-1 font-normal text-gray-700 ">${'2. '+card.features[1]}</li>
            <li class="mb-1 font-normal text-gray-700 "> ${ card.features[2] ? '3. '+card.features[2] : ""}</li>
            <li class="mb-1 font-normal text-gray-700 "> ${ card.features[3] ? '4. '+card.features[3] : ""}</li>
            </ol>
            <hr class="border-gray-700 my-4">
            <div class="flex justify-between items-center mb-5">
              <div>
                <h5 class="mb-2 text-2xl font-semibold tracking-tight text-black ">${card.name}</h5>
                <p class=" font-normal text-gray-700 "><i class="fa-regular fa-calendar-days"></i> ${card.published_in}</p>
              </div>
            
              <div>
                <label onclick="fetchCardDetails('${card.id}')" for="my-modal-5" class="btn btn-outline border-0 rounded-full btn-error cursor-pointer text-red-400 text-xl  mx-2"> <i class="fa-solid fa-arrow-right "></i></label>
             </div>
        </div>
      </div>
      `

    });

    //button hide inside Sort by Date
  const sortDateBtn = document.getElementById('btn-sort-date');
  sortDateBtn.addEventListener('click', () => {
    const sortedData = sortData(data);
    displayData(sortedData, cardCount);

    if (cardCount && data.length > 6) {

        data = data.slice(0, 6);
        seeMoreContainer.classList.remove('hidden');
    }
    else if(cardCount && data.length===6) {
      seeMoreContainer.classList.remove('hidden');
    }
    else if(cardCount && data.length===12) {
      seeMoreContainer.classList.add('hidden');
    }
    else{
      seeMoreContainer.classList.add('hidden');
    }
  });
  toggleSpinner(false)
}
// sorting function
const sortData = (data) => {
  // Sort data property
  const sortedData = data.sort((a, b) => new Date(b.published_in) - new Date(a.published_in));
  return sortedData;
}

// button functionality for sort by date
document.getElementById('btn-see-more').addEventListener('click', function(){
  fetchData()
  toggleSpinner(true)
})

// showing card details
const fetchCardDetails = async(id) =>{
    toggleSpinner(true)
    const URL = ` https://openapi.programming-hero.com/api/ai/tool/${id}`
    // const URL = ` https://openapi.programming-hero.com/api/ai/tool/02`
    res = await fetch(URL)
    data = await res.json()
    displayCardDetails(data)
}

const displayCardDetails =(detail) =>{
    // console.log(detail)
    const modalContainer = document.getElementById('modal-container')
    modalContainer.innerHTML = `<div class="modal-box w-11/12 max-w-5xl lg:overflow-hidden">
    <div class="modal-action">
      <label for="my-modal-5" class="text-white bg-red-400 hover:bg-gray-200 hover:text-gray-900 rounded-full text-sm p-1.5 ml-auto inline-flex items-center top-0 right-0 absolute"><svg aria-hidden="true" class=" w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></label>
    </div>

      <div class="flex flex-col-reverse lg:flex-row justify-center items-center lg:p-5 gap-6">
        <div class="border-red-400 bg-red-50 border-2 rounded-lg p-5 lg:w-1/2 ">
          <div>
            <h2 class="text-black text-lg font-semibold  lg:mt-8">${detail.data?.description ? detail.data?.description : ""}</h2>
            <div class="lg:flex justify-around items-center gap-5 lg:gap-10 text-center my-2 lg:my-5">


              <h3 class="font-bold text-sm text-green-600 rounded-md px-1 lg:px-5 py-5 my-2 bg-white">${detail.data.pricing !==null ? detail.data.pricing[0].price : 'Free Of Cost'} <br>  ${detail.data.pricing !==null?detail.data.pricing[0].plan:'Basic'}</h3>
              <h3 class="font-bold text-sm text-yellow-600 rounded-md px-0 lg:px-5 py-5 my-2 bg-white">${detail.data.pricing !==null ? detail.data.pricing[1].price : 'Free Of Cost'} <br>  ${detail.data.pricing !==null?detail.data.pricing[1].plan:'Pro'}</h3>
              <h3 class="font-bold text-sm text-red-500 rounded-md px-0 lg:px-5 py-5 my-2 bg-white">${detail.data.pricing !==null ? detail.data.pricing[2].price : 'Free Of Cost'} <br>  ${detail.data.pricing !==null?detail.data.pricing[2].plan:'Enterprise'}</h3>
            </div>
            <div class="flex justify-around gap-4 lg:mb-8">
              <div>
                <h2 class="text-black text-lg font-semibold mb-4">Features</h2>
                <h3 class="mb-1 font-normal text-sm text-gray-700">${detail.data?.features[1].feature_name ? '&#9679 ' +detail.data.features[1].feature_name : ""}</h3>
                <h3 class="mb-1 font-normal text-sm text-gray-700">${detail.data?.features[2].feature_name ? '&#9679 ' +detail.data.features[2].feature_name : ""}</h3>
                <h3 class="mb-1 font-normal text-sm text-gray-700">${detail.data?.features[3].feature_name ? '&#9679 ' + detail.data.features[3].feature_name : ""}</h3>
              </div>
              <div>
                <h2 class="text-black text-lg font-semibold mb-4">Integrations</h2>
                <h3 class="mb-1 font-normal text-sm text-gray-700"> ${detail.data.integrations === null||detail.data.integrations[0] === undefined ?""  : '&#9679 ' + detail.data.integrations[0]}</h3>
                <h3 class="mb-1 font-normal text-sm text-gray-700"> ${detail.data.integrations === null||detail.data.integrations[1] === undefined ?""  :'&#9679 ' + detail.data.integrations[1]}</h3>
                <h3 class="mb-1 font-normal text-sm text-gray-700"> ${detail.data.integrations === null||detail.data.integrations[2] === undefined ?""  :'&#9679 ' + detail.data.integrations[2]}</h3>
                <h3 class="mb-1 font-normal text-sm text-gray-700">&#9679 ${detail.data.integrations === null||detail.data.integrations[3] === undefined ?"No Data found"  :detail.data.integrations[3]}</h3>
                
              </div>
            </div>
          </div>
        </div>
        <div class="w-full lg:w-1/2 text-center">
          <div class="relative">
            <img class="p-3 lg:p-8 rounded-lg" src="${detail.data.image_link[0]}" alt="">
            <h2 class="text-black text-lg font-semibold">${detail.data.input_output_examples !== null ? detail.data.input_output_examples[0].input : 'Can you give any example?'}</h2>
            <p class="mb-1 font-normal text-gray-700">${detail.data.input_output_examples !== null ? detail.data.input_output_examples[1].output : 'No! Not Yet! Take a break!!!'}</p>
            <div id="accuracy-div"
    class="text-white bg-red-500 font-medium rounded-lg text-xs px-5 py-1.5 top-12 right-12 absolute"
    style="${detail.data.accuracy.score !== null ? '' : 'display: none;'}">
    ${detail.data.accuracy.score !== null ? detail.data.accuracy.score * 100 + '% accuracy' : ''}
</div>
          </div>
        </div>
      </div>
</div>`

toggleSpinner(false)
}



