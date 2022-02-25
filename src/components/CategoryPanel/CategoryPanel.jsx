import React, { useEffect, useState } from "react";
import "./CategoryPanel.css";
import "../Carousel/Carousel.css";
import { Loader } from "../Loader/Loader";
//import Carousel from "../Carousel/Carousel";
import Carousel from "react-elastic-carousel";
import Card from "../Card/Card";

import { GetCategory } from "../AllApi";
import TrackingWidget from "../TrackingWidget/TrackingWidget";

export function CategoryPanel(props) {
  const [CategoryData, setCategoryData] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const fetchedCategories = await fetch(`${GetCategory}`);
        const loadedCategories = await fetchedCategories.json();
        var myObject = JSON.parse(loadedCategories.Result.Data);
        if (loadedCategories.Result.Data != null) {
          setCategoryData(myObject.Categorys);
        }
      } catch (err) {}
    })();
  },[]);

  function onPageClick(ID, CateName) {
    if (ID > 0) {
      localStorage.setItem("Cate", ID);
      localStorage.setItem("CateName", CateName);
    }
  }
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 300, itemsToShow: 2 },
    { width: 400, itemsToShow: 3 },
    { width: 500, itemsToShow: 4 },
    { width: 786, itemsToShow: 5 },
    { width: 886, itemsToShow: 6 },
    { width: 950, itemsToShow: 7 },
    { width: 1200, itemsToShow: 8 },
  ];

  return (
    <div className="newDishCate">
      <TrackingWidget />
      <div className="DishCategories">
        <Carousel breakPoints={breakPoints} showArrows={true}>
          {CategoryData.length > 0
            ? CategoryData.map((category) => {
                return (
                  <div className="AllDishes">
                    <a href="#">
                      <img src={category.imageUrl} alt="No Image" />
                      <span class="">
                        <div
                          style={{
                            color: "black",
                            marginLeft: "15px",
                            marginTop: "10px",
                            fontFamily: "Poppins-Regular",
                          }}
                        >
                          {category.CategoryName}
                        </div>
                      </span>
                    </a>
                  </div>
                );
              })
            : null}
        </Carousel>
      </div>

      {/* <div className='flex-container'>
            <Carousel showArrows={true} show={9}>
              { CategoryData.length > 0 ?CategoryData.map((category) => {
              return (
              <div className=''>
                  <a href="/search?q=+"><img  src={"http://admin.mride.pk/Images/Category/"+category.iconImage}  alt="{category.CategoryName}"/>
                  <span class="">
                    <div style={{color: 'black',marginLeft:'20px',marginTop:'15px'}}>{category.CategoryName}</div>
                  </span>
                  </a>
              </div>
              //,
              // <li class="d1 cl ah gd ge"></li>
            
              //newFunction(category)
              );
          }) : <Loader/>}
           </Carousel>  
        </div>  */}
    </div>
  );
}

//   return (
//     <>

// <nav class="bc fy">
// <ul class="bc ez fy">
// <li><a class="bc c4 be h7 af" href="/search?q=Vegan"><div class="af ib ic"><img alt="" role="presentation" src="https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/vegan.png" class="fd fe fz"/></div><div class="id"></div><span class="ca cb cc fd fg"><div class="ie if ig aj">Vegan</div></span></a></li><li class="d1 cl ah h4 ih"></li>
// <li><a class="bc c4 be h7 af" href="/search?q=Chinese"><div class="af ib ic"><img alt="" role="presentation" src="https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/chinese.png" class="fd fe fz"/></div><div class="id"></div><span class="ca cb cc fd fg"><div class="ie if ig aj">Chinese</div></span></a></li><li class="d1 cl ah h4 ih"></li>
// <li><a class="bc c4 be h7 af" href="/search?q=Pizza"><div class="af ib ic"><img alt="" role="presentation" src="https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/pizza.png" class="fd fe fz"/></div><div class="id"></div><span class="ca cb cc fd fg"><div class="ie if ig aj">Pizza</div></span></a></li><li class="d1 cl ah h4 ih"></li>
// <li><a class="bc c4 be h7 af" href="/search?q=Sushi"><div class="af ib ic"><img alt="" role="presentation" src="https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/sushi.png" class="fd fe fz"/></div><div class="id"></div><span class="ca cb cc fd fg"><div class="ie if ig aj">Sushi</div></span></a></li><li class="d1 cl ah h4 ih"></li>
// <li><a class="bc c4 be h7 af" href="/search?q=Fast%20Food"><div class="af ib ic"><img alt="" role="presentation" src="https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/fastfood.png" class="fd fe fz"/></div><div class="id"></div><span class="ca cb cc fd fg"><div class="ie if ig aj">Fast Food</div></span></a></li><li class="d1 cl ah h4 ih"></li>
// <li><a class="bc c4 be h7 af" href="/search?q=Thai"><div class="af ib ic"><img alt="" role="presentation" src="https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/thai.png" class="fd fe fz"/></div><div class="id"></div><span class="ca cb cc fd fg"><div class="ie if ig aj">Thai</div></span></a></li><li class="d1 cl ah h4 ih"></li>
// <li><a class="bc c4 be h7 af" href="/search?q=Indian"><div class="af ib ic"><img alt="" role="presentation" src="https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/indian.png" class="fd fe fz"/></div><div class="id"></div><span class="ca cb cc fd fg"><div class="ie if ig aj">Indian</div></span></a></li><li class="d1 cl ah h4 ih"></li>
// <li><a class="bc c4 be h7 af" href="/search?q=Halal"><div class="af ib ic"><img alt="" role="presentation" src="https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/halal.png" class="fd fe fz"/></div><div class="id"></div><span class="ca cb cc fd fg"><div class="ie if ig aj">Halal</div></span></a></li><li class="d1 cl ah h4 ih"></li>
// <li><a class="bc c4 be h7 af" href="/search?q=Asian"><div class="af ib ic"><img alt="" role="presentation" src="https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/asian.png" class="fd fe fz"/></div><div class="id"></div><span class="ca cb cc fd fg"><div class="ie if ig aj">Asian</div></span></a></li><li class="d1 cl ah h4 ih"></li>
// <li><a class="bc c4 be h7 af" href="/search?q=Greek"><div class="af ib ic"><img alt="" role="presentation" src="https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/greek.png" class="fd fe fz"/></div><div class="id"></div><span class="ca cb cc fd fg"><div class="ie if ig aj">Greek</div></span></a></li><li class="d1 cl ah h4 ih"></li>
// <li><a class="bc c4 be h7 af" href="/search?q=Italian"><div class="af ib ic"><img alt="" role="presentation" src="https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/italian.png" class="fd fe fz"/></div><div class="id"></div><span class="ca cb cc fd fg"><div class="ie if ig aj">Italian</div></span></a></li><li class="d1 cl ah h4 ih"></li>
// <li><a class="bc c4 be h7 af" href="/search?q=Desserts"><div class="af ib ic"><img alt="" role="presentation" src="https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/dessert.png" class="fd fe fz"/></div><div class="id"></div><span class="ca cb cc fd fg"><div class="ie if ig aj">Desserts</div></span></a></li><li class="d1 cl ah h4 ih"></li>
// <li><a class="bc c4 be h7 af" href="/search?q=American"><div class="af ib ic"><img alt="" role="presentation" src="https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/american.png" class="fd fe fz"/></div><div class="id"></div><span class="ca cb cc fd fg"><div class="ie if ig aj">American</div></span></a></li>
// </ul></nav>

//     </>
//);
//}
