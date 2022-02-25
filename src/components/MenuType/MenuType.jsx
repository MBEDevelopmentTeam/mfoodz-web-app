import React, {useState} from "react";
import "./MenuType.css";
import { Dish } from "../old-Dish/Dish";
import ConsumerBasket from "../old-ContextBasket/ContextBasket";

export function MenuType(props) {
    const [restaurant, setRestaurant] = useState(props.restaurant.ShopCategory);
   // console.log(props.restaurant.ShopCategory[1].Menu);

  return (
    <div className="menu-type">
      <div className="menu-type__wrapper">
        {restaurant.map(section => {
          return (
            <div className="menu-type__section-menu">
              <h4 className="menu-type__name" id={section.ID}>
                {section.Name}
              </h4>
              <div className="menu-type__dish">
           {/*   {section.itemUuids.map((item, key) => { */}
                {section.Menu.map((item, key) => {
                    let itemInfo = {
                        key: item.MenuID,
                        amount: item.BaseAmount,
                        name: item.MenuName,
                        imageUrl:'http://172.16.100.199:8081/Images/'+item.MenuImage_icon,
                    };
                  return (
                      <ConsumerBasket>
                          {context => {

                              return (
                      <Dish key={item} context={context}
                                dish={itemInfo}
                               itemIn ={itemInfo}
                              />)}}
                      </ConsumerBasket>)
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
