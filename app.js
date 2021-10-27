//alert('workeds')
const sliderContainer ={
    imageContainer:document.querySelector('.img-container'),
    dots:document.querySelectorAll('.slider-dot'),
    images:document.querySelectorAll('.img-wrapper'),
    imagesImg:document.querySelectorAll('img'),
    imgFrame:document.querySelector('.img-frame'),
    leftArrow:document.querySelector('.left-arrow'),
    rightArrow:document.querySelector('.right-arrow'),
    currentImgIndex:0,
    translateAmount:0,
}
const sliderMethods ={
    setFrameOne:function(){
    //set first frame to be width of first image
    sliderContainer.imagesImg[0].onload = ()=>{
    sliderContainer.imgFrame.style.width = `${sliderContainer.imagesImg[0].clientWidth}px`
        }
    },
    addDotEventListeners:()=>{
        //add event listener on all dots for on click and change display to not equal none on click
        for (let i = 0;i<sliderContainer.dots.length;i++){

            sliderContainer.dots[i].addEventListener('click',function(event){
                //update current img index
                sliderContainer.currentImgIndex=i;
                //remove active-dot class
                for(let j =0;j<sliderContainer.dots.length;j++){
                    if(sliderContainer.dots[j].classList.contains('active-dot')){
                        sliderContainer.dots[j].classList.remove('active-dot')
                        const imgWidth = sliderContainer.imagesImg[j].clientWidth
                        const nextImgWidth = sliderContainer.imagesImg[i].clientWidth

                        //get length of slide
                        let imageTranslations = [0]
                        let startingNum = i;
                        let endingNum = j;
                        let IsNegativeMultipler = -1;
                        if(i>j){
                            startingNum = j;
                            endingNum = i;
                            IsNegativeMultipler = 1;
                        }
                        for(let k=startingNum;k<endingNum;k++){
                            imageTranslations.push(sliderContainer.imagesImg[k].clientWidth)
                        }
                        let slideWidth = imageTranslations.reduce((a,c)=>a+c)

                        //update slide width css
                        sliderContainer.imageContainer.style.transform = `translate(${sliderContainer.translateAmount-(slideWidth*IsNegativeMultipler)}px,0px)`
                        //update current slide width
                        sliderContainer.translateAmount-=(slideWidth*IsNegativeMultipler)

                        //update frame container width
                        sliderContainer.imgFrame.style.width=`${nextImgWidth}px`
                        
                    }

                }

                //add active class to clicked button
                sliderContainer.dots[i].classList.add('active-dot')
            })
        }
    },
    addArrowEventListener:()=>{
        //add arrow event listenters
        sliderContainer.rightArrow.addEventListener('click',(event)=>{
            const widthToPhotoOne = [...sliderContainer.imagesImg].slice(0,sliderContainer.imagesImg.length-1).map(e=>e.clientWidth).reduce((a,c)=>a+c)
            if(sliderContainer.currentImgIndex+1===6){
                sliderContainer.currentImgIndex=0;
                //translate slide
                sliderContainer.imageContainer.style.transform = `translate(${sliderContainer.translateAmount+(widthToPhotoOne)}px,0px)`
                //update slide width
                sliderContainer.translateAmount+=(widthToPhotoOne)
                //update frame container width
                sliderContainer.imgFrame.style.width=`${(sliderContainer.imagesImg[0].clientWidth)}px`
            }else{
                //translate slide
                sliderContainer.imageContainer.style.transform = `translate(${sliderContainer.translateAmount-(sliderContainer.imagesImg[sliderContainer.currentImgIndex].clientWidth)}px,0px)`
                //update slide width
                sliderContainer.translateAmount-=((sliderContainer.imagesImg[sliderContainer.currentImgIndex].clientWidth))
                //update frame container width
                sliderContainer.imgFrame.style.width=`${(sliderContainer.imagesImg[sliderContainer.currentImgIndex+1].clientWidth)}px`
                sliderContainer.currentImgIndex++
            }
            //update active dots
            for(let j =0;j<sliderContainer.dots.length;j++){
                if(sliderContainer.dots[j].classList.contains('active-dot')){
                    sliderContainer.dots[j].classList.remove('active-dot')
                }
            }
            sliderContainer.dots[sliderContainer.currentImgIndex].classList.add('active-dot')   
        })
        sliderContainer.leftArrow.addEventListener('click',(event)=>{
            const widthToPhotoOne = [...sliderContainer.imagesImg].slice(0,sliderContainer.imagesImg.length-1).map(e=>e.clientWidth).reduce((a,c)=>a+c)
            if(sliderContainer.currentImgIndex-1===-1){
                sliderContainer.currentImgIndex=5;
                //translate slide
                sliderContainer.imageContainer.style.transform = `translate(${sliderContainer.translateAmount-(widthToPhotoOne)}px,0px)`
                //update slide width
                sliderContainer.translateAmount-=(widthToPhotoOne)
                //update frame container width
                sliderContainer.imgFrame.style.width=`${(sliderContainer.imagesImg[5].clientWidth)}px`
            }else{
                //translate slide
                sliderContainer.imageContainer.style.transform = `translate(${sliderContainer.translateAmount+(sliderContainer.imagesImg[sliderContainer.currentImgIndex-1].clientWidth)}px,0px)`
                //update slide width
                sliderContainer.translateAmount+=((sliderContainer.imagesImg[sliderContainer.currentImgIndex-1].clientWidth))
                //update frame container width
                sliderContainer.imgFrame.style.width=`${(sliderContainer.imagesImg[sliderContainer.currentImgIndex-1].clientWidth)}px`
                sliderContainer.currentImgIndex--
                }
                //update active dots
                for(let j =0;j<sliderContainer.dots.length;j++){
                    if(sliderContainer.dots[j].classList.contains('active-dot')){
                        sliderContainer.dots[j].classList.remove('active-dot')
                    }
                }
                sliderContainer.dots[sliderContainer.currentImgIndex].classList.add('active-dot') 
            })
    },
    start(){
        this.setFrameOne();
        this.addDotEventListeners();
        this.addArrowEventListener();
    },
}
sliderMethods.start();





